import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';
import meals from './meals';

export default combineReducers({ posts, auth, meals });