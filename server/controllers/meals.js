import express from 'express';
import mongoose from 'mongoose';
import moment from 'moment';
import Meal from '../models/meals.js';

const router = express.Router();

export const getMeals = async (req, res) => {
    const { id } = req.params;
    try {
        const meals = await Meal.find({creator: id});

        res.status(200).json(meals);
    } catch (error) {
      res.status(404).json({ message: error.message }); 
    }
}

export const getMeal = async (req, res) => {
    const { id } = req.params;
    try {
        const meals = await Meal.findById(id);
        res.status(200).json(meals);
    } catch (error) {
      res.status(404).json({ message: error.message }); 
    }
}

export const getTotalCaloriesToday = async (req, res) => {
    const { id } = req.params;
    const today = moment().startOf('day');
    try {
        const totalCaloriesToday = await Meal.aggregate([{
            $match : { $and : [ {creator: id}, {createdAt: { $gte: today.toDate(), $lte: moment(today).endOf('day').toDate()} }] },
        },{
            $group : {
                _id : null,
                total : {
                    $sum : "$calories"
                }
            }
        }]);
        
        if (!totalCaloriesToday) totalCaloriesToday = [ { _id: null, total: 0} ];
        
        res.status(200).json(totalCaloriesToday);
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const createMeal = async (req, res) => {
    const meal =  req.body;

    const newMeal = new Meal({ ...meal, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newMeal.save();

        res.status(201).json(newMeal);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editMeal = async (req, res) => {
    const { id } = req.params;
    const { foodName, creator, calories, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No meal with id: ${id}`);

    const edittedMeal = { foodName, creator, calories, selectedFile, _id: id };

    await Meal.findByIdAndUpdate(id, edittedMeal, { new: true });
    res.json(edittedMeal);
}

export const deleteMeal= async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No meal with id: ${id}`);

    await Meal.findByIdAndRemove(id);

    res.json({ message: 'Meal deleted successfully'});
}

export default router;