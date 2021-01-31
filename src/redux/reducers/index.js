import {combineReducers} from 'redux';
import auth from './authReducer';
import matrixReducer from './matrixReducer';
import questReducer from './questReducer';
import userReducer from './userReducer';
import analyticReducer from './analyticReducer';


export default combineReducers({

    auth,
    users: userReducer

    
});