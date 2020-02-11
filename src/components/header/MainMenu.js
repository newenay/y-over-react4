import React from 'react';
import {Link/* , NavLink */} from 'react-router-dom';
import DropDown from './DropDown';

const MainMenu = (props) => {

 function handleLesson(_lessonId) {
  props.changeLesson(_lessonId);
 }

 // ****** for NOW, _lessonId doesn't switch lesson data *******
 /* assignURL(_lessonId, context) { 
    var _currentSlide = this.props.slideControls.lessons[_lessonId].currentSlide

    if(_currentSlide  >= 0 && _currentSlide < this.props.slideInfo.length) {
      var slide = this.props.slideInfo[_currentSlide];
      // console.log(_currentSlide, '#/view/' + slide.id, context)
      return( '#/view/' + slide.id)
    }else{
      console.log('MainMenu: slide is less than 0')
    }
  } */

  function debugHelpers() {
    if(props.slideControls.debug){
      return(
        <DropDown 
          title='Select Lesson' 
          list={props.slideControls.lessons} 
          handleLesson={handleLesson}
          {...props} />
      );
    }
  } 

  
  return (  
    <div className="p-2 rightHeader"/* className="wrapper justify-content-around" */>    
      <div>{debugHelpers()}</div>
      <div className="linkAdj">
        <Link  to='/help'>
          <span aria-label='Help' role='img'>&#9072; Help</span>
        </Link>|
        <a href={process.env.PUBLIC_URL + "/xtras/resources.html"} target="blank">
          <span aria-label='Resources' role='img'>&#128218; Resources</span></a>|
        <a href={process.env.PUBLIC_URL + "/xtras/glossary.html"} target="blank">
          <span aria-label='Glossary' role='img'> &#128366; Glossary</span></a>  
      </div>       
    </div>
  );
}

export default MainMenu;

