import { Router } from "express";

import { UserController } from '../controllers/user.controller.js';


const router = Router();

router.post('/login',UserController.login);
router.post('/logout',UserController.logout);
router.post('/register',UserController.register);
router.get('/refresh',UserController.refreshToken);
router.get('/users',UserController.getUsers);

export default router;