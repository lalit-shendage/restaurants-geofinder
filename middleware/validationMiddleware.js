import {config} from 'dotenv'
import jwt from 'jsonwebtoken';

config();

const secret = process.env.JWT_SECRET;

const verifyToken=async (req, res, next) => {
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }
    try {
        const decoded = await jwt.verify(token,secret);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(500).json({message:'Error verifying token'});
    }
}

export default verifyToken;