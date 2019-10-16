import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* Polyfill --> https://github.com/reactjs/react-transition-group/blob/master/Migration.md */
const TransitionFade = (props) => (
  <CSSTransition
      {...props}
      classNames="fade"
      component="div"
      timeout={{ enter: 800, exit: 500 }}
      appear
    />
);

const Result = (props) => {
  let n = props.slideControls.currentLesson
  let _lessonComplete = props.slideControls.lessons[n].completed // means audio finished and set completed (needed an event)
  let _lastSlide = Boolean(props.slideControls.lessons[n].currentSlide === props.slideInfo.length-1)

  function handleResultRender() {
    if(props.examResult === 'pass') {
      if(_lessonComplete && _lastSlide){ // Exam Only
        return(
          <div>
            Number of Questions: <strong>{props.totalQs}</strong><br />
            Number of Correct Answers: <strong>{props.correctAnswers}</strong><br />
            Score: <strong>{props.score}%</strong><br />
            Exam Result: <strong>{props.examResult}</strong>!<br /><br />
            <h6>Congratulations! You have completed the lesson, select the "Next Lesson" tab at the top of the page to continue.</h6><br />
            {/* <button className='btnLarge' onClick={(e) => props.scoComplete(e)}>Next Lesson</button> */}
            {props.scoComplete()}
          </div>
        );
      }else{ // Knowledge Checks
        return(
          <div>
            Number of Questions: <strong>{props.totalQs}</strong><br />
            Number of Correct Answers: <strong>{props.correctAnswers}</strong><br />
            Score: <strong>{props.score}%</strong><br />
            Exam Result: <strong>{props.examResult}</strong>!
          </div>
        );
      }
    }else{ // Failed KC or Exam, so retake
      return(
        <div>
          Number of Questions: <strong>{props.totalQs}</strong><br />
          Number of Correct Answers: <strong>{props.correctAnswers}</strong><br />
          Score: <strong>{props.score}%</strong><br />
          Exam Result: <strong>{props.examResult}</strong>!<br /><br />
          
          {/*<button className="btnBase" onClick={(e) => props.resetSlideCues(e)}>resetSlideCues</button>&nbsp;
           <button className="btnBase" onClick={(e) => props.handleSlideRewind(e)}>handleSlideRewind</button> */}
          <button className='btnLarge' onClick={(e) => props.resetExamAttempt(e)}>RESTART EXAM</button>
        </div>
      );
    }
  }
  
  return (
    <TransitionGroup className="exam_container result">
      <TransitionFade>
        {handleResultRender()}
      </TransitionFade>
    </TransitionGroup>
  );
}

Result.propTypes = {
  examResult: PropTypes.string.isRequired
};

export default Result;
