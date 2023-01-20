import express from "express";
import { add_new_food,
    get_all_foods,
    update_food_availablity,
    update_food_details
} from "../services/food-service.js";
const router = express.Router();

router.post('/new',add_new_food);
router.get('/all',get_all_foods);
router.put('/update-food/:id',update_food_details)
router.put('/update/:id',update_food_availablity);

export default router;