import React from "react";
import TileComponent from "./TileComponent";
import RestaurantMenuComponent from './MenuComponent';

const Veg = () => {
    return (
        <>
            <RestaurantMenuComponent />
            <TileComponent categoryType="Veg" />
        </>
    )
}

export default Veg;