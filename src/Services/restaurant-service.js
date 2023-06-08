import React, { Component } from "react";

class restaurantDataService{
    getRestaurant(){
        return http.get(`/Restaurant`);
     }
}

export default new restaurantDataService();