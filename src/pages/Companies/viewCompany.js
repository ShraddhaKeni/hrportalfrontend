import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

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
    axios.get('http://localhost:3000/companies/'+this.state.company_id).then(response => {
        this.setState({
            company: response.data.data
        });
        axios.get('http://localhost:3000/countries/'+this.state.company.country_id).then(country_res =>{
            this.setState({
                country: country_res.data.data.name
            });
        });
        axios.get('http://localhost:3000/states/'+this.state.company.state_id).then(state_res =>{
            this.setState({
                state: state_res.data.data.name
            });
        });
        axios.get('http://localhost:3000/cities/'+this.state.company.city_id).then(city_res =>{
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
        <div className='main'>
            <h2>
                <span style={{float:"left"}}><Button variant='warning' onClick={() => {this.goBack()}}><b>Back</b></Button></span> Company details</h2>
            <Table bordered striped>
                <tbody>
                    <tr className='left'>
                        <th>Name: </th>
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
            </Table>
        </div>
    )
  }
}