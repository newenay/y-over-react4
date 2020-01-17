// blog.steveheffernan.com/2010/04/how-to-build-an-html5-video-player/
// https://medium.com/trabe/avoid-updates-on-unmounted-react-components-2fbadab17ad2

// Disable Seeking
// https://codepen.io/rosswaycaster/pen/gpzLao

import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './AudioPlayer.css';

class AudioPlayer extends PureComponent {
  constructor(props){
    super(props)

    this.state = {
      listen: true,
      supposedCurrentTime: 0
    };

    this.audioRef = React.createRef(); //prevent invariant() violation
    this.canvasRef = React.createRef();
    //var canvas, ctx, source, context, analyser, fbc_array;

    this.handleProgress = this.handleProgress.bind(this); // varible to binding allow release from DOM on unmount
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.handleMediaEnd = this.handleMediaEnd.bind(this);
    this.pauseEvent = this.pauseEvent.bind(this);
    this.playEvent = this.playEvent.bind(this);
    this.initGraphicEQ = this.initGraphicEQ.bind(this);
    this.loopGraphicEQ = this.loopGraphicEQ.bind(this);   
  }

  componentDidMount() {    
    var node =  ReactDOM.findDOMNode(this.audioRef.current);
    // this.debugConsole('mounted', node, this)
    node.addEventListener('progress', this.handleProgress);
    node.addEventListener('timeupdate', this.handleTimeUpdate);
    node.addEventListener('seeking', this.handleSeeking);
    node.addEventListener('ended', this.handleMediaEnd);
    node.addEventListener('pause', this.pauseEvent);
    node.addEventListener('play', this.playEvent);
    this.updateIsPlaying();
    this.props.audioEvents(true, false); // stream avail, ended
    
    const isIE = false || !!document.documentMode; // detect IE 6-11 -- No AudioContext() Support
    if(!isIE)
      this.initGraphicEQ(); //also works on initAudio --> updateIsPlaying()
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
    
    // Graphic EQ cleanup
    /* this.source.disconnect();
    this.analyser.disconnect();
    window.cancelAnimationFrame( this.loopGraphicEQ ); */
  }

  debugConsole = (...msgArr) => {
    if(this.props.slideControls.debug) {
      console.log(...msgArr)
    }
  }

  /* Graphic Audio API bars - Init */
  initGraphicEQ(){
    var node = ReactDOM.findDOMNode(this.audioRef.current);

    var AudioContext = window.AudioContext || window.webkitAudioContext; // xBrowser -- Firefox/Opera uses webkit?
    this.context = new AudioContext(); // AudioContext object instance
    this.analyser = this.context.createAnalyser(); // AnalyserNode method
    // Re-route audio playback into the processing graph of the AudioContext
    this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.context.createMediaElementSource(node); 
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);

    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');

    window.requestAnimationFrame( this.loopGraphicEQ );
  }

  // Looping at the default frame rate that the browser provides(approx. 60 FPS)
  loopGraphicEQ() {
    window.requestAnimationFrame( this.loopGraphicEQ );
    this.analyser.getByteFrequencyData(this.fbc_array);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.fillStyle = 'rgb(148, 54, 124)'; //Orange - 'rgb(228, 120, 20, 0.75)';  Color of the bars
    var bars = 100;
    
    for (var i = 0; i < bars; i++) {
      var bar_x = i * 3;
      var bar_width = 1;
      var bar_height = -(this.fbc_array[i] / 2);
      
      //  fillRect( x, y, width, height ) // Explanation of the parameters below
      this.ctx.fillRect(bar_x, this.canvas.height, bar_width, bar_height);
    }
  }

  render() {
    return (
      <div id='mp3_player'>
        <div><canvas ref={this.canvasRef} /></div>
        <div id="audio_box">
          {/* <span><small>{this.state.supposedCurrentTime.toFixed(2)}</small></span> */}
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
        </div>
      </div>
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
    //this.loopGraphicEQ();
  }

  // Works but clicking seek does fire a pause event (no known fix), and breaks REWIND feature
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

  // Rewind
  updateCurrentTime() {
    var node = ReactDOM.findDOMNode(this.audioRef.current);
    if (node.readyState) {
      node.currentTime = this.props.defaultTime;
    }

    this.setState({
      listen: true,
      supposedCurrentTime: 0
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
    //this.initGraphicEQ();
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
    //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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