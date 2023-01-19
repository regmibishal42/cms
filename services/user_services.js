import {
    fetchAllUsers,
    fetchUserById,
    changeUserRole,
    updateUserDetails,
    deleteUserAccount,
    createNewUser,
    loginUser,

} from '../repository/user-repository.js';
import userValidator from '../validators/user_validators.js';
import customResponse from '../utils/custom_response.js';
import { hashPassword,comparePasswords } from '../utils/password_hashing.js';
import fs from 'fs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const get_all_users = async(req,res,next)=>{
    try{
        const users = await fetchAllUsers();
        return customResponse(res,200,users,'Users Get Method','Get')
    }catch(e){
        next(new Error(e));
    }
};

const create_new_user = async(req,res,next)=>{
    try {
        const {username,password,email} = req.body;
        const role = 'customer';
        console.log('User Image Name is ',req.userProfileImage);
        await userValidator.create_user_validation.validateAsync({
            username,
            password,
            email,
            image:req.userProfileImage,
            role,
        });
    const hashedPassword = await hashPassword(password);
    const user = await createNewUser({username,password:hashedPassword,image:req.userProfileImage,email});
     customResponse(res,200,user,'Users Create Method','Post');   
    } catch (error) {
        next(new Error(error));
    }
};

const get_user_by_id = async(req,res,next)=>{
    try{
    const {id} = req.params;
    await userValidator.parameters_validation.validateAsync({
        id
    });
    const user = await fetchUserById(id);
    return customResponse(res,200,user,'Get User By Id','Get'); 
    }catch(e){
        next(new Error(e));
    }
};
// only to be performed by admin
const change_user_role = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {role} = req.body;
        await userValidator.user_role_validation.validateAsync({
            id,role
        });
        const user = await changeUserRole(role,id);
       return customResponse(res,200,user,'Update User Role','Put');

    } catch (error) {
        next(new Error(error));
    }
};

const update_user_details = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {password} = req.body;

        console.log('User Image Name is ',req.userProfileImage);
        const user = await fetchUserById(id);
        if(!user) return next(new Error('User Doesnot Exist'));
        let image = req.userProfileImage;
        console.log('Image is Found',user?.dataValues?.image);
        
        if(image != undefined){
            let oldImage = user?.dataValues?.image;
        // delete previous image in public folder
        const path = `./public/${oldImage}`;
        if(fs.existsSync(path)){
            fs.unlink(path,(err)=>{
                if(err) {
                    console.log('Error While Deleting The File',err);
                    return;
             }
                console.log(oldImage,' Deleated');
    
            });
        }
        };
        const hashedPassword = await hashPassword(password);
        console.log(password,hashedPassword);
        const data = (image != undefined) ? {image,id,password:hashedPassword} : {id,password:hashedPassword};
        await userValidator.user_update_validation.validateAsync({
            id,password
        });
        await updateUserDetails(data);
        const updatedUser = await fetchUserById(id);
        return customResponse(res,200,updatedUser,'Update Details Updated','Put');

    } catch (error) {
        console.log('Error While Updating User Details');
        console.log(error.stack)
        next(new Error(error));
    }
};

const delete_user_account = async(req,res,next)=>{
    try {
        const {id} = req.params;
        await userValidator.parameters_validation.validateAsync({id});
        const isDeleated = await deleteUserAccount(id);
        return customResponse(res,200,isDeleated,'User Delete','Delete');

    } catch (error) {
        console.log('Error While Deleting User');
        next(new Error(error));
    }
};

const login_user = async(req,res,next)=>{
    try {
        const {username,password} = req.body;
        await userValidator.login_credentials_validator.validateAsync({
            username,
            password
        });
        const user = await loginUser(username);
        const isMatch = comparePasswords({enteredPassword:password,storedPassword:user?.dataValues?.password});
        if(isMatch){
            const token = jwt.sign({
                iss: username,
                sub: user.id,
              }, process.env.SECRET_HASH_KEY);
              return res.status(200).json(token);
        }
        return next(new Error('Login Failed!Invalid Username or Password'));
        
    } catch (error) {
        console.log('Error While Logging In');
        next(new Error(error));
    }
};

export {
    get_all_users,
    create_new_user,
    get_user_by_id,
    change_user_role,
    update_user_details,
    delete_user_account,
    login_user
}