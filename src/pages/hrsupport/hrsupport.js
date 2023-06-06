import {Component} from 'react';
import './styles/hrsupport.css'
import Navbar from '../../components/Navbar';

export default class hrsupport extends Component{
    constructor(props){
        super(props)
        //this.state = initialState;
    }
   
    render(){
        
            return (
                <>
                <Navbar/>
             <div className='solid'>  <h1>Email id : hrsupport@axzora.com</h1><h1>Contact No.: 9876567890</h1>  
              </div> 
             </>
            )
     
}
}