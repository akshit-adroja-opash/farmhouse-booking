import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Farm from '@/models/Farm';

export async function GET() {
  await connectDB();
  try {
    const farms = await Farm.find({});
    return NextResponse.json(farms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch farms' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const newFarm = await Farm.create(body);
    return NextResponse.json(newFarm, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create farm' }, { status: 400 });
  }
}