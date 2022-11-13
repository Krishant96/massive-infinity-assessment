import r = require('express');
import { authRoutes } from '../auth/auth.routes';
import { userRoutes } from '../user/user.routes';
import { companyRoutes } from '../company/company.routes';
import { employeeRoutes } from '../employee/employee.routes';

const router = r.Router();

router.use('/', authRoutes);
router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/employee', employeeRoutes);

export const routes = router;
