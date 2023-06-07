import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCompanies from './addCompanies';
import ViewCompanies from './viewCompany';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/paginate/Pagination';

const initialState = {
    companies: [],
    isEdit: false,
    isView: false,
    editValue: null,
    currentPage:1,
    postPerPage:12,
    currentPosts:[],
   
}

export default class Companies extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
       
    }


    componentDidMount(){    
        axios.get('/companies').then(response => {
            this.setState({
                companies: response.data.data
            })
            
        }).then(()=>{
            const indexOfLast = (this.state.currentPage*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.companies.slice(indexOfFirst,indexOfLast)});
            
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

    async changeStatus(id,status)
    {
        const data ={
            status:!status
        }
        const requestChange = await axios.patch(`/companies/${id}`,data,{
            'Content-type': 'application/json'
        })
        window.location.reload();
    }



    paginate =(pageNumber)=>{
           
        const page = pageNumber;
        console.log(page)
        const totalPages = (this.state.companies.length/this.state.postPerPage)
        if(page<1)
        {
            this.setState({currentPage:1})
            const indexOfLast = (1*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.companies.slice(indexOfFirst,indexOfLast)});
        }
        else{
            this.setState({currentPage:page})
            const indexOfLast = (page*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.companies.slice(indexOfFirst,indexOfLast)});
        }
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
            
            return(
                <>
                <Navbar/>
                <div className='mainViewDesignation'>
                    {console.log(this.state.currentPosts)}
                    <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Companies</h1></b></div>
                    <div style={{marginLeft:'9%'}}><Link to={{ pathname: "/add-companies"}}><button className='viewAddDesignationButton btn btn-primary'>Add Company</button></Link></div>
                    </div>

                    <div className='viewDesignationContainer table-responsive' style={{width:'60vw', marginLeft:'30%'}}>
                    <table className='table table-sm table-hover' responsive >
                        <thead  >
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Webiste</th>
                                <th scope="col">Status</th>
                                <th scope="col" >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.currentPosts.map((company,index) => (
                                   
                                   
                                    <tr key={company.id}>
                                        <td scope="row" >{this.state.currentPage<=2?(this.state.currentPage-1)*12+(index+1):(this.state.currentPage-1+1)+(index+1)}</td>
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
                                            <button className='comapnies_edit' onClick={() => {this.viewClicked(company.id)}} >
                                                View 
                                            </button> 
                                        </td>
                                        <td>
                                        <div style={{display:'flex'}}>
                                           {company.status!=false?<button className='companies_action' style={{marginRight:'10px'}} onClick={() => {this.changeStatus(company.id,company.status)}} >
                                                Delete 
                                            </button> : <button className='companies_action' onClick={() => {this.changeStatus(company.id,company.status)}} >
                                                Activate 
                                            </button>} 
                                            <button className='comapnies_edit' onClick={() => {this.editClicked(company.id)}} >
                                                Edit 
                                            </button> 
                                        </div>
                                        </td>
                
                                    </tr>
                                    
                                    
                                ))}
                        </tbody>
                    </table>
                    
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.companies.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
                    </div>
                </div>
                </>
            )
        }
    }
}