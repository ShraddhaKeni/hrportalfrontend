import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCompanies from './addCompanies';
import ViewCompanies from './viewCompany';

const initialState = {
    companies: [],
    isEdit: false,
    isView: false,
    editValue: null,
}

export default class Companies extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){    
        axios.get('http://localhost:3000/companies').then(response => {
            this.setState({
                companies: response.data.data
            });
        });
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }

    viewClicked(id){
        this.setState({
            isView: true,
            editValue: id,
        })
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddCompanies id={this.state.editValue} />
            )
        }else if(this.state.isView === true){
            return (
                <ViewCompanies id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Companies <span style={{float:'right'}}><Link to={{ pathname: "/add-companies" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Company name</th>
                                <th>Address</th>
                                <th>Webiste</th>
                                <th>Status</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.companies.map((company) => (
                                    <tr key={company.id}>
                                        <td>{srno++}</td>
                                        <td>{company.name}</td>
                                        <td>{company.address}</td>
                                        {
                                            company.website === null? <td> - </td> 
                                            : <td> {company.website} </td>
                                        }
                                        {
                                            company.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                            : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                        }
                                        <td> 
                                            <Button variant="info" onClick={() => {this.viewClicked(company.id)}} >
                                                View 
                                            </Button> 
                                        </td>
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(company.id)}} >
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