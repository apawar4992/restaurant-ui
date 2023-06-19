import React, { useEffect, useState } from "react";
import menuDataService from '../Services/menu-service';
import '../css/tile.css';
import deleteIcon from '../Images/Delete-Icon.png';
import editIcon from '../Images/Edit-Icon.png';
import { VariableSizeList } from "react-window";

const TileComponent = (props) => {
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

    function AddMenuItem() {
        console.log('Add Menu: token:' + user.token);
        if (user.token === undefined) {
            alert("Please login");
        }
        else {
            alert(user.token);
        }
    }

    return (
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
                            <button onClick={() => AddMenuItem()} className="tile-item__action__btn">
                                <span className="tile-item__action__btn__Title">
                                    Add
                                </span>
                                <span className="tile-item__action__btn__price">
                                    ₹{price}
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
        </ul >
    )
}

export default TileComponent;