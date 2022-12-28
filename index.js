import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';

const app = express();
app.use(express.json());


(async()=>{
    try {
        db.authenticate('connected');
        console.log('Connected to postgres');
        
    } catch (error) {
        console.log('Database connection error',error);
    }
})();



// routes









app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});
