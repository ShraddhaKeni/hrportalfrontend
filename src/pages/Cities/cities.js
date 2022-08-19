import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCities from './addCities';

const initialState = {
    statesData: [],
    cities: [],
    isEdit: false,
    stateValue: null,
    cityValue: null,
}

export default class Cities extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:3000/states').then(response => {
            this.setState({
                statesData: response.data.data
            });
        });

        axios.get('http://localhost:3000/cities').then(response => {
            this.setState({
                cities: response.data.data
            });
        });
    }

    getState(id){
        var state = this.state.statesData.find(x => x.id === id)
        if (state != null) {
            return state.name
        } else {
            return false
        }
    }

    editClicked(cid, sid){
        this.setState({
            isEdit: true,
            cityValue: cid,
            stateValue: sid,
        })
    }
    async changeStatus(id,status)
    {
        const change = {
            status:!status
        }
        console.log(change)
        const requestStatusChange = await axios.patch(`http://localhost:3000/cities/${id}`,change,{
            'Content-type':'application/json'
        })
        window.location.reload();
    }
    render(){
        if(this.state.isEdit === true){
            return (
                <AddCities city={this.state.cityValue} state={this.state.stateValue}  />
            )
        }else{
            var srno = 1
            return(
                <div className='mainViewCities'>
                    <h2> <span style={{float:'right'}}><Link to={{ pathname: "/add-city" }}><button className='viewAddCitiesButton'>Add City<span style={{fontSize:18, color:"white"}}></span></button></Link></span></h2>
                    <div className='viewCitiesContainer'>
                    <table className='table_viewCities'>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                    <hr className='hr_viewtag'/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cities.map((city) => (
                                    <tr key={city.id}>
                                        <td>{srno++}</td>
                                        <td>{this.getState(city.state_id)}</td>
                                        <td>{city.name}</td>
                                            {
                                                city.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            {city.status==true?<Button className='deleteButton' onClick={() => {this.changeStatus(city.id,city.status)}} >
                                                Delete 
                                            </Button> :<Button className='deleteButton' onClick={() => {this.changeStatus(city.id,city.status)}} >
                                                Activate
                                            </Button> }
                                            <Button className='editButton' onClick={() => {this.editClicked(city.id, city.state_id)}} >
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