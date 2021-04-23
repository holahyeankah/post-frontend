import axios from 'axios';
import toastr from 'toastr';
import { ADD_CURRENT_USER, ADD_CURRENT_USER_FAIL } from '../actionTypes/LoginTypes';
import jwt from 'jsonwebtoken';

export const setCurrentUser=(user)=>({
    type:ADD_CURRENT_USER,
    user
})

export const setCurrentUserFail=(error)=>({
    type: ADD_CURRENT_USER_FAIL,
    error
    
    });

    export const loginAction=(user)=>(dispatch)=>{
        return axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user)
        .then(res=>{
            
const {message}= res.data;
const {token}= res.data;
localStorage.setItem("user-token", token);
dispatch(setCurrentUser(jwt.decode(token)));
toastr.success(message);
return res
        })
       
        .catch(error=>{  
           dispatch(setCurrentUserFail(error.response))   
        
        })
    }

    export default loginAction;




