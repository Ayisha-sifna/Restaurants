// authReducer.js

const initialState = {
    token: null,
    isAuthenticated: false,
    errorMessage: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                errorMessage: '',
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                errorMessage: action.payload.errorMessage,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                errorMessage: '',
            };
        default:
            return state;
    }
};

export default authReducer;
