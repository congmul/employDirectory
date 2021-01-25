import React from "react";

const style = {
    marginBottom: "50px",
    width: "50%",
    searchForm : {
        padding:"10px",
        width:"100%"
    }
}

function Search(props){
        return(
            <>
            <div className="container text-center" style={style}>
            <input type="search" name="members" style={style.searchForm} value={props.value} onChange={props.handleInputChange} placeholder="Search" />
            </div>
            </>
        )
}

export default Search;