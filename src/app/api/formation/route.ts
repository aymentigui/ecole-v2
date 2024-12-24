import { auth } from '@/auth';
import { prisma } from '@/util/db';
import { randomBytes } from 'crypto';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import * as fs2 from 'fs';

// Create formation1 (typeFormation = 1)
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
  const dirPath = path.join(process.cwd(), 'public', 'formations');

  if (!fs2.existsSync(dirPath)) {
    fs2.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, fileName);
  try {
    await writeFile(filePath, buffer)
    data["photo"]=`/formations/${fileName}`    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du fichier:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du fichier' }, { status: 500 })
  }
  try {
    await prisma.formation.create({
      data: {
        ...data,
        typeFormation: 1,
      },
    });
    return NextResponse.json("newFormatiom", { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create formation', details: error }, { status: 400 });
  }
}
// Update formation
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
  const formation = await prisma.formation.findUnique({
    where: { id },
  });
  if (!formation) {
    return NextResponse.json({ error: 'formation non trouvée' }, { status: 404 });
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
      data["photo"]=`/formations/${fileName}`    
      if (formation.photo) {
        const oldFilePath = path.join(process.cwd(), 'public', formation.photo);
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
    const updatedformation = await prisma.formation.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedformation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update formation', details: error }, { status: 400 });
  }
}

// Delete formation
export async function DELETE(req: Request) {
  const isLoggin= await auth()
  if(!isLoggin) 
    return NextResponse.json({ error: 'Unauthorized: Access denied' }, { status: 401 });

  const { id } = await req.json();
  const formation = await prisma.formation.findUnique({
    where: { id },
  });
  if (!formation) {
    return NextResponse.json({ error: 'formation non trouvée' }, { status: 404 });
  }
  if (formation.photo) {
    const oldFilePath = path.join(process.cwd(), 'public', formation.photo);
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
    return NextResponse.json({ message: 'formation deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete formation', details: error }, { status: 400 });
  }
}

// Get formation(s)
export async function GET(req: Request) {
  const { id } = Object.fromEntries(new URL(req.url).searchParams);

  try {
    if (id) {
      const formation = await prisma.formation.findUnique({
        where: { id: parseInt(id, 10) },
      });
      return formation
        ? NextResponse.json(formation, { status: 200 })
        : NextResponse.json({ error: 'formation not found' }, { status: 404 });
    }

    const formation = await prisma.formation.findMany({
        where:{typeFormation:1}
    });
    return NextResponse.json(formation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve formations', details: error }, { status: 400 });
  }
}
