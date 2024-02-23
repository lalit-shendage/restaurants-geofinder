import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import database from './config/database.js'

const app = express();

database();

const PORT= process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use('/',userRoutes);


app.listen(PORT, ()=>{
    console.log('server is running ')
})