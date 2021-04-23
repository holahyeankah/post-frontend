import {ADD_POST, ADD_POST_FAIL } from '../actionTypes/PostTypes';
import axios from 'axios';

const token=localStorage.getItem("user-token")

export const setCurrentPost=(post)=>({
    type:ADD_POST,
    post

});
export const setPostFail=(error)=>({
    type:ADD_POST_FAIL,
    error
})

export const postAction=(post)=>(dispatch)=>{
    
    return axios.post(`${process.env.REACT_APP_API_URL}/post`, post,{
        headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${token}`}
    })
    .then(res=>{
       
        dispatch(setCurrentPost(post))
        return res
    }).catch(error=>{
        dispatch(setPostFail(error.response))
    })
}


