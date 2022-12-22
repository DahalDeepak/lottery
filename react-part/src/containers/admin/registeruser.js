import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Please enter name"),
  ticketNo: Yup.number().min(1, "Too Short!").required("Required"),
});

const RegisterUser = () => (
  <div>
    <h1>Register lottery users</h1>
    <Formik
      initialValues={{
        name: "",
        ticketNo: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        };
        fetch("http://localhost:3000/register", requestOptions)
          .then((res) => res.json())
          .then((data) => alert(data.msg));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" placeholder="name" required />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          {}
          <br />
          <Field name="ticketNo" placeholder="ticketNo" required />
          {errors.ticketNo && touched.ticketNo ? (
            <div>{errors.ticketNo}</div>
          ) : null}
          <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default RegisterUser;

// import React, { useState } from "react";

// function Admin() {
//   const [name, setName] = useState("");
//   const [ticketNo, setTicket] = useState("");
//   const registerUser = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//       'Content-type': 'application/json'
//       },
//       body: JSON.stringify({name, ticketNo})
//   }
//  fetch('http://localhost:3000/admin' , requestOptions)

//   };

//   return (
//     <>
//      <h1>register your ticket</h1>
//       <input
//         onKeyUp={(e) => setName(e.target.value)}
//         placeholder="enter full name"
//       />
//       <input
//         onKeyUp={(e) => setTicket(e.target.value)}
//         placeholder="enter selected ticket"
//       />
//       <button onClick={() => registerUser()}>Register</button>

//     </>
//   );
// }
// export default Admin;
