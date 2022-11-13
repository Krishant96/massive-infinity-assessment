import auth from './auth.controller';
import r = require('express');
import { validator } from '../lib/validations';
import { schemas } from '../validations/schemas';

const router = r.Router();

// login
router.post('/login', validator(schemas.login, 'body'), auth.login);

export const authRoutes = router;
