import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';

const Login = (props) => {
  const baseUrl = 'http://localhost:5000';
  
  const login = (user) => {
    axios.post(`${baseUrl}/api/login`, user)
      .then(response => {
        console.log(response);
        props.history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <NavBar />
      <LoginForm login={login} />
    </div>
  )
}

export default withRouter(Login);