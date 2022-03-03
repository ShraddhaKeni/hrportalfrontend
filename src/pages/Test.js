/* import React from 'react';

const initialState = {
  name: "",
  nameError: ""
}

export default class Test extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({ name: event.target.value });
    console.log(event.target.value);
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Test:
              <input type="text" name="name" value={this.state.name}  placeholder="Enter role name" onChange={this.handleChange} />
              <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
} */

import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i
          })
        }
      />
      {errors?.firstName?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "maxLength" && <p>First name cannot exceed 20 characters</p>}
      {errors?.firstName?.type === "pattern" && <p>Alphabetical characters only</p>}

      <label>Last Name</label>
      <input 
        {...register("lastName", { 
            pattern: /^[A-Za-z]+$/i,
            required: true,
            maxLength: 20,
          })
        } 
      />
      {errors?.lastName?.type === "required" && <p>This field is required</p>}
      {errors?.lastName?.type === "maxLength" && <p>Last name cannot exceed 20 characters</p>}
      {errors?.lastName?.type === "pattern" && <p>Alphabetical characters only</p>}

      <label>Age</label>
      <input 
        {...register("age", { 
            min: 18, 
            max: 99, 
            required: true
          })
        }
      />
      {errors?.age?.type === "required" && <p>This field is required</p>}
      {errors?.age && (
        <p>You Must be older then 18 and younger then 99 years old</p>
      )}
      <input type="submit" />
    </form>
  );
}