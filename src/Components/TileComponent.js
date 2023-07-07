import React, { useEffect, useState } from "react";
import menuDataService from '../Services/menu-service';
import '../css/tile.css';
import deleteIcon from '../Images/Delete-Icon.png';
import editIcon from '../Images/Edit-Icon.png';
// import { VariableSizeList } from "react-window";
import CloseIcon from '../Images/Close.png';
import { Link, json } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { add } from '../Store/cartSlice';
import BasketComponent from "./BasketComponent";

const TileComponent = (props) => {

    const dispatch = useDispatch();
    const [tileItems, setTileItems] = useState([]);
    const [user, setUser] = useState({ token: "", role: "", email: "" });

    useEffect(() => {
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);
        setUser(userObject);
        getTileItems();
    }, [])

    const getTileItems = () => {
        menuDataService.getMenuByCategory(props.categoryType)
            .then(response => {
                setTileItems(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const isAuthorized = () => {
        if (user === null || user.token === undefined || user.role !== 'Admin')
            return false;
        else
            return true;
    }

    const AddToCart = (name, price, imageLink, index) => {
        var xyz = { menuName: name, price: price, imageLink: imageLink, index: index };
        dispatch(add(xyz));
    }

    const DeleteMenuByName = (menuName) => {
        alert("name:::" + menuName);
        menuDataService.DeleteMenu(menuName)
            .then(response => {
                if (response.data == true) {
                    alert("Menu deleted successfully.");
                }
                else {
                    alert("Problem to delete menu.");
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="tile-with-basket">
            <ul className="tile-item__wrapper">
                {
                    // <VariableSizeList
                    //     height={4}
                    //     width={4}
                    //     itemCount={tileItems.length}
                    //     itemSize={10}
                    // >
                    tileItems.map(({ name, price, type, category, description, imageLink }, index) => (
                        <li className="tile-item" key={index}>
                            <div className="tile-item__image">
                                <img alt="Sprinkled Fries" className="tile-item__image img" src={imageLink}>
                                </img>
                            </div>

                            <div className="tile-item__name">
                                {name}
                                <span className="tile-item__name__new-btn">NEW</span>
                                <span className="ml-2">&nbsp;</span>
                                <span className="" />
                            </div>
                            <br />

                            <p className="tile-item__desc">
                                {description}
                            </p>

                            <div className="tile-item__action">
                                <button onClick={() => AddToCart(name, price, imageLink, index)} className="tile-item__action__btn">
                                    <span className="tile-item__action__btn__Title">
                                        Add
                                    </span>
                                    <span className="tile-item__action__btn__price">
                                        ₹{parseFloat(price)}
                                    </span>
                                </button>
                            </div>

                            <div className="tile-edit-delete-btn" style={{ visibility: isAuthorized() ? 'visible' : 'hidden' }}>
                                <Link to={"/AddMenu/" + name}>
                                    <button style={{ border: 0, background: 0 }}>
                                        <img src={editIcon} style={{ height: 30, width: 30 }} alt="Edit Icon" />
                                    </button>
                                </Link>
                                {/* <Link to="/DeleteMenu"> */}
                                <button onClick={() => DeleteMenuByName(name)} style={{ border: 0, background: 0 }}>
                                    <img src={deleteIcon} style={{ height: 40, width: 40 }} alt="Delete Icon" />
                                </button>
                                {/* </Link> */}
                            </div>
                        </li>
                    )
                    )
                    // </VariableSizeList>
                }
            </ul>

            <BasketComponent />
        </div >
    )
}

export default TileComponent;