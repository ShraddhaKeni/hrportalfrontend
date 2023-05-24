import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addCompany.css'
import Navbar from '../../components/Navbar';


export default class AddCompanies extends Component {
    constructor(props){
        super(props)
        this.state = {
            company: this.props.id? this.props.id : " ",
            name: "",
            address: "",
            country_id: "",
            CountryData: [],
            state_id: "",
            StatesData: [],
            city_id: "",
            CityData: [],
            pincode: "",
            website: "",
            email: "",
            contact_person: "",
            contact_number: "",
            pancard_number: "",
            gst_number: "",
            cin_number: "",
            status: "true",
        }
    }

    componentDidMount(){
        if(this.state.company !== " "){
          axios.get('http://localhost:3000/companies/'+this.state.company).then(response => {
              this.setState({
                  name: response.data.data.name,
                  address: response.data.data.address,
                  country_id: response.data.data.country_id,
                  state_id: response.data.data.state_id,
                  city_id: response.data.data.city_id,
                  pincode: response.data.data.pincode,
                  website: response.data.data.website,
                  email: response.data.data.email,
                  contact_person: response.data.data.contact_person,
                  contact_number: response.data.data.contact_number,
                  pancard_number: response.data.data.pancard_number,
                  gst_number: response.data.data.gst_number,
                  cin_number: response.data.data.cin_number,
                  status: response.data.data.status,
              });
          });
        }

        axios.get('http://localhost:3000/countries').then(response => {
            this.setState({
                CountryData: response.data.data
            });
        });
    }

    ChangeStates = (e) => {
        this.setState({
            country_id: e.target.value
        });
        axios.get('http://localhost:3000/states/list/' + e.target.value).then(response => {
        this.setState({
                StatesData: response.data.data
            });
        });
    }

    ChangeCity = (e) => {
        this.setState({
            state_id: e.target.value
        });
        axios.get('http://localhost:3000/cities/list/' + e.target.value).then(response => {
            this.setState({
                CityData: response.data.data
            });
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        
        var company = {}
        this.state.company === " "?
        company = {
            name: this.state.name,
            address: this.state.address,
            country_id: this.state.country_id,
            state_id: this.state.state_id,
            city_id: this.state.city_id,
            pincode: this.state.pincode,
            website: this.state.website,
            email: this.state.email,
            contact_person: this.state.contact_person,
            contact_number: this.state.contact_number,
            pancard_number: this.state.pancard_number,
            gst_number: this.state.gst_number,
            cin_number: this.state.cin_number,
        }
        : company = {
            name: this.state.name,
            address: this.state.address,
            country_id: this.state.country_id,
            state_id: this.state.state_id,
            city_id: this.state.city_id,
            pincode: this.state.pincode,
            website: this.state.website,
            email: this.state.email,
            contact_person: this.state.contact_person,
            contact_number: this.state.contact_number,
            pancard_number: this.state.pancard_number,
            gst_number: this.state.gst_number,
            cin_number: this.state.cin_number,
            status: this.state.status,
        }

        this.state.company === " "? this.addCompany(company) : this.editCompany(company)
        
    }

    addCompany(company){
        axios.post(`http://localhost:3000/companies/add`, company ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editCompany(company){
        console.log(company)
        axios.patch(`http://localhost:3000/companies/`+this.state.company, company ,
        {
            'Content-type':'application/json'
        }).then(res => {
            //window.location.reload()
        })
    }

    cancel(){
        window.location.reload()
    }
 
    render() {

        return (
            <>
            <Navbar/>
            <div className='mainAddCompanies'>
            <h2>Add Company</h2>
                <form class="row g-3" onSubmit={this.handleSubmit}>
                <div class="col-12">
                    <label for="company_name" class="form-label InputLabel" >Company Name</label>
                    <input type="text" class="form-control InputField" id="company_name" name="name" placeholder="Enter Company Name" value={this.state.name} onChange={this.handleChange} required />
                </div>
                <div class="col-12">
                    <label for="company_address" class="form-label InputLabel" >Company Address</label>
                    <input type="text" class="form-control InputField" id="company_address" name="address" placeholder="Enter Company Address" value={this.state.address} onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="choosecountry" class="form-label SelectLabel">Choose Country:</label>
                    <select name="country_id" class="form-select SelectField" id="choosecountry" onChange={this.ChangeStates} value={this.state.country_id}>
                    <option value="">Select</option>
                            { this.state.CountryData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosestate" class="form-label InputLabel">Choose state:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id="choosestate" name="state_id" onChange={this.ChangeCity} value={this.state.state_id}>
                    <option value="">Select</option>
                            { this.state.StatesData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosecity" class="form-label SelectLabel">Choose City:</label>
                    <select class="form-select SelectField" id="choosecity" name="city_id" onChange={this.handleChange} value={this.state.city_id}>
                    <option value="">Select</option>
                            { this.state.CityData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="pincode" class="form-label InputLabel">Enter Pincode:</label>
                    <input type="number" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="pincode" placeholder="Enter Pincode" value={this.state.pincode} onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="companywebsite" class="form-label SelectLabel">Company Website:</label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '2%'}} id="companywebsite" type="text" name="website" placeholder="Enter company website" value={this.state.website} onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label InputLabel">Company Email:</label>
                    <input type="email" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="email" name="email" placeholder="Enter company email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                {/* differ */}
                <div class="col-md-6">
                    <label for="contactnumber" class="form-label SelectLabel">Company Number:</label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '2%'}} id="contactnumber" type="number" name="contact_person" placeholder="Contact person name" value={this.state.contact_number} onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="pancardno" class="form-label InputLabel">PAN Card Number:</label>
                    <input type="text" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="pancardno" name="pan_card_no" placeholder="Enter Pan Card Number" value={this.state.pancard_number} onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="gstnumber" class="form-label SelectLabel">GST Number:</label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '2%'}} id="gstnumber" name="gst_number" placeholder="Company GST no." value={this.state.gst_number} onChange={this.handleChange}  />
                </div>
                <div class="col-md-6">
                    <label for="cinnumber" class="form-label InputLabel">CIN number:</label>
                    <input type="text" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="cinnumber" name="cin_number" placeholder="Company CIN no." value={this.state.cin_number} onChange={this.handleChange} required/>
                </div>
               <br/>

                    {this.state.company !== " "?
                        <label className='addCompany_status_lable'>Select status:</label>
                    :
                        ""
                    }
                    {this.state.company !== " "?
                        <Form.Group className="mb-3">
                            <select className="addCompany_status" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select</option>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </select>
                        </Form.Group>
                    :
                        " "
                    }

                    <br/>
                 <div style={{marginTop: '41%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                        {this.state.company === " "?
                            <Link to={{pathname: "/companies"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                            : <Button className='CancelButton' type="cancel" onClick={() => {this.cancel()}}>
                            Cancel
                            </Button> 
                        }
                   
                    </div>
                </form>
            </div>
            </> 
        )
    }
}

