import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    foodName: String,
    creator: String,
    calories: Number,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;