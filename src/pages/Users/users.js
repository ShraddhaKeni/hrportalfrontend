import {Component} from 'react';
import axios from 'axios';
import { Table, button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddUsers from './addUsers';
import ViewUsers from './viewUsers';
import './style/viewUsers.css'
import Pagination from '../../components/paginate/Pagination';
import Navbar from '../../components/Navbar';

const initialState = {
    users: [],
    isEdit: false,
    isView: false,
    editValue: null,
    currentPage:1,
    postPerPage:12,
    currentPosts:[],
}

export default class Users extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3001/users/findAll').then(response => {
            this.setState({
                users: response.data.data
            });
        }).then(()=>{
            const indexOfLast = (this.state.currentPage*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.users.slice(indexOfFirst,indexOfLast)});
            
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
    paginate =(pageNumber)=>{
           
        const page = pageNumber;
        console.log(page)
        const totalPages = (this.state.users.length/this.state.postPerPage)
        if(page<1)
        {
            this.setState({currentPage:1})
            const indexOfLast = (1*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.users.slice(indexOfFirst,indexOfLast)});
        }
        else{
            this.setState({currentPage:page})
            const indexOfLast = (page*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.users.slice(indexOfFirst,indexOfLast)});
        }
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddUsers id={this.state.editValue} />
            )
        }else if(this.state.isView === true){
            return (
                <ViewUsers id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <>
                <Navbar/>
                <div className='mainViewDesignation'>
                <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Users</h1></b></div>
                    <div style={{marginLeft: '18%'}}><Link to={{ pathname: "/add-users" }}><button className='viewAddDesignationButton btn btn-primary'>Add User</button></Link></div>
                    </div>

                    <div className='viewDesignationContainer table-responsive' style={{width:'60vw', marginLeft:'28%'}}>
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact no.</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                this.state.currentPosts.map((user,index) => (
                                    <tr key={user.id}>
                                        <td scope="row">{this.state.currentPage<=2?(this.state.currentPage-1)*12+(index+1):(this.state.currentPage-1+1)+(index+1)}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact_no}</td>
                                            {
                                                user.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <button className='users_edit' onClick={() => {this.editClicked(user.id)}} >
                                                Edit 
                                            </button> 
                                        </td>
                                        <td> 
                                            <button className='user_view'  onClick={() => {this.viewClicked(user.id)}} >
                                                View 
                                            </button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                        </tbody>
                    </table>
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.users.length} paginate={this.paginate} currentPage={this.state.currentPage}/>

                    </div>
                </div>
                </>
            )
        }
    }
}