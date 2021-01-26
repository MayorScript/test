import {combineReducers} from 'redux';
import authReducer from './authReducer';
import matrixReducer from './matrixReducer';
import questReducer from './questReducer';
import userReducer from './userReducer';
import analyticReducer from './analyticReducer';


export default combineReducers({

    auth: authReducer,

    users: userReducer

    
});