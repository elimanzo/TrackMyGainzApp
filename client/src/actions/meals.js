import { FETCH_ALL_MEALS, START_LOADING, END_LOADING, CREATE_MEAL, EDIT_MEAL, DELETE_MEAL, FETCH_TOTAL_CALORIES_TODAY } from '../constants/actionTypes';
import * as api from '../api';


// Action Creators
export const getMeals = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchMeals(id);
        dispatch({ type: FETCH_ALL_MEALS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getTotalCalories = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchTotalCalories(id);
        dispatch({ type: FETCH_TOTAL_CALORIES_TODAY, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createMeal = (meal) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createMeal(meal);
        dispatch({ type: CREATE_MEAL, payload: data });
    } catch (error) {
        console.log(error);
    }

};

export const editMeal = (id, meal) => async (dispatch) => {
    try {
        const { data } = await api.editMeal(id, meal);
        dispatch({ type: EDIT_MEAL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMeal = (id) => async (dispatch) => {
    try {
        await api.deleteMeal(id);
        dispatch({ type: DELETE_MEAL, payload: id });
    } catch (error) {
        console.log(error);
    }
};