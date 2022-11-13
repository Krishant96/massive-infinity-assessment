import auth from './auth.controller';
import r = require('express');

const router = r.Router();

// login
router.post('/login', auth.login);

export const authRoutes = router;
