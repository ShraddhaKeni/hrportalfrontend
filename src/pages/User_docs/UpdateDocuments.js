import React,{useState,useEffect, useRef} from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles/addDocuments.css'

const UpdateDocuments = ({updates}) => {
    //console.log(updates)
    const [documentsData , setData] = useState({
        doc_type_id:parseInt(updates.doc_type_id),
        doc_path:'',
        user_id:updates.user_id,
        status:false
    })
    const [docTypes, setDocTypes] = useState([]);
    const [users, setusers] = useState([]);

    const [file,setfile] = useState({})
    const [uploadDoc,setUpload] = useState(false)

    //Refs 

    const docTypeRef = useRef([]);
    const userRef = useRef([]);
    const docPathRef = useRef([]);
    const statusRef = useRef([]);

    //Functions to get Data 

    const getDocumentTypeData = async()=>{
        try {
            const {data} = await axios.get(`/document-type/findAll`)
            setDocTypes(data.data)
            document.getElementById('doc_type').value=documentsData.doc_type_id
            
         
        } catch (error) {
            console.log(error)
        }
        
    }
    const getUserDetails = async()=>{
        try {
            const {data} = await axios.get(`/users/findAll`)
            setusers(data.data)
            console.log(documentsData.user_id)
            document.getElementById('user_id').value = documentsData.user_id
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const isBool = documentsData.status.toString().toLowerCase() == 'true'
        try
        {
            
            const fileData = {
                'file':file,
                'fileName':file.name
            }
            setUpload(fileData)

            if(uploadDoc==true)
            {
                let formData = new FormData()
            
                formData.append('doc_type_id',parseInt(documentsData.doc_type_id))
                formData.append('file',file,file.name)
                formData.append('user_id',documentsData.user_id)
                formData.append('status',isBool)
                const data={
                    doc_path:file
                }
                
                
                const postRequest = await axios.post(`http://localhost:3001/user-docs/create/${updates.id}`,formData,{
                    'Content-type':'multipart/x-www-form-urlencoded'
                })
    
                window.location.reload();
            }
            else{
                const data = {
                    doc_type_id:parseInt(documentsData.doc_type_id),
                    user_id:documentsData.user_id,
                    status:isBool
                }
                const postRequest = await axios.patch(`http://localhost:3001/user-docs/update/${updates.user_id}/${updates.id}`,data,{
                    'Content-type':'multipart/x-www-form-urlencoded'
                })
                window.location.reload()
            }

           
           
        }
        catch(error)
        {
            console.log(error)
        }
    }
    const loadFile = (e) =>{
        setfile(e.target.files[0])
        setUpload(true)
        
    }


    useEffect(()=>{
        getDocumentTypeData();
        getUserDetails();
    },[])

   
    
  return (
    
    <div style={{margin:'0px',justifyContent:'center'}}>
        <form onSubmit={handleSubmit}>
            <div className='form-div'>
                <lable>
                     {/* {console.log(updates.doc_type_id)} */}
                    Document Type: 
                    <select name='doc_type_id' id='doc_type' ref={docTypeRef} onChange={()=>setData({...documentsData,doc_type_id:docTypeRef.current.value})} defaultValue={updates.doc_type_id}>
                        <option>Select Doc Type</option>
                        {docTypes.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </lable>
                <br/>
                <lable>
                    
                    Choose Document: 
                        <input ref={docPathRef} type='file' onChange={loadFile}></input>
                </lable>
                <lable>
                    
                    Select User: 
                    <select name='user_id' id='user_id' ref={userRef} onChange={()=>setData({...documentsData,user_id:userRef.current.value})} defaultValue={updates.user_id}>
                        <option>Select User</option>
                        {users.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.username}</option>
                        })}
                    </select>
                </lable>
                <lable>
                    
                    Status: 
                    <select name='status' ref={statusRef} onChange={()=>setData({...documentsData,status:statusRef.current.value})} defaultValue={updates.status}>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </lable>
                <Button type='submit'>Save</Button>
            </div>
        </form>
    </div>
  )
}

export default UpdateDocuments