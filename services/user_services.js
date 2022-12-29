import {
    fetchAllUsers,
    fetchUserById,
    changeUserRole,
    updateUserDetails,
    deleteUserAccount,
    createNewUser,

} from '../repository/user-repository.js';
import userValidator from '../validators/user_validators.js';
import customResponse from '../utils/custom_response.js';


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
        console.log(req.body);
        console.log('User Image Name is ',req.userProfileImage)
        await userValidator.create_user_validation.validateAsync({
            username,
            password,
            email,
            image:req.userProfileImage,
            role,
        });
    const user = await createNewUser({username,password,image:req.userProfileImage,email});
    customResponse(res,200,user,'Users Create Method','Post');   
    } catch (error) {
        next(new Error(error));
    }
}

export {
    get_all_users,
    create_new_user,
}