import React from "react";

export default function Hoc(HocComponent, data) {
    return class Component {
        constructor(props) {
            super(props);
            this.state = {
                data: data
            }
        }

        render() {
            return (
                <HocComponent data1={this.state.data} />
            )
        }
    }
}