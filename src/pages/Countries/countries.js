import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCountries from './addCountries';
import './styles/Countries.css'

const initialState = {
    countries: [],
    isEdit: false,
    editValue: null,
}

export default class Countries extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:3000/countries').then(response => {
            this.setState({
                countries: response.data.data
            });
        });
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async changeStatus(id,status)
    {
        var statuscode = status.toString().toLowerCase()=='true'
        const data = {
            status:!statuscode
        }
        console.log(data)
        const requestChangeStatus= await axios.patch(`http://localhost:3000/countries/${id}`,data,{
            'Content-type':'application/json'
        })
        window.location.reload()
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddCountries id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='mainViewCountry'>
                    <h2> <span style={{float:'right'}}><Link to={{ pathname: "/add-country" }}><button className='viewAddCountryButton'>Add Country<span style={{fontSize:18, color:"white"}}></span></button></Link></span></h2>
                    <div className='viewCountryContainer'>
                    <table className='table_viewcountry'>
                        <thead >
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                    <hr className='hr_tag'/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.countries.map((country) => (
                                    <tr key={country.id}>
                                        <td>{srno++}</td>
                                        <td>{country.name}</td>
                                            {
                                                country.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td>
                                            {country.status!=false?<Button className='deleteButton' onClick={() => {this.changeStatus(country.id,country.status)}} >
                                                Delete 
                                            </Button> :<Button className='deleteButton' onClick={() => {this.changeStatus(country.id,country.status)}} >
                                                Activate 
                                            </Button> }
                                            <Button className='editButton' onClick={() => {this.editClicked(country.id)}} >
                                                Edit 
                                            </Button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                        </tbody>
                    </table>
                </div>
                </div>
            )
        }
    }
}