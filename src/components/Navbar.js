import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import logoutAction from '../actions/LogoutAction';
import './Navbar.css'

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    logoutUser=(e)=>{
   const {logout, history}=this.props;
        e.preventDefault();
        logout()   
    }

render(){
    const {auth}=this.props;
    
    return(
        <div className="nav-container">
            
           {!auth ?(
           <div className="nav-style">
               <Link className="nav-button" to="/post">Home</Link>
               
               <Link className="nav-button-register" to="/register">Register </Link>
               
               <Link className="nav-button-login" to="/login">Login </Link>
             
               </div>
               
            
           
           )
:(
<div className="nav-icon">
     <Link  className="nav-button" to="/dashboard">Home</Link>
     <Link className="nav-button" to="/login"  onClick={this.logoutUser}>Logout</Link>
</div>

)}

     

         
           </div>
    )
}
}


const mapStateToProps=(state)=>({
    
auth:state.auth.isAuthenticated
    
  
});

const mapDispatchToProps=(dispatch)=>({
    
logout:()=>dispatch(logoutAction())

  
})


export default connect(mapStateToProps, mapDispatchToProps)( Navbar);