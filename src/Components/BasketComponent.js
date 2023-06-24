import React, { useEffect, useState } from "react";
import '../css/basket.css';

export default function BasketComponent(props) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        alert('in:' + JSON.stringify(props.changeWord))
        alert('price:' + props.changeWord)
        PlaceAnOrder()
    }, [])

    const PlaceAnOrder = () => {
        // console.log('menuItem:');
    }

    return (
        <div className="basket-container">
            <h1>Your Basket</h1>

            <div className="place-order">
                <button onClick={() => PlaceAnOrder()} className="place-order__btn">
                    <span className="place-order__btn__itemcount">
                        {totalItems} items
                    </span>
                    <span className="place-order__btn__Title">
                        Order Now
                    </span>
                    <span className="place-order__btn__totalprice">
                        ₹{totalPrice}
                    </span>
                </button>
            </div>
            <div>
                {items.map((object, index) => {
                    <h5 key={index}>
                        {object}
                    </h5>
                })}
            </div>
        </div>
    )
}