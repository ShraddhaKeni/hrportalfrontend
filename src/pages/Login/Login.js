import React,{useState} from 'react'
import './styles/login.css'
import axios from 'axios'
import image from './image.svg'
import logo from './logo.svg'

import {useCookies} from 'react-cookie'
import{decodeToken , isExpired} from 'react-jwt'
import {useNavigate} from 'react-router-dom'
import {LoginCheck} from '../Helper/Auth'

const Login = () => {   
    const [login,setLogin] = useState(false);
    const [details,setDetails] = useState({})
    let history = useNavigate()
   

    const [cookie,setCookie] = useCookies(['accessToken'])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const datas = {
                username:details.username,
                password:details.password
            }
            const res = await axios.post(`http://localhost:3000/auth/signin`,datas)
            localStorage.setItem('accessToken',res.data.data.accessToken)
            setCookie('accessToken',res.data.data.accessToken)
            const {payload} = decodeToken(res.data.data.accessToken)
            const User = LoginCheck(payload)
            console.log(User)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = e=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }
    
  return (
    <>
    <div className='login-page'>
        
            <img className='banner_image' src={image}></img>
        
        <div className='bottom-part'>
            <div className='form_part'>
              
                <div  className='div_logo'>
                   <img className='logo' src={logo}></img>
                </div>  
                <h2 className='LogInLabelSize'>LOG IN</h2>
                <form onSubmit={handleSubmit}>
                    <div className='username'
                        
                    >
                        <label>Username</label>
                        <input type='text' className='username-input' placeholder='Username' autoComplete='off' name='username' onChange={handleChange}></input>
                    </div>
                    <div className='username'
                        
                    >
                        <label>Password</label>
                        <input type='password' className='username-input' placeholder='Password' name='password' onChange={handleChange}></input>
                    </div>
                    <div className='ForGotPassLabel'>
                    <a className='forgotPass' href='/'>Forgot password?</a>
                    <p className='error'></p>
                    </div>
                   
                    <div>
                        <button className='login btn btn-primary'>Login</button>
                    </div>
                    
                </form>
             
                
            </div>
        </div>
        
            
        </div>
       
    </>
  )
}

export default Login