import {Component} from 'react';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddDesignation from './addDesignation';
import './styles/Designation.css'
import Navbar from '../../components/Navbar';

const initialState = {
    designations: [],
    isEdit: false,
    editValue: null,
}
export default class Designation extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/designation/findAll').then(response => {
            this.setState({
                designations: response.data.data
            });
        });

    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async deleteDesignation(id){
        const status = {
            status:false
        }
        const deleted = await axios.patch(`http://localhost:3000/designation/update/${id}`,status,{
            'Content-type':'application/json'
        })
        window.location.reload();
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddDesignation id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <>
              <Navbar/>
                <div className='mainViewDesignation'>
                    <span ><Link to={{ pathname: "/add-designation" }}><button className='viewAddDesignationButton'>Add Designation</button></Link></span>
                    <div className='viewDesignationContainer'>
                    <table className='table_viewDesignation'>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                    <hr className='hr_viewtagdesignation'/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.designations.map((design) => (
                                    <tr key={design.id}>
                                        <td>{srno++}</td>
                                        <td>{design.name}</td>
                                            {
                                                design.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                        <Button className='deleteButton' style={{marginRight:'10px'}} onClick={() => {this.deleteDesignation(design.id)}} >
                                                Delete 
                                            </Button> 
                                            <Button className='editButton' onClick={() => {this.editClicked(design.id)}} >
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