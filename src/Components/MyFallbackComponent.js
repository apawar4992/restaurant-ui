import React from "react"

export default function MyFallbackComponent({ error }) {
    return (
        <div>
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            {/* <button onClick={resetErrorBoundary}>Try again</button> */}
        </div>
    )
}