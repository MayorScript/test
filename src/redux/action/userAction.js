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
        'apikey': 'fsdjkahdgjknsdfhvbjknsdjfbglksvajkbhdkgncvb',
        "Authorization": `Bearer ${localStorage.getItem("MS_loggedIn")}`
    }
}
export default getUsers = () => async dispatch =>{
    const res = await axios.get("/admin/users", config);
    dispatch({
        type: GET_ALL_USER,
        payload: res.data
    })
}