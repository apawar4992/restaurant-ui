import React from "react";
import Select from "react-select";

const icecreams = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class SelectDropDownComponent extends React.Component {
    state = {
        selectedOption: null,
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h5>Single SelectBox</h5>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={icecreams}
                        />

                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-md-12">

                        <h5>Multiple SelectBox</h5>
                        <Select
                            value={selectedOption}
                            isMulti="true"
                            onChange={this.handleChange}
                            options={icecreams}
                        />

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <h5>Multiple SelectBox with Search</h5>
                        <Select
                            value={selectedOption}
                            isMulti="true"
                            isSearchable="true"
                            onChange={this.handleChange}
                            options={icecreams}
                        />

                    </div>
                </div> */}
            </div>
        );
    }
}

export default SelectDropDownComponent;