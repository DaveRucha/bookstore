import { Button, FormHelperText, TextField, Typography } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import axios from 'axios';

const Form1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userdetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [userData, setUserData] = useState();

  const getData = async () => {
    await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${2875}`).then(res => setUserData(res.data.result));
  }

  useEffect(() => {
    getData()
  }, []);

  console.log("1111",userData);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    age: Yup.number().min(18),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  })

  const handleSubmit = async (values) => {
    // console.log("username : ", userdetails.username)
    // console.log("Password : ", userdetails.password)

    const payload = {
      "firstName": values.userName,
      "lastName": "test",
      "email": values.email,
      "roleId": 2,
      "password": values.password,
    }

    // axios.post("https://book-e-sell-node-api.vercel.app/api/user", payload).then((response) => {
    //   if (response && response.code === 200) {
    //     toast("Data Submitted Successfully");
    //   }
    // }).catch((error) => {
    //   toast("Unable to submit the data");
    // });
    authService.Register(payload).then((response) => {
      console.log(response);
    if (response && response.status === 200) {
      toast.success("Data Submitted Successfully",{
        position: "bottom-right",
      });
    }
    }).catch((error) => {
        toast.error("Unable to submit the data",{ position: "bottom-right"});
    });

  };


  return (

    <Formik initialValues={{ userName: "", age: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, errors, setFieldValue, handleBlur }) => {
        console.log("errors : ", errors);
        return (

          <Form>
            <div className='form-body' >
              <Typography variant="h3" component="h2" sx={{ color: "black", fontFamily:"unset", fontWeight:'bold',paddingBottom:2 }}> Create an Account </Typography>
              <TextField
                style={{width:350, }}
                label="userName"
                name="userName"
                variant="outlined"
                value={values.userName}
                onChange={(e) => setFieldValue("userName", e.target.value)}
                onBlur={handleBlur}
              />

              <FormHelperText error>
                <ErrorMessage name='userName' />
              </FormHelperText>

              <TextField
                style={{width:350}}
                label="age"
                name="age"
                variant="outlined"
                value={values.age}
                onChange={(e) => setFieldValue("age", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name='age' />
              </FormHelperText>

              <TextField
              style={{width:350}}
                label="email"
                name="email"
                variant="outlined"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name='email' />
              </FormHelperText>

              <TextField
              style={{width:350}}
                label="password"
                name="password"
                variant="outlined"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                onBlur={handleBlur}
              />
              <FormHelperText error>
                <ErrorMessage name='password' />
              </FormHelperText>

              <Button variant='contained' type="submit" >Submit</Button>

            </div>
          </Form>


        )
      }
      }
    </Formik>


  )
}


export default Form1;