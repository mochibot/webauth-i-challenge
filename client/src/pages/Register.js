import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

const Register = (props) => {
  const baseUrl = 'http://localhost:5000';
  
  const register = (user) => {
    axios.post(`${baseUrl}/api/auth/register`, user)
      .then(response => {
        console.log(response);
        props.history.push('/login')
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <NavBar />
      <RegisterForm register={register} />
    </div>
  )
}

export default withRouter(Register);