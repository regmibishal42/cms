import { 
    CreateNewOrder,
    CreateOrderItems,
    ViewNewOrders,
    ViewAllOrders,
    ViewOrderById,
    UpdateOrderStatus
 } from "../repository/order-repository.js";
 import customResponse from '../utils/custom_response.js';


//  create new Order
const create_new_order = async(req,res,next)=>{
    try {
        const {items,total_price} = req.body;
        const user_id = req.user.dataValues.id;
        console.log(items);
        const orderedItems = eval(items);
       // console.log(orderedItems,orderedItems[1].price);
        const newOrder = await CreateNewOrder({user_id,total_price});
        const order_id = newOrder.id;
      //  console.log(newOrder,order_id);
        for(let i=0;i<orderedItems.length;i++){
            let items = await CreateOrderItems(
                {
                    order_id:newOrder?.dataValues?.id,
                    order_item:orderedItems[i].name,
                    item_price:orderedItems[i].price
                }
                
            );
            //console.log('Order Items',items);
        }
        return customResponse(res,200,newOrder,'Order Post Method','POST');
    } catch (error) {
        console.log('Error While Creating Order',error.stack);
        next(new Error(error));
    }
};

// view new orders --admin
const get_new_orders = async(req,res,next)=>{
    try {
        const orders = await ViewNewOrders();
        return customResponse(res,200,orders,'New Orders Get Method','GET');

    } catch (error) {
        console.log('Error While Viewing Order',error.stack);
        next(new Error(error));
    }
};

//to get all received,pending,done orders
const get_all_orders = async(req,res,next)=>{
    try {
        const orders = await ViewAllOrders();
        return customResponse(res,200,orders,'All Orders Get Method','GET');
    } catch (error) {
        console.log('Error While Viewing All Order',error.stack);
        next(new Error(error));
    }
};

// update order status --admin --employee
const update_order_status = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {order_status} = req.body;

        await UpdateOrderStatus(id,order_status);
        const order = await ViewOrderById(id);
        return customResponse(res,200,order,'New Orders Get Method','GET');
    } catch (error) {
        console.log('Error While Updating Order Status',error.stack);
        next(new Error(error));
    }
}



export {
    create_new_order,
    get_all_orders,
    get_new_orders,
    update_order_status
}

