import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addlevel.css'
import Navbar from '../../components/Navbar';

export default class AddLeveltype extends Component {
  constructor(props){
    super(props)
    this.state = {
      level: this.props.id? this.props.id : " ",
      status: "true",
      name: "",
    }
  }  

  componentDidMount(){
    if(this.state.level !== " "){
        axios.get(`http://localhost:3000/level-types/${this.state.level}`).then(response => {
          this.setState({
              name: response.data.data.name
          });
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    var level = {}
    
    this.state.level === " " ? 
      level = {
        name: this.state.name,
      }
    : level = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.level === " "? this.addLeveltype(level) : this.editLeveltype(level)
  }

  addLeveltype(level){
    axios.post(`http://localhost:3000/level-types/add`, level ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.history.back()
    })
  }

  editLeveltype(level){
    const isBool = level.status.toString().toLowerCase()=='true'
        const data = {
            name:level.name,
            status:isBool
        }
    axios.patch(`http://localhost:3000/level-types/`+this.state.level, data ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  cancel(){
    window.location.reload()
  }

  render() {

    return (
      <>
      <Navbar/>
     
      <div className="mainAddDesignation">
      {/* {this.state.design === " "? <h2>Add Level type</h2> : <h2>Edit Level type</h2>} */}
        <Form onSubmit={this.handleSubmit}>

       {this.state.level==" "?<label  className='EDNameLabel'>Enter level type name:</label>:<label  className='EDNameLabel'>Enter level type name:</label>} 
          <Form.Group className="mb-3" >
              {this.state.level==' '?<input type="text" name="name"  className='EDNInPut' placeholder="Enter level type name" value={this.state.name} onChange={this.handleChange} required />
                :<input type="text" name="name"  className='EDNInPut' placeholder="Enter level type name" value={this.state.name} onChange={this.handleChange} required />}
          </Form.Group>
          
          <br />
          {this.state.level !== " "?
            <label style={{marginLeft:"80px"}}>Select status:</label>
          :
            ""
          }
          {this.state.level !== " "?
            <Form.Group className="mb-3">
                <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                    <option>Select</option>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>
            </Form.Group>
          :
            " "
          }

          <br/>
          {this.state.level==' '?<Button className='SaveButton'  type="submit">
              Save
          </Button>:<Button className='SaveButton'  type="submit">
              Save
          </Button>}
          &nbsp;&nbsp;
          {this.state.level === " "?
              <Link to={{pathname: "/leveltype"}}><Button  className='CancelButton' type="cancel">
                  Cancel
              </Button></Link>
            : <Button  type="cancel" className='CancelButton' onClick={() => {this.cancel()}}>
              Cancel
              </Button> 
          }
         <br/>
        </Form>
      </div>

      </>
    )
  }
}
