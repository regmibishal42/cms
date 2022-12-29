// const multer = require("multer");
// const { v4: uuidv4 } = require('uuid');
import multer from "multer";
import{ v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination:'./public',
    filename:(req,file,cb)=>{
        const fileName = uuidv4();
        req.userProfileImage = `${fileName}.jpg`
        cb(null,req.userProfileImage);
    }
});

const uploadMiddleware = multer({
    storage:storage,
    limits:{fileSize:2*1024*1024} ,//2mb
    fileFilter:(req,file,cb)=>{
        const fileType = file.mimetype;
        const acceptedFile = ['image/jpg','image/jpeg','image/png'];
        if(!acceptedFile.includes(fileType)){
            console.log('File accepted')
            cb(new Error("Only Jpeg or png Images are Allowed"),false);
        }
        // if file type is accepted 
        cb(null,true);
    }
});

export default uploadMiddleware;