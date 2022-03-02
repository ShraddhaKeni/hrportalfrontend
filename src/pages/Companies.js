import React from 'react';
import axios from 'axios';
//import {} from 'reactjs-input-validator';

const initialState = {
    name: "",
    nameError: "",
    address: "",
    country: "",
    CountryData: [],
    stateid: "",
    StatesData: [],
    city: "",
    CityData: [],
    pincode: "",
    website: "",
    email: "",
    contactperson: "",
    contactnumber: "",
    pancardnumber: "",
    gstnumber: "",
    cinnumber: "",
}

export default class Companies extends React.Component {
    state = initialState;
    

    handleChange = event => {
        //this.setState({ name: event.target.value });
        //console.log('jjjj'+event.target.value);

        this.setState({ [event.target.name]: event.target.value });
    }

 /*    handleFormValidation() {

        let nameError = "";

        if (!this.state.name) {
            nameError = "Company name cannot be empty";
            this.setState({ nameError });
            return false;
        } else if (!(/^[aA-zZ\s]+$/.test(this.state.name))) {
            nameError = "Invalid company name";
            this.setState({ nameError });
            return false;
        }

        // if (!this.state.address) {
        //     console.log('asd');
        //     addressError = "Company address cannot be empty";
        //     this.setState({ addressError });
        //     return false;
        // }
        return true;
    }; */

    componentDidMount() {
        // console.log('ssss');
        // console.log(this.state.country);

        axios.get('http://localhost:3200/countries').then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data
            });
        });
    }
    ChangeStates = (e) => {

        this.setState({
            country: e.target.value
        });
       // console.log(e.target.value);
       //console.log(this.state.country);
         axios.get('http://localhost:3200/states/list/' + e.target.value).then(response => {
             console.log(response.data);
            //  if(response.status)
            this.setState({
                 StatesData: response.data
             });
         });
    }
    ChangeCity = (e) => {
        // console.log('fsfsd'+e.target.value);
        this.setState({
            stateid: e.target.value
        });
        axios.get('http://localhost:3200/cities/list/' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                CityData: response.data
            });
        });
    }

    handleSubmit = event => {
        event.preventDefault();

     /*    const isValid = this.handleFormValidation();
        if (isValid) { */
            const user = {
                name: this.state.name,
                address: this.state.address,
                country_id: this.state.country,   //column name:value
                state_id: this.state.stateid,
                city_id: this.state.city,
                pincode: this.state.pincode, 
                website: this.state.website,
                email: this.state.email,
                contact_person: this.state.contactperson,
                contact_number: this.state.contactnumber,
                pancard_number: this.state.pancardnumber,
                gst_number: this.state.gstnumber,
                cin_number: this.state.cinnumber
            };
//console.log(user);
             axios.post(`http://localhost:3200/companies/add`, user,
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
                            Company name:
                            <input type="text" name="name" value={this.state.name} placeholder="Enter company name" onChange={this.handleChange} />
                            <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                        </label>
                        <label>
                            Address:
                            <textarea name="address" value={this.state.address} placeholder="Enter company address" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.addressError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Choose country:
                            <select className="form-control" name="country" value={this.state.country}  onChange={this.ChangeStates}>
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
                            Website:
                            <input type="text" name="website" value={this.state.website} placeholder="Enter website" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Email:
                            <input type="text" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Contact person:
                            <input type="text" name="contactperson" value={this.state.contactperson} placeholder="Enter contact person's name" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Contact number:
                            <input type="text" name="contactnumber" value={this.state.contactnumber} placeholder="Enter contact number" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Pancard number:
                            <input type="text" name="pancardnumber" value={this.state.pancardnumber} placeholder="Enter pancard number" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            GST number:
                            <input type="text" name="gstnumber" value={this.state.gstnumber} placeholder="Enter GST number" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            CIN number:
                            <input type="text" name="cinnumber" value={this.state.cinnumber} placeholder="Enter CIN number" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>

                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

