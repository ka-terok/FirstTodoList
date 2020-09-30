import Context from '../context'
import React from 'react'
import {
    Link
  } from "react-router-dom";

const login = {
    email:'',
    password: ''    
}

class Register extends React.Component {
    constructor(){
        super();
        this.state={
            warning: 'closeWarning'
        };
    }    
    saveEmail() {
        const {openLoginForm}=this.context;   
        const {closeRegistrForm}=this.context; 
        if ((login.email !== '' || null)& (login.password !== '' || null)) {
            localStorage.setItem('email', login.email)
            localStorage.setItem('password', login.password)
            closeRegistrForm()
            openLoginForm()
            } else {
                this.setState({
                    warning: 'openWarning'
                })
            }
        }

render() {
    return (
        <div className="modalLogin">
            <div className='modalBodyLogin'> 
                <div  className="lines"> 
                    <div style={{fontSize: '16px', fontWeight: '700'}}>
                        Let's get you set up
                    </div>
                </div>
                <div className="loginText">Email Address </div>
                <div  className="lines"> 
                <input className="inputModal" style={{borderRadius: '5px', border: '1px solid #e0e3ed'}} type='email' onChange={e => login.email = e.target.value}/>
                </div>
                <div className="loginText" >Password </div>
                <div  className="lines"> 
                <input className="inputModal" style={{borderRadius: '5px', border: '1px solid #e0e3ed'}} type='password' onChange={e => login.password = e.target.value}/>
                </div>
                <div className="lines"  style={{borderRadius: '5px', marginTop: '5px'}}>
                    <div className="loginButton" onClick={()=>this.saveEmail()}>
                        <Link to='/'> Get started </Link>
                        </div> 
                </div>
                <div className={this.state.warning}>
                     You didn't fill out your email and password
                </div>
            </div>
        </div>
    )
  }
}

export default Register 
    
Register.contextType = Context;