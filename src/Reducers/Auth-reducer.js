import { ADD_CURRENT_USER, ADD_CURRENT_USER_FAIL } from '../actionTypes/LoginTypes';
import {LOGOUT_USER} from '../actionTypes/LogoutTypes';

const initialState={
    isAuthenticated:false,
    user:{},
    error:{}
}

const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADD_CURRENT_USER:{
            return{
                ...state,
               user: action.user,
               isAuthenticated:true
            }
        }
        case ADD_CURRENT_USER_FAIL:{
            return{
                ...state,
                error:action.error
            }

        }
        case LOGOUT_USER:{
            return{
                ...state,
                ...initialState
                
            }
        }
        default:
            return state
    }

}

export default authReducer