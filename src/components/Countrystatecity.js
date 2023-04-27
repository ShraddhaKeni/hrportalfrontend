import React from 'react'
import countries from '../countries.json';
import states from '../states.json';
import cities from '../cities.json';
import { useState, useEffect } from 'react';

const Countrystatecity = () => {
  const [statedata, setStatedata] = useState([]);
  const [citydata, setCitydata] = useState([]);

  const getStates = async (e) => {
    try {
      var state_filter = states.filter(element => element.country_id == e)
      setStatedata(state_filter);
    } catch (e) {
      console.log(e)
    }
  }

  const getCities = async (e) =>{
    try{
      var city_filter = cities.filter(element => element.state_id == e)
      setCitydata(city_filter)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <label>
        Choose Country:
        <select className="form-control" name="country" id="countryid" onChange={(e) => getStates(e.target.value)}>
          <option>Select country</option>
          {countries.map(country => {
            return <option value={country.id}>{country.name}</option>;
          })}
        </select>
      </label>
      <label>
        Choose State:
        <select className="form-control" name="states" id="stateid" onChange={(e) => getCities(e.target.value)}>
          <option>Select state</option>
          {statedata.map(state => {
            return <option value={state.id}>{state.name}</option>;
          })}
        </select>
      </label>
      <label>
        Choose City:
        <select className="form-control" name="city" id="cityid" >
          <option>Select city</option>
          {citydata.map(city => {
            return <option value={city.id}>{city.name}</option>;
          })}
        </select>
      </label>
    </>
  )
}

export default Countrystatecity