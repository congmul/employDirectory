import React from "react";


function Search(props){
        return(
            <>
            <div className="container text-center">
            <input type="search" name="members" value={props.value} onChange={props.handleInputChange} placeholder="Search" />
            </div>
            </>
        )
}

export default Search;