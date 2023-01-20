import { 
    AddNewFood,
    UpdateFoodAvailablity,
    UpdateFoodDetails,
    ListAllFoods
 } from "../repository/food-repository.js";
 import customResponse from '../utils/custom_response.js';

// add new Food Item to menu
 const add_new_food = async(req,res,next)=>{
    try {
        const {name,price,category_id} = req.body;
        const food = await AddNewFood({name,price,category_id});
        return customResponse(res,200,food,'Food Post Method','POST');
    } catch (error) {
        console.log('Error While Adding New Food');
        next(new Error(error));
    }
 };
// get all availabe foods
 const get_all_foods = async(req,res,next)=>{
    try {
        const foods = await ListAllFoods();
        return customResponse(res,200,foods,'Food Post Method','POST');
    } catch (error) {
        console.log('Error While Listing All Foods');
        next(new Error(error))
    }
 };

//  update food Availablity
const update_food_availablity = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {isAvailable} = req.body;
        console.log('IS Avialble',isAvailable);
        const isUpdated = await UpdateFoodAvailablity(id,isAvailable);
        return customResponse(res,200,isUpdated,'Food Availablity Update Method','PUT');
    } catch (error) {
        console.log('Error While Listing All Foods');
        next(new Error(error));
    }
};

// update Food Details
const update_food_details = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {name,price,isAvailable,category_id} = req.body;
        const data = JSON.parse(JSON.stringify({name,price,isAvailable,category_id}));
        console.log(data);
        const isUpdated = await UpdateFoodDetails(id,data);
        return customResponse(res,200,isUpdated,'Food Update Method','PUT');
    } catch (error) {
        console.log('Error While Updating Food Details');
        next(new Error(error));
    }
}

 export {
    add_new_food,
    get_all_foods,
    update_food_availablity,
    update_food_details
 }