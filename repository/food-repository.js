import FoodModel from "../models/FoodModel.js";


const AddNewFood = async(data)=>{
    return FoodModel.create(data);
}

const UpdateFoodAvailablity = async(id,value)=>{
    return FoodModel.update({isAvailable:value},{where:{id}});
}

const UpdateFoodDetails = async(id,data)=>{
    return FoodModel.update(data,{where:{id}});
}

const ListAllFoods = async()=>{
    return FoodModel.findAll({where:{isAvailable:true}});
}

export {
    AddNewFood,
    UpdateFoodAvailablity,
    UpdateFoodDetails,
    ListAllFoods
}