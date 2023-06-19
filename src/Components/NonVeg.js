import React from "react";
import TileComponent from "./TileComponent";
import RestaurantMenuComponent from './MenuComponent';

const NonVeg = () => {
    return (
        <>
            <RestaurantMenuComponent />
            <TileComponent categoryType="Non-Veg" />
        </>
    )
}

export default NonVeg;