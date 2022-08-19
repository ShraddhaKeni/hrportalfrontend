import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddLeveltype from './addLeveltype';
import './styles/viewLevel.css'
import {  } from 'react-icons/fa';
import Pagination from '../../components/paginate/Pagination';

const initialState = {
    levels: [],
    isEdit: false,
    editValue: null,
    currentPage:1,
    postPerPage:12,
    currentPosts:[],
}

export default class Leveltype extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/level-types').then(response => {
            this.setState({
                levels: response.data.data
            });

        }).then(()=>{
            const indexOfLast = (this.state.currentPage*this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({currentPosts:this.state.levels.slice(indexOfFirst,indexOfLast)});
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
        const change = {
            status:!status
        }
        //console.log(change)
        const requestStatusChange = await axios.patch(`http://localhost:3000/level-types/${id}`,change,{
            'Content-type':'application/json'
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
                <AddLeveltype id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main_levelTypes'>
                    <h2 style={{marginLeft:'20px',marginTop:'20px'}}>Levels</h2>
                    <Link to={{ pathname: "/add-leveltype" }}><button className='add_level'>Add Level</button></Link>
                    <div className='table_container_levelTypes'>
                    <table className='table_levelTypes'>
                        <thead className=''>
                            <tr >
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            <tr>
                                    <hr className='hr_tag'/>
                            </tr>
                        </thead>
                        
                        <tbody className='level_typeBody'>
                            {
                                this.state.currentPosts.map((level) => (
                                    <tr style={{paddingBottom:'10px'}} key={level.id}>
                                        <td>{srno++}</td>
                                        <td>{level.name}</td>
                                            {
                                                level.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            {level.status==true?<button style={{marginRight:'10px',borderRadius:'0px',border:'none' ,background: '#732B2B',color:'white'}} onClick={() => {this.changeStatus(level.id,level.status)}} >
                                                Delete 
                                            </button>:<button style={{marginRight:'10px',borderRadius:'0px',border:'none' ,background: '#732B2B',color:'white'}} onClick={() => {this.changeStatus(level.id,level.status)}} >
                                                Activate 
                                            </button>  }
                                            <button style={{marginRight:'10px',background: '#552D59',color:'white',borderRadius:'0px',border:'none'}} onClick={() => {this.editClicked(level.id)}} >
                                                Edit 
                                            </button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                                
                        </tbody>
                        
                    </table>
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.levels.length} paginate={this.paginate} currentPage={this.state.currentPage}/>

                    </div>
                </div>
            )
        }
    }
}