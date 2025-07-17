// Displays the student name
import React from "react";

const Name = ({ name }) => {
    return (
        <div className="name">
            <p className="inter-bold">👋 Hi, {name} !</p>
        </div>
    );
};

export default Name;