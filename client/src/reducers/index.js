import { combineReducers } from 'redux';

import posts from './posts.js';
import authReducer from './auth.js';
import blogs from './blogs.js';
import requests from './requests.js';
export default combineReducers({ posts, authReducer,blogs,requests });