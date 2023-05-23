import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addlevel.css'

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
        axios.get(`http://localhost:3001/level-types/${this.state.level}`).then(response => {
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
    axios.post(`http://localhost:3001/level-types/add`, level ,
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
    axios.patch(`http://localhost:3001/level-types/`+this.state.level, data ,
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
      <div className='main_addLevel'>
       
        <form onSubmit={this.handleSubmit} className='addLevel_form'>

       {this.state.level==" "?<label className='main_lable'>Enter level type name:</label>:<label className='main_lable_edit'>Enter level type name:</label>} 
          <Form.Group className="mb-3" >
              {this.state.level==' '?<input type="text" name="name" className='level_name' placeholder="Enter level type name" value={this.state.name} onChange={this.handleChange} required />
                :<input type="text" name="name" className='level_name_edit' placeholder="Enter level type name" value={this.state.name} onChange={this.handleChange} required />}
          </Form.Group>
          
          <br />
          {this.state.level !== " "?
            <label className='level_status'>Select status:</label>
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
          {this.state.level==' '?<button className='save_level'  type="submit">
              Save
          </button>:<button className='save_level_edit'  type="submit">
              Save
          </button>}
          
          {this.state.level === " "?
              <Link to={{pathname: "/leveltype"}}><button variant="danger" className='cancel_level' type="cancel">
                  Cancel
              </button></Link>
            : <button variant="danger" type="cancel" className='cancel_level_edit' onClick={() => {this.cancel()}}>
              Cancel
              </button> 
          }
         
        </form>
      </div>
    )
  }
}
