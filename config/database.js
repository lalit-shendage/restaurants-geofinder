import {config} from 'dotenv'
import { Mongoose } from 'mongoose';

config();

const user=process.env.mongoURI

const connectDb= async () =>{
    try{
        await Mongoose.connect(`mongodb+srv://${user}@cluster0.dwnwv8t.mongodb.net/Geo-Resto`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB Connected')
    }catch(err){
        console.log(err)
    }
}

connectDb();