import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{

    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : '',
            Author : '',
            Title :'',
            errorFlag: false,
            errorMsg: '',
            authorFlag:false,
            titleFlag:false
        }
        //Bind the handlers to this class
        this.submitCreate= this.submitCreate.bind(this);
        this.bookIDChangeHandler = this.bookIDChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
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

    titleChangeHandler = (e) => {

        let regex = RegExp("^[a-zA-Z0-9][a-zA-Z0-9 ]*$");
        if (regex.test(e.target.value)){
        this.setState({
            Title : e.target.value,
            titleFlag : false
        })
        }else{
            this.setState({titleFlag : true});
               console.log(this.state)
        }
    }

    authorChangeHandler = (e) => {
        let regex = RegExp("^[a-zA-Z][a-zA-Z ]*$");
        if (regex.test(e.target.value)){
        this.setState({
            Author : e.target.value,
            authorFlag : false
        })
        }else{
            this.setState({authorFlag : true});
               console.log(this.state)
        }
        
    }
     
    submitCreate = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID,
            Author : this.state.Author,
            Title : this.state.Title
        }
        
        if(data.Author ==="" || data.BookID ==="" || data.Title ==="")  {                
            this.setState({errorFlag : true,
                errorMsg : "All fields are required and should be non empty"});
        }
        else{
    
         //set the with credentials to true
         axios.defaults.withCredentials = true;
         //make a post request with the user data
         axios.post('http://localhost:3001/create',data)
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
                this.setState({errorFlag : true})
                this.setState({errorMsg : JSON.stringify(error.response.data)});
                console.log(this.state)
            });
        }
    }

  
    render(){

        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            console.log(' log in to access "create" ')
            redirectVar = <Redirect to= "/login"/>
        }
        else{
            if(this.state.authFlag)
            redirectVar = <Redirect to= "/home"/>
        }
        let errorMsg=null;
        if(this.state.errorFlag=== true){
            (console.log("inside render"))
        errorMsg= this.state.errorMsg
        }
        let titleValidationMsg=null;
        if(this.state.titleFlag=== true){
            titleValidationMsg= "each word of title should contain only alphanumeric characters"
        }
        let authorValidationMsg=null;
        if(this.state.authorFlag=== true){
            authorValidationMsg= "each word in the name should contain only letters"
        }
        



        return(
            
            <div> {redirectVar}
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.bookIDChangeHandler}  type="text" class="form-control" name="BookID" required placeholder="Book ID"/>
                            <br/>
                            <p style={{color:"red"}}>{errorMsg}</p>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  onChange = {this.titleChangeHandler}  type="text" class="form-control" required name="Title" placeholder="Book Title"/>
                                <br/>
                                <p style={{color:"red"}}>{titleValidationMsg}</p>
                        </div>
                        <br/>
                        
                        <div style={{width: '30%'}} class="form-group">
                                <input   onChange = {this.authorChangeHandler}  type="text" class="form-control" name="Author" required placeholder="Book Author"/>
                                <br/>
                                <p style={{color:"red"}}>{authorValidationMsg}</p>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate} class="btn btn-success" type="submit">Create</button>
                            
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;