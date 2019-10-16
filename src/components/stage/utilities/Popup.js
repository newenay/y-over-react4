import React from 'react'
import './Popup.css'


const Popup = (props) => {
    /* var text = 'foo'; */
    return(
        <div className='popup'>
            <div className='popup_inner'>
                <div style={{padding: '0px 0px 4px 10px'}} className='topBar'>
                    <button id='buttonMain' onClick={props.closePopup}>X</button>
                </div>
                {/* not picking up <p> tags because it's not a real HTML element */}
                <div className="htmlPart" dangerouslySetInnerHTML={props.htmlOptTxt} />
            </div>
        </div>
    );
}

export default Popup