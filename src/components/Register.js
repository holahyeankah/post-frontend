import React, {Component} from 'react';
import {validateFields} from '../Validator';
import {connect} from 'react-redux';
import {signUpAction} from '../actions/SignupAction';
import {Button} from 'antd';
import './Register.css';

class Register extends Component{
  constructor(props){
    super(props);
    this.state={
       first_name:'',
       last_name:'',
        email:'',
        password:'',
        cpassword:"",
        isSubmitted:false,
        successMsg:"",
        errorMsg:""
      
    }
  }
   registerUser=(e)=>{
   e.preventDefault();
   const{first_name, last_name, email, password, cpassword} =this.state;
   const{signUp}=this.props;
   const allFields=[{first_name, last_name, email, password, cpassword}];

  const allFieldEnter=validateFields(allFields)


  if(!allFieldEnter){
     return this.setState({errorMsg:"Please enter all fields"})
  }
  else {
      if(password !==cpassword){
      this.setState({errorMsg:"Password and confirm password does not match"})
  }else{
      this.setState({isSubmitted:true})
      signUp({first_name, last_name, email, password})
      .then(response=>{
          if(response){
             
              this.setState({successMsg:"User successfully registered",errorMsg:''})
              this.props.history.push('/login')
          }
      })
  }

  }
  }

  handleChange=(e)=>{
      const{name, value}=e.target;
      this.setState({[name]:value})
  }

 render(){
     const{first_name, last_name, email, password, cpassword, errorMsg, isSubmitted, successMsg}=this.state
  return (
    <div>
        <form className="form-header" >
            <h1 style={{color:"white"}}>Register user</h1>
            {errorMsg && errorMsg ? <p className="form-error">{errorMsg} </p> :isSubmitted && <p className="form-msg">{successMsg}</p>}
            
            
           First name <input  className=" form-input" type="first_name" name="first_name" autoFocus value={first_name}  onChange={this.handleChange}/>
          
           Last name <input type="last_name"   className=" form-input" name="last_name" value={last_name}  onChange={this.handleChange}/>
            
          Email <input type="email" name="email" value={email} className=" form-input" placeholder="enter valid email"  onChange={this.handleChange}/>
           Password <input type="password" name="password"  className=" form-input" value={password} placeholder=" atleast 6 characters long"  onChange={this.handleChange}/>
  Confirm password <input type="password" name="cpassword" value={cpassword} className=" form-input"  onChange={this.handleChange}/>
        
            <Button className="button-submit" onClick={this.registerUser} value="submit" >Create account</Button>
           
        </form>
    
    </div>
  );

 }
  
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth.user, 
        error:state.auth.error 
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(user)=>dispatch(signUpAction(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Register);
