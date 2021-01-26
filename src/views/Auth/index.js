import React, { useState } from "react";
import {connect} from 'react-redux';
import { useHistory, useLocation, Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {login} from '../../redux/action/auth';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Auth = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  });
  const classes = useStyles();
  const loggedIn = !!localStorage.getItem("MS_loggedIn");


  let location = useLocation();

  const {email, password} = formData;

  const handleChange = e => 
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
  
  const handleSubmit = async e => {
      e.preventDefault();
      login(email,password);
  }
 
  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }


  return loggedIn ? (
    <Redirect
      to={{
        pathname: "/dashboard",
        state: { from: location }
      }}
    />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined" 
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"

            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps, {login})(Auth);