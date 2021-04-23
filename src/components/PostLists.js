import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Pagination} from 'antd';
import AddButton from './AddButton';
import './PostList.css';
require('dotenv').config();



class PostList extends Component{
    token=localStorage.getItem("user-token")
    constructor(props){
        super(props);
        this.state={
            page:1,
            limit:5,
            posts:[],
            pagination:{},
            totalItems:0,
            isLoading:false,
            error:""
           
        }
    } 

    
    
    componentDidMount=()=>{
        this.setState({isLoading:true})
        this.fetchPost()
         
    };

    fetchPost=(title =null)=>{
        const{page,limit}=this.state;
        let url;
        if(title !==null && title !== ""){
            url= `${process.env.REACT_APP_API_URL}/post/all?page=${page}&limit=${limit}&title=${title}`
        } else{
            url= `${process.env.REACT_APP_API_URL}/post/all?page=${page}&limit=${limit}`

        }
    
        fetch(url,{
            method:"GET",
            headers:{"Content-Type":"application/json", "Authorization": `Bearer ${this.token}`}
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
             this.setState({posts:data.posts, pagination:data.pagination, totalItems:data.pagination.totalItems, isLoading:false})
            }
        }).catch(error=>{
            this.setState({error, isLoading:false})

        })

    }
    
    onSearch=(e)=>{
        this.setState({page:1})
        this.fetchPost(e.target.value)
    }
    onPageChange=(page)=>{
        this.setState({page},()=>this.fetchPost())
    }
    deletePost=(id)=>{
        
        fetch(`${process.env.REACT_APP_API_URL}/delete/${id}`,{
         method:"delete",
         headers:{"Content-Type":"application/json", "Authorization": `Bearer ${this.token}`}

        }).then(res=>res.json())
        .then(()=>{
            let filterPost=[...this.state.posts].filter(i=>i.post_id !==id)
            this.setState({posts:filterPost})
        })


    }

    render(){
        const {posts, isLoading }=this.state;
       const { user, auth }=this.props;
      
        if(isLoading){
            return <p className="loading-status">Loading...</p>
        }    
        return(
            <div className="post-header">
            <div className="search-button">
                {auth ? <AddButton/> : null} 
                <input className="holder-button" type="search" placeholder="search title" onChange={(e)=>this.onSearch(e)}/>
                <input type="button" value="search"/>
                </div>
               {auth ? <span className="user-name"> Your username is......{user.payrol.name}</span> : null}
                <div>
                {posts && posts.length > 0 ? posts.map((post, index)=>{
                 return <ul className="list-options" key={post.post_id}> 
                          <p className="user-list">{post.user}</p> 
                       <p className="title-list"> <span className="title-margin">Title:  </span>{post.title}</p> 
                        <p className="story-list"><span className="title-margin">Story:  </span>  {post.story}</p>
                        <div className="button-option">
                       { user && user.payrol && user.payrol.id === post.user_id ? <span ><Link  className="link-button" to={`/edit/${post.post_id}`}>Edit</Link></span> : null}
                       {user && user.payrol && user.payrol.id === post.user_id ?<span><Link className="link-button" onClick={()=>this.deletePost(post.post_id)}>Delete</Link></span> : null}
                        </div>
                    </ul>
                }) : null}
                </div>

                <div className="pagination-style">                
          <Pagination  className="pagination" 
          current={this.state.page} 
          pageSize={this.state.limit}    
          onChange={this.onPageChange}
          total={this.state.totalItems}
          />
          </div>
          </div>
            
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth.isAuthenticated,
        user:state.auth.user
    }
}
export default connect (mapStateToProps, null) (PostList);