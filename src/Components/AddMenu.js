import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import menuDataService from '../Services/menu-service';
import Select from "react-select";
import '../css/add-menu.css'
import { useNavigate, useParams } from "react-router-dom";

function AddMenu() {
    const [selectedMenuTypeValue, setMenuTypeSelectedValue] = useState(null);
    const [categorySelectedValue, setCategorySelectedValue] = useState(null);
    const [menuTypes, setMenuTypes] = useState([]);
    const [categories, setCategoryTypes] = useState([]);
    const [headlineLabel, setHeadlineLabel] = useState("");
    // Get know its update or Add Menu call.
    const { id } = useParams();
    const navigate = useNavigate();

    // For text properties
    const [inputField, setInputField] = useState({
        dishName: '',
        price: '',
        category: '',
        description: '',
        imageLink: ''
    })

    useEffect(() => {
        fetchMenuTypesData();
        fetchCategoryTypesData();
        // console.log("id:" + JSON.stringify(id));
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);
        if (id === 'Add') {
            setHeadlineLabel("Add");
        }
        else {
            fetchMenuByName();
            console.log("id:::" + id);
            setHeadlineLabel("Update");
        }
    }, [])

    // fetch menu by name
    const fetchMenuByName = () => {
        menuDataService.GetMenuByName(id)
            .then(response => {
                setInputField(() => ({
                    name: response.data.name,
                    price: response.data.price,
                    description: response.data.description,
                    imageLink: response.data.imageLink,
                }));
                // var xyz = response.data.Type;
                // var xyz1 = response.data.Category;

                // setMenuTypeSelectedValue(xyz);
                // setCategorySelectedValue(xyz1);
            })
            .catch(e => {
                console.log(e);
            });
    }

    // fetch menu types
    const fetchMenuTypesData = () =>
        //fetch data
        menuDataService.GetMenus()
            .then(response => {
                setMenuTypes(response.data)
            })
            .catch(e => {
                console.log(e);
            });

    // fetch category types
    const fetchCategoryTypesData = () =>
        //fetch data
        menuDataService.GetCategories()
            .then(response => {
                console.log(response.data);
                setCategoryTypes(response.data)
            })
            .catch(e => {
                console.log(e);
            });

    // handle selection
    const handleMenuTypesChange = (value) => {
        setMenuTypeSelectedValue(value);
    }

    // handle category selection
    const handleCategoryChange = (value) => {
        setCategorySelectedValue(value);
    }

    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const submitButton = () => {
        var menu = {
            Name: inputField.dishName,
            Price: inputField.price,
            // Type: selectedMenuTypeValue.value,
            // Category: categorySelectedValue.value,
            Description: inputField.description,
            imageLink: inputField.imageLink
        }
        var retrievedObject = localStorage.getItem('user');
        var userObject = JSON.parse(retrievedObject);
        // console.log("Token:" + userObject.token);

        if (id === 'Add') {
            menuDataService.AddMenu(menu, userObject.token)
                .then(response => {
                    console.log(response.data);
                    setCategoryTypes(response.data);
                    alert("Menu Added successfully.");
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            menuDataService.UpdateMenu(id, menu)
                .then(response => {
                    console.log(response.data);
                    setCategoryTypes(response.data);
                    alert("Menu Updated successfully.");
                })
                .catch(e => {
                    console.log(e);
                });
        }

        navigate('/');
    }

    return (
        <div className="submit-form">
            <h1 style={{ textAlign: "center" }}>
                {headlineLabel} Menu
            </h1>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="dishName">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dishName"
                        required
                        value={inputField.name}
                        onChange={inputsHandler}
                        name="dishName"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        required
                        value={inputField.price}
                        onChange={inputsHandler}
                        name="price"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <Select
                        value={selectedMenuTypeValue}
                        onChange={handleMenuTypesChange}
                        options={menuTypes}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <Select
                        value={categorySelectedValue}
                        onChange={handleCategoryChange}
                        options={categories}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={inputField.description}
                        onChange={inputsHandler}
                        name="description"
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="imageLink">Image Link:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageLink"
                        required
                        value={inputField.imageLink}
                        onChange={inputsHandler}
                        name="imageLink"
                    />
                </div>
                <br />

                <button onClick={submitButton} className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddMenu