import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import {config} from 'dotenv'

config();

const secret = process.env.SECRET;

const register=async (req, res) =>{
    try {
        const {email, name, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({message: 'User Registered'});
    } catch (error) {
        res.status(500).json({message: 'User Registation failed', error});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Password does not match'});
        }
        const token = jwt.sign({email}, secret, {
            expiresIn: 3600
        });
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: 'Login failed', error});
    }
}

export default {
    register,
    login
}