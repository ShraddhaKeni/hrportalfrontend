import {Component} from 'react';
import axios from 'axios';
import { Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddDocumenttype from './addDocumenttype';
import Navbar from '../../components/Navbar';

const initialState = {
    documents: [],
    isEdit: false,
    editValue: null,
}

export default class Documenttype extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('/document-type/findAll').then(response => {
            this.setState({
                documents: response.data.data
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
        const tobool = status.toString().toLowerCase()=='true'
        const data = {
            status:!tobool
        }
        const requestChangeStatus = await axios.patch(`/document-type/update/${id}`,data,{
            'Content-type':'application.json'
        })
        window.location.reload()
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddDocumenttype id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <>
                <Navbar/>
                <div className='mainViewDesignation'>
                <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Document</h1></b></div>
                    <div style={{marginLeft:'3%'}}><Link to={{ pathname: "/add-documenttype"}}><button className='viewAddDesignationButton btn btn-primary'>Add Document</button></Link></div>
                    </div>
               
                    {/* <h2>Document types <span style={{float:'right'}}><Link to={{ pathname: "/add-documenttype" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2> */}
                    <div className='viewDesignationContainer table-responsive'>
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.documents.map((doc) => (
                                    <tr key={doc.id}>
                                        <td scope="row">{srno++}</td>
                                        <td>{doc.name}</td>
                                            {
                                                doc.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                           {doc.status!=false?<Button className='role_delete' onClick={() => {this.changeStatus(doc.id,doc.status)}} >
                                                Delete 
                                            </Button> :<Button className='role_edit' onClick={() => {this.changeStatus(doc.id,doc.status)}} >
                                                Activate 
                                            </Button>} 
                                            <Button className='role_edit' onClick={() => {this.editClicked(doc.id)}} >
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