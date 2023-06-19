import React from "react";
import { useState, useEffect } from "react";
import registerUserService from '../Services/RegisterUser-Service';
import RestaurantMenuComponent from './MenuComponent';

export default function UserProfile() {

    const [user, setUser] = useState([null]);
    useEffect(() => {
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);
        fetchUserProfile(userObject.email);
    }, [])

    const fetchUserProfile = (email) => {
        registerUserService.GetUserProfile(email)
            .then(response => {
                console.log(response.data);
                setUser(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="account-menu--Container" >
            <RestaurantMenuComponent />
            <br /> <br />
            <h1 style={{ color: 'Orange' }}>User Information</h1>
            <div className="profile">
                First Name: {user.fname}
                <br /> <br />
                Last Name : {user.lname}
                <br /> <br />
                Email : {user.email}
                <br /> <br />
                Role : {user.role}
                <br /> <br />
            </div>
        </div>)
}