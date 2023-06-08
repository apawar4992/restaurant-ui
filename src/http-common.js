import axios from "axios";

const baseUrl = "https://localhost:7062/api"

// this create function will expose your configuration
export default axios.create(
    {
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json"
        }
    }
)