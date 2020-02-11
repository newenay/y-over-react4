import React from 'react';
import {Link} from 'react-router-dom'

const SlideNav  = (props) => {

  function renderNextBtn(_next) {
    // did we run out of slides
    if(_currentSlide < props.slideInfo.length-1 /* && _layout !== 5 */){
      
      // if next = false (audio playing or exam), course locked = true, and the currentSlide does not equal the bookmark...
      if(!_next && props.slideControls.locked && _currentSlide === _bookmark) {
        return(
          <button disabled title='Next'><span aria-label='Next' role='img'>&#9193;</span></button> // Dup
        );
      }else{
        let slide = props.slideInfo[_currentSlide+1]
        return(
          // Click Reduces first, then assigns URL (console lag)
          <Link to={ `/view/${slide.id}` }>
            <button className="btnGlow" onClick={() => handleNavClick(_currentSlide+1)} title='Next'>
              <span aria-label='Next' role='img'>&#9193;{/* <sup>{_currentSlide+2}</sup> */}
          </span></button></Link>
        );
      }
    }else{ //could be exam, but has just passed the last slide test ONLY
      return(
          <button disabled title='Next'><span aria-label='Next' role='img'>&#9193;</span></button> // Dup
      );
    }
  }

  function renderBackBtn() {
    /* console.log('1.) renderBackBtn()') */
    if(_currentSlide === 0){
      return(
          <button disabled title='Back'><span aria-label='Back' role='img'>&#9194;</span></button>
      );
    }else{
      let slide = props.slideInfo[_currentSlide-1];
      return(
        <Link to={ `/view/${slide.id}` }>
            <button onClick={() => handleNavClick(_currentSlide-1)} title='Back'>
              <span aria-label='Back' role='img'>{/* <sup>{_currentSlide}</sup> */}&#9194;
          </span></button></Link>
      );
    }
  }

  function handleNavClick(incrementSlide) {
    if (_bookmark <= incrementSlide){
      _bookmark = incrementSlide
    }
    props.loadSlide(n, incrementSlide, _bookmark)
    props.setBookmark(_bookmark)
    props.handleSlideRewind()
  }

  function handleRewindClick() {
    props.handleSlideRewind()
    /* resets play btn if paused */
    if(!props.slideControls.play){ handlePlayClick() }
  }

  function renderPlayBtn(_play, _next) {
    if(props.slideControls.audioStream){ // prevent bug if intro video playing and click pause, may go away if video and audio integrated within the same component
      if(_play){
        return(
          <button onClick={(e) => handlePlayClick(e)} title='Pause'><span aria-label='Pause' role='img'>&#9208;</span></button> 
        );
      //Minor Bug - Audio won't glow when paused on exam
      }else if (_next || _exam){ 
        return(
          <button onClick={(e) => handlePlayClick(e)} title='Play'><span aria-label='Play' role='img'>&#9654;</span></button> 
        );
      }else{
        return(
          <button className="btnGlow" onClick={(e) => handlePlayClick(e)} title='Play'><span aria-label='Play' role='img'>&#9654;</span></button> 
        );
      }
    } 
  }

  function handlePlayClick() {
    props.togglePlayPause(!props.slideControls.play) // Action - Toggles to false for pause

    //Play Btn --> Main --> StageRef/AudioPlayerRef */
    props.handleSlidePlay(props.slideControls.play)
  }

  function renderLockBtn() {
    if (props.slideControls.debug){
      if(props.slideControls.locked){
      return(
         <button onClick={(e) => handleLockClick(e)} title='Unlock' ><span aria-label='Unlock' role='img'>&#128274;</span></button>
        );
      }else{
        return(
          <button onClick={(e) => handleLockClick(e)} title='Lock' ><span aria-label='Lock' role='img'>&#128275;</span></button> 
        );
      }
    }
  }

  function handleLockClick() {
    if(window.confirm('Unlocking the Nav is recommended for reveiw purposes only, and will alter the student experience, would you like to continue?')){
      props.toggleLock(!props.slideControls.locked)
    }
  }
  
  let n = props.slideControls.currentLesson
  /* Active Slide -- Redux state 'currentSlide', also active prop in SlideInfo (in addition to above state) */
  let _currentSlide = props.slideControls.lessons[n].currentSlide
  let _bookmark = props.slideControls.lessons[n].bookmark
  let _exam = Boolean(props.slideInfo[_currentSlide].layout === 5)

  return (
    <div className="p-2 bottomRightHeader">
      <div className='slideIndicator'>
        <span>&nbsp;&nbsp;<b>Slide {_currentSlide+1} of {props.slideInfo.length}</b>&nbsp;</span>&nbsp;
      </div>
      <div className='control-buttons'>
        {renderLockBtn()}
        <button onClick={() => props.handleSlideNarr()} title='Narration'>
          <span aria-label='Narration' role='img'><strong>cc</strong></span>
        </button>
        {/* https://www.w3schools.com/csS/tryit.asp?filename=trycss_buttons_animate1 */}
        {renderBackBtn()}

        <button onClick={() => handleRewindClick()} title='Rewind'>
          <span aria-label='Rewind' role='img'>{/* &#9851; */}&#9198;</span>
        </button> 
        
        {renderPlayBtn(props.slideControls.play, props.slideControls.audioEnd)}
        {renderNextBtn(props.slideControls.audioEnd)}

        &nbsp;
      </div>
    </div>
  );
}

export default SlideNav