import { auth } from '@/auth';
import { prisma } from '@/util/db';
import { randomBytes } from 'crypto';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import * as fs2 from 'fs';

// Create Collaboration (typeFormation = 2)
export async function POST(req: Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });
  const formData = await req.formData()
  const file = formData.get('photo') as File
  const dataF = formData.get('data')  as string
  const data=await JSON.parse(dataF)

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier n\'a été téléchargé' }, { status: 400 })
  }
  
  const buffer = Buffer.from(await file.arrayBuffer())
  const uniqueId = randomBytes(8).toString('hex')
  
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uniqueId}.${fileExtension}`
  const dirPath = path.join(process.cwd(), 'public', 'collaborations');

  if (!fs2.existsSync(dirPath)) {
    fs2.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, fileName);
  try {
    await writeFile(filePath, buffer)
    data["photo"]=`/collaborations/${fileName}`    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du fichier:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du fichier' }, { status: 500 })
  }
  
  try {
    await prisma.formation.create({
      data: {
        ...data,
        typeFormation: 2,
      },
    });
    return NextResponse.json("newCollaboration", { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create collaboration', details: error }, { status: 400 });
  }
}
// Update Collaboration
export async function PUT(req: Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });
  const formData = await req.formData()
  const file = formData.get('photo') as File
  const dataF = formData.get('data')  as string
  const idF = formData.get('id')  as string
  const id=Number(idF)
  const data=await JSON.parse(dataF)
  const collaboration = await prisma.formation.findUnique({
    where: { id },
  });
  if (!collaboration) {
    return NextResponse.json({ error: 'Collaboration non trouvée' }, { status: 404 });
  }

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const uniqueId = randomBytes(8).toString('hex')
    
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`
    const dirPath = path.join(process.cwd(), 'public', 'formations');
    if (!fs2.existsSync(dirPath)) {
        fs2.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, fileName);
    try {
      await writeFile(filePath, buffer)
      data["photo"]=`/collaborations/${fileName}`    
      if (collaboration.photo) {
        const oldFilePath = path.join(process.cwd(), 'public', collaboration.photo);
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'ancienne photo:', error);
          return NextResponse.json({ error: 'Erreur lors de la suppression de l\'ancienne photo' }, { status: 500 });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du fichier:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du fichier' }, { status: 500 })
    }
  }
  
  try {
    const updatedCollaboration = await prisma.formation.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedCollaboration, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update collaboration', details: error }, { status: 400 });
  }
}

// Delete Collaboration
export async function DELETE(req: Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });

  const { id } = await req.json();
  const collaboration = await prisma.formation.findUnique({
    where: { id },
  });
  if (!collaboration) {
    return NextResponse.json({ error: 'Collaboration non trouvée' }, { status: 404 });
  }
  if (collaboration.photo) {
    const oldFilePath = path.join(process.cwd(), 'public', collaboration.photo);
    try {
      if(oldFilePath)
        await fs.unlink(oldFilePath);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ancienne photo:', error);
    }
  }
  try {
    await prisma.formation.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Collaboration deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete collaboration', details: error }, { status: 400 });
  }
}

// Get Collaboration(s)
export async function GET(req: Request) {
  const { id } = Object.fromEntries(new URL(req.url).searchParams);
  try {
    if (id) {
      const collaboration = await prisma.formation.findUnique({
        where: { id: parseInt(id, 10) },
      });
      return collaboration
        ? NextResponse.json(collaboration, { status: 200 })
        : NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    const collaborations = await prisma.formation.findMany({
      where:{typeFormation:2}
  });
    return NextResponse.json(collaborations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve collaborations', details: error }, { status: 400 });
  }
}
