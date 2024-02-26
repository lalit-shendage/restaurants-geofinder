import express from 'express';
import userController from '../controllers/userController.js';

const userRoutes=express.Router();

userRoutes.post('/login', userController.login);

userRoutes.post('/register', userController.register);

export default userRoutes;