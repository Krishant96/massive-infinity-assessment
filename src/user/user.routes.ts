import users from './user.controller';
import express = require('express');
import passport = require('passport');
import { validator } from '../lib/validations';
import { schemas } from '../validations/schemas';

const router = express.Router();

// Create a new user
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.createUser, 'body'),
  users.create,
);

// Retrieve all users
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  users.findAll,
);

// Retrieve a single user with userId
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  users.findById,
);

// Update a user with userId
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.updateUser, 'body'),
  users.update,
);

// Delete a user with userId
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  users.deleteOne,
);

export const userRoutes = router;
