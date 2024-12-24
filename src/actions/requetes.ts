"use server"
import { auth } from '@/auth';
import { PrismaClient, Formation } from '@prisma/client';

const prisma = new PrismaClient();

export const allFormations = async (): Promise<
    { success: true; data: Formation[] } | { success: false; error: string }
> => {
    try {
        const formations = await prisma.formation.findMany({
            where: {
                typeFormation: 1,
                startDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: 'desc',
            },
        });
        return { success: true, data: formations };
    } catch (error) {
        return { success: false, error: (error as Error).message || 'Une erreur est survenue' };
    }
};

export const allCollaborations = async (): Promise<
    { success: true; data: Formation[] } | { success: false; error: string }
> => {
    try {
        const collaborations = await prisma.formation.findMany({
            where: {
                typeFormation: 2,
                startDate: {
                  gte: new Date(),
                },
            },
            orderBy: {
                startDate: 'desc',
            },
        });
        return { success: true, data: collaborations };
    } catch (error) {
        return { success: false, error: (error as Error).message || 'Une erreur est survenue' };
    }
};

export const recentFormations = async (): Promise<
    { success: true; data: Formation[] } | { success: false; error: string }
> => {
    try {
        const formations = await prisma.formation.findMany({
          where: {
            typeFormation: 1,
            startDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: 'desc',
          },
          take: 6, 
        });
        return { success: true, data: formations };
    } catch (error) {
        return { success: false, error: (error as Error).message || 'Une erreur est survenue' };
    }
};

export const recentcollaborations = async (): Promise<
    { success: true; data: Formation[] } | { success: false; error: string }
> => {
    try {
        const collaborations = await prisma.formation.findMany({
          where: {
            typeFormation: 2,
            startDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: 'desc',
          },
          take: 6, 
        });
        return { success: true, data: collaborations };
    } catch (error) {
        return { success: false, error: (error as Error).message || 'Une erreur est survenue' };
    }
};

export const updateStatusInscription= async (id:string,status:string): Promise<
{ success: true; } | { success: false; error: string }
> => {
    const isLoggin= await auth()
    if(!isLoggin) 
        return { success: false, error: 'Vous n\'avez pas l\'acces' };
    try {
  
      if (!id || !status) {
        return { success: false, error: 'Missing required fields'};
      }
      
      const validStatuses = ["en attente", "confirme", "annule"];
      if (!validStatuses.includes(status)) {
        return { success: false, error: 'Invalid status value' };
      }
      const idN=Number(id)
      await prisma.inscription.update({
        where: { id:idN },
        data: {
          status,
          updatedAt: new Date(),
        },
      });
  
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Internal Server Error' };
    }
}