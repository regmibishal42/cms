import OrderModel from "../models/OrderModel.js";
import OrderItemsModel from '../models/OrderItemModel.js'
import db from "../config/db.js";

const CreateNewOrder = async({user_id,total_price})=>{
    return await OrderModel.create({user_id,total_price});
}

const CreateOrderItems = async({order_id,order_item,item_price})=>{
    return await OrderItemsModel.create({order_id,order_item,item_price});
}
const ViewNewOrders = async()=>{
    return await OrderItemsModel.findAll({where:{order_status:'received',$or:[{order_status:'pending'}]}});
}
const ViewAllOrders = async()=>{
    return await OrderModel.findAll();
};
const ViewOrderById = async(id)=>{
    return await db.query(`select * from "order" o inner join order_item oi ON o.id =oi.order_id  where  oi.order_id =${id}`)
};

const UpdateOrderStatus = async(id,order_status)=>{
    return await OrderModel.update({order_status},{where:{id}});
};

export {
    CreateNewOrder,
    CreateOrderItems,
    ViewNewOrders,
    ViewAllOrders,
    ViewOrderById,
    UpdateOrderStatus
}