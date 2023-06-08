import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import menuDataService from '../Services/menu-service';
import Select from "react-select";

function AddMenu() {
    const [selectedMenuTypeValue, setMenuTypeSelectedValue] = useState(null);
    const [categorySelectedValue, setCategorySelectedValue] = useState(null);
    const [menuTypes, setMenuTypes] = useState([]);
    const [categories, setCategoryTypes] = useState([]);

    useEffect(() => {
        fetchMenuTypesData();
        fetchCategoryTypesData();
    }, [])

    // fetch menu types
    const fetchMenuTypesData = () =>
        //fetch data
        menuDataService.GetMenus()
            .then(response => {
                console.log(response.data);
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

    // For text properties
    const [inputField, setInputField] = useState({
        dishName: '',
        price: '',
        category: '',
        description: '',
        imageLink: ''
    })

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
            Type: selectedMenuTypeValue.value,
            Category: categorySelectedValue.value,
            Description: inputField.description,
            imageLink: inputField.imageLink
        }

        menuDataService.AddMenu(menu)
            .then(response => {
                console.log(response.data);
                setCategoryTypes(response.data)
                alert("Menu Added successfully.");
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="submit-form">
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

                {/* <div class="input-group">
                    <label class="col-md-5 col-form-label">Menu Image:</label>
                    <br />

                    <div className="select-image-btn">
                        <input type="file" style={{ width: 150 + '%' }} class="form-control" id="file" name="file" accept="image/*" />
                    </div>
                </div> */}
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