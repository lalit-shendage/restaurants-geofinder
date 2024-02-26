import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import {config} from 'dotenv'

config();

const secret = process.env.JWT_SECRET;

const register=async (req, res) =>{
    try {
        const {email, username, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
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
      const { email, password } = req.body;
  
        const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email ' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
    
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid  password' });
      }
        const token = jwt.sign({ userId: user._id }, secret);
  
      res.status(200).json({ token });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Login failed' });
    }
  };

export default {
    register,
    login
}