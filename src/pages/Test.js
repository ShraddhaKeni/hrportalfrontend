import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";

export default function App() {
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(); //hooks to handle form
   
  return (
    <>
    <Navbar/>
    <div className='mainAddCompanies' style={{marginTop:'13%'}}>
    <h2><b>Test</b></h2>
    <br/>
    <form onSubmit={handleSubmit(onSubmit)} class="row g-3">
    <div class="mb-3 row">
    <label for="firstname" class="col-sm-3 col-form-label" >First Name :</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="firstname"   {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i})}
            />
    </div>
  </div>
  {errors?.firstName?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "maxLength" && <p>First name cannot exceed 20 characters</p>}
      {errors?.firstName?.type === "pattern" && <p>Alphabetical characters only</p>}
  <br/>
    <div class="mb-3 row">
    <label for="lastname" class="col-sm-3 col-form-label">Last Name :</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="lastname"  {...register("lastName", { 
            pattern: /^[A-Za-z]+$/i,
            required: true,
            maxLength: 20,
          })
        } />
    </div>
  </div>
  {errors?.lastName?.type === "required" && <p>This field is required</p>}
      {errors?.lastName?.type === "maxLength" && <p>Last name cannot exceed 20 characters</p>}
      {errors?.lastName?.type === "pattern" && <p>Alphabetical characters only</p>}
      
<br/>
  <div class="mb-3 row">
    <label for="age" class="col-sm-3 col-form-label">Age :</label>
    <div class="col-sm-6">
    <input type="number" readonly class="form-control " id="age" {...register("age", { 
            min: 18, 
            max: 99, 
            required: true
          })
        } />
    </div>
    <div class="col-sm-2">
    <button type="submit" class="btn btn-primary mb-3 SubMitButn">Submit</button>
    </div>
  </div>
 
  {errors?.age?.type === "required" && <p>This field is required</p>}
      {errors?.age && (
        <p>You Must be older then 18 and younger then 99 years old</p>
      )}

     
    </form>
    <br/>
    </div>
    </>
  );
}