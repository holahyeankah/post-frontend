import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import axios from 'axios';

const token=localStorage.getItem("user-token")

class EditPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            title:"",
            story:"",
            successMsg:"",
            isSubmitted:false,
            error:null
           
        }
    }
    componentDidMount=()=>{
        const{title, story}=this.state;
        this.setState({isLoading:true})
        let id= this.props.match.params.id;
        axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`,{
         headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${token}`}
        }).then(res=>{
                this.setState({
                   title:res.data.post.title,
                   story:res.data.post.story,
                   isLoading:false
          
               })
           
               return res
          
        }) .catch(error=>{
            console.log(error)
            this.setState({error, isLoading:false})
        }) 
    }

    
      
  addPost=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }

onSubmit=(e)=>{
    e.preventDefault();
    let id= this.props.match.params.id;
    const{title,story}=this.state;
    fetch(`${process.env.REACT_APP_API_URL}/edit/${id}`,{
         method:"put",
    headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${token}`},
    body:JSON.stringify({
        title,
        story
    })       
    }).then(response=>response.json())
    .then(data=>{
        console.log(data)
        this.setState({isLoading:false, isSubmitted:true, successMsg:"Post updated successfully"})
        this.props.history.push('/post')
    }).catch(error=>{
        this.setState({error})
    })

}
  render(){
        const {successMsg,error, isSubmitted, isLoading,title,story}=this.state;
        if(isLoading){
            return <p className="loading-status"> Loading....</p>
        }
    
            return(
                <div>
           <form className="form-header" >
               {error ? <p>{error}</p> :( isSubmitted && <p>{successMsg}</p>)}
              
               Title <input type="title" name="title" className=" form-input" placeholder="Enter title" value={title} onChange={this.addPost}/>
               Story <textarea type="story" name="story" className=" form-input-box"placeholder="255 words max." value={story} onChange={this.addPost}/>
           <div >
               <Button onClick={this.onSubmit} className="form-input-text"  value="submit" >Update</Button>
               </div>
           </form>
                </div>
          
        )
    }
}

export default EditPage