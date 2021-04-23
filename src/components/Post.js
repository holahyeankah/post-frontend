import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postAction} from '../actions/PostAction';
import {validateFields} from '../Validator';
import './Post.css';
import {Button} from 'antd'

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            story:"",
            errorMsg:"",
            isSubmitted:false,
            successMsg:""

        }
    }
 addPost=(e)=>{
     const{name, value}=e.target
     this.setState({[name]:value})
 }

 componentDidUpdate(prevProps){
     const{error}=this.props;
     if(prevProps.error !==error){
         this.setState({errorMsg:error})
        
     }
 }

 formReset=()=>{
     this.setState({
        title:"",
        story:""
       
     })
   
 }

 onSubmit=(e)=>{
     e.preventDefault();
     const{post}=this.props;
     const{title, story}=this.state;
     const fieldToValidate=[{title}, {story}]
     const fields=validateFields(fieldToValidate)
     if(!fields){
        return this.setState({errorMsg:{ data:"Please enter all field"}})
     }

else{
    this.setState({errorMsg:{data:""}})
      post({title, story})
      .then(response=>{
          if(response){
              this.setState({isSubmitted:true, successMsg:"Post successfully submitted"})
              this.formReset()
              this.props.history.push('/post')
          }
      })

}

 }
 render(){
     const{isSubmitted, successMsg, title, story, errorMsg}=this.state;
     return(
     <div>
<form className="form-header" >
    {errorMsg && errorMsg.data ? <p className="form-error">{errorMsg.data}</p> : (isSubmitted && <p className="form-message">{successMsg}</p>)}
    Title <input type="title" name="title" className=" form-input" placeholder="Enter title" value={title} onChange={this.addPost}/>
    Story <textarea type="story" name="story" className=" form-input-box"placeholder="255 words max." value={story} onChange={this.addPost}/>
<div >
    <Button onClick={this.onSubmit} className="form-input-text"  value="submit" >Submit</Button>
    </div>
</form>
     </div>
     )
 }



}
const mapStateToProps=(state)=>({
    post:state.post.post,
    error:state.post.error

    
})

const mapDispatchToProps=(dispatch)=>{
    return{
        post:(post)=>dispatch(postAction(post))
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)