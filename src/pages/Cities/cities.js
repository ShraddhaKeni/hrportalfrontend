import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCities from './addCities';
import Navbar from '../../components/Navbar';

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
                <>  
                <Navbar/>      
                    <div className='mainViewDesignation'>
                    <span ><Link to={{ pathname: "/add-city" }}><button className='viewAddDesignationButton btn btn-primary'>Add City</button></Link></span>
                    {/* <h2> <span style={{float:'right'}}><Link to={{ pathname: "/add-city" }}><button className='viewAddCitiesButton'>Add City<span style={{fontSize:18, color:"white"}}></span></button></Link></span></h2> */}
                    <div className='viewDesignationContainer'>
                    <table className='table table-sm'>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">State</th>
                                <th scope="col">City</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cities.map((city) => (
                                    <tr key={city.id}>
                                        <td scope="row">{srno++}</td>
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
                </>

            )
        }
    }
}