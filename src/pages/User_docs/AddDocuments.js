import React,{useState,useEffect, useRef} from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles/addDocuments.css'
import Navbar from '../../components/Navbar';

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
            const {data} = await axios.get(`/document-type/findAll`)
            setDocTypes(data.data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
    const getUserDetails = async()=>{
        try {
            const {data} = await axios.get(`/users/findAll`)
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
            // console.log(formData)
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
            const postRequest = await axios.post(`/user-docs/create`,formData,{
                'Content-type':'multipart/mixed'
            })
            console.log(postRequest)
            window.location.reload()
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
    <>
    <Navbar/>
    <div className="mainAddDesignation">
    <h2>Add Document</h2>
                <form class="row g-3"  onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="Document" class="form-label SelectLabel" >Document Type:</label>
                    <select class="form-select SelectField" id="Document" name='doc_type_id' ref={docTypeRef} onChange={()=>setData({...documentsData,doc_type_id:docTypeRef.current.value})} defaultValue={documentsData.doc_type_id} required>
                    <option>Select Doc Type</option>
                        {docTypes.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                            </select>
                </div>
                <div class="col-md-6">
                    <label for="document" class="form-label InputLabel">Choose Document:</label>
                    <input type="file" class="form-control SelectField"  ref={docPathRef} style={{marginLeft: '5%' , padding: '2%'}}  id="document" name="document" accept='application/png'  onChange={loadFile} required  />
                </div>
                <div class="col-md-6">
                    <label for="selectuser" class="form-label SelectLabel">Select User:</label>
                    <select  name='user_id' ref={userRef}  class="form-select SelectField" id="selectuser" onChange={()=>setData({...documentsData,user_id:userRef.current.value})} defaultValue={documentsData.user_id} required>
                    <option>Select User</option>
                        {users.map((item)=>{
                           return <option key={item.id} value={item.id}>{item.username}</option>
                        })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="status" class="form-label InputLabel">Status:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id="status" name='status' ref={statusRef} onChange={()=>setData({...documentsData,status:statusRef.current.value})} defaultValue={documentsData.status} required>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <br/>
                <div style={{marginTop: '18%', marginBottom: '1%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                            <Link to={{pathname: "/userDocuments"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                    </div>


              
        </form>
    </div>
    </>
  )
}

export default AddDocuments