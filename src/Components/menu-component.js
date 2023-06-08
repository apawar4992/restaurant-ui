import React, { Component } from 'react'
import menuDataService from '../Services/menu-service'
import '../css/menu.css'
import { Link, Route, Routes } from 'react-router-dom'
import Error from './Error';
import Desserts from './Desserts';
import Drinks from './Drinks';
import Offer from './Offer';
import Veg from './Veg';
import NonVeg from './Non-Veg';
import AddMenu from './AddMenu';

let menuItemTypes = [];
export default class RestaurantMenuComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [],
        };
    }

    componentDidMount() {
        this.getMenu();
    }

    getMenu() {
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

    render() {
        return (
            <div className='menu-container'>
                <div className='navbar'>
                    <div className='navbar-left'>
                        {menuItemTypes}
                    </div>
                    <Link className='navbar-right' to="/AddMenu">
                        Add Menu
                    </Link>
                </div>
                <div className="tiles-container">
                    <Routes>
                        <Route path='/' element={<Offer />} />
                        <Route path="/Veg" element={<Veg />} />
                        <Route path="/Non-Veg" element={<NonVeg />} />
                        <Route path="/Desserts" element={<Desserts />} />
                        <Route path="/Drinks" element={<Drinks />} />
                        <Route path="/AddMenu" element={<AddMenu />} />
                        {/* This error component should be at last */}
                        <Route path='/*' element={<Error />} />
                    </Routes>
                </div>
            </div>
        )
    }
} 