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