import React, { useContext } from 'react'
import Context from '../context'


const newLogin = {
    email: 'нет значения',
    password: 'нет значения'
}


class login extends React.Component {
    constructor(){
        super();
        this.state={
            warning: 'closeWarning'
        };
    }   
    
    checkLogin (){
        const {closeLoginForm}=this.context 
        if (newLogin.email === localStorage.getItem('email') & newLogin.password === localStorage.getItem('password')){
            closeLoginForm()
        } else {
            console.log(newLogin.email)
            this.setState({
                warning: 'openWarning'
            })
        }
    }

render() {
    const {openRegistrForm}=this.context
    return (
        <div className="modalLogin">
            <div className='modalBodyLogin'> 
                <div  className="lines"> 
                    <div style={{fontSize: '16px', fontWeight: '700'}}>
                        Log in to your account
                    </div>
                </div>
                <div className="loginText">Email Address </div>
                <div  className="lines"> 
                <input className="inputModal" style={{borderRadius: '5px', border: '1px solid #e0e3ed'}} type="email" onChange={e => newLogin.email = e.target.value }/>
                </div>
                <div className="loginText">Password </div>
                <div className="lines"> 
                <input className="inputModal" style={{borderRadius: '5px', border: '1px solid #e0e3ed'}} type='password' onChange={e => newLogin.password = e.target.value }/>
                </div>
                <div className="lines"  style={{borderRadius: '5px', marginTop: '5px'}} onClick={()=> this.checkLogin()}>
                    <div className="loginButton">
                    Log in
                    </div> 
                </div>
                <div className="loginText" onClick={() => openRegistrForm()} >
                    Don't have an account? 
                    <div style={{color: 'blue'}}>Sign Up 
                    </div>                  
                </div>
                <div className={this.state.warning} >
                    You are not registered
                </div>
            </div>
        </div>
    )
  }
}

export default login

login.contextType = Context;
    