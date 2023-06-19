import React, { useState } from "react";
import loginUserService from '../Services/LoginUser-Service';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/loginuser.css';

export default function LoginUser() {

    const navigate = useNavigate();
    // For text properties
    const [inputField, setInputField] = useState({
        userName: '',
        password: ''
    })

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const SubmitButton = () => {
        var userCredentials = {
            username: inputField.userName,
            password: inputField.password
        }

        loginUserService.loginUser(userCredentials)
            .then(response => {
                var userObject = { token: response.data.token, role: response.data.role, email: response.data.email }
                localStorage.setItem('user', JSON.stringify(userObject));

                alert("User logged-in successfully.");
                navigate('/');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="submit-form">
            <div className="login-container">
                <div className="form-group">
                    <label htmlFor="userName">UserName:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        required
                        value={inputField.userName}
                        onChange={inputsHandler}
                        name="userName"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        required
                        value={inputField.password}
                        onChange={inputsHandler}
                        name="password"
                    />
                </div>
                <br />

                <div className="submit-register">
                    <Link to="/Register" className="register-user" >Register New User</Link>
                    <button onClick={SubmitButton} className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

