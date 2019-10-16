import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';

/* Polyfill --> https://github.com/reactjs/react-transition-group/blob/master/Migration.md */
const TransitionFade = (props) => (
  <CSSTransition
      {...props}
      classNames="fade"
      component="ul"
      timeout={{ enter: 800, exit: 500 }}
      appear
    />
);

const Exam = (props) => {

  function renderAnswerOptions(key) {
    return (
      <TransitionFade key={key.content}>
        <AnswerOption
          key={key.content} // dup
          answerContent={key.content}
          answerType={key.type}
          answer={props.answer}
          questionId={props.questionId}
          onAnswerSelected={props.onAnswerSelected}
          remed={props.remed}
          {...props}
        />
      </TransitionFade>
    );
  }

  function renderSubmit(){
    if(props.answer !== ''){
      return <button className='btnLarge' type='submit'>SUBMIT</button>
    }else{
      return <button disabled>SUBMIT</button>
    }
  }

  return (
      <div id="exam_container">
        <div key={props.questionId} >
          <form onSubmit={props.onSubmit}>
            <div>
              <div className='d-flex justify-content-between'>
                <QuestionCount counter={props.questionId} total={props.questionTotal} {...props} />
                {renderSubmit()}
                <img className='exam-logo' src={process.env.PUBLIC_URL + "/images/interactive_hand.png"} alt='react logo' />
              </div>
              <div>
                <Question content={props.question} {...props} />
              </div>
            </div>
            <div>
              <TransitionGroup className="answerOptions">
                {props.answerOptions.map(renderAnswerOptions)}
              </TransitionGroup>
            </div>
          </form>
        </div>
        <pre id='log'></pre>
      </div>
  );
}

export default Exam