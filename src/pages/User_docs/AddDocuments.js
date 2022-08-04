import React,{useState,useEffect, useRef} from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles/addDocuments.css'

const AddDocuments = () => {
    const [documentsData , setData] = useState({
        doc_type_id:'',
        doc_path:'',
        user_id:'',
        status:true
    })
    const [docTypes, setDocTypes] = useState([]);
    const [users, setusers] = useState([]);

    const [file,setfile] = useState({})
    const [uploadDoc,setUpload] = useState()
    //Refs 

    const docTypeRef = useRef([]);
    const userRef = useRef([]);
    const docPathRef = useRef([]);
    const statusRef = useRef([]);

    //Functions to get Data 

    const getDocumentTypeData = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/document-type/findAll`)
            setDocTypes(data.data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
    const getUserDetails = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/users/findAll`)
            setusers(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try
        {
            const isBool = documentsData.status.toString().toLowerCase() == 'true'
            const fileData = {
                'file':file,
                'fileName':file.name
            }
            setUpload(fileData)

           
            let formData = new FormData()
            console.log(formData)
            formData.append('doc_type_id',parseInt(documentsData.doc_type_id))
            formData.append('file',file,file.name)
            formData.append('user_id',documentsData.user_id)
            formData.append('status',isBool)

            
            
            const data = 
            {
                doc_type_id:parseInt(documentsData.doc_type_id),
                file:uploadDoc,
                user_id: documentsData.user_id,
                status:isBool
            }
            console.log(formData)
            const postRequest = await axios.post(`http://localhost:3000/user-docs/create`,formData,{
                'Content-type':'multipart/mixed'
            })
            console.log(postRequest)
        }
        catch(error)
        {
            console.log(error)
        }
    }
    const loadFile = (e) =>{
        setfile(e.target.files[0])
        
    }


    useEffect(()=>{
        getDocumentTypeData();
        getUserDetails();
    },[])

   

  return (
    
    <div style={{margin:'0px',justifyContent:'center'}}>
        <form onSubmit={handleSubmit} className='form'>
            <div className='form-div'>
                <lable>
                     {console.log(file)}
                    Document Type: 
                    <select name='doc_type_id' ref={docTypeRef} onChange={()=>setData({...documentsData,doc_type_id:docTypeRef.current.value})} defaultValue={documentsData.doc_type_id}>
                        <option>Select Doc Type</option>
                        {docTypes.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </lable>
                <br/>

                <lable>
                    Choose Document: 
                        <input ref={docPathRef} type='file' accept='application/png'  onChange={loadFile}></input>
                </lable>
                <lable>
                    
                    Select User: 
                    <select name='user_id' ref={userRef} onChange={()=>setData({...documentsData,user_id:userRef.current.value})} defaultValue={documentsData.user_id}>
                        <option>Select User</option>
                        {users.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.username}</option>
                        })}
                    </select>
                </lable>
                <lable>
                    
                    Status: 
                    <select name='status' ref={statusRef} onChange={()=>setData({...documentsData,status:statusRef.current.value})} defaultValue={documentsData.status}>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </lable>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddDocuments