import { createStore } from 'redux';

// Define action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

// Define initial state
const initialState = {
    isAuthenticated: false,
    token: null,
    errorMessage: '',
};

// Define action creators
export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (errorMessage) => ({
    type: LOGIN_FAILURE,
    payload: errorMessage,
});

export const logout = () => ({
    type: LOGOUT,
});

// Define reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                errorMessage: '',
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                errorMessage: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                errorMessage: '',
            };
        default:
            return state;
    }
};

// Create Redux store
const store = createStore(authReducer);

export default store;
