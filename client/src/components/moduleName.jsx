// Displays the module name
import React from "react";
import dropdown from "../assets/images/dropdown.svg";

const ModuleName = ({ name }) => {
    return (
        <div className="moduleButton">
            <h1 className="poppins-medium moduleName">{name}</h1>
            <img src={dropdown} alt="dropdown" className="dropdownIcon" />
        </div>
    );
};

export default ModuleName;
