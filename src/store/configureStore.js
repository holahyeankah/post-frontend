import { setCurrentUser } from '../actions/LoginAction';
import logoutAction from '../actions/LogoutAction';
import jwt from 'jsonwebtoken';

const setCurrentUserToStore=(store)=>{
    const token=localStorage.getItem("user-token")

    if(token){
        const decodeToken=jwt.decode(token)
        try{
            const isExpired=decodeToken.exp <(Date.now()/1000)
            if(!isExpired){
                store.dispatch(setCurrentUser(decodeToken))
            }else{
                store.dispatch(logoutAction())
            }
        }
        catch(error){
            store.dispatch(logoutAction())

        }
    }

}
export default setCurrentUserToStore;