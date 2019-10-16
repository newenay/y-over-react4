import React from 'react'
import {Link} from 'react-router-dom'

const SlideBtn = (props) => {
  
  function renderSlideBtn() {
    var _btnState = null
    let _index = props.index

    if(props.slideControls.locked){ // locked
      if(_index <= props._bookmark){ // record in state, update only if greater than current bookmark
        if (_index === props._currentSlide){ // allows current frame to be less than bookmark
          _btnState = 'active'
        }else{
          _btnState = 'enabled'
        }
      }else{ // > than bookmark
        _btnState = 'disabled'
      }
    }else{ // unlocked
      if (_index === props._currentSlide){
        _btnState = 'active'
      }else{
        _btnState = 'enabled'
      }
    }

    switch(_btnState){
      case 'active':
        return <Link to={ `/view/${props.slide.id}` }>
              <button className='activeBtn' disabled active='true' title={props.slide.title || "Untitled"}>{ _index+1 }</button>
          </Link>;
      case 'enabled':
        return <Link to={ `/view/${props.slide.id}` }> 
              <button title={props.slide.title || "Untitled"} onClick={() => handleLoadSlide()}>{ _index+1 }</button>
          </Link>;
      case 'disabled':
        return <button className='disabledBtn' disabled title={props.slide.title || "Untitled"}>{ _index+1 }
          </button>;
    
      default:
        return null;
    }
  }
  
  /* handleClick = (e) => {
    if(e) e.preventDefault(); 
    props.loadSlide(props.slide)
    console.log(props.slide)
  } */

  function handleLoadSlide() {
    // Top Menu should change the lesson if need be
    props.loadSlide(props.slideControls.currentLesson, props.index, props._bookmark)
    props.setBookmark(props._bookmark)
    // rewinds stage from Main(), if graphics already cached
    props.handleSlideRewind()
  }

  return (  
    <div className='control-buttons'>
      {renderSlideBtn()}
    </div>         
  );
}

export default SlideBtn