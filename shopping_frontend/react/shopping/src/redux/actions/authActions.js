import axios from 'axios';

import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
} from './types'; 


export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/login/', userData);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
        });
        console.error("Login error:", error.response.data);
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/auth/register/', userData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data, 
        });
        console.error("Registration error:", error.response.data); 
    }
};



