import {Component} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddDepartment from './addDepartment';
import Navbar from '../../components/Navbar';

const initialState = {
    departments: [],
    isEdit: false,
    editValue: null,
    
}
export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('/departments/viewall').then(response => {
            this.setState({
                departments: response.data.data
            });
        });//

    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async deleteClicked(id)
    {
        const status = {
            status:false
        }
        const data = await axios.patch(`/departments/${id}`,status,{
            'Content-type':'application/json'
        })
        window.location.reload()
    }
    async activateClicked(id)
    {
        const status = {
            status:true
        }
        const data = await axios.patch(`/departments/${id}`,status,{
            'Content-type':'application/json'
        })
        window.location.reload()
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddDepartment id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <>
                <Navbar/>
                <div className='mainViewDesignation'>
                <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Department</h1></b></div>
                    <div><Link to={{ pathname: "/add-department" }}><button className='viewAddDesignationButton btn btn-primary'>Add Department</button></Link></div>
                    </div>
              
                    {/* <h2>Departments <span style={{float:'right'}}><Link to={{ pathname: "/add-department" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2> */}
                    
                    <div className='viewDesignationContainer table-responsive'>
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                           
                        </thead>
                        <tbody>
                            {
                                this.state.departments.map((depart) => (
                                    <tr key={depart.id}>
                                        <td scope="row">{srno++}</td>
                                        <td>{depart.name}</td>
                                            {
                                                depart.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }

                                            <br></br>
                                        <td> 
                                            {depart.status==true?<Button className='role_delete' onClick={() => {this.deleteClicked(depart.id)}} >
                                                Delete
                                            </Button> :<Button className='role_edit' onClick={() => {this.activateClicked(depart.id)}} >
                                                Activate
                                            </Button>}
                                            <Button className='role_edit' onClick={() => {this.editClicked(depart.id)}} >
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