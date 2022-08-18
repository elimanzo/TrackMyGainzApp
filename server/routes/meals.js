import express from 'express';

import { getMeals, createMeal, editMeal, deleteMeal, getTotalCaloriesToday } from '../controllers/meals.js';


const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/:id', auth, getMeals);
router.get('/totalCalories/:id', auth, getTotalCaloriesToday);

router.post('/', auth, createMeal);
router.patch('/:id', auth, editMeal);
router.delete('/:id', auth, deleteMeal);

export default router;