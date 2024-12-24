import { auth } from '@/auth';
import { prisma } from '@/util/db';
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  try {
    const { name, email, content } = await req.json();
    console.log(name,email,content)
    if (!name || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        name,
        email,
        content,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req:Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });
  try {
    const { id } = await req.json();

    if (id) {
      // Update a specific message
      const updatedMessage = await prisma.message.update({
        where: { id },
        data: {
          openedAt: new Date(),
        },
      });

      return NextResponse.json(updatedMessage, { status: 200 });
    } else {
      // Update all messages
      const updatedMessages = await prisma.message.updateMany({
        data: { openedAt: new Date() },
      });

      return NextResponse.json({ count: updatedMessages.count }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const isLoggin= await auth()
    if(!isLoggin) 
      return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });  
  try {
    const messages = await prisma.message.findMany({
      orderBy: [
        { openedAt: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
