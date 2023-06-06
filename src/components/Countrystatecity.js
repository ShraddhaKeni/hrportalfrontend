import React from 'react'
import countries from '../countries.json';
import states from '../states.json';
import cities from '../cities.json';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

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
    <Navbar/>
    <div className="mainAddDesignation" style={{width:'35vw', marginLeft:'42%'}}>
    <form class="row g-3">
                <div class="col-12">
                    <label for="countryid" class="form-label InputLabel">Choose Country:</label>
                    <select class="form-control InputField" name="country" id="countryid" onChange={(e) => getStates(e.target.value)} required>
                    <option>Select country</option>
                        {countries.map(country => {
                          return <option value={country.id}>{country.name}</option>;
                        })}
                    </select>
                </div>
                <br/>
                <div class="col-12">
                    <label for="stateid" class="form-label InputLabel">Choose State:</label>
                    <select class="form-control InputField" name="states" id="stateid" onChange={(e) => getCities(e.target.value)} required>
                    <option>Select state</option>
                        {statedata.map(state => {
                          return <option value={state.id}>{state.name}</option>;
                        })}
                    </select>
                </div>
                <br/>
                <div class="col-12">
                    <label for="cityid" class="form-label InputLabel">Choose City:</label>
                    <select class="form-control InputField" name="city" id="cityid" required>
                    <option>Select city</option>
                        {citydata.map(city => {
                          return <option value={city.id}>{city.name}</option>;
                        })}
                            </select>
                </div>

      </form>
      </div>
    </>
  )
}

export default Countrystatecity