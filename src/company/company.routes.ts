import company from './company.controller';
import r = require('express');
import passport = require('passport');
import { validator } from '../lib/validations';
import { schemas } from '../validations/schemas';

const router = r.Router();

// Create a new company
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.createCompany, 'body'),
  company.create,
);

// Retrieve all companies
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  company.findAll,
);

// Retrieve a single company with companyId
router.get(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  company.findById,
);

// Update an company with companyId
router.put(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  validator(schemas.updateCompany, 'body'),
  company.update,
);

// Delete an company with companyId
router.delete(
  '/:companyId',
  passport.authenticate('jwt', { session: false }),
  company.deleteOne,
);

export const companyRoutes = router;
