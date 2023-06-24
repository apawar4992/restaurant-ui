import React, { useEffect, useState } from "react";
import menuDataService from '../Services/menu-service';
import '../css/tile.css';
import deleteIcon from '../Images/Delete-Icon.png';
import editIcon from '../Images/Edit-Icon.png';
// import { VariableSizeList } from "react-window";
// import BasketComponent from "../Components/BasketComponent";
import CloseIcon from '../Images/Close.png';
import { json } from "react-router-dom";

const TileComponent = (props) => {
    const [tileItems, setTileItems] = useState([]);
    const [user, setUser] = useState({ token: "", role: "", email: "" });

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

    function GotoEdit() {
        console.log('Goto Edit: token:' + user.token);
        if (user.token === undefined) {
            alert("Please login..!!");
        }
        else {
            alert(user.token);
        }
        console.log("You are in foto");
    }

    function GotoDelete() {
        console.log('Goto Delete: token:' + user.token);
        if (user.token === undefined) {
            alert("Please login");
        }
        else {
            alert(user.token);
        }
        console.log("You are in foto");
    }

    const PlaceAnOrder = () => {
        // console.log('menuItem:');
    }

    const AddToCart = (name, price, imageLink) => {

        // setCartItems([...cartItems, { menuName: name, price: price, imageLink: imageLink }]);
        var xyz = { menuName: name, price: price, imageLink: imageLink };
        // alert(JSON.stringify(xyz));
        setCartItems((cartItems) => [...cartItems, xyz]);
        console.log('json::' + JSON.stringify(cartItems));

        let cartTotal = 0;
        console.log('length::' + cartItems.length);
        for (var i = 0; i < cartItems.length; i++) {
            cartTotal += parseFloat(cartItems[i].price);
            console.log('cartTotal::' + cartTotal);
            setTotalPrice(cartTotal);
        }

        // setTotalPrice(cartTotal);
    }

    const RemoveCartItem = (index) => {
        setCartItems(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        });

        // console.log('int form:' + parseInt(cartItems[0].price, 10))
        const totalPrice = cartItems.reduce((total, menu) => total - parseInt(menu.price, 10), 0);
        setTotalPrice(totalPrice);
    };

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
                                <button onClick={() => AddToCart(name, price, imageLink)} className="tile-item__action__btn">
                                    <span className="tile-item__action__btn__Title">
                                        Add
                                    </span>
                                    <span className="tile-item__action__btn__price">
                                        ₹{parseFloat(price)}
                                    </span>
                                </button>
                            </div>

                            <div className="tile-edit-delete-btn">
                                <button onClick={() => GotoEdit()} style={{ border: 0, background: 0 }}>
                                    <img src={editIcon} style={{ height: 30, width: 30 }} alt="Edit Icon" />
                                </button>
                                <button onClick={() => GotoDelete()} style={{ border: 0, background: 0 }}>
                                    <img src={deleteIcon} style={{ height: 40, width: 40 }} alt="Delete Icon" />
                                </button>
                            </div>
                        </li>
                    )
                    )
                    // </VariableSizeList>
                }
            </ul>

            <div className="basket-container">
                <h3>Your Basket</h3>

                <div className="basket-items">
                    <ul className="cart-item-container">
                        {
                            cartItems.map((item, index) => {
                                return (
                                    <li className="cart-item" key={index}>
                                        <div>
                                            <img alt="cart-item" className="cart-item__image" src={item.imageLink} />
                                        </div>
                                        <br /><br /><br />
                                        <div className="cart-item__name">
                                            {item.menuName}
                                        </div>
                                        <div className="cart-item__price">
                                            ₹{item.price}
                                        </div>
                                        <button onClick={() => RemoveCartItem(index)} className="cart-item__closebtn">
                                            <img alt="Close" className="cart-item__closeimg" src={CloseIcon} />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="place-order">
                    <button onClick={() => PlaceAnOrder()} className="place-order__btn">
                        <span className="place-order__btn__itemcount">
                            {cartItems.length} items
                        </span>
                        <span className="place-order__btn__Title">
                            Order
                        </span>
                        <span className="place-order__btn__totalprice">
                            ₹{totalPrice}
                        </span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default TileComponent;