import React from 'react';
import {Link} from 'react-router-dom'
import './Stage.css';
import './layouts/stageStylz/LayoutFull.css';
/* import './stageStylz/LayoutFull.css'; */

const Help = (props) => {

  let _source = process.env.PUBLIC_URL + '/images/help.png';
  let n = props.slideControls.currentLesson
  let _currentSlide = props.slideControls.lessons[n].currentSlide

  return (
    <div id='stageContainer'>
      <div id="slideContainer">
        <div className="stage-full">
          <h2 className="animateTitleLong" key="helpTitle" >Help - Explanation of Features</h2>
          <div id='mediaContainer' >
            <div key="helpPic" >
              <img className='mediaFade' /* width='1000px' height='480px' */ src={_source} alt="help" />
            </div>
              {/* overlay buttons */}
              <div className='helpBtnPos'>
                <p><b>See explanation of the different course features.</b></p>
                <h6>To begin the lesson, click '1' in the lower left. <br/>From then on, click on the 'Next' button to progress the lesson.</h6>
                <Link to={ `/view/${props.slideInfo[_currentSlide].id}` } >
                  <button className="btnLarge">Back to Lesson</button>
                </Link>
              </div>
          </div> 
        </div>
      </div>  
    </div>
  );
}

export default Help;