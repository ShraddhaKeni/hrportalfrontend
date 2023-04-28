import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import {} from 'reactjs-input-validator';

const initialState = {
    username: "",
    UserData: [],
    address: "",
    country: "",
    CountryData: [],
    stateid: "",
    StatesData: [],
    city: "",
    CityData: [],
    pincode: "",
    addresstype: "",
}

export default class Address extends React.Component {
    state = initialState;


    handleChange = event => {
        //this.setState({ name: event.target.value });
        //console.log('jjjj'+event.target.value);

        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/countries').then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data.data
            });
        });

        axios.get('http://localhost:3000/users/findAll').then(response => {
            console.log(response.data);
            this.setState({
                UserData: response.data.data
            });
        });
    }
    ChangeStates = (e) => {

        this.setState({
            country: e.target.value
        });

        axios.get('http://localhost:3000/states/list/' + e.target.value).then(response => {
            console.log(response.data);
            //  if(response.status)
            this.setState({
                StatesData: response.data.data
            });
        });
    }
    ChangeCity = (e) => {
        // console.log('fsfsd'+e.target.value);
        this.setState({
            stateid: e.target.value
        });
        axios.get('http://localhost:3000/cities/list/' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                CityData: response.data.data
            });
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        /*    const isValid = this.handleFormValidation();
           if (isValid) { */
        const user = {
            user_id: this.state.username,
            address: this.state.address,
            country_id: +this.state.country,
            state_id: +this.state.stateid,
            city_id: +this.state.city,
            pincode: this.state.pincode,
            type: this.state.addresstype,
        };
        console.log(user);
        axios.post(`http://localhost:3000/address/create`, user,
            {
                'Content-type': 'application/json'
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        //clear form 
        this.setState(initialState);
        // }
    }


    render() {

        return (
            <>
            <Navbar/>
            <div className='mainAddCompanies'>
            <h2>Add Address</h2>
                <form class="row g-3" onSubmit={this.handleSubmit}>
                <div class="col-12">
                    <label for="username" class="form-label InputLabel" >Choose user name:</label>
                    <select class="form-control InputField" id="username" name="username" value={this.state.username} onChange={this.handleChange} required>
                    <option>Select user name</option>
                                {this.state.UserData.map((e, id) => {
                                    return <option value={e.id}>{e.username}</option>;
                                })}
                            </select>
                </div>
                <div class="col-12">
                    <label for="address" class="form-label InputLabel">Address:</label>
                    <textarea class="form-control InputField" rows={3} id="address"  name="address" value={this.state.address} placeholder="Enter company address" onChange={this.handleChange} required />
      </div>
      <div class="col-md-6">
                    <label for="choosecountry" class="form-label SelectLabel">Choose Country:</label>
                    <select class="form-select SelectField" id="choosecountry" name="country" value={this.state.country} onChange={this.ChangeStates} required>
                    <option>Select country</option>
                                {this.state.CountryData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosestate" class="form-label InputLabel">Choose state:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id="choosestate" name="stateid" value={this.state.stateid} onChange={this.ChangeCity} required>
                    <option>Select state</option>
                                {this.state.StatesData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosecity" class="form-label SelectLabel">Choose City:</label>
                    <select class="form-select SelectField" id="choosecity" value={this.state.city} name="city" onChange={this.handleChange} required>
                    <option>Select city</option>
                                {this.state.CityData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="pincode" class="form-label InputLabel">Enter Pincode:</label>
                    <input type="number" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="pincode" name="pincode" value={this.state.pincode} placeholder="Enter pincode" onChange={this.handleChange} required />
                </div>
                <div class="col-12">
                    <label for="addresstype" class="form-label SelectLabel" style={{marginLeft: '5.5%'}}>Choose address type:</label>
                    <select class="form-select SelectField" id="addresstype" style={{width:'44.5vw', marginLeft: '0%'}} value={this.state.addresstype} onChange={this.handleChange} required>
                                <option>Select address type</option>
                                <option value="Permanent">Permanent address</option>
                                <option value="Residential">Residential address</option>
                            </select>
                </div>
               
                    <div style={{marginTop: '5%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    <Link to={{pathname: "/viewAddress"}}><Button className='CancelButton' type="cancel">
                                Cancel
                    </Button></Link>
                    </div>
                 
                </form>
            </div>
            </>
        )
    }
}

