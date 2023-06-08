import React, { useEffect, useState } from "react";
import menuDataService from '../Services/menu-service';
import '../css/tile.css';
import deleteIcon from '../Images/Delete-Icon.png';
import editIcon from '../Images/Edit-Icon.png';

const TileComponent = (props) => {

    const [tileItems, setTileItems] = useState([]);

    useEffect(() => {
        getTileItems();
    }, [])

    const getTileItems = () => {
        menuDataService.getMenuByCategory(props.categoryType)
            .then(response => {
                console.log(response.data);
                setTileItems(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            {
                tileItems.map(({ name, price, type, category, description, imageLink }, index) => (
                    <>
                        <a className="tile-item">
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

                            <p key={index} className="tile-item__desc">
                                {description}
                            </p>

                            <div className="tile-item__action">
                                <button className="tile-item__action__btn">
                                    <span className="tile-item__action__btn__Title">
                                        Add
                                    </span>
                                    <span className="tile-item__action__btn__price">
                                        ₹{price}
                                    </span>
                                </button>
                            </div>

                            <div className="tile-edit-delete-btn">
                                <button className="tile-edit-btn">
                                    <image src={editIcon} className="tile-edit-img" alt="Edit Icon" />
                                </button>

                                {/* <button className="tile-delete-btn"> */}
                                <image src={deleteIcon} className="tile-delete-img" alt="Delete Icon" />
                                {/* </button> */}
                            </div>
                        </a>
                    </>
                )
                )
            }
        </>
    )
}

export default TileComponent;