import React from "react";

class MyErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }

    static getDerievedStateFromError(error) {
        return { errorMessage: error.toString() };
    }

    componentDidCatch(error, errorInfo) {
        this.logErrorToServices(error.toString(), errorInfo.componentStack);
    }

    logErrorToServices(error, errorInfo) {
        // console.log(error + "::" + errorInfo);
        alert(error + "::" + errorInfo);
        // here you can show the popup or you can save this error in backend with the help of any service.
    }

    render() {
        if (this.state.errorMessage) {
            return <p>{this.state.errorMessage}</p>;
        }

        return this.props.children;
    }
}

export default MyErrorBoundary;