import React from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
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
      <br></br>
      <label>Last Name:</label>
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
      <br></br>
      <label>Age:</label>
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