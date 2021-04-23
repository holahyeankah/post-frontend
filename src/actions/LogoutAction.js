import {LOGOUT_USER } from '../actionTypes/LogoutTypes';


export const logoutCurrentUser=()=>({
    type: LOGOUT_USER
});


const logoutAction=()=>(dispatch)=>{
    localStorage.removeItem("user-token");
    dispatch(logoutCurrentUser({}))
}

export default logoutAction;