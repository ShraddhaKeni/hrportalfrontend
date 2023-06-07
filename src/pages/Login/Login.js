import React,{useState,useContext} from 'react'
import './styles/login.css'
import axios from 'axios'
import image from './image.svg'
import logo from './logo.svg'

import {useCookies} from 'react-cookie'
import{decodeToken , isExpired} from 'react-jwt'
import {useNavigate} from 'react-router-dom'
import { checkRole, loginCheck} from '../Helper/Auth'
import useAuth from '../Helper/useAuth'


const Login = () => {   
    const [login,setLogin] = useState(false);
    const [details,setDetails] = useState({})
    let history = useNavigate()
    const {user,setUser,setLogged} = useAuth()
    const navigate = useNavigate()
    const [cookie,setCookie] = useCookies(['accessToken']);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        document.getElementById('username-input').classList.remove('wrong-input-animation')
        document.getElementById('password-input').classList.remove('wrong-input-animation')
        document.getElementById('warning_message').style.display="none"
        try {
            const datas = {
                username:details.username,
                password:details.password
            }
            let dTime = new Date()
            dTime.setTime(dTime.getTime()+(12*60*60*1000))
            const res = await axios.post(`/auth/signin`,datas)
            localStorage.setItem('accessToken',res.data.data.accessToken)
            setCookie('accessToken',res.data.data.accessToken,{path:'/',expires:dTime})
            const {payload} = decodeToken(res.data.data.accessToken)
            const User = await loginCheck(payload)
            setCookie('logged',true,{path:'/',expires:dTime})
           
            setUser(User)
            setLogged(true)
            setCookie('login_type',res.data.data.role,{path:'/',expires:dTime})
            
            if(User)
            {
                if(res.data.data.role===9)
                {
                    navigate('/adminDash')
                }
                else if(res.data.data.role===10)
                {
                    navigate('/hrDash')
                }
                else if(res.data.data.role===11)
                {
                    navigate('/empDash')
                }
               
            }
        } catch (error) {
            document.getElementById('username-input').classList.add('wrong-input-animation')
            document.getElementById('password-input').classList.add('wrong-input-animation')
            document.getElementById('warning_message').style.display="block"
        }
    }

    const handleChange = e=>{
        document.getElementById('username-input').classList.remove('wrong-input-animation')
        document.getElementById('password-input').classList.remove('wrong-input-animation')
        setDetails({...details,[e.target.name]:e.target.value})
        document.getElementById('warning_message').style.display="none"
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
                        <input id='username-input' type='text' className='username-input' placeholder='Username' autoComplete='off' name='username' onChange={handleChange}></input>
                    </div>
                    <div className='username'
                        
                    >
                        <label>Password</label>
                        <input id='password-input' type='password' className='username-input' placeholder='Password' name='password' onChange={handleChange}></input>
                       
                    </div>
                    <div className='ForGotPassLabel'>
                    <a className='forgotPass' href='/'>Forgot password?</a>
                    <p className='error'></p>
                    </div>
                    <span style={{display:'none',color:'red'}} id='warning_message'>Wrong Credentials</span>
                    <div>
                        <button id='login-button' className='login btn btn-primary'>Login</button>
                    </div>
                    
                </form>
             
                
            </div>
        </div>
        
            
        </div>
       
    </>
  )
}

export default Login