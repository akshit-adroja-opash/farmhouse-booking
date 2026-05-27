import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Farm from '@/models/Farm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const farm = await Farm.findById(params.id);
    if (!farm) {
      return NextResponse.json({ error: 'Farmhouse not found' }, { status: 404 });
    }
    return NextResponse.json(farm, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid ID or processing error' }, { status: 500 });
  }
}
