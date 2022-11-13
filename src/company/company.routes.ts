import company from './company.controller';
import r = require('express');
import passport = require('passport');

const router = r.Router();

// All should admin only routes
// Create a new admin
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  company.create,
);

// Retrieve all admins
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  company.findAll,
);

// Retrieve a single admin with adminId
router.get(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  company.findById,
);

// Update an admin with adminId
router.put(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  company.update,
);

// Delete an admin with adminId
router.delete(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  company.deleteOne,
);

export const companyRoutes = router;
