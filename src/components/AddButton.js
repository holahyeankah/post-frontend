import React, {Component } from  'react';
import {Link} from 'react-router-dom';


class AddButton extends Component{
    render(){
        return(
        <div>
            <Link to="/create"
             style={{ marginRight:'150px', textDecoration:'none', color:'black', fontSize:'20px'}}> Add option
            </Link>

        </div>)
    }
}

export default AddButton