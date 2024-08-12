import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import {
  createNewEvent,
  findAllEvents,
  findEventById,
  updateExistingEvent,
  deleteEventById,
} from '../services/eventService';
import AppError from '../utils/AppError';

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const event = await findEventById(parseInt(id));

    if (!event) {
      throw new AppError('Event not found', 404);
    } else {
      res.json(event);
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const per_page = parseInt(req.query.per_page as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  try {
    const events = await findAllEvents(per_page, page);
    res.json(events);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { event } = req.body;

  try {
    const newEvent = await createNewEvent(event);
    res.json(newEvent);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(
          new AppError(
            'Unique constraint violation, event with the same title already exists',
            400
          )
        );
      } else {
        next(new AppError('An error occurred while creating the event', 500));
      }
    } else {
      next(error); // Pass the error to the error-handling middleware
    }
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { event } = req.body;

  if (!event) return next(new AppError('Event data required', 400));

  try {
    const updatedEvent = await updateExistingEvent(parseInt(id), event);
    res.json(updatedEvent);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        next(new AppError('Event not found', 404));
      } else {
        next(new AppError('An error occurred while updating the event', 500));
      }
    } else {
      next(error); // Pass the error to the error-handling middleware
    }
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await deleteEventById(parseInt(id));
    res.json({ message: 'Event was deleted successfully' });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
