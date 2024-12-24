import { auth } from '@/auth';
import { prisma } from '@/util/db';
import { NextResponse } from 'next/server';
 // Adjust path to your Prisma client instance

// Create a new inscription
export async function POST(req:Request) {
  try {
    const data= await req.json();
    const id=data.id

    if (!data.nom || !data.prenom || !data.dateNaissance || !data.telephone || !data.email || !id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    delete data.id
    data.dateNaissance=new Date(data.dateNaissance)
    console.log(data)
    const inscription = await prisma.inscription.create({
        data:{
            formationId:id,
            ...data
        }
    });


    return NextResponse.json(inscription, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update the status of an inscription
export async function PATCH(req:Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validStatuses = ["en attente", "confirme", "annule"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const updatedInscription = await prisma.inscription.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedInscription, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Get all inscriptions or inscriptions by formationId
export async function GET(req:Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const formationId = searchParams.get('formationId');

    const whereClause = formationId ? { formationId: Number(formationId) } : {};

    const inscriptions = await prisma.inscription.findMany({
      where: whereClause,
      include: {
        Formation: true, // Inclut la formation associée
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(inscriptions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
