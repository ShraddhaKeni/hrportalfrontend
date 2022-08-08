import React,{useState} from 'react'
import './styles/login.css'
import axios from 'axios'
import image from './image.svg'
import logo from './logo.svg'
import {motion} from 'framer-motion'

const Login = () => {   
    const [login,setLogin] = useState(false);
    const [details,setDetails] = useState({})

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const data = {
                username:details.username,
                password:details.password
            }
            const request = await axios.post(`/auth/signin`,data)
            console.log(request)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = e=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }
    
  return (
    <>
    <div className={login==true?'login-page':'login-page-none'}>
        
            <img className='banner_image' src={image}></img>
        
        <div className='bottom-part'>
            <div className='form_part'>
              
                <div className='div_logo'>
                   <img className='logo' src={logo}></img>
                </div>  
                <h2>LOG IN</h2>
                <form onSubmit={handleSubmit}>
                    <motion.div className='username'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        <label>Username</label>
                        <input type='text' className='username-input' placeholder='Username' name='username' onChange={handleChange}></input>
                    </motion.div>
                    <motion.div className='username'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <label>Password</label>
                        <input type='password' className='username-input' placeholder='Password' name='password' onChange={handleChange}></input>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}>
                        <button className='login'>Login</button>
                    </motion.div>
                    
                </form>
                <a className='forgotPass' href='/'>Forgot password?</a>
            </div>
        </div>
        
            
        </div>
       
    </>
  )
}

export default Login