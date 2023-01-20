import { DataTypes } from "sequelize";
import db from "../config/db.js";

const OrderModel = db.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    order_date:{
        type:DataTypes.DATE,
        default:DataTypes.NOW,
    },
    totalPrice:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    order_status:{
        type:DataTypes.STRING(20),
        defaultValue:'received',
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        }
    },

},{
    freezeTableName: true,
    timestamps:false
});


export default OrderModel;