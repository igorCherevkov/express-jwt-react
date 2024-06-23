import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    JWTtoken: localStorage.getItem('JWTtoken') || null,
    user: null,
    error: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload.JWTtoken, user: action.payload.user };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };
        case 'LOGOUT':
            return {...state, token: null, user: null, error: null};
        default:
            return state;
    }
};

const store = configureStore({
  reducer: {
    auth: rootReducer
  }
});

export default store;