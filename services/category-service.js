import { AddNewCategory } from "../repository/category-repository.js";
import customResponse from '../utils/custom_response.js';

const add_new_category = async(req,res,next)=>{
    try {
        const {name} = req.body;
        const category = await AddNewCategory(name);
        return customResponse(res,200,category,'Category Post Method','POST');
    } catch (error) {
        console.log('Error While Adding New Category');
        next(new Error(error));
    }
};

export {
    add_new_category
}