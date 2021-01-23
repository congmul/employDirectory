import React from 'react'

const style = {
    "backgroundColor": "#001b5a",
    "color": "white",
    "textAlign": "center",
    "padding": "20px",
    divider: {
        "backgroundColor": "red",
        "height": "5px",
        "marginBottom": "3%"
    }
}

export default function Header() {
    return (
        <>
        <div style={style}>
            <h1>Employee Directory</h1>
            <p>Click on a header on the table to filter by heading or use the search box to narrow your results.</p>
        </div>
        <div className="divider" style={style.divider}></div>
        </>
    )
}
