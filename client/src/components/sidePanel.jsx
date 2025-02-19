import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";
import dashboard from "../assets/images/dashboard.svg"


const SidePanel = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("studentId"); // ✅ Remove studentId from sessionStorage
        navigate("/"); // ✅ Redirect to login page
    };
    return (
        <div className="sidepanel">
            <h1 className="changa-one-regular courseName">Java Tutor</h1>
            <hr />
            <div className="menuOption">
                <img src={dashboard} className="dashboardIcon" alt="" />
                <h3>Dashboard</h3>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default SidePanel;