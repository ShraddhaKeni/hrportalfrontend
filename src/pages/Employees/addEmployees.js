import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addEmployee.css'
import SignatureCanvas from 'react-signature-canvas'
export default class AddEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: this.props.id ? this.props.id : " ",
            name: "",
            comp_id: "",
            user_id: "",
            desig_id: "",
            dept_id: "",
            email: "",
            doj: null,
            signature: "",
            emp_code: "",
            CompData: [],
            UserData: [],
            DeptData: [],
            DesignData: [],
            status: "true",
            error: "",
            openCanvas:false,
            upload:false,
            sign_status:false,
            blob:null,
        }
    }

    sigCanvas = React.createRef([])

    componentDidMount() {
        if (this.state.employee !== " ") {
            axios.get('/employees/' + this.state.employee).then(response => {
                this.setState({
                    name: response.data.data.name,
                    comp_id: response.data.data.comp_id,
                    user_id: response.data.data.user_id,
                    desig_id: response.data.data.desig_id,
                    dept_id: response.data.data.dept_id,
                    email: response.data.data.email,
                    doj: response.data.data.doj,
                    signature: response.data.data.signature,
                    emp_code: response.data.data.emp_code,
                    status: response.data.data.status,
                });
            });
        }

       

        axios.get('/companies').then(response => {
            this.setState({
                CompData: response.data.data
            });
        });

        axios.get('/users/findAll').then(response => {
            this.setState({
                UserData: response.data.data
            });
        });

        axios.get('/departments/viewall').then(response => {
            this.setState({
                DeptData: response.data.data
            });
        });

        axios.get('/designation/findAll').then(response => {
            this.setState({
                DesignData: response.data.data
            });
        });
    }

    handleChange = event => {
        this.setState({...this.state, [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const isBool = this.state.status.toString().toLowerCase()=='true'
        var employee = {}
        this.state.employee === " " ?
            employee = {
                name: String(this.state.name),
                comp_id: String(this.state.comp_id),
                user_id: String(this.state.user_id),
                desig_id: parseInt(this.state.desig_id),
                dept_id: parseInt(this.state.dept_id),
                email: this.state.email,
                status:true,
                doj: this.state.doj,
                signature: this.state.signature,
                emp_code: this.state.emp_code,

            }
            : employee = {
                name: String(this.state.name),
                comp_id: String(this.state.comp_id),
                user_id: String(this.state.user_id),
                desig_id: parseInt(this.state.desig_id),
                dept_id: parseInt(this.state.dept_id),
                email: this.state.email,
                doj: this.state.doj,
                signature: this.state.signature,
                emp_code: this.state.emp_code,
                status: isBool,
            }

        this.state.employee === " " ? this.addEmployee(employee) : this.editEmployee(employee)
  
    }

    addEmployee(employee) {
        let formData= new FormData()
        for(let input of Object.keys(employee))
            {
                if(input=='status'||input=='signature')
                {
                    continue;
                }
                else
                {
                   formData.append(input,employee[input]);
                }
              
            }
        formData.append('status',this.state.status===true?'true':'false');
        if(this.state.sign_status)
        {
            formData.append('signature',this.state.blob,`${this.state.name}-signature.png`);
        }
        else
        {
            formData.append('signature',this.state.signature,this.state.signature.name);
        }
       
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post(`http://localhost:3000/employees/create`, formData,
           config).then(res => {
                console.log("printing result: ")
                console.log(res)
                // window.location.reload()
            }).catch((error) => {
                if (error.request) {
                    var err2 = new Error(error.request.response)
                    alert(JSON.parse(err2.message).message[0])
                    // window.location.reload()
                }
            });
    }

    editEmployee(employee) {
       
        if(this.state.upload)
        {
           
            let formData= new FormData()
            for(let input of Object.keys(employee))
            {
                if(input=='status'||input=='signature')
                {
                    continue;
                }
                else
                {
                   formData.append(input,employee[input]);
                }
              
            }
            if(this.state.sign_status)
            {
                formData.append('signature',this.state.blob,`${this.state.name}-signature.png`)
            }
            else
            {
                formData.append('signature',this.state.signature,this.state.signature.name)
            }
            formData.append('status',this.state.status===true?'true':'false')
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
           
            
            axios.post(`/employees/update/${this.state.employee}`,formData,config)
                .then(res=>{
                    alert('Employee Updated')
                    window.location.reload()
                })
                .catch(err=>{
                    alert(err)
                })
    
        }

        else
        {
            axios.patch(`/employees/` + this.state.employee, employee,
            {
                'Content-type': 'application/json'
            }).then(res => {
                // window.location.reload()
            }).catch((error) => {
                if (error.request) {
                    var err2 = new Error(error.request.response)
                    alert(JSON.parse(err2.message).message[0])
                }
            });
        }




        
    }

    cancel() {
        window.location.reload()
    }

    renderSignatureCanvas()
    {
        return(
              <div className="modalContainer">
                <div className="modal">
                  <div className="modal__bottom">
                    <button type='button' onClick={()=>this.setState({openCanvas:false})}>Cancel</button>
                    <button type='button' onClick={()=>this.sigCanvas.current.clear()}>Clear</button>
                    <button type='button' onClick={()=>this.saveCanvas()}>Save</button>
                  </div>                  
                  <SignatureCanvas ref={this.sigCanvas} penColor="black" canvasProps={{ className: "sigCanvas" }} />
                </div>
              </div>
            //  {openModel &&  }
        )
    }

    handleFile=(e)=>{
       let image = e.target.files[0]
       if(image.type=='image/png'||image.type=='image/jpg')
       {
        this.setState({sign_status:false})
        this.setState({upload:true})
        this.setState({signature:image})
       }
    }

    saveCanvas=()=>{
        let url = this.sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"); //for json
        let canvas = this.sigCanvas.current.getCanvas() //for formdata
        this.setState({sign_status:true})
        canvas.toBlob(blob=>{
            this.setState({blob:blob})
            this.setState({openCanvas:false})
        })
    }

    render() {
        return (
            <div className='main'>
                {this.state.employee === " " ? <h2>Add employee details</h2> : <h2>Edit employee details</h2>}
                <h4 className='errorMsg'>{this.state.error}</h4>
               
                <form className={this.state.employee===' '?'addEmployee_form':'addEmployee_form_edit'} onSubmit={this.handleSubmit}>
                    <div className='addEmployee_container'>
                    <label className='addEmployee_name_lable'>Name: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <input className='addEmployee_name' type="text" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label className='addEmployee_company_lable'>Choose company: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="addEmployee_company" name="comp_id" value={this.state.comp_id} onChange={this.handleChange} required>
                            <option >Select company</option>
                            {this.state.CompData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label className='addEmployee_user_lable'>Choose user: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="addEmployee_user" name="user_id" value={this.state.user_id} onChange={this.handleChange} required>
                            <option >Select user</option>
                            {this.state.UserData.map((e) => (
                                <option value={e.id} key={e.id}>{e.username}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label className='addEmployee_designation_lable'>Choose designation: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="addEmployee_designation" name="desig_id" value={this.state.desig_id} onChange={this.handleChange} required>
                            <option >Select</option>
                            {this.state.DesignData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label className='addEmployee_department_lable'>Choose department: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="addEmployee_department" name="dept_id" value={this.state.dept_id} onChange={this.handleChange} required>
                            <option >Select</option>
                            {this.state.DeptData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label className='addEmployee_email_lable'>Email: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <input className='addEmployee_email' type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label className='addEmployee_date_lable'>Date of joining: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <input className='addEmployee_date' type="date" name="doj" placeholder="Enter date of joining" value={this.state.doj} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label className='addEmployee_employeeCode_lable'>Employee code: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <input className='addEmployee_employeeCode' type="text" name="emp_code" placeholder="Enter employee code" value={this.state.emp_code} onChange={this.handleChange} required />
                    </Form.Group>

                    {this.state.employee === " " ? " " : <br />}

                  <div className={this.state.employee===' '?'':'signature_edit'}>            
                 <label className='addCompany_signature_lable'>Signature:</label>

                        <Form.Group className="mb-3" >
                            <input className='addCompany_signature' type="file" name="signature" placeholder="Signature" defaultValue={this.state.signature} onChange={(e)=>this.handleFile(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <button type='button' className='signature-canvas-button' onClick={()=>this.setState({openCanvas:!this.state.openCanvas})}>Add Signature</button>
                        </Form.Group>
                        </div>  


                    {this.state.employee === " " ? " " : <br />}

                    {this.state.employee === " " ? " " : <label className='addEmployee_status_lable'>Status:</label>}

                    {this.state.employee !== " " ?
                        <Form.Group className="mb-3">
                            <select className="addEmployee_status" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select</option>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </select>
                        </Form.Group>
                        :
                        " "
                    }

                    <br />
                    <div className={this.state.employee===' '? 'addEmployee_buttons':'addEmployee_buttons_edit'}>
                    <button className='save_employee' type="submit">
                        Save
                    </button>   
                    {this.state.employee === " " ?
                        <button className='cancel_employee' onClick={()=>window.history.back()} type="cancel">
                            Cancel
                        </button>
                        : <button className='cancel_employee' type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </button>
                    }
                    </div>
                    </div>
                    {this.state.openCanvas && this.renderSignatureCanvas()}
                </form>
                </div>
           
        )
    }
}
