import express from "express";
import { add_new_category } from "../services/category-service.js";

const router = express.Router();

router.post('/new',add_new_category);

export default router;