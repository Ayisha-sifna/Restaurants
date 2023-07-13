// reducers.js

import { combineReducers } from 'redux';
import authReducer from './authreducer'; // Import your authReducer or other reducers here

const rootReducer = combineReducers({
    auth: authReducer, // Add your reducers here
    // Add more reducers as needed
});

export default rootReducer;
