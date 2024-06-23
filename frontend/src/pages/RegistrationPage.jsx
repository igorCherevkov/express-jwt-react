import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from "../utils/consts";
import { registration } from "../http/reduxStates";

function RegistrationPage() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

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
            await dispatch(registration(username, password));
            navigate(LOGIN_ROUTE);
        } catch(e) {
            console.log(e);
        }

        setUsername('');
        setPassword('');
    }

    return (
        <AuthForm 
            title = 'Registration'
            button = 'Register'
            linkText = 'Have an account? Log in'
            link = {LOGIN_ROUTE}
            handleFormSubmit={handleFormSubmit}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
        />
    )
}
  
export default RegistrationPage