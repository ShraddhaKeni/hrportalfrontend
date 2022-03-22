import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddStates from './addStates';

const initialState = {
    statesData: [],
    countries: [],
    isEdit: false,
    stateValue: null,
    countryValue: null,
}

export default class States extends Component{
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

        axios.get('http://localhost:3000/countries').then(response => {
            this.setState({
                countries: response.data.data
            });
        });
    }

    getCountry(id){
        var country = this.state.countries.find(x => x.id === id)
        if (country != null) {
            return country.name
        } else {
            return false
        }
    }

    editClicked(sid, cid){
        this.setState({
            isEdit: true,
            stateValue: sid,
            countryValue: cid,
        })
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddStates state={this.state.stateValue} country={this.state.countryValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>States <span style={{float:'right'}}><Link to={{ pathname: "/add-state" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Country</th>
                                <th>State</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.statesData.map((state) => (
                                    <tr key={state.id}>
                                        <td>{srno++}</td>
                                        <td>{this.getCountry(state.country_id)}</td>
                                        <td>{state.name}</td>
                                            {
                                                state.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(state.id, state.country_id)}} >
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