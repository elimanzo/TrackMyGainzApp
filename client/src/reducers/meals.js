import { FETCH_ALL_MEALS, CREATE_MEAL, EDIT_MEAL, DELETE_MEAL, START_LOADING, END_LOADING, FETCH_TOTAL_CALORIES_TODAY } from '../constants/actionTypes';

export default (state = { isLoading: true, meals: [], calories: [] }, action) => {
    switch(action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL_MEALS:
            return { ...state, meals: action.payload };
        case FETCH_TOTAL_CALORIES_TODAY:
            return { ...state, calories: action.payload[0] };
        case DELETE_MEAL:
            return { ...state, meals: state.meals.filter((meal) => meal._id !== action.payload) };
        case EDIT_MEAL:
            return { ...state, meals: state.meals.map((meal) => (meal._id === action.payload._id ? action.payload : meal)) };
        case CREATE_MEAL:
            return { ...state, meals: [...state.meals, action.payload] };
        default:
            return state;
    }
}