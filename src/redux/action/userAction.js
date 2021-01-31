import {
    GET_ALL_USER,
    DISABLE_USER,
    ENABLE_USER,
    DELETE_USER
} from './constants'
import axios from '../../utils/axios';
 
const config = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem(("MS_loggedIn") == "TRUE")}`
    }
}

export const getUsers = () => async dispatch =>{
    try{
        const res = await axios.get("/admin/users", config);
    dispatch({
        type: GET_ALL_USER,
        payload: res.data
    })
    }catch(error){
        alert(error);
    }
    
    
}
