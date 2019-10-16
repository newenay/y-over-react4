import React, {PureComponent} from 'react';
import Exam from './exam_qcs/Exam';
import Result from './exam_qcs/Result';
/* import examQuestions from '../../../data/m2l1_exam'; */
import './stageStylz/LayoutFull.css';
import './exam_qcs/Exam.css';

// https://medium.com/@joshuaaguilar20/create-a-exam-with-react-6bd826c04f6

class LayoutKC extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1, // data (key)
      question: '', // data
      answerOptions: [], // data
      answer: '', // 
      remed: false, // default, student answered correctly
      answersCount: {
        "correct": 0,
        "distr1": 0,
        "distr2": 0,
        "distr3": 0,
        "distr4": 0
      },
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleRemed = this.handleRemed.bind(this);
    this.resetExamAttempt = this.resetExamAttempt.bind(this);
  }

  UNSAFE_componentWillMount() {
    
    const foo = this.props.examQuestions[this.props.match.params.slideId] || []
    if(this.props.slideControls.debug) {console.log('? Bank:', foo)}

    const shuffledAnswerOptions = foo.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: foo[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
    
  }

  resetExamAttempt() {

    const foo = this.props.examQuestions[this.props.match.params.slideId] || []
    const shuffledAnswerOptions = foo.map(question =>
      this.shuffleArray(question.answers)
    );

    this.setState({
      counter: 0,
      questionId: 1,
      question: foo[0].question,
      answerOptions: shuffledAnswerOptions[0],
      answer: '',
      remed: false,
      answersCount: {
        "correct": 0,
        "distr1": 0,
        "distr2": 0,
        "distr3": 0,
        "distr4": 0
      },
      result: ''
    });
  }

  shuffleArray(array) {
    /* var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    } */

    return array;
  }

  handleAnswerSelected(e) {
    this.setUserAnswer(e.currentTarget.value);
  }

  setUserAnswer(answer) {
    /* console.log(answer) */
    this.setState((state, props) => ({
      answer: answer
    }));
  }

  handleSubmit(e) {
    if(this.state.answer !== '' ) {
      
      const foo = this.props.examQuestions[this.props.match.params.slideId];
      
      this.setState((state, props) => ({
        answersCount: {
          ...state.answersCount,
          [this.state.answer]: state.answersCount[this.state.answer] + 1
        }
      }));

      if (this.state.questionId < foo.length) {
        setTimeout(() => this.setNextQuestion(), 400);
      }else{
        setTimeout(() => this.setResults(this.gradeExam()), 400);
      }
      this.handleRemed();
    }else{
      alert("Please make a choice, then click the Submit button");
    }
    
    e.preventDefault();
  }

  handleRemed() { // quick grading feature
    if(this.state.answer !== 'correct'){
      
      this.setState((state, props) => ({
        remed: true
      }));
    }
  }

  setNextQuestion() {
    /* console.log("setNextQuestion():", this.state); */
    const foo = this.props.examQuestions[this.props.match.params.slideId];

    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: foo[counter].question,
      answerOptions: foo[counter].answers,
      answer: '',
      remed: false
    });
  }

  gradeExam() {
    const foo = this.props.examQuestions[this.props.match.params.slideId];

    const totalQs = foo.length;
    const correctAnswers = this.state.answersCount.correct;
    const score = Math.round(correctAnswers/totalQs * 100);
    if(this.props.slideControls.debug) {console.log('score:', score)}
    return score;
  }

  setResults(result) {
    
    if (result >= 70) {
      this.setState({ result: 'pass' }); //PASSING LOGIC
      this.props.audioEvents(true, true);
    } else {
      this.setState({ result: 'fail' });
    }
    /* console.log("setResults():", this.state); */
  }

  /*********** RENDER THE PRESENTATION LAYER ***********/
  renderExam() {
    const foo = this.props.examQuestions[this.props.match.params.slideId];

    return (
      <Exam
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={foo.length}
        onAnswerSelected={this.handleAnswerSelected}
        onSubmit={(e) => this.handleSubmit(e)}
        remed={this.state.remed}
        {...this.props}
      />
    );
  }

  renderResult() {
    const foo = this.props.examQuestions[this.props.match.params.slideId];

    const totalQs = foo.length;
    const correctAnswers = this.state.answersCount.correct;
    const score = Math.round(correctAnswers/totalQs * 100);

    return <Result 
            totalQs={totalQs}
            correctAnswers={this.state.answersCount.correct}
            score={score}

            examResult={this.state.result}  
            resetExamAttempt={this.resetExamAttempt}
            {...this.props} 
          />;
  }

  render () {
    return (
      <div className='stage-full'>
        <h2 className="animateTitle" key={this.props.slide.id}>{this.props.slide.title}</h2>
        <div id='exam_container'>
          {/* JS ternary operator - if state.result has a value then display result, else... */}
          {this.state.result ? this.renderResult() : this.renderExam()}
        </div>
      </div>
  
    );
  }
}

export default LayoutKC;