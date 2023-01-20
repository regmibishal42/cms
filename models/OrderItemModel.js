import { DataTypes } from "sequelize";
import db from "../config/db.js";

const OrderItemsModel = db.define('order_item',{
    order_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'order',
            key:'id'
        }
    },
    order_item:{
        type:DataTypes.STRING(20),
        defaultValue:'received',
        allowNull:false,
    },
    item_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

},{
    freezeTableName: true,
    timestamps:false
});


export default OrderItemsModel;