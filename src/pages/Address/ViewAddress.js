import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UpdateAddress from './UpdateAddress';

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
      const {data} = await axios.get(`http://localhost:3001/address`)
      setAddressDetails(data.data)
    }

    const getCountryData = async()=>{
      const {data} = await axios.get(`http://localhost:3001/countries`)
      setCountry(data.data)
    }  

    const getStateData = async()=>{
      const {data} = await axios.get(`http://localhost:3001/states`)
      setStateData(data.data)
    }
    const getCityData = async ()=>{
      try {
        const {data} = await axios.get(`http://localhost:3001/cities`)
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
        const changeStatusRequest = await axios.patch(`http://localhost:3001/address/update/${id}`,currentStatus,{
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
      <div className='main'>
      
                      <h2>View Address <span style={{float:'right'}}><Link to={{ pathname: "/address" }}><Button variant='success'>Add</Button></Link></span></h2>
                      <Table bordered striped>
                          <thead  >
                              <tr>
                                  <th>Sr no.</th>
                                  <th>Company Address</th>
                                  <th>Country</th>
                                  <th>State</th>
                                  <th>City</th>
                                  <th>Pincode</th>
                                  <th>Address type</th>
                                  <th>status</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                                {addressDetails.map((address)=>{
                                 return( 
                                    <tr key={address.id}>
                                    <td>{srno++}</td>
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
                      </Table>
                  </div>
    )
  }
  
}

export default ViewAddress