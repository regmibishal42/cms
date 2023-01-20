import { DataTypes } from "sequelize";
import db from "../config/db.js";

const FoodModel = db.define('food',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    isAvailable:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
    },
    category_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'category',
            key:'id'
        }
    }

},{
    freezeTableName: true,
    timestamps:false
});


export default FoodModel;