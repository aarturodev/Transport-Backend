import { Router } from "express";

import { UserController } from '../controllers/user.controller.js';


const router = Router();

router.post('/login',UserController.login);
router.get('/refresh',UserController.refreshToken);
router.get('/logout',UserController.logout);

export default router;