import React from "react";
import SlideNav from "./SlideNav";
import SlideMenu from './SlideMenu';
import './Footer.css';

const Footer = (props) => {
    return(
        <div id="lm_container">
            <div id="lessonMenu" className="d-flex justify-content-between align-self-baseline">
                <div className="p-2 bottomLeftHeader">
                    <SlideMenu {...props} />
                </div>
                <div className="p-2 bottomMidHeader" />
                <div className="p-2 bottomRightHeader">
                    {/* SlideActions is an action container that is connected to SlideControls component */}
                    <SlideNav {...props} />
                </div>
            </div>
        </div>

    );
}

export default Footer;