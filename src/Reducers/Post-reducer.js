import {ADD_POST, ADD_POST_FAIL} from '../actionTypes/PostTypes';

const initialState={
    post:[],
    error:{},
    
}
export const postReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADD_POST:{
            return{
                ...state,
                post:action.post
            }

        }
        case ADD_POST_FAIL:{
            return{
                ...state,
                error:action.error
            }
        }
        
        default :
        return state
    }

}
