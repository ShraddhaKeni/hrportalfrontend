import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddStates from './addStates';
import './styles/States.css'
import Navbar from '../../components/Navbar';

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
    async changeStatus(id,status)
    {
        const change = {
            status:!status
        }
        console.log(change)
        const requestStatusChange = await axios.patch(`http://localhost:3000/states/${id}`,change,{
            'Content-type':'application/json'
        })
        window.location.reload();
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddStates state={this.state.stateValue} country={this.state.countryValue} />
            )
        }else{
            var srno = 1
            return(
                <>
                <Navbar/>
                <div className='mainViewDesignation'>
                <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>States</h1></b></div>
                    <div style={{marginLeft: '25%'}}><Link to={{ pathname: "/add-state" }}><button className='viewAddDesignationButton btn btn-primary'>Add State</button></Link></div>
                    </div>
               
             
                    {/* <h2> <span style={{float:'right'}}><Link to={{ pathname: "/add-state" }}><button className='viewAddStateButton'>Add State<span style={{fontSize:18, color:"white"}}></span></button></Link></span></h2> */}
                    <div className='viewDesignationContainer table-responsive' style={{width:'60vw'}}>
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Country</th>
                                <th scope="col">State</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.statesData.map((state) => (
                                    <tr key={state.id}>
                                        <td scope="row">{srno++}</td>
                                        <td>{this.getCountry(state.country_id)}</td>
                                        <td>{state.name}</td>
                                            {
                                                state.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                           {state.status!=false?<Button className='deleteButton' onClick={() => {this.changeStatus(state.id,state.status)}}>
                                                Delete 
                                            </Button>:<Button className='deleteButton' onClick={() => {this.changeStatus(state.id,state.status)}}>
                                                Activate
                                            </Button>}
                                            <Button className='editButton' onClick={() => {this.editClicked(state.id, state.country_id)}} >
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