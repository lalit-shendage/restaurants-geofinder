import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

const PORT= process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use('/',userRoutes);


app.listen(PORT, ()=>{
    console.log('server is running ')
})