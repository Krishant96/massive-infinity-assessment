import employee from './employee.controller';
import r = require('express');
import passport = require('passport');
import { validator } from '../lib/validations';
import { schemas } from '../validations/schemas';

const router = r.Router();

// Create a new employee
router.post(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.createEmployee, 'body'),
  employee.create,
);

// Retrieve all employees
router.get(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  employee.findAll,
);

// Retrieve an employee with employeeId
router.get(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  employee.findById,
);

// Update an employee with employeeId
router.put(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.updateEmployee, 'body'),
  employee.update,
);

// Delete an employee with employeeId
router.delete(
  '/:companyId/:employeeId',
  passport.authenticate('jwt', { session: false }),
  employee.deleteOne,
);

export const employeeRoutes = router;
