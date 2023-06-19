import React from "react";
import TileComponent from "./TileComponent";
import RestaurantMenuComponent from './MenuComponent';

const Desserts = () => {
    return (
        <>
            <RestaurantMenuComponent />
            <TileComponent categoryType="Desserts" />
        </>
    )
}

export default Desserts;