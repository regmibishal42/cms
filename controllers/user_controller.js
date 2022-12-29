
import express from "express";
import {
    get_all_users,
    create_new_user
} from '../services/user_services.js';
import uploadMiddleware from "../utils/file_upload_middleware.js";
const router = express.Router();


router.get('/get-all',get_all_users);
router.post('/new-user',uploadMiddleware.single('userImage'),create_new_user);




export default router;