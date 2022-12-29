import UserModel from "../models/UserModel.js";
import db from "../config/db.js";


// for fetching all users --admin-dashboard
const fetchAllUsers = async()=>{
    return await UserModel.findAll();
}

// login user
const loginUser = async(username)=>{
    return await UserModel.findOne({where:{username:username}});
}

// find users by id
const fetchUserById = async(id)=>{
    return await UserModel.findByPk(id);
}

// create new user
const createNewUser = async(data) =>{
    return await UserModel.create(data);
}
// change user role
const changeUserRole = async(role,id)=>{
    return UserModel.update({role},{where:{id}});
}

// update password or image
const updateUserDetails = async(id,password,image)=>{
    if(password?.length && !image?.length) return await UserModel.update({password},{where:{id}});
    else if(!password.length && image?.length) return await UserModel.update({image},{where:{id}});
    else return await UserModel.update({password,image},{where:{id}});
};

//delete a user
const deleteUserAccount = async(id)=>{
    return await UserModel.destroy({where:{id}});
}


export {
    fetchAllUsers,
    loginUser,
    fetchUserById,
    createNewUser,
    changeUserRole,
    updateUserDetails,
    deleteUserAccount
};