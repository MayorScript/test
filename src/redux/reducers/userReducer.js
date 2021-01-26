import {
    GET_ALL_USER,
    DISABLE_USER,
    ENABLE_USER,
    DELETE_USER
} from '../action/constants'

const initialState = {
    users: [],
    user: {},
    isAuthenticated: false,
    loading: true
}

export default function (state= initialState, action){
    switch(action.type){
        case GET_ALL_USER :
            return{
                ...state,
                users: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case DISABLE_USER :
            return{
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
        case ENABLE_USER :
            return{
                ...state,
                users: state.user.filter(user => user.id !== action.payload)
            }
        case DELETE_USER :
            return{
                ...state,
                users: state.user.filter(user => user.id !== action.payload)
            }
            default : {
                return state
            }

    }
}