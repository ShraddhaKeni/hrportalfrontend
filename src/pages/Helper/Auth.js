import axios from 'axios';
import React,{useState} from 'react'

export function LoginCheck (payload){
    const[user,setUser] = useState(null)
    
    getUser(payload.id)
    async function getUser(id)
    {
        const {data} = await axios.get(`/users/${id}`)
        setUser(data.data)
    }

}
