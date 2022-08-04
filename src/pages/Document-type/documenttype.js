import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddDocumenttype from './addDocumenttype';

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
        
        axios.get('http://localhost:3000/document-type/findAll').then(response => {
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
        const requestChangeStatus = await axios.patch(`http://localhost:3000/document-type/update/${id}`,data,{
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
                <div className='main'>
                    <h2>Document types <span style={{float:'right'}}><Link to={{ pathname: "/add-documenttype" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.documents.map((doc) => (
                                    <tr key={doc.id}>
                                        <td>{srno++}</td>
                                        <td>{doc.name}</td>
                                            {
                                                doc.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                           {doc.status!=false?<Button variant="danger" onClick={() => {this.changeStatus(doc.id,doc.status)}} >
                                                Delete 
                                            </Button> :<Button variant="primary" onClick={() => {this.changeStatus(doc.id,doc.status)}} >
                                                Activate 
                                            </Button>} 
                                            <Button variant="info" onClick={() => {this.editClicked(doc.id)}} >
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