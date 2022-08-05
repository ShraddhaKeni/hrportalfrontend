import React from 'react'
import './styles/login.css'

import image from './image.svg'
import logo from './logo.svg'

const Login = () => {   
  return (
    <div className='login-page'>
        
            <img className='banner_image' src={image}></img>
        
        <div className='bottom-part'>
            <div className='form_part'>
              
                <div className='div_logo'>
                   <img className='logo' src={logo}></img>
                </div>  
                <h2>LOG IN</h2>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <div className='username'>
                        <label>Username</label>
                        <input type='text' placeholder='Username'></input>
                    </div>
                    <div className='username'>
                        <label>Password</label>
                        <input type='password' placeholder='Password'></input>
                    </div>
                    <button className='login'>Login</button>
                </form>
                <a className='forgotPass' href='/'>Forgot password?</a>
            </div>
        </div>
        
            
        </div>
    
  )
}

export default Login