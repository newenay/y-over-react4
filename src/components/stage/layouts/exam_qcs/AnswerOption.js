import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption = (props) => {

  function renderInput() {
    if(props.answer === 'correct' || !props.remed) {
      return(
        <input
          type="radio"
          name="radioGroup"
          value={props.answerType}
          // boolean based on whether the answer selected is equal to the answer option type
          checked={props.answerType === props.answer}
          className="radioCustomButton"
          
          id={props.answerType}
          /* disabled={props.answer} */
          onChange={props.onAnswerSelected}
        />
      );
    }else{
      return(
        <input
          type="radio"
          name="radioGroup"
          value={props.answerType}
          checked={props.answerType === props.answer}
          className="incorrect"
          
          id={props.answerType}
          onChange={props.onAnswerSelected}
        />
      );
    }
  }
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  return (
    <li className="answerOption">
      {renderInput()}
      <label className="radioCustomLabel d-flex" htmlFor={props.answerType}>
        <div>&nbsp;&nbsp;{props.answerContent}</div>
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
