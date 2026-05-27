# MERN/Full-Stack Debugger Report: Farmhouse Booking App

This report documents the architectural and implementation bugs found across the unified Next.js full-stack application based on the five diagnostic categories.

---

### Category 1: Frontend components/pages missing API calls (Hardcoded Mock Data)

#### 1. Admin Dashboard Overview
* **File Name & Line Numbers:** `app/admin/dashboard/page.tsx` (Lines 50–78 and Lines 81–126)
* **What the Bug is:** The dashboard page relies entirely on static, hardcoded mock arrays (`performanceMetrics` and `historicalReservations`) to show metrics (Revenue, Active Bookings, Occupancy) and the recent bookings table. It does not load database records even though a backend API `/api/bookings` is fully implemented.
* **How to Fix it:**
  - Define React states for `bookings` and `loading`.
  - Fetch active bookings from `/api/bookings` in a `useEffect` hook.
  - Dynamically calculate the metrics in state (e.g., sum up payment prices for total revenue, count active bookings) and map the table data to the fetched database reservations.

#### 2. Property Creation Wizard
* **File Name & Line Numbers:** `app/admin/properties/create/page.tsx` (Lines 57 and Lines 131–137)
* **What the Bug is:** The "Add New Property" multi-step wizard is a static mockup. Its form submission handler does not trigger any API call (`onSubmit={(e) => e.preventDefault()}`), and the buttons do not invoke any creation action, leaving the wizard completely non-functional.
* **How to Fix it:**
  - Introduce state hook variables for each of the form input fields (title, description, location, property_type, price, amenities, etc.).
  - Implement a submit handler that executes a `POST` request to `/api/farms` sending the gathered JSON payload to persist the property to the MongoDB database.

#### 3. Property Details Page
* **File Name & Line Numbers:** `app/properties/[id]/page.tsx` (Lines 110–112)
* **What the Bug is:** The page prioritizes hardcoded mock values. If the page ID parameter matches a mock key (`'1'`, `'2'`, `'3'`), it retrieves only static local details and completely bypasses the backend dynamic `/api/farms/${id}` fetch call.
* **How to Fix it:**
  - Restructure the logic inside `getProperty()` to always attempt a fetch from `/api/farms/${id}` first. Only fall back to local mock definitions if the API returns a `404 Not Found` or fails.

---

### Category 2: Frontend API calls mismatching backend routes

#### 1. Inefficient Farm Details Fetching
* **File Name & Line Numbers:** `app/farms/[id]/page.tsx` (Lines 15–20)
* **What the Bug is:** Instead of querying the specific farmhouse details using `/api/farms/${id}`, the client-side code fetches all farms in the database via `/api/farms` and filters them on the client side using `data.find()`. This is highly unoptimized and uses the wrong API path mapping.
* **How to Fix it:**
  - Modify the fetch URL to `/api/farms/${id}` to pull only the specific record directly from the server.

#### 2. Route Parameter Type Compilation Mismatch
* **File Name & Line Numbers:** `app/api/farms/[id]/route.ts` (Line 5)
* **What the Bug is:** In Next.js 16/15, dynamic route parameters (`params`) are asynchronous and must be typed as a Promise. The backend endpoint GET signature was typed synchronously as `{ params: { id: string } }`, leading to type validation failures and build/compilation crashes. *(Note: This has been fixed in the codebase during diagnostic tests but is documented for reference).*
* **How to Fix it:**
  - Change the parameters argument type to `Promise<{ id: string }>` and await `params` before retrieving the ID.

---

### Category 3: Orphaned/Uncalled backend routes

#### 1. Cloudinary File Upload Endpoint
* **File Name & Line Numbers:** `app/api/upload/route.ts` (Line 10)
* **What the Bug is:** The `/api/upload` POST handler exists in the backend to upload image assets to Cloudinary, but it is never utilized or called in the new property creation wizard (`app/admin/properties/create/page.tsx`).
* **How to Fix it:**
  - Add an image file input to the properties creation wizard, sending files to `/api/upload` via `FormData` POST. Use the returned Cloudinary URL to populate the property image gallery.

#### 2. Farmhouse POST Route
* **File Name & Line Numbers:** `app/api/farms/route.ts` (Line 45)
* **What the Bug is:** The POST handler for creating farmhouses is defined in the backend API, but is never invoked by the new creation dashboard wizard (`app/admin/properties/create/page.tsx`), leaving it orphaned.
* **How to Fix it:**
  - Connect this endpoint to the submit handler in `app/admin/properties/create/page.tsx` to handle database storage.

---

### Category 4: Base URL / Environment Configuration Mismatches

#### 1. NextAuth Server-Side Fetch Port Collision
* **File Name & Line Numbers:** `app/farms/page.tsx` (Line 4)
* **What the Bug is:** The Server Component performs a fetch to `${process.env.NEXTAUTH_URL}/api/farms`. However, if port 3000 is occupied during development, the dev server boots on port 3001 while `NEXTAUTH_URL` remains set to `http://localhost:3000` in `.env.local`. This mismatch triggers connection refusals on the server-side render.
* **How to Fix it:**
  - Fall back dynamically to fallback local ports or utilize a separate environment variable such as `NEXT_PUBLIC_SITE_URL` to represent the active site URL.

#### 2. Cloudinary Environment Key Spelling Typo
* **File Name & Line Numbers:** `app/api/upload/route.ts` (Line 6)
* **What the Bug is:** The API endpoint references `process.env.CLDINARY_API_KEY` (spelled without the 'O' in Cloudinary), while `.env.local` defines the key as `CLOUDINARY_API_KEY`. This causes credentials to be `undefined` and breaks all image uploads.
* **How to Fix it:**
  - Change `process.env.CLDINARY_API_KEY` to `process.env.CLOUDINARY_API_KEY` in the upload route configuration.

---

### Category 5: CORS configuration discrepancies

#### 1. Next.js Unified Architecture Origin sharing
* **File Name & Line Numbers:** N/A (Project Architecture)
* **What the Bug is:** Since this is a unified Next.js full-stack application, backend API routes and frontend pages share the same origin and port, avoiding browser CORS constraints on local fetches. However, if external mobile apps or third-party webhooks need to access these API routes, CORS headers are missing.
* **How to Fix it:**
  - If external access is required, configure custom headers in `next.config.ts` or add middleware to respond with correct `Access-Control-Allow-Origin` values.
