import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UpdateAddress from './UpdateAddress';
import Navbar from '../../components/Navbar';

const ViewAddress = () => {

  const [addressDetails,setAddressDetails] = useState([]); //fetch Details of all the addresses
  const [country,setCountry] = useState([]); //fetch details of all countries
  const [state,setStateData] = useState([]); //fetch details of all the states
  const [city,setCity] = useState([]); //fetch details of all the cities 
  const [addressData, setAddressData] = useState()
  const [isEdit,setEdit] = useState()
  const [editID,setEditID] = useState()


 
  useEffect(()=>{
      getAddressData();
      getCountryData();
      getStateData();
      getCityData();
    },[])

    const getAddressData = async ()=>{
      const {data} = await axios.get(`http://localhost:3000/address`)
      setAddressDetails(data.data)
    }

    const getCountryData = async()=>{
      const {data} = await axios.get(`http://localhost:3000/countries`)
      setCountry(data.data)
    }  

    const getStateData = async()=>{
      const {data} = await axios.get(`http://localhost:3000/states`)
      setStateData(data.data)
    }
    const getCityData = async ()=>{
      try {
        const {data} = await axios.get(`http://localhost:3000/cities`)
        setCity(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getCountryName = (id) =>{
      const name = country.find(x=>x.id==id)
      if(name)
      {
        return name.name
      }
      else
      {
        return false
      }
    }
    const getStateName = (id)=>{
      const name= state.find(x=>x.id==id)
      if(name)
      {
        return name.name
      }
      else
      {
        return false
      }
    }
    const getCityName = (id)=>{
      const name= city.find(x=>x.id==id)
      if(name)
      {
        return name.name
      }
      else
      {
        return false
      }
    }

    const editClicked = (id) =>{
        setAddressData(addressDetails.find(x=>x.id==id))
        setEditID(id)
        setEdit(true)
    }

    const statusChange = async(id,status) =>{
      const currentStatus = {
        status:!status
      }
      try {
        const changeStatusRequest = await axios.patch(`http://localhost:3000/address/update/${id}`,currentStatus,{
          'Content-type':'application/json'
        })
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }

  var srno = 1;
  if(isEdit===true)
  {
    return <UpdateAddress addressDetails={addressData} id={editID}/>
  }
  else
  {
    return (
      <>
      <Navbar/>
      <div className='mainViewDesignation'>
     
           <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>View Address</h1></b></div>
                    <div style={{marginLeft: '17%'}}><Link to={{ pathname: "/address" }}><button className='viewAddDesignationButton btn btn-primary'>Add Address</button></Link></div>
                    </div>

                  
                    <div className='viewDesignationContainer table-responsive' style={{width:'70vw', marginLeft:'26%'}}>
                  
                    <table className='table table-sm table-hover' responsive>
      
                      
                          <thead  >
                              <tr>
                                  <th scope="col">Sr no.</th>
                                  <th scope="col">Company Address</th>
                                  <th scope="col">Country</th>
                                  <th scope="col">State</th>
                                  <th scope="col">City</th>
                                  <th scope="col">Pincode</th>
                                  <th scope="col">Address type</th>
                                  <th scope="col">status</th>
                                  <th scope="col">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                                {addressDetails.map((address)=>{
                                 return( 
                                    <tr key={address.id}>
                                    <td scope="row">{srno++}</td>
                                    <td>{address.address}</td>
                                    <td>{getCountryName(address.country_id)}</td>
                                    <td>{getStateName(address.state_id)}</td>
                                    <td>{getCityName(address.city_id  )}</td>
                                    <td>{address.pincode}</td>
                                    <td>{address.type}</td>
                                    {
                                                  address.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                  : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                    }
                                    <td>
                                    {address.status==true?<Button variant="danger" onClick={()=>statusChange(address.id,address.status)}>
                                                  Delete 
                                              </Button> :<Button variant="primary" onClick={()=>statusChange(address.id,address.status)}>
                                                  Activate
                                              </Button> }
                                              <Button variant="info" onClick={() => {editClicked(address.id)}} >
                                                  Edit 
                                              </Button> 
                                    </td>
                                  </tr>)
                                })}
                              
                          </tbody>
                      </table>
                  </div>
                  </div>
                  </>
    )
  }
  
}

export default ViewAddress