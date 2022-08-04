import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddLeveltype from './addLeveltype';

const initialState = {
    levels: [],
    isEdit: false,
    editValue: null,
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

    render(){
        if(this.state.isEdit === true){
            return (
                <AddLeveltype id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Level types <span style={{float:'right'}}><Link to={{ pathname: "/add-leveltype" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
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
                                this.state.levels.map((level) => (
                                    <tr key={level.id}>
                                        <td>{srno++}</td>
                                        <td>{level.name}</td>
                                            {
                                                level.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            {level.status==true?<Button variant="danger" style={{marginRight:'10px'}} onClick={() => {this.changeStatus(level.id,level.status)}} >
                                                Delete 
                                            </Button>:<Button variant="primary" style={{marginRight:'10px'}} onClick={() => {this.changeStatus(level.id,level.status)}} >
                                                Activate 
                                            </Button>  }
                                            <Button variant="info" style={{marginRight:'10px'}} onClick={() => {this.editClicked(level.id)}} >
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