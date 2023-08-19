import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import authService from "../services/authService";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
//import Cookies from 'js-cookie';


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Enter valid email"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),

    });

    const handleSubmit = (values) => {


        const payload = {
            email: values.email,
            password: values.password
        }

        authService.Login(payload).then((response) => {
            if (response) {

                toast.success('Login successful', {
                    position: toast.POSITION.TOP_CENTER
                });
                navigate("/");
                //Cookies.set("email_ck","email.value");
            }
        }

        ).catch((err) => {
            toast.error('Login unsuccessful', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate("/Login");
        }
        );
    };
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ values, setFieldValue, errors, handleBlur, touched }) => {
                console.log(errors);
                return (
                    <Form>
                        <div className="form-body1">
                            {/* <span className="signin">
                                Login
                            </span> */}
                            <Typography variant="h3" component="h2" sx={{ color: "black", fontFamily: "unset", fontWeight: 'bold', paddingBottom: 2 }}> Login </Typography>
                            <TextField
                                style={{ width: 350, }}
                                type="email"
                                name="email"
                                id="email"
                                variant="outlined"
                                className="form-control inp_text"
                                placeholder="Enter Email"
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={(e) => setFieldValue("email", e.target.value)}
                            />
                            <FormHelperText error>
                                <ErrorMessage name='email' />
                            </FormHelperText>
                        
                            <TextField
                                type="password"
                                style={{ width: 350, }}
                                name="password"
                                variant="outlined"
                                placeholder="Enter password"
                                className="form-control"
                                onBlur={handleBlur}
                                value={values.password}
                                onChange={(e) => setFieldValue("password", e.target.value)}
                            />
                            <FormHelperText error>
                                <ErrorMessage name='password' />
                            </FormHelperText>
                        
                            <br></br>
                            <Button type="submit" variant="contained">Login</Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Login;