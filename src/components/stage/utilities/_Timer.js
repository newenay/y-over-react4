//  https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
//  �pretty-ms� which converts milliseconds to a neat formatted string --> �hh:mm:ss�. 

//const React = require('react')
import React, {Component} from 'react'

class Timer extends Component {
  constructor(props){
    super(props)

    this.state = {
      time: 0,
      start: 0,
      isOn: false
    }
    
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0})
  }

  render() {
    let start = (this.state.time === 0) ?
      <button onClick={this.startTimer}>Start timer</button> :
      null
    let stop = (this.state.isOn) ?
      <button onClick={this.stopTimer}>Stop timer</button> :
      null
    let reset = (this.state.time !== 0 && !this.state.isOn) ?
      <button onClick={this.resetTimer}>Reset timer</button> :
      null
    let resume = (this.state.time !== 0 && !this.state.isOn) ?
      <button onClick={this.startTimer}>Resume timer</button> :
      null
    return(
      <div>
        {start}
        {resume}
        {stop}
        {reset}
        <font style={{color: 'red'}}> timer: {this.state.time}</font>
      </div>
    )
  }
}

export default Timer