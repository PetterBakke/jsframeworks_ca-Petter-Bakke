import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Select from "react-select";
import Heading from "../heading/Heading";


const schema = yup.object().shape ({
  firstName: yup.string().required("Please enter your First name").min(3, "Minimum 3 characters"),
  lastName: yup.string().required("Please enter your last name").min(4, "Minimum 4 characters"),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required("Please enter your message").min(10, "Minimum 10 characters"),
})

function Contact() {
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  const options = [
    {label: "Hello", value: 1},
    {label: "World", value: 2},
    {label: "Sup", value: 3}
  ];

  console.log(errors);

  return (
    <>
      <Heading title="Contact" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First name:
          <input {...register("firstName")} />
        </label>
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>
          Last name:
          <input {...register("lastName")} />
        </label>
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <label>
          Email:
          <input {...register("email")} />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label>
          Subject:
          <Select options={ options } />
        </label>
          {errors.subject && <span>{errors.subject.message}</span>}
          <label>
            Message:
            <input {...register("message")} />
          </label>
          {errors.message && <span>{errors.message.message}</span>}

          <button>Send</button>
      </form>
    </>
  );
}

export default Contact;