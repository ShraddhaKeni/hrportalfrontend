import React from 'react';
import axios from 'axios';
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
        axios.get('http://localhost:3001/countries').then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data.data
            });
        });

        axios.get('http://localhost:3001/users/findAll').then(response => {
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

        axios.get('http://localhost:3001/states/list/' + e.target.value).then(response => {
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
        axios.get('http://localhost:3001/cities/list/' + e.target.value).then(response => {
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
        axios.post(`http://localhost:3001/address/create`, user,
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Choose user name:
                            <select className="form-control" name="username" value={this.state.username} onChange={this.handleChange}>
                                <option>Select user name</option>
                                {this.state.UserData.map((e, id) => {
                                    return <option value={e.id}>{e.username}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Address:
                            <textarea name="address" value={this.state.address} placeholder="Enter company address" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.addressError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Choose country:
                            <select className="form-control" name="country" value={this.state.country} onChange={this.ChangeStates}>
                                <option>Select country</option>
                                {this.state.CountryData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Choose state:
                            <select className="form-control" name="stateid" value={this.state.stateid} onChange={this.ChangeCity}>
                                <option>Select state</option>
                                {this.state.StatesData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Choose city:
                            <select className="form-control" value={this.state.city} name="city" onChange={this.handleChange}>
                                <option>Select city</option>
                                {this.state.CityData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Pincode:
                            <input type="text" name="pincode" value={this.state.pincode} placeholder="Enter pincode" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Choose address type:
                            <select name="addresstype" value={this.state.addresstype} onChange={this.handleChange}>
                                <option>Select address type</option>
                                <option value="Permanent">Permanent address</option>
                                <option value="Residential">Residential address</option>
                            </select>
                        </label>
                        <br></br>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

