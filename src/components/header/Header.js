import React from "react";
import {Link} from 'react-router-dom';
//import { Container, Row, Col, /*Breadcrumb, BreadcrumbItem*/ } from "reactstrap";
import MainMenu from "./MainMenu";
import './Header.css';

const Header = (props) => {

    let i = props.slideControls.currentLesson
    return(
        <div id="mm_container">
            <div id="mainMenu" className="d-flex justify-content-between align-self-end leftHeader">
                <div className="p-2 leftHeader">
                    <div className="d-flex">
                        <Link to='/'>
                            <img id="banner_logo" src={process.env.PUBLIC_URL + "/images/banner_logo.png"} alt="#"/>
                        </Link>
                        <div id="banner_titles">
                            <h1>PR 103 <small><i> - DOS PR Chief of Mission Envir (DSPRCE)</i></small></h1>
                            <h6>Lesson: {props.slideControls.lessons[i].name}</h6>
                        </div>
                    </div>          
                </div>
                <div className="p-2 middleHeader"><div id='topBanner'><h6>Unclassified</h6></div>  
                </div>
                <MainMenu {...props} />
            </div>
        </div>
    );
}
export default Header;