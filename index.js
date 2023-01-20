import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';
// controllers
import userRoutes from './controllers/user_controller.js';
import categoryRoutes from './controllers/category_controller.js';
import foodRoutes from './controllers/food_controller.js';

import passport from 'passport';
const app = express();
app.use(express.json());


import passportCreate from './utils/jwt_strategy.js';
passportCreate(passport);
app.use(passport.initialize());


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
app.use('/category',categoryRoutes);
app.use('/food',foodRoutes);


app.use((error,req,res,next)=>{
    return res.status(400).json({
        success:false,
        message:"An Error Occured",
        error
    });
})








app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
});
