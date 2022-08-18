import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deleteMeal } from '../../../actions/meals';

const Meal = ({ meal, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const handleEdit = (e) => {
    setCurrentId(meal._id)
    e.stopPropagation();
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className = {classes.media} image={meal.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title ={meal.foodName}/>
      <div className={classes.overlay}>
        <Typography variant="h6">{meal.foodName}</Typography>
        <Typography variant="body2">{moment(meal.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.sub === meal?.creator || user?.result?._id === meal?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={handleEdit}>
          <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <Typography className={classes.title} variant="h5" gutterBottom component="h2">{meal.foodName}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">Calories: {meal.calories}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.sub === meal?.creator || user?.result?._id === meal?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteMeal(meal._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}

      </CardActions>
    </Card> 
  );
}

export default Meal;