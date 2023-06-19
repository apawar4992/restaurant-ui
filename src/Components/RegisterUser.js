import React, { useEffect, useState } from "react";
import registerUserService from '../Services/RegisterUser-Service';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

export default function RegisterUser() {

    const [selectedUserRoleTypeValue, setUserRoleTypeSelectedValue] = useState(null);
    const [userRoleTypes, setUserRoleTypes] = useState([]);

    useEffect(() => {
        fetchUserRoleTypesData();
    }, [])

    const navigate = useNavigate();
    // For text properties
    const [inputField, setInputField] = useState({
        fname: '',
        lname: '',
        password: '',
        email: '',
    })

    // fetch user role types
    const fetchUserRoleTypesData = () => {
        //fetch data
        registerUserService.GetUserRoles()
            .then(response => {
                console.log(response.data);
                setUserRoleTypes(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const SubmitButton = () => {
        var user = {
            fname: inputField.fname,
            lname: inputField.lname,
            password: inputField.password,
            email: inputField.email,
            role: selectedUserRoleTypeValue.value,
        }

        console.log('selectedUserRoleTypeValue:' + selectedUserRoleTypeValue.value);
        registerUserService.registerUser(user)
            .then(response => {
                if (response.data == true) {
                    alert("User registered successfully.");
                    navigate('/Login')
                }
                else {
                    alert("Please check all fields.");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    // handle selection
    const handleUserRoleTypesChange = (value) => {
        setUserRoleTypeSelectedValue(value);
    }

    return (
        <div className="register-user-form">
            <div className="register-user-container">
                <h1 style={{ color: 'orange' }}>Register User</h1>
                <div className="form-group">
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        required
                        value={inputField.fname}
                        onChange={inputsHandler}
                        name="fname"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        required
                        value={inputField.lname}
                        onChange={inputsHandler}
                        name="lname"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={inputField.email}
                        onChange={inputsHandler}
                        name="email"
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

                <div className="form-group">
                    <label htmlFor="type">Role:</label>
                    <Select
                        value={selectedUserRoleTypeValue}
                        onChange={handleUserRoleTypesChange}
                        options={userRoleTypes}
                    />
                </div>
                <br />

                <button onClick={SubmitButton} className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
    )
}