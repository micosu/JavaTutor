import React from "react";
import '../assets/css/dashboard.css'
import introBlockImage from "../assets/images/introBlock.svg"


const IntroBlock = ({ title, content }) => {
    return (
        <div className="intro-block">
            <h2 className="intro-block-title">Welcome to {title} !</h2>
            <div className="intro-block-content">
                <div>
                    <p>{content}</p>
                </div>
                <div>
                    <img src={introBlockImage} alt="intro" />
                </div>
            </div>
        </div>
    );
};

export default IntroBlock;
