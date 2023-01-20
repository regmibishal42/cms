import { DataTypes } from "sequelize";
import db from "../config/db.js";

const CategoryModel = db.define('category',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    category_name:{
        type:DataTypes.STRING(40),
        unique:true,
        allowNull:false
    },
    
    
},{
    freezeTableName: true,
    timestamps:false
});


export default CategoryModel;


