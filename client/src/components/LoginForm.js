import React, { useState } from 'react';

const LoginForm = (props) => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const inputHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.login(input);
    setInput({
      username: '',
      password: ''
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <input name='username' value={input.username} onChange={inputHandler} />
      <input type='password' name='password' value={input.password} onChange={inputHandler} />
      <button>Login</button>
    </form>
  )
}

export default LoginForm;