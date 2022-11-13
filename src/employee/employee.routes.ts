import employee from './employee.controller';
import r = require('express');
import passport = require('passport');

const router = r.Router();

// Admin only route
// Create a new admin
router.post(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  employee.create,
);

// Admin only route
// Retrieve all admins
router.get(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  employee.findAll,
);

// Retrieve a single admin with adminId
router.get(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  employee.findById,
);

// Update an admin with adminId
router.put(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  employee.update,
);

// Admin only route
// Delete an admin with adminId
router.delete(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  employee.deleteOne,
);

export const employeeRoutes = router;
