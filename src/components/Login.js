import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginAction} from '../actions/LoginAction';
import {validateFields} from '../Validator';
import {Button} from 'antd';
import history from '../routes/Approutes';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            isSubmitted:false,
            successMsg:"",
            errorMsg:"",
            user:null
        }
    }

    handleChange=(e)=>{
        e.preventDefault();
        const{name, value}=e.target
        this.setState({[name]:value})
        
    }
      componentDidUpdate(prevProps, prevState){
      const{error,user}=this.props;    
      if(prevProps.error !== error){
          this.setState({errorMsg:error})
      }
  }

    loginUser=(e)=>{
        e.preventDefault();
        const{login}=this.props;
        
        const{email, password}=this.state;
        const fields=[{email}, {password}];
        const allFields=validateFields(fields)
        if(!allFields){
          return  this.setState({errorMsg:{
              data:"Please enter all fields"
          } })
        }
        this.setState({errorMsg:""})
        login({email, password})
        .then(response=>{
            if(response){
                this.setState({isSubmitted:true, successMsg:"Login successfully"})
                this.props.history.push('/post')
            }
        })

    }

    render(){
        const{email, password, errorMsg, isSubmitted, successMsg}=this.state;
        
        return(
            <div>
                <form className="form-header" >
            <h1 style={{color:"white"}}>Login user</h1> 
            {errorMsg && errorMsg.data? <p className="form-error">{errorMsg.data}</p> :(isSubmitted && <p>{successMsg}</p>)} 
            Email <input  className="form-input" type="email" name="email" value={email}className=" form-input" placeholder="Enter your email"  onChange={this.handleChange}/>
           Password <input classame="form-input" type="password" name="password"  className=" form-input" value={password} placeholder="Enter password"  onChange={this.handleChange}/>
            <Button  onClick={this.loginUser} className="button-submit" type="submit" value="submit" >Login </Button>
        </form>

            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    auth:state.auth.user,
    error:state.auth.error

})

const mapDispatchToProps=(dispatch)=>({
    login:(user)=>dispatch(loginAction(user))
    
})
export default connect (mapStateToProps, mapDispatchToProps) (Login)