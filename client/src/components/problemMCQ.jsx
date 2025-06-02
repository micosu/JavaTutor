import React from "react";
import "../assets/css/tutor.css";

const ProblemMCQ = ({ statement }) => {
    return (
        <div className="problemMCQ" onContextMenu={(e) => e.preventDefault()}>
            <p className="problemTitle inter-bold">Problem</p>
            <div className="problemDescriptionMCQ inter-regular">
                <pre className="statement">{statement}</pre>

            </div>

        </div>

    )
}

export default ProblemMCQ