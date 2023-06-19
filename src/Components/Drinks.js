import React from "react";
import TileComponent from "./TileComponent";
import RestaurantMenuComponent from './MenuComponent';

const Drinks = () => {
    return (
        <>
            <RestaurantMenuComponent />
            <TileComponent categoryType="Drinks" />
        </>
    )
}

export default Drinks;