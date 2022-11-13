import users from './user.controller';
import r = require('express');
import passport = require('passport');

const router = r.Router();

// All should admin only routes
// Create a new admin
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  users.create,
);

// Retrieve all admins
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  users.findAll,
);

// Retrieve a single admin with adminId
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  users.findById,
);

// Update an admin with adminId
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  users.update,
);

// Delete an admin with adminId
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  users.deleteOne,
);

export const userRoutes = router;
