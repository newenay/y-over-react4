import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import './Stage.css';
import './layouts/stageStylz/LayoutFull.css';

const PlaceHolder = (props) => {

  let _source = process.env.PUBLIC_URL + '/video/Intro_Video.mp4';
  let n = props.slideControls.currentLesson
  let _bookmark = props.slideControls.lessons[n].bookmark

  function loadHandler() {
    /* props.loadSlide(n, _bookmark, _bookmark);
    props.setBookmark(_bookmark); */

    if(props.slideControls.debug) {console.log(`/view/${props.slideInfo[_bookmark].id}`)}
    return <Redirect to={`/view/${props.slideInfo[_bookmark].id}`} />
  }

  return (
    <div id='stageContainer'>
      <div id="container">
        <div className='stage-full-intro'>
          <h2 className="animateTitleLong" hidden >Welcome Screen</h2>
            <video onEnded={loadHandler} width="640" height="360" controls autoPlay controlsList="nodownload">
              <source src={_source} type="video/mp4" />
              Your brower does not support the video tag.
            </video>
          
          <div>Click on the button or a slide number below to proceed.<br />
            <Link to={ `/view/${props.slideInfo[_bookmark].id}` } >
              <button className="btnLarge">Continue to Lesson</button>
            </Link></div>
        </div>
      </div> 
    </div>
  );
}

export default PlaceHolder;