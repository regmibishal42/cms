import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';
import userRoutes from './controllers/user_controller.js';
const app = express();
app.use(express.json());


(async()=>{
    try {
        db.authenticate('connected');
        db.sync({alter:true});
        console.log('Connected to postgres');
        
    } catch (error) {
        console.log('Database connection error',error);
    }
})();



// routes
app.use('/users',userRoutes);

app.use((error,req,res)=>{
    return res.status(400).json({
        message:'New Error Occured',
        error
    });
});








app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});
