import axios from 'axios';


export async function loginCheck (payload){
    try {
        const {data} = await axios.get(`/users/${payload.id}`)
        return data.data
    } catch (error) {
        console.log(error)
    }
    
}

export async function checkRole(args){
    
   
    
    try {

        if(args==9)
        {
            return 'Admin'
        }
        else if(args==10)
        {
            return 'HRD'
        }
        else if (args===11)
        {
            return 'Employee'
        }
    } catch (error) {
        return error
    }
}

export const checkAccess=async()=>{
    let login_type = await checkCookies('login_type');
    if(login_type==9)
        {
            let login_check= await checkCookies('jwt');
            if(login_check)
            {
                return 'Admin'
            }
            else
            {
                return null
            }
           
        }
        else if(login_type==10)
        {
            let login_check= await checkCookies('jwt');
            if(login_check)
            {
                return 'HRD'
            }
            else
            {
                return null
            }
        }
        else if (login_type===11)
        {
            let login_check= await checkCookies('jwt');
            if(login_check)
            {
                return 'Employee'
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
}



export const checkCookies=async(name)=>{
    try {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match[2]
    } catch (error) {
        return null
    }
    
}