import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import { Router, Switch, Route} from 'react-router-dom';
import Post from '../components/Post';
import {createBrowserHistory} from 'history'
import EditPage from '../components/EditPage';
import Register from '../components/Register';
import Login from '../components/Login';
import PostList from '../components/PostLists';


export const history=createBrowserHistory();


class Approutes extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }
 render(){
  return (
    <Router history={history} forceRefresh={true}>
      <div>
     <Navbar/>
     <Switch>
<Route exact path="/create" component={Post}/>
<Route exact path={["/","/post"]} component={PostList}/>
<Route exact path="/edit/:id" component={EditPage}/>
<Route exact path="/register" component={Register}/>
<Route exact path="/login" component={Login}/>

     </Switch>
       
    
    </div>

    </Router>
    
  );

 }
  
}

export default Approutes;
