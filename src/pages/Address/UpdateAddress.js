import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios'
import Navbar from '../../components/Navbar';

const UpdateAddress = ({addressDetails,id}) => {
    

    const [addressData,setAddressDetails] = useState(addressDetails)
    const [country,setCountry] = useState([]); //fetch details of all countries
    const [state,setStateData] = useState([]); //fetch details of all the states
    const [city,setCity] = useState([]); //fetch details of all the cities 
    const [updateData, setUpdate] = useState({  //state for update
        address:addressData.address, //string
        country_id:addressData.country_id, //number
        state_id:addressData.state_id, //number
        city_id:addressData.city_id, //number
        pincode:addressData.pincode, //string
        type:addressData.type,    //string
        status:addressData.status, //boolean
    });


    const address_ref = useRef([]); // to get the latest value 
    const pincodeRef = useRef([])
    const typeRef = useRef([]);
    const statusRef = useRef([])


    useEffect(()=>{
        getCountryData();
        getStateData();
        getCityData();
    },[])
  
      const getCountryData = async()=>{

        try {
            const {data} = await axios.get(`/countries`)
            setCountry(data.data)
        } 
        catch (error) {
         console.log(error)   
        }
        
      }  
  
      const getStateData = async()=>{

        try {
            const {data} = await axios.get(`/states`)
            setStateData(data.data)
        } catch (error) {
            console.log(error)
        }
        
      }
      const getCityData = async ()=>{
        try {
          const {data} = await axios.get(`/cities`)
          setCity(data.data)
        } catch (error) {
          console.log(error)
        }
      }
      const changeState = async (e) =>{

        try {
         
          setUpdate({...updateData,country_id:parseInt(e.target.value)});
          const id = e.target.value;
          const {data} = await axios.get(`/states/list/${id}`)
          setStateData(data.data);
        } catch (error) {
          
        }
        
        
      }
      const changeCity = async (e) =>{

        setUpdate({...updateData,state_id:parseInt(e.target.value)});
        const id = e.target.value;
        const {data} = await axios.get(`/cities/list/${id}`)
        setCity(data.data);
        
      }
      const cityUpdated = (e)=>{
        setUpdate({...updateData,city_id:parseInt(e.target.value)})
      }

      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(updateData)
        try {
          const updateRequest = await axios.patch(`/address/update/${id}`,updateData,{
            'Content-type':'application/json'
          })
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
        
      }
      const changeStatus = (e)=>
      {
        const isBool = e.target.value.toString().toLowerCase()=='true'
        setUpdate({...updateData,status:isBool})
      }
    

  return (
    <>
    <Navbar/>  
      <div>
      {console.log(updateData)}
        <form onSubmit={handleSubmit}>
            <div>
                <lable>
                    Address:
                    <textarea ref={address_ref} defaultValue={addressData.address} onChange={()=>setUpdate({...updateData,address:address_ref.current.value})}></textarea>
                </lable>
                <lable>
                    Select Country:
                    <select onChange={changeState} defaultValue={addressData.country_id}>
                    {
                        country.map((item)=>{
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                    </select>
                    <p></p>
                </lable>
                <lable>
                    Select State:
                    <select onChange={changeCity} defaultValue={addressData.state_id}> 
                    {
                        state.map((item)=>{
                            return <option value={item.id} key={item.id}>{item.name}</option>
                        })
                    }
                    </select>
                    <p></p>
                </lable>
                <lable>
                    Select City:
                    <select onChange={cityUpdated} value={addressData.city_id}> 
                    {
                        city.map((item)=>{
                            return <option value={item.id} key={item.id}>{item.name}</option>
                        })
                    }
                    </select>
                    <p></p>
                </lable>
                <lable>
                    Pincode:
                    <input type='text' ref={pincodeRef} defaultValue={addressData.pincode} onChange={()=>setUpdate({...updateData,pincode:pincodeRef.current.value})}></input>
                    <p></p>
                </lable>
                <lable>
                    Address Type:
                    <select onChange={()=>setUpdate({...updateData,type:typeRef.current.value})} defaultValue={addressData.type} ref={typeRef}> 
                      <option value='Permanent'>Permenant</option>
                      <option value='Residential'>Residential</option>
                    </select>
                </lable>
                <lable>
                   Status:
                    <select onChange={changeStatus} defaultValue={addressData.status} ref={statusRef}> 
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                </lable>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
    </>

  )
}

export default UpdateAddress