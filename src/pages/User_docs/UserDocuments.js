import React,{useState,useEffect} from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios'       
import UpdateDocuments from './UpdateDocuments';
import Navbar from '../../components/Navbar';

const UserDocuments = () => {

    const [docData,setDocData] = useState([]);
    const[users,setUsers] = useState([])
    const[isEdit,setEdit] = useState(false)
    const[toUpdate,setUpdate] = useState()
    const[docType,setDocType] = useState([])
    const[change,setChange] = useState(false)
    var srno=1;
    const getDoctData = async()=>{
        const {data} = await axios.get(`/user-docs/findAll`);
        setDocData(data.data)
        console.log(data)
    }

    const getUsers = async()=>{

        try {
            const {data} =await axios.get(`/users/findAll`)
            setUsers(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getDocType = async()=>{
        try {
            const {data} = await axios.get(`/document-type/findAll`)
            setDocType(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    function getUserName(id)
    {
        const userName = users.find(x=>x.id==id)
        if(userName)
        {
            return (userName.username)
        }
        else
        {
            return false
        }
    }
    function getDocName(id)
    {
        const doc = docType.find(x=>x.id==id)
        if(doc)
        {
            return doc.name
        }
        return false
    }

    const editClicked = (id)=>{
        const toBeUpdated = docData.find(x=>x.id==id)
        if(toBeUpdated)
        {
            setUpdate(toBeUpdated);
            setEdit(true);
        }
        return 'Entry does not exists';
    }

    const changeStatus = async(id,user_id,status) =>{
        try {
            const data = {
                status:!status
            }
            const postRequest = await axios.patch(`/user-docs/update/${user_id}/${id}`,data)
            setChange(!change)
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        getDoctData();
        getUsers();
        getDocType();
    },[change])

    if(isEdit==true)
    {
        return <UpdateDocuments updates={toUpdate}></UpdateDocuments>
    }
else{
        return (
            <>
            <Navbar/>

        {/* {console.log(docData)} */}
        <div className='mainViewDesignation'>
        <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>User Documents</h1></b></div>
                    <div style={{marginLeft: '-5%'}}><Link to={{ pathname: "/addUserDocuments" }}><button className='viewAddDesignationButton btn btn-primary'>Add Documents</button></Link></div>
                    </div>
   
        {/* <h2>User Documents <span style={{float:'right'}}><Link to={{ pathname: "/addUserDocuments" }}><Button variant='success'>Add</Button></Link></span></h2> */}
        <div className='viewDesignationContainer table-responsive' style={{width:'55vw'}}>
                     <table className='table table-sm table-hover' responsive>
                          <thead>
                              <tr>
                                  <th scope="col">Sr no.</th>
                                  <th scope="col">Document Name</th>
                                  <th scope="col">User</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {docData.map((item)=>{
                               return <tr key={item.id}>
                                    <td scope="row">
                                        {srno++}
                                    </td>
                                    <td>{getDocName(item.doc_type_id)}</td>
                                    <td>{getUserName(item.user_id)}</td>
                                    {
                                        item.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                        : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                    }
                                    <td>
                                    {item.status!=false?<Button variant="danger" onClick={() => changeStatus(item.id,item.user_id,item.status)} >
                                                Delete 
                                            </Button> :<Button variant="primary" onClick={() => changeStatus(item.id,item.user_id,item.status)} >
                                                Activate 
                                            </Button> }
                                            <Button variant="info" onClick={() => {editClicked(item.id)}} >
                                                Edit 
                                            </Button> 
                                    </td>
                                </tr>
                              })}
                          </tbody>
                      </table>
                      </div>
                      </div>
                      </>
  )
}
}

export default UserDocuments