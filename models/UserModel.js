import {DataTypes} from 'sequelize';
import db from '../config/db.js';


const UserModel = db.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    image:{
        type:DataTypes.STRING(150),
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING(150),
        allowNull:false,
    },
    role:{
        type:DataTypes.STRING(50),
        defaultValue:'customer'
    },
    
});

export default UserModel;