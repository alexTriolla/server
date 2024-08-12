import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findEventById = async (id: number) => {
  return await prisma.event.findFirst({
    where: {
      id,
    },
  });
};

export const findAllEvents = async (per_page: number, page: number) => {
  return prisma.event.findMany({
    skip: (page - 1) * per_page,
    take: per_page,
  });
};

export const createNewEvent = async (eventData: Prisma.EventCreateInput) => {
  return await prisma.event.create({
    data: eventData,
  });
};

export const updateExistingEvent = async (
  id: number,
  eventData: Prisma.EventUpdateInput
) => {
  return await prisma.event.update({
    where: { id },
    data: eventData,
  });
};

export const deleteEventById = async (id: number) => {
  return await prisma.event.delete({
    where: { id },
  });
};
