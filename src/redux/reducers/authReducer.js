import  history from '../../utils/history'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGOUT_USER
} from '../action/constants';

const initialState = {
    token: localStorage.getItem(("MS_loggedIn") === true),
    loading: true,
    isAuthenticated: false,
    user: null
}

export default function (state = initialState, action){
    const {type, payload} = action;
   
    switch(type){
        case LOAD_USER:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
            history.replace('/');
            localStorage.setItem('MS_loggedIn',"TRUE")
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case LOGIN_FAIL:
        case LOGOUT_USER:
        case AUTH_ERROR:
            localStorage.removeItem('MS_loggedIn')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true 
            }
        default:
            return state;
    }
}   
