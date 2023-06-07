import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './styles/viewEachCompany.css';
import './styles/viewCompanies.css'
import Navbar from '../../components/Navbar';

export default class ViewCompanies extends Component {
  constructor(props){
    super(props)
    this.state = {
      company_id: this.props.id,
      company: [],
      country: "",
      state: "",
      city: "",
    }
  }  

  componentDidMount(){
    axios.get('/companies/'+this.state.company_id).then(response => {
        this.setState({
            company: response.data.data
        });
        axios.get('/countries/'+this.state.company.country_id).then(country_res =>{
            this.setState({
                country: country_res.data.data.name
            });
        });
        axios.get('/states/'+this.state.company.state_id).then(state_res =>{
            this.setState({
                state: state_res.data.data.name
            });
        });
        axios.get('/cities/'+this.state.company.city_id).then(city_res =>{
            this.setState({
                city: city_res.data.data.name
            });
        });
    });
  }

  goBack(){
    window.location.reload()
  }

  render() {

    return (
        <>
        <Navbar/>
        <div className='mainViewDesignation'>
        <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>View Companies</h1></b></div>
                    <div style={{marginLeft:'2%'}}><button className='viewAddDesignationButton btn btn-primary' onClick={() => {this.goBack()}}>Back</button></div>
                    </div>
        
            <div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }} className='companies_table_container'>
            <table className='companies_table'>
                <tbody>
                    <tr className='left'>
                        <th style={{textAlign:'left'}}>Name:</th>
                        <td>{this.state.company.name}</td>
                    </tr>
                
                    <tr className='left'>
                        <th>Address: </th>
                        <td>{this.state.company.address}</td>
                    </tr>
                    <tr className='left'>
                        <th>Country: </th>
                        <td>{this.state.country}</td>
                    </tr>
                    <tr className='left'>
                        <th>State: </th>
                        <td>{this.state.state}</td>
                    </tr>
                    <tr className='left'>
                        <th>City: </th>
                        <td>{this.state.city}</td>
                    </tr>
                    <tr className='left'>
                        <th>Pincode: </th>
                        <td>{this.state.company.pincode}</td>
                    </tr>
                    <tr className='left'>
                        <th>Website: </th>
                        {
                            this.state.company.website === null? <td> - </td> 
                            : <td> {this.state.company.website} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>Email: </th>
                        <td>{this.state.company.email}</td>
                    </tr>
                    <tr className='left'>
                        <th>Contact person: </th>
                        <td>{this.state.company.contact_person}</td>
                    </tr>
                    <tr className='left'>
                        <th>Contact no.: </th>
                        <td>{this.state.company.contact_number}</td>
                    </tr>
                    <tr className='left'>
                        <th>PAN card no.: </th>
                        {
                            this.state.company.pancard_number === null? <td> - </td> 
                            : <td> {this.state.company.pancard_number} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>GST no.: </th>
                        {
                            this.state.company.gst_number === null? <td> - </td> 
                            : <td> {this.state.company.gst_number} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>CIN no.: </th>
                        <td>{this.state.company.cin_number}</td>
                    </tr>
                    <tr className='left'>
                        <th>Status: </th>
                        {
                            this.state.company.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                            : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>Created on: </th>
                        <td>{this.state.company.createdAt}</td>
                    </tr>
                </tbody>
            </table>
            </div >
        </div>
        </>
    )
  }
}
