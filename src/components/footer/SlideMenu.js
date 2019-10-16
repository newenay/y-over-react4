import React from 'react'
import SlideBtn from './SlideBtn'

const SlideMenu = (props) => {
   
  // bookmarking -- > medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e
  let n = props.slideControls.currentLesson
  let _currentSlide = props.slideControls.lessons[n].currentSlide
  let _bookmark = props.slideControls.lessons[n].bookmark
  /* console.log('_bookmark:', _bookmark, typeof _bookmark, '_currentSlide', _currentSlide) */
  
  return (
    <div className='control-buttons'>
      {props.slideInfo.map((slide, idx) => {
        return <SlideBtn 
          key={idx} // needs unique key but id not good for coding
          index={idx} // for action/reducer (basically _currentSlide)
          slide={slide} // Slide title

          // having below vars on this level prevents mass-duplication for each btn
          _currentSlide={_currentSlide}
          _bookmark={_bookmark}
          {...props}

            /* onClick={this.currentSlide(idx)}
            value={idx} */
           />
      })}
    </div>
  );
}

export default SlideMenu

