import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login } from "../http/reduxStates";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(username, password));
      navigate(HOME_ROUTE);
    } catch(e) {
      console.log(e);
    }

    setUsername('');
    setPassword('');
  }

  return (
    <AuthForm 
      title = 'Login'
      button = 'Login'
      linkText = 'Create Account'
      link = {REGISTRATION_ROUTE}
      handleFormSubmit={handleFormSubmit}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
    />
  )
}
  
export default LoginPage