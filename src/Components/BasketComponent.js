import React from "react";
import '../css/basket.css';
import CloseIcon from '../Images/Close.png';
import { remove } from "../Store/cartSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function BasketComponent() {
    const dispatch = useDispatch();
    let menus = [];
    menus = useSelector(state => state.cart);

    const RemoveCartItem = (index) => {
        dispatch(remove(index));
    };

    const PlaceAnOrder = () => {

    }

    return (
        <div className="basket-container">
            <h3>Your Basket</h3>

            <div className="basket-items">
                <ul className="cart-item-container">
                    {
                        menus.map((item, index) => {
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
                                    <button onClick={() => RemoveCartItem(item.index)} className="cart-item__closebtn">
                                        <img alt="Close" className="cart-item__closeimg" src={CloseIcon} />
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="place-order">
                <button onClick={() => PlaceAnOrder} className="place-order__btn">
                    <span className="place-order__btn__itemcount">
                        {menus.length} items
                    </span>
                    <span className="place-order__btn__Title">
                        Order
                    </span>
                    <span className="place-order__btn__totalprice">
                        ₹{menus.reduce((total, menu) => total + menu.price, 0).toFixed(2)}
                    </span>
                </button>
            </div>
        </div>
    )
}