import { useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import ValidationError from "../common/FormErros";
import Heading from "../heading/Heading";

const url = BASE_URL + "jwt-auth/v1";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter a valid password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
 
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    
    try {
      const response = await fetch(url, data);
      
      if (response.ok) {
        const json = await response.json();
        console.log("json",json);
        setSubmitting(json);
      } else {
        setLoginError("An error occured");
      }
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }    
  }
  
  return (
    <>
    <Heading title="Login" />
      <form onSubmit={handleSubmit(onSubmit)} className="loginform">
        {loginError && <ValidationError>{loginError}</ValidationError>}
        <fieldset disabled={submitting}>
        <div>
          <input name="username" placeholder="Username" {...register('username')} />
          {errors.username && <ValidationError>{errors.username.message}</ValidationError>}
        </div>
        <div>
          <input name="password" placeholder="Password" {...register('password')} type="password" />
          {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
        </div>
        <button>{submitting ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}

export default LoginForm;