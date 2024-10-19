import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Website
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/customer-login" className={classes.link}>
            Customer Login
          </Link>
          <Link to="/admin-login" className={classes.link}>
            Admin Login
          </Link>
          <Link to="/customer-sign-up" className={classes.link}>
            Customer Registration
          </Link>
          <Link to="/admin-sign-up" className={classes.link}>
            Admin Registration
          </Link>
          <Link to="/about" className={classes.link}>
            About
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
