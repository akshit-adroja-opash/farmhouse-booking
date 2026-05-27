import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Farm from '@/models/Farm';
import User from '@/models/User';
import { sendBookingEmail } from '@/lib/mailer';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

export async function POST(req: Request) {
  await connectDB();
  try {
    const { userId, farmId, startDate, endDate, totalPrice } = await req.json();

    const booking = await Booking.create({
      userId,
      farmId,
      startDate,
      endDate,
      totalPrice,
      paymentStatus: 'Paid' // Simulated instant payment confirmation for simplicity
    });

    const farm = await Farm.findById(farmId);
    const user = await User.findById(userId);

    // Trigger Orchestrated Async Notifications
    const templateData = {
      farmName: farm.title,
      startDate,
      endDate,
      totalPrice
    };

    await sendBookingEmail(user.email, templateData);
    
    // Notify User & Admin
    const confirmationText = `Hello ${user.name}, your stay at ${farm.title} from ${startDate} to ${endDate} is confirmed! Total: ₹${totalPrice}`;
    await sendWhatsAppNotification(process.env.ADMIN_PHONE_NUMBER!, `New Admin Alert: ${user.name} booked ${farm.title}.`);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Booking failed processing' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const filter = userId ? { userId } : {};
    const bookings = await Booking.find(filter).populate('farmId').populate('userId');
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}