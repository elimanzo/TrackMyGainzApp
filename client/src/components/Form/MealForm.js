import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createMeal, editMeal } from '../../actions/meals';

const initialState = {foodName: '', calories: 0, selectedFile: ''};

const MealForm = ({ currentId, setCurrentId }) => {
  const [mealData, setMealData] = useState (initialState);
  const meal = useSelector((state) => (currentId ? state.meals.meals.find((message) => message._id === currentId) : null));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (!meal?.foodName) clear();
    if(meal) setMealData(meal);
  }, [meal]);

  const clear = () => {
    setCurrentId(0);
    setMealData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId === 0) {
      await dispatch(createMeal({ ...mealData, name: user?.result?.name}));
    } else {
      await dispatch(editMeal(currentId, { ...mealData, name: user?.result?.name }));
    }
    clear();
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to track your gainz
        </Typography>
      </Paper>
    );
  };

  return (
    <Paper className ={classes.paper} elevation={6}>
      <form autoComplete ="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant = "h6">{currentId ? `Editing "${meal.foodName}"` : 'Creating A '} Meal</Typography>
        <TextField 
          name="foodName" 
          variant="outlined" 
          label="Food Name" 
          fullWidth 
          value={mealData.foodName} 
          onChange={(e) => setMealData({ ...mealData, foodName: e.target.value })}
        />
        <TextField 
          name="calories" 
          variant="outlined" 
          label="Calories" 
          fullWidth 
          minRows={1} 
          value={mealData.calories} 
          onChange={(e) => setMealData({ ...mealData, calories: e.target.value })}
          />
        <div className={classes.fileInput}>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => setMealData({...mealData, selectedFile: base64})}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default MealForm;