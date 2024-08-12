import express from 'express';

import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from '../controllers/eventController';
import { body } from 'express-validator';
import { validate } from '../middlewares/validationMiddleware';

const router = express.Router();

//Routes
router.get('/:id', getEventById);

router.get('/', getAllEvents);

router.post(
  '',
  [
    body('event.title')
      .optional()
      .isString()
      .withMessage('Title must be a string'),
    body('event.description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('event.location')
      .optional()
      .isString()
      .withMessage('Location must be a string'),
    validate,
  ],
  createEvent
);
router.put(
  '/:id',
  [
    body('event.title')
      .optional()
      .isString()
      .withMessage('Title must be a string'),
    body('event.description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('event.location')
      .optional()
      .isString()
      .withMessage('Location must be a string'),
    validate,
  ],
  updateEvent
);
router.delete('/:id', deleteEvent);

export default router;
