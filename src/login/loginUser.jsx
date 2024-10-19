import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import Joi from "joi";
const theme = createTheme();

const LoginUser = (props) => {
  const { source_url, source_page } = props;
  let history = useNavigate();
  const [err, seterr] = useState({});
  const [loginDetails, setLoginDetails] = useState({});

  const onSubmitData = async () => {
    const reqBody = {
      ...loginDetails,
      source_page,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/loginUser",
        reqBody
      );
      if (response?.data?.statusCode === 200) {
        toast.success("Login Successfully");
        history("/home");
        const userDetails = {
          token: response.data.token,
          uuid: response.data.response.user_id,
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      }
    } catch (err) {
      const { data, status } = err.response;
      if (status === 400) {
        if (
          [
            "Invalid credentials",
            "You are not allowed to login from here",
          ].includes(data.message)
        ) {
          toast.error(data.message);
        } else {
          // eslint-disable-next-line array-callback-return
        }
        return;
      }
    }
    setLoginDetails({});
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

    dataToValidate = loginDetails;

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
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoFocus
                    value={loginDetails.email}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value,
                      });
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
                    value={loginDetails.password}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value,
                      });
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
                Login
              </Button>
              <Typography component="h4" color="red">
                Don't have an account?
                <Link
                  to={source_url}
                  class="nav-link"
                  style={{ "text-decoration": "none" }}
                >
                  Register Here..
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginUser;
