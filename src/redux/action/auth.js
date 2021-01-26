import axios from '../../utils/axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGOUT_USER
} from './constants'


//Admin Login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: { 
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/user/login',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        alert(error?.response?.data?.error.message ?? error.message)
        dispatch({
            type: LOGIN_FAIL
        })
        
    }
}   


export const userLogout = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    })
    
}