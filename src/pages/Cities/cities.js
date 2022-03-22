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

    render(){
        if(this.state.isEdit === true){
            return (
                <AddCities city={this.state.cityValue} state={this.state.stateValue}  />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Cities <span style={{float:'right'}}><Link to={{ pathname: "/add-city" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Status</th>
                                <th>Action</th>
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
                                            <Button variant="info" onClick={() => {this.editClicked(city.id, city.state_id)}} >
                                                Edit 
                                            </Button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}