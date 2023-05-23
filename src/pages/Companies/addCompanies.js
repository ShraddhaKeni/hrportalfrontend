import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addCompany.css'


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
          axios.get('http://localhost:3001/companies/'+this.state.company).then(response => {
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

        axios.get('http://localhost:3001/countries').then(response => {
            this.setState({
                CountryData: response.data.data
            });
        });
    }

    ChangeStates = (e) => {
        this.setState({
            country_id: e.target.value
        });
        axios.get('http://localhost:3001/states/list/' + e.target.value).then(response => {
        this.setState({
                StatesData: response.data.data
            });
        });
    }

    ChangeCity = (e) => {
        this.setState({
            state_id: e.target.value
        });
        axios.get('http://localhost:3001/cities/list/' + e.target.value).then(response => {
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
        console.log(this.state.company)
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
        axios.post(`http://localhost:3001/companies/add`, company ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editCompany(company){
        console.log(company)
        axios.patch(`http://localhost:3001/companies/`+this.state.company, company ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    cancel(){
        window.location.reload()
    }
 
    render() {

        return (
            <div className='main_addCompany'>
                
                <form className='addCompany_form' onSubmit={this.handleSubmit}>
                    <div className='form_container_addCompany'>
                    <label className='company_name_lable'>Company name</label>
                    <Form.Group className="mb-3" >
                        <input className='company_name' type="text" name="name" placeholder="Enter company name" value={this.state.name} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_address_lable'>Company address:</label>
                    <Form.Group className="mb-3" >
                        <input type="text" className='addCompany_address' name="address" placeholder="Enter company address" value={this.state.address} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>
                    
                    <label className='addCompany_chooseContry_lable'>Choose country:</label>
                    <Form.Group className="mb-3">
                        <select className="addCompany_chooseCountry" name="country_id" onChange={this.ChangeStates} value={this.state.country_id}>
                            <option value="">Select</option>
                            { this.state.CountryData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group> 

                    <br/>
                    
                    <label className='addCompany_chooseState_lable'>Choose state:</label>
                    <Form.Group className="mb-3">
                        <select className="addCompany_chooseState" name="state_id" onChange={this.ChangeCity} value={this.state.state_id}>
                            <option value="">Select</option>
                            { this.state.StatesData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br/>
                    
                    <label className='addCompany_chooseCity_lable'>Choose city:</label>
                    <Form.Group className="mb-3">
                        <select className="addCompany_chooseCity" name="city_id" onChange={this.handleChange} value={this.state.city_id}>
                            <option value="">Select</option>
                            { this.state.CityData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br/>

                    <label className='addCompany_pincode_lable'>Enter Pincode:
                    </label>
                        <input type="number" className='addCompany_pincode' placeholder="Enter pincode" name="pincode" value={this.state.pincode} onChange={this.handleChange} required />
                    <br/>

                    <label className='addCompany_companyWebsite_lable'>Company website:</label>
                    <Form.Group className="mb-3" >
                        <input className='addCompany_companyWebsite' type="text" name="website" placeholder="Enter company website" value={this.state.website} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_companyEmail_lable'>Company email:</label>
                    <Form.Group className="mb-3" >
                        <input type="email" className='addCompany_companyEmail' name="email" placeholder="Enter company email" value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_contactPerson_lable'>Contact person:</label>
                    <Form.Group className="mb-3" >
                        <input type="text" className='addCompany_contactPerson' name="contact_person" placeholder="Contact person name" value={this.state.contact_person} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_contactNo_lable'>Contact number:</label>
                    <Form.Group className="mb-3" >
                        <input type="number" className='addCompany_contactNo' name="contact_number" placeholder="Contact person number" value={this.state.contact_number} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_pancard_lable'>PAN card number:</label>
                    <Form.Group className="mb-3" >
                        <input type="text" className='addCompany_pancard' name="pancard_number" placeholder="Company PAN card no." value={this.state.pancard_number} onChange={this.handleChange} />
                    </Form.Group>

                    <br/>

                    <label className='addCompany_gst_lable'>GST number:</label>
                    <Form.Group className="mb-3" >
                        <input type="text" className='addCompany_gst' name="gst_number" placeholder="Company GST no." value={this.state.gst_number} onChange={this.handleChange} />
                    </Form.Group>

                    <br/>

                    <label className={this.state.company!==' '?'addCompany_cin_lable_edit':'addCompany_cin_lable'}>CIN number:</label>
                    <Form.Group className="mb-3" >
                        <input className={this.state.company!==' '?'addCompany_cin_edit':'addCompany_cin'} type="text" name="cin_number" placeholder="Company CIN no." value={this.state.cin_number} onChange={this.handleChange} required />
                    </Form.Group>
                    
                    <br />
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
                    <div className={this.state.company===' '?'addCompany_buttons':'addCompany_buttons_edit'}>
                        <button className='save_company' type="submit">
                            Save
                        </button>&nbsp;&nbsp;
                        {this.state.company === " "?
                            <Link to={{pathname: "/companies"}}><button className='cancel_company' type="cancel">
                                Cancel
                            </button></Link>
                            : <button className='cancel_company' type="cancel" onClick={() => {this.cancel()}}>
                            Cancel
                            </button> 
                        }
                    </div>
                    </div>
                </form>
            </div>
            
        )
    }
}

