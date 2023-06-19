import React, { Component } from 'react'
import menuDataService from '../Services/menu-service'
import '../css/menu.css'
import { Link } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import user from '../Images/User-avatar.png';
import toggleIcon from '../Images/Toggle.png';
import logo from '../Images/IndianSpice.png';

let menuItemTypes = [];
export default class RestaurantMenuComponent extends Component {
    constructor(props) {
        super(props);
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);

        this.state = {
            types: [],
            user: userObject,
            active: true
        };
    }

    componentDidMount() {
        this.getMenu();
    }

    getMenu() {
        // throw new Error("Error thrown in get Menu");
        menuDataService.getMenuTypes()
            .then(response => {

                this.setState({
                    types: response.data
                });
                menuItemTypes = this.state.types.map((object, index) => {
                    return (
                        <Link className='tab-horizontal-item' key={index} to={`/${object}`}>
                            {object}
                        </Link>
                    )
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    logOut() {
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);

        if (userObject != null && userObject.token != undefined) {
            localStorage.removeItem('user');
            localStorage.clear();
            alert('Logged out successfully.');
            this.setState({ active: !this.state.active });
            this.setState({ user: null });
        }
        else {
            alert('Please log-in');
        }
    };

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    isLoggedIn() {
        if (this.state.user == null || this.state.user.token == undefined)
            return true;
        else
            return false;
    };

    isAuthorized() {
        if (this.state.user == null || this.state.user.token == undefined || this.state.user.role != 'Admin')
            return false;
        else
            return true;
    }

    render() {
        return (
            <div className='menu-container'>
                <div className='navbar-container'>
                    <img alt='applogo' className="app-logo" src={logo} />
                    <div className='navbar-left'>
                        {menuItemTypes}
                    </div>

                    <div className='navbar-right'>
                        <Link to="/Login" style={{ visibility: this.isLoggedIn() ? 'visible' : 'hidden' }}>
                            <button className='navbar-right-login__btn'>
                                Login
                            </button>
                        </Link>
                        <Link to="/AddMenu" style={{ visibility: this.isAuthorized() ? 'visible' : 'hidden' }}>
                            <button className='navbar-right-addMenu__btn'>
                                Add Menu
                            </button>
                        </Link>
                        <div className='account-profile'>
                            <div onClick={() => this.toggleClass()} className='account-profile-icon'>
                                <img className='account-profile-user-icon' src={user} alt="user Icon" />
                                <img className='account-profile-toggle-icon' src={toggleIcon} alt="toggle Icon"></img>
                            </div>
                            <div className='account-profile-container' style={{ visibility: this.state.active ? 'hidden' : 'visible' }}>
                                <ul className='account-profile-items'>
                                    <li>
                                        {
                                            // localStorage.getItem('token') != null
                                            this.state.user != null && this.state.user.token != undefined
                                                ? <Link className='account-profile-items__profile' to="/Profile">Profile</Link>
                                                : <Link to="/" onClick={(event) => event.preventDefault()} className="disabled-profile">Profile</Link>
                                        }
                                    </li>
                                    <li>
                                        <Link onClick={() => this.logOut()} className='account-profile-items__logout'>
                                            {/* {this.isLoggedIn() && <Navigate to="/Login" />} */}
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
} 