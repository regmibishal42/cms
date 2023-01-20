import CategoryModel from "../models/CategoryModel.js";
import db from "../config/db.js";

const AddNewCategory = async(name)=>{
    return await CategoryModel.create({category_name:name});
}

export {
    AddNewCategory
};