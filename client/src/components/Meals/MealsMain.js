import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getMeals, getTotalCalories } from '../../actions/meals';
import Meals from './Meals';
import MealForm from '../Form/MealForm';
import useStyles from './styles';

const MealsMain = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;
  const { calories } = useSelector((state) => state.meals);
  useEffect(() => {
    dispatch(getMeals(userId));
    dispatch(getTotalCalories(userId));
  }, [currentId, userId, dispatch]);

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className = {classes.gridContainer}>
        <Grid item xs={12} sm={6} md={9}>
          <Typography variant='h5'>You ate { !calories ? '0' : Object.values(calories)[1] } Calories today.</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Meals setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MealForm currentId={currentId} setCurrentId={setCurrentId}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MealsMain;
