// blog.steveheffernan.com/2010/04/how-to-build-an-html5-video-player/
// https://medium.com/trabe/avoid-updates-on-unmounted-react-components-2fbadab17ad2

// Disable Seeking
// https://codepen.io/rosswaycaster/pen/gpzLao

import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props){
    super(props)

    this.state = {
      listen: true,
      supposedCurrentTime: 0
    };
    
    this.audioRef = React.createRef(); //prevent invariant() violation
    this.handleProgress = this.handleProgress.bind(this); // varible to binding allow release from DOM on unmount
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.handleMediaEnd = this.handleMediaEnd.bind(this);
    this.pauseEvent = this.pauseEvent.bind(this);
    this.playEvent = this.playEvent.bind(this);
  }

  componentDidMount() {

    var node =  ReactDOM.findDOMNode(this.audioRef.current);
    // this.debugConsole('mounted', node, this)
    node.addEventListener('progress', this.handleProgress);
    node.addEventListener('timeupdate', this.handleTimeUpdate);
    node.addEventListener('seeking', this.handleSeeking);
    node.addEventListener('ended', this.handleMediaEnd);
    node.addEventListener('pause', this.pauseEvent)
    node.addEventListener('play', this.playEvent)

    this.updateIsPlaying();
    this.props.audioEvents(true, false); // stream avail, ended
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource();
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying();
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime();
    }
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this.audioRef.current);

    node.removeEventListener('progress', this.handleProgress);
    node.removeEventListener('timeupdate', this.handleTimeUpdate);
    node.removeEventListener('seeking', this.handleSeeking);
    node.removeEventListener('ended', this.handleMediaEnd);
    node.removeEventListener('pause', this.pauseEvent);
    node.removeEventListener('play', this.playEvent);

    /* this.debugConsole('Audio Event - componentWillUnMount()', node, this) */
    this.props.audioEvents(false, false); // stream avail, ended
  }

  debugConsole = (...msgArr) => {
    if(this.props.slideControls.debug) {
      console.log(...msgArr)
    }
  }

  render() {
    return (
      <audio ref={this.audioRef} preload='none' controls controlsList="nodownload">
        <source src={this.props.source + '.mp3'} type='audio/mpeg' />
        {/* <source  src={this.props.source + '.ogg'} type='audio/ogg' /> */}

        {/* <track default
          src={this.props.source + '.vtt'}
          kind='captions'
          srcLang='en'
          label='English Captions'
        /> */}
      </audio>
    );
  }

  // This function does'nt seem to do anything
  handleProgress() {
    var node = ReactDOM.findDOMNode(this.audioRef.current),
        trackDuration = node.duration,
        buffered = node.buffered;

    this.props.onProgress({
      trackDuration: trackDuration,
      buffered: buffered
    });
  }

  handleTimeUpdate() {
    var node = ReactDOM.findDOMNode(this.audioRef.current),
        currentTime = node.currentTime,
        trackDuration = node.duration, seeking = node.seeking;
    
    this.props.onTimeUpdate({
      currentTime: currentTime,
      trackDuration: trackDuration,
      seeking: seeking 
    });

    if(this.state.listen) this.handleCuePoint(node.currentTime);

    // Disable Seeking hack ''
    if(!seeking){
      this.setState({
        supposedCurrentTime: currentTime
      });
    }
  }

  // Works but clicking seek does fire a pause event (no known fix)
  handleSeeking() {
    var node = ReactDOM.findDOMNode(this.audioRef.current),
        currentTime = node.currentTime;

    var delta = currentTime - this.state.supposedCurrentTime;

    if(Math.abs(delta) > 0.01){
      this.debugConsole('Warning: Seeking is disabled')
      node.currentTime = this.state.supposedCurrentTime;
    }
  }

  handleMediaEnd() {
    var node = ReactDOM.findDOMNode(this.audioRef.current);
    node.pause(); // IE11 Fix
    node.currentTime = 0; 
    this.props.onEnd();
    // State for Seek Tweak
    this.setState({
      supposedCurrentTime: 0
    });

    // Handle Next button
    let n = this.props.slideControls.currentLesson
    let _currentSlide = this.props.slideControls.lessons[n].currentSlide
    let _exam = Boolean(this.props.slideInfo[_currentSlide].layout === 5)
    
    if(_exam){
      this.debugConsole('2.) Audio Event - Exam detected')

      if(_currentSlide === this.props.slideInfo.length-1){
        this.debugConsole('3.) Audio Event - Last slide detected')
        this.props.completeLesson(this.props.slideControls.currentLesson, true)
      }
    }else{
      this.debugConsole('2.) Audio Event - handleMediaEnd()')
      this.props.audioEvents(true, true); // stream avail, ended
    }
  }

  updateCurrentTime() {
    var node = ReactDOM.findDOMNode(this.audioRef.current);
    if (node.readyState) {
      node.currentTime = this.props.defaultTime;
    }

    this.setState({
      listen: true
    });
  }

  // Fires on initial start of Audio
  updateIsPlaying() {
    var node = ReactDOM.findDOMNode(this.audioRef.current),
        isPlaying = this.props.isPlaying;

    if (isPlaying) {
      node.play(); 
    } else {
      node.pause();
    }
  }

  /* Can replace with direct access to <audio> play btn */
  /* Play Btn --> Main --> StageRef/AudioPlayerRef */
  pauseEvent() {
    this.props.togglePlayPause(false)

    var node = ReactDOM.findDOMNode(this.audioRef.current),
        isPlaying = this.props.isPlaying;

    if (isPlaying) {
        node.pause();
    }
  }

  playEvent() {
    this.props.togglePlayPause(true)

    var node = ReactDOM.findDOMNode(this.audioRef.current),
        isPlaying = this.props.isPlaying;
  
    if (isPlaying) {
      node.play();
    }
  }

  updateSource() {
    var node = ReactDOM.findDOMNode(this.audioRef.current),
        isPlaying = this.props.isPlaying;
        // checkPromise = node.play();
    
    // this.debugConsole(checkPromise)
    
    node.pause();
    this.props.onTimeUpdate({
      currentTime: 0,
      trackDuration: node.duration
    });
    
    node.load(); //LOADER
    if(isPlaying) {
      node.play(); // checkPromise = node.play - makes it play
    }

    // Secret sauce right here, may do with slideChange event later
    // this.props.resetSlideCues()
    this.setState({
      listen: true
    });

    this.debugConsole('1b.) Audio Event - New Audio Source (Loaded')
    this.props.audioEvents(true, false); // stream avail, ended
  }

/*********************ND Stuff***********************/

  handleCuePoint(_currentTime) {
    // this.debugConsole('_cuePoint', this.props._cuePoint, this.props.allBullets.length , this.state.listen)
    if(this.props._cuePoint < this.props.allBullets.length && this.state.listen){
      // check for empty array
      var cue = this.props.allBullets[this.props._cuePoint].time //time in sec(s)
      var min = cue - .05 //.95
      var max = cue + .05 // 1.05

      if(_currentTime >= min && _currentTime <= max)
        this.props.cuePointFwd()
    }else if (this.props._cuePoint === this.props.allBullets.length && this.state.listen){
      this.debugConsole('cue Time: No longer listening!')
      this.setState({
        listen: false
      });
    }else{
      this.debugConsole('ERROR: cues out-of-sync')
      this.props.resetSlideCues()
    }
  }
}

AudioPlayer.propTypes= {
  source: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  defaultTime: PropTypes.number,
  onProgress: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired
}

export default AudioPlayer