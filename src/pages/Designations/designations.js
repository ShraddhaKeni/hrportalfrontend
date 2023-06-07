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
        
       var res = axios.get('/designation/findAll').then(response => {
        console.log(response);
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
        const deleted = await axios.patch(`/designation/update/${id}`,status,{
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
                    <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Designation</h1></b></div>
                    <div><Link to={{ pathname: "/add-designation" }}><button className='viewAddDesignationButton btn btn-primary'>Add Designation</button></Link></div>
                    </div>
                    <div className='viewDesignationContainer table-responsive'>
                    <table className='table table-sm table-hover' responsive>
                        <thead>
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.designations.map((design) => (
                                    <tr key={design.id}>
                                        <td scope="row">{srno++}</td>
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