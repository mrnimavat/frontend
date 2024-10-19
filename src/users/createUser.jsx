import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Joi from "joi";
import toast from "react-hot-toast";
const theme = createTheme();

const CreateUser = (props) => {
  const { source_url, source_page } = props;
  let history = useNavigate();

  const [data, setdata] = useState({});
  const [err, seterr] = useState({});

  const onSubmitData = async () => {
    const reqBody = {
      ...data,
      source_page,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/createUser",
        reqBody
      );
      if (response?.status === 200) {
        toast.success("Details added Successfully");
        history("/");
      }
    } catch (err) {
      const { data, status } = err.response;
      if (status === 400) {
        if (data.message === "Email Id already exists") {
          toast.error(data.message);
        } else {
          // eslint-disable-next-line array-callback-return
        }
        return;
      }
    }
    setdata({});
  };

  useEffect(() => {
    seterr({});
  }, [source_page]);

  const validation = () => {
    // const regexnum = /^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    let schema;
    let dataToValidate;
    // Clear previous errors before new validation
    seterr({});

    schema = Joi.object({
      first_name: Joi.string()
        .min(1)
        .max(30)
        .regex(/^[a-zA-Z' ]*$/)
        .required()
        .messages({
          "string.base": "First name must be a string.",
          "string.empty": "First name is required.",
          "string.min": "First name must be at least 1 character long.",
          "string.max":
            "First name must be less than or equal to 30 characters long.",
          "string.pattern.base":
            "First name can only contain letters, spaces, and apostrophes.",
        }),
      last_name: Joi.string()
        .min(1)
        .max(30)
        .regex(/^[a-zA-Z' ]*$/)
        .required()
        .messages({
          "string.base": "Last name must be a string.",
          "string.empty": "Last name is required.",
          "string.min": "Last name must be at least 1 character long.",
          "string.max":
            "Last name must be less than or equal to 30 characters long.",
          "string.pattern.base":
            "Last name can only contain letters, spaces, and apostrophes.",
        }),
      email: Joi.string().pattern(regexEmail).required().messages({
        "string.empty": "Email is required!",
        "string.pattern.base": "Please enter a valid email address!",
      }),
      password: Joi.string().pattern(regexPassword).required().messages({
        "string.empty": "Password is required!",
        "string.pattern.base":
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit.",
      }),
    });

    dataToValidate = data;

    // Validate the data
    const { error } = schema.validate(dataToValidate, {
      abortEarly: false, // To collect all validation errors
    });

    if (error) {
      // Collect validation errors
      const errors = error.details.reduce((acc, err) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {});
      seterr(errors);
      return;
    }

    // Clear errors if validation passes
    seterr({});
    onSubmitData();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    label="First Name"
                    autoFocus
                    inputProps={{
                      maxLength: 30,
                    }}
                    value={data.first_name}
                    onChange={(e) => {
                      setdata({ ...data, first_name: e.target.value });
                    }}
                  />
                  <Typography component="h4" color="red">
                    {err.first_name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="LastName"
                    fullWidth
                    label="Last Name"
                    autoFocus
                    inputProps={{
                      maxLength: 30,
                    }}
                    value={data.last_name}
                    onChange={(e) => {
                      setdata({ ...data, last_name: e.target.value });
                    }}
                  />
                  <Typography component="h4" color="red">
                    {err.last_name}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={data.email}
                    onChange={(e) => {
                      setdata({ ...data, email: e.target.value });
                    }}
                  />
                  <Typography component="h4" color="red">
                    {err.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="Password"
                    label="Password"
                    name="password"
                    autoComplete="family-name"
                    inputProps={{
                      maxLength: 10,
                    }}
                    value={data.password}
                    onChange={(e) => {
                      setdata({ ...data, password: e.target.value });
                    }}
                  />
                  <Typography component="h4" color="red">
                    {err.password}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={validation}
              >
                Add Users
              </Button>
              <Typography>
                Do you have Account?
                <Link to={source_url} style={{ "text-decoration": "none" }}>
                  Login Here...
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CreateUser;
