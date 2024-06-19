import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {  
            active: 'nav-home'
        }

    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        this.setState({active: 'nav-home'})
    
        //checkLogin =( )
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to="/login"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Book Store App</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/home">Home</Link></li>
                        <li><Link to="/create">Add a Book</Link></li>
                        <li><Link to="/delete">Delete a Book</Link></li>
                    </ul>
                    
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;


/* <ul class="nav navbar-nav">
                        <li id = 'nav-home' class={(this.state.active === id )?'active':''}><Link to="/home" onClick={this.setState({active:id})}>Home</Link></li>
                        <li id ='nav-create' class={(this.state.active === id )?'active':''} ><Link to="/create" onClick={this.setState({active:id})}>Add a Book</Link></li>
                        <li id = 'nav-del' class={(this.state.active === id )?'active':''} ><Link to="/delete" onClick={this.setState({active:id})}>Delete a Book</Link></li>
                    </ul>*/