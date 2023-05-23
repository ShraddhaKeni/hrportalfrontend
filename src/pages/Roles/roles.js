import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddRoles from './addRoles';


import './style/roles.css'
import Pagination from '../../components/paginate/Pagination';

const initialState = {
    roles: [],
    isEdit: false,
    editValue: null,
    currentPage:1,
    postPerPage:12,
    currentPosts:[],
}

export default class Roles extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        // axios.get('http://10.201.10.191:3000/roles').then(response => {
        axios.get('http://localhost:3001/roles').then(response => {
            this.setState({
                roles: response.data.data
            });
        }).then(()=>{
            const indexOfLast = (this.state.currentPage*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.roles.slice(indexOfFirst,indexOfLast)});
        });
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async deleteRole(id,status)
    {
        const data = {
            status:!status
        }
        const deleted = axios.patch(`http://localhost:3001/roles/${id}`,data,{
            'Content-type':'application/json'
        })
        window.location.reload();
    }
    paginate =(pageNumber)=>{
           
        const page = pageNumber;
        console.log(page)
        const totalPages = (this.state.roles.length/this.state.postPerPage)
        if(page<1)
        {
            this.setState({currentPage:1})
            const indexOfLast = (1*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.levels.slice(indexOfFirst,indexOfLast)});
        }
        else{
            this.setState({currentPage:page})
            const indexOfLast = (page*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.levels.slice(indexOfFirst,indexOfLast)});
        }
    }
    render(){
        if(this.state.isEdit === true){
            return (
                <AddRoles id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2 style={{marginLeft:'-40px'}}>Roles</h2>
                    <h2><span><Link to={{ pathname: "/add-roles" }}><button className='add_roles' variant='success'>Add Roles</button></Link></span></h2>
                    <div className='roles_table_container'>
                    <table className='roles_table'>
                        <thead  >
                            <tr>
                                <th style={{width:'40px'}}>Sr no.</th>
                                <th >Name</th>
                                <th style={{width:'40px'}}>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <hr className='role_line'/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.currentPosts.map((role) => (
                                    <tr key={role.id}>
                                        <td>{srno++}</td>
                                        <td>{role.name}</td>
                                            {
                                                role.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                          {role.status===true? <button whileHover={{scale:1.1}} className='role_delete' style={{marginRight:'10px'}} onClick={() => {this.deleteRole(role.id,role.status)}} >
                                                Delete 
                                            </button> :<button whileHover={{scale:1.1}} className='role_delete' style={{marginRight:'10px'}} onClick={() => {this.deleteRole(role.id,role.status)}} >
                                                Activate 
                                            </button> }  
                                            <button whileHover={{scale:1.1}} className='role_edit' onClick={() => {this.editClicked(role.id)}} >
                                                Edit 
                                            </button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                        </tbody>
                    </table>
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.roles.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
                    

                    </div>
                </div>
            )
        }
    }
}