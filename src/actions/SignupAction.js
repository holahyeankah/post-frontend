import dotenv from 'dotenv'
import axios from 'axios';
import { SET_CURRENT_USER, SIGN_UP_ERROR} from '../actionTypes/SignUpTypes';
import jwt from 'jsonwebtoken';
require('dotenv').config();


export const setCurrentUser=(user)=>({
type: SET_CURRENT_USER,
user

});

export const signUpError=(error)=>({
    type: SIGN_UP_ERROR,
    error
    
    });

   export const signUpAction=(userData)=>(dispatch)=>{

        return axios.post(`${process.env.REACT_APP_API_URL}/user/register`, userData)
        .then(res=>{
const {token}= res.data;
localStorage.setItem(`${process.env.SECRET_KEY}`, token);
dispatch(setCurrentUser(jwt.decode(token)));

return res

        }).catch(error=>{
         dispatch(signUpError(error.response))
            
        })
    }

    export default signUpAction;

