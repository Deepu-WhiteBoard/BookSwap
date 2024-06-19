import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
class Delete extends Component{
    
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : '',
            errorFlag: false,
            errorMsg: '',

        }
        //Bind the handlers to this class
        this.bookIDChangeHandler= this.bookIDChangeHandler.bind(this);
        this.submitDelete= this.submitDelete.bind(this);
    }

    submitDelete = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            }).catch(error => {
                console.log("error set in state",error.response.data)
                this.setState({errorFlag : true,
                                errorMsg : JSON.stringify(error.response.data)});
                console.log(this.state)
            });
    }
    bookIDChangeHandler = (e) => {
        let regex = RegExp("^[0-9]{1,9}$");
        if (regex.test(e.target.value)){
        this.setState({
            BookID : e.target.value,
            errorFlag : false
        })
        }else{
            this.setState({errorFlag : true,
                           errorMsg : "Id must contain only numbers"});
               console.log(this.state)
        }
    }
    render(){

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie') || (this.state.authFlag)){
            redirectVar = <Redirect to= "/login"/>
        }
        let errorMsg=null;
        if(this.state.errorFlag=== true){
            (console.log("inside render"))
            errorMsg= this.state.errorMsg
        }
        return(
            <div class="container">{redirectVar}
                <form onSubmit>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" onChange = {this.bookIDChangeHandler} required placeholder="Search a Book by Book ID"/><br/>
                    <p style={{color:"red"}}>{errorMsg}</p>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit" onClick = {this.submitDelete}>Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;