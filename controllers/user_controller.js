
import express from "express";
import {
    get_all_users,
    create_new_user,
    get_user_by_id,
    change_user_role,
    update_user_details,
    delete_user_account,
    login_user
} from '../services/user_services.js';
import uploadMiddleware from "../utils/file_upload_middleware.js";
import '../middlewares/protected-middleware.js';
import { protectedMiddleware } from "../middlewares/protected-middleware.js";

const router = express.Router();


router.get('/get-all',get_all_users);
router.post('/new-user',uploadMiddleware.single('userImage'),create_new_user);
router.get('/user/:id',protectedMiddleware,get_user_by_id);
router.put('/update-role/:id',change_user_role);
router.put('/update/:id',uploadMiddleware.single('userImage'),update_user_details);
router.delete('/delete/:id',delete_user_account);
router.post('/login',login_user);




export default router;