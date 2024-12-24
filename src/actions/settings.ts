'use server'

import { prisma } from '@/util/db'
import { randomBytes } from 'crypto'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import fs from 'fs/promises';
import bcrypt from "bcrypt";
import { auth } from '@/auth'

export async function updateSiteName(name: string) {
const record = await prisma.option.findUnique({
    where: { id: '1' },
    });
    
    if (record) {
        await prisma.option.upsert({
            where: { id: '1' },
            update: { siteName: name },
            create: { id: '1', siteName: name },
          })
    } 
}

async function saveFile(file: File, directory: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uniqueId = randomBytes(8).toString('hex')
  const uniqueFilename = `${uniqueId}${path.extname(file.name)}`
  const uploadDir = path.join(process.cwd(), 'public', directory)
  const filePath = path.join(uploadDir, uniqueFilename)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, buffer)

  return `/${directory}/${uniqueFilename}`
}

export async function updateSlice(index: number, file: File) {
  const sliceUrl = await saveFile(file, 'slices')
  
  const record = await prisma.option.findUnique({
    where: { id: '1' },
  });
  
  if (record) {
    if(record.contactImageUrl){
        try {
            var oldFilePath
            if(index==1 && record.slice1Url){
                oldFilePath = path.join(process.cwd(), 'public', record.slice1Url)
                await fs.unlink(oldFilePath);
            }
            else if(index==2&& record.slice2Url){
                oldFilePath = path.join(process.cwd(), 'public', record.slice2Url)
                await fs.unlink(oldFilePath);}
            else if(index==3&& record.slice3Url){
                oldFilePath = path.join(process.cwd(), 'public', record.slice3Url)
                await fs.unlink(oldFilePath);
            }
        } catch (error) {}
    }
    await prisma.option.upsert({
        where: { id: '1' },
        update: { [`slice${index}Url`]: sliceUrl },
        create: { id: '1', [`slice${index}Url`]: sliceUrl },
      })
      return sliceUrl
  }
  return null
}

export async function resetSlice(index: number) {
const record = await prisma.option.findUnique({
    where: { id: '1' },
    });
    
    if (record) {
        await prisma.option.update({
            where: { id: '1' },
            data: { [`slice${index}Url`]: null },
          })
    }
}
export async function resetLogo() {
const record = await prisma.option.findUnique({
    where: { id: '1' },
    });
    
    if (record) {
        if(record.logoUrl){
            const oldFilePath = path.join(process.cwd(), 'public', record.logoUrl);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {}
        }
        await prisma.option.update({
            where: { id: '1' },
            data: { logoUrl: null },
            })
    }
}
export async function resetContactImage() {
    const record = await prisma.option.findUnique({
        where: { id: '1' },
    });

    if (record) {
        if(record.contactImageUrl){
            const oldFilePath = path.join(process.cwd(), 'public', record.contactImageUrl);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {}
        }
        await prisma.option.update({
            where: { id: '1' },
            data: { contactImageUrl: null },
        })
    }
}

export async function resetPhotoDescription() {
    const record = await prisma.option.findUnique({
        where: { id: '1' },
    });
        
    if (record) {
        if(record.descriptionImageUrl){
            const oldFilePath = path.join(process.cwd(), 'public', record.descriptionImageUrl);
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {}
        }
        await prisma.option.update({
            where: { id: '1' },
            data: { descriptionImageUrl: null },
        })
    }
}
    

export async function updateLogo(file: File) {
  const logoUrl = await saveFile(file, 'logos')
  const record = await prisma.option.findUnique({
    where: { id: '1' },
  });
  
  if (record) {
    if(record.logoUrl){
        const oldFilePath = path.join(process.cwd(), 'public', record.logoUrl);
        try {
            await fs.unlink(oldFilePath);
        } catch (error) {}
    }
    await prisma.option.upsert({
        where: { id: '1' },
        update: { logoUrl },
        create: { id: '1', logoUrl },
        })
       return logoUrl
  }
  return null
}

export async function updateDescription(description: string) {
const record = await prisma.option.findUnique({
    where: { id: '1' },
    });
    
    if (record) {
    await prisma.option.upsert({
        where: { id: '1' },
        update: { siteDescription: description },
        create: { id: '1', siteDescription: description },
        })
    }
}

export async function updateDescriptionImage(file: File) {
  const imageUrl = await saveFile(file, 'description-images')
  const record = await prisma.option.findUnique({
    where: { id: '1' },
  });
  
  if (record) {
    await prisma.option.upsert({
        where: { id: '1' },
        update: { descriptionImageUrl: imageUrl },
        create: { id: '1', descriptionImageUrl: imageUrl },
      })
      return imageUrl
  }
  return null
}

export async function updateContactInfo(contactInfo: {
  address: string
  phone1: string
  phone2: string
  email: string
}) {
  const record = await prisma.option.findUnique({
    where: { id: '1' },
  });
  
  if (record) {

    await prisma.option.upsert({
        where: { id: '1' },
        update: {
            address: contactInfo.address, 
            contactEmail: contactInfo.email, 
            phone1: contactInfo.phone1, 
            phone2: contactInfo.phone2, 
        },
        create: { id: '1', 
            address: contactInfo.address, 
            contactEmail: contactInfo.email, 
            phone1: contactInfo.phone1, 
            phone2: contactInfo.phone2, 
         },
      })
  }
}

export async function updateContactImage(file: File) {
  const imageUrl = await saveFile(file, 'contact-images')
  
  const record = await prisma.option.findUnique({
    where: { id: '1' },
  });
  
  if (record) {
    if(record.contactImageUrl){
        const oldFilePath = path.join(process.cwd(), 'public', record.contactImageUrl);
        try {
            await fs.unlink(oldFilePath);
        } catch (error) {}
    }
    await prisma.option.upsert({
        where: { id: '1' },
        update: { contactImageUrl: imageUrl },
        create: { id: '1', contactImageUrl: imageUrl },
      })
      return imageUrl
  }
  return null
}

// New functions to fetch initial data

export async function getGeneralSettings() {
  const options = await prisma.option.findFirst({
    where: { id: '1' },
    select: {
      siteName: true,
      logoUrl: true,
      slice1Url: true,
      slice2Url: true,
      slice3Url: true,
    },
  })
  return options || {
    siteName: '',
    logoUrl: '/logo.png',
    slice1Url: '/slice1.png',
    slice2Url: '/slice2.png',
    slice3Url: '/slice3.png',
  }
}

export async function getAboutSettings() {
  const options = await prisma.option.findFirst({
    where: { id: '1' },
    select: {
      siteDescription: true,
      descriptionImageUrl: true,
    },
  })
  return options || {
    siteDescription: '',
    descriptionImageUrl: '/a-props.png',
  }
}

export async function getContactSettings() {
  const options = await prisma.option.findFirst({
    where: { id: '1' },
    select: {
      address: true,
      phone1: true,
      phone2: true,
      contactEmail: true,
      contactImageUrl: true,
    },
  })
  return options || {
    address: '',
    phone1: '',
    phone2: '',
    contactEmail: '',
    contactImageUrl: '/contact.png',
  }
}

export async function getUsers() {
    const users = await prisma.user.findMany({
      where: {
        default: false
      },
      select: {
        id: true,
        email: true
      }
    })
    return users
  }
  
  export async function updateUserEmail(id: string, newEmail: string) {
    await prisma.user.update({
      where: { id },
      data: { email: newEmail }
    })
  }
  
  export async function deleteUser(id: string) {
    await prisma.user.delete({
      where: { id }
    })
  }
  
  export async function addUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        default: false
      },
      select: {
        id: true,
        email: true
      }
    })
    return newUser
  }

  export async function getUserLogin() {
    const session=await auth()
    if(session && session.user)
        return {email:session.user.email, name:session.user?.name}
    return null
  }

 export async function getLogoURL() {
    const options = await prisma.option.findFirst({
        where: { id: '1' },
        select: {
          logoUrl: true,
        },
      })
      return options || {
        logoUrl: '/logo.png',
      }
  }
