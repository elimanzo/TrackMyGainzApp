import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Meal from './Meal/Meal';
import useStyles from './styles';

const Meals = ({ setCurrentId }) => {
  const { meals, isLoading } = useSelector((state) => state.meals);
  const classes = useStyles();
  if (!meals.length && !isLoading) return 'No Meals Recorded';

  return (
    !meals.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
          {meals.map((meal) => (
              <Grid key={meal._id} item xs={12} sm={12} md={6} lg={3}>
                  <Meal meal={meal} setCurrentId={setCurrentId} />
              </Grid>
          ))}
      </Grid>
    )
  );
}

export default Meals;