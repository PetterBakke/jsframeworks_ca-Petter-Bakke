import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { N }
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import ValidationError from "../common/FormErros";

const url = BASE_URL + "jwt-auth/v1/token/validate";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter a valid password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);
  }

  useEffect(function () {
    async function LoginForm() {

      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          // console.log(json);
          setSubmitting(json);
        } else {
          setLoginError("An error occured");
        }
      } catch (error) {
        console.log("error", error);
        setLoginError(error.toString());
      } finally {
        setLoading(false);
      }

    }
    LoginForm();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loginError) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <ValidationError>{loginError}</ValidationError>}
        {/* <fieldset disabled={submitting}> */}

        <div>
          <input name="username" placeholder="Username" {...register('username')} />
          {errors.username && <ValidationError>{errors.username.message}</ValidationError>}
        </div>
        <div>
          <input name="password" placeholder="Password" {...register('password')} type="password" />
          {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
        </div>
        <button>Login</button>
        {/* </fieldset> */}

      </form>
    </>
  );
}

export default Login;