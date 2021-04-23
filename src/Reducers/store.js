import {combineReducers} from 'redux';
import authReducer from './Auth-reducer';
import {LOGOUT_USER} from  '../actionTypes/LogoutTypes';
import {postReducer} from './Post-reducer'



const appReducer=combineReducers({
    auth:authReducer,
    post:postReducer
  
});
const rootReducer=(state, action)=>{
    if(action.type=== LOGOUT_USER){

        state.auth.user=null
    }
    return appReducer(state, action);
}

export default rootReducer;








 