import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import LayoutA from './layouts/LayoutA';
import LayoutB from './layouts/LayoutB';
import LayoutC from './layouts/LayoutC';
import LayoutKC from './layouts/LayoutKC';
import AudioPlayer from './utilities/AudioPlayer';
/* import ErrorBoundary from './utilities/ErrorBoundary' */
import Popup from './utilities/Popup';
import './Stage.css';

class Stage extends PureComponent {
  
  constructor(props/* , context */) {
    super(props);
    
    this.state = {    
      showPopup: false,
      showNarr: false
    };
    this.getSlideIndex_IE = this.getSlideIndex_IE.bind(this);
    this.cuePointFwd = this.cuePointFwd.bind(this);
    this.resetSlideCues = this.resetSlideCues.bind(this);
    this.debugHelpers = this.debugHelpers.bind(this);
    this.AudioPlayerRef = React.createRef();
  }
  
  /* componentWillUnmount() {
    this.AudioPlayerRef.current.componentWillUnmount(); //Reach Audio Player if wanted
    this.debugConsole('stage Unmounted');
  } */

  getSlideIndex_IE = (_currentSlide) => {
    var index = -1;
    var _slideArr = this.props.slideInfo;

    for (var i=0; i < _slideArr.length; i++){
      if(_slideArr[i].id === _currentSlide){
        index = i;
        break;
      }
    }
    return(index)
  }

  /* Lifting State Up --> https://reactjs.org/docs/lifting-state-up.html */
  cuePointFwd = (e) => {
    if(e) e.preventDefault();
    var stopCues = this.props.slideBullets[this.props.match.params.slideId].length || [];

    // Redundant Code (already in Render, try to pass later)
    var i = this.getSlideIndex_IE(this.props.match.params.slideId);
    var slide = this.props.slideInfo[i];

    if(slide.cuePoint < stopCues){
      /* if(slide.cuePoint !== "0") */
        this.props.increment(i) //reducer.index
    }else{
      this.debugConsole('else (You Shall Not Pass!):', slide.cuePoint, 'stopCues:', stopCues)
    }
  }

  resetSlideCues = (e) => { 
    if(e) e.preventDefault();
    this.debugConsole('REWIND_SLIDE --');
    
    // Redundant Code (already in Render, try to pass later)
    var i = this.getSlideIndex_IE(this.props.match.params.slideId);
    this.props.rewind(i)
    this.AudioPlayerRef.current.updateCurrentTime();  //enable/disable defaultTime = 0
  }

  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  toggleNarr(){
    var flyoutMenu = document.querySelector("#narrContainer")
    if (!this.state.showNarr){
      flyoutMenu.classList.add("show");
    }else{
      flyoutMenu.classList.remove("show"); 
      /* e.stopPropagation(); */
    }

    this.setState({
      showNarr: !this.state.showNarr
    });
  }

  // Don't use in a form submission, or will open up to cross-scripting (XSS) attack
  createMarkup(_jsonStr){
    return{ __html: _jsonStr }
  }

  debugConsole = (...msgArr) => {
    if(this.props.slideControls.debug) {
      console.log(...msgArr)
    }
  }

  debugHelpers(__cuePoint, _allBulletsLength) {
    if(this.props.slideControls.debug){
      return(
        <div>
          &nbsp;&nbsp;
          <button className="btnBase" onClick={(e) => this.resetSlideCues(e)}>Reset cue(s)</button>&nbsp;
          <button className="btnBase" onClick={(e) => this.cuePointFwd(e)}>(+)</button>&nbsp;
          <small>{__cuePoint + " of " + _allBulletsLength /* + ':' + this.state.stopCues */}</small>&nbsp;
        </div>
      )
    }
  }

  render () {
    let allBullets = this.props.slideBullets[this.props.match.params.slideId] || []
    //let stopCues = allBullets ? allBullets.length : 0

    //IE No likey findIndex()--> let i = this.props.slideInfo.findIndex((slide) => slide.id === this.props.match.params.slideId)
    let i = this.getSlideIndex_IE(this.props.match.params.slideId);
    let slide = this.props.slideInfo[i];

    // Could probably just use prop.cuePoint?
    let _cuePoint = parseFloat(slide.cuePoint); //parseFloat(this.state.cuePoints.length)
    
    // Only pass the slide bullets up to the state's cuePoints
    let _slideBullets = allBullets.slice(0, _cuePoint);

    let audioSrc = process.env.PUBLIC_URL + '/audio/'+ this.props.slideControls.lessons[this.props.slideControls.currentLesson].path + '/' + slide.id; // + '.mp3' || null
    let htmlNar = this.createMarkup(slide.narration); //Sanitize into <tags>
    // Optional Text Btn
    let htmlOptTxt = this.createMarkup(slide.optionalTxt); //Sanitize into <tags>
    let optTextBtn;
    let themeColor = slide.darkTheme;

    if(slide.optionalTxt !== false){
      optTextBtn = <button id='optBtnSkin' onClick={this.togglePopup.bind(this)}>Additional Info</button>
    }

    return (
      <div id='stageContainer'>
        {/* style={{ backgroundColor: _background }} */}
        <div id='slideContainer' className={themeColor ? 'darkTheme' : 'lightTheme'} >
          
          {/* RENDER LAYOUT */}
          {this.checkLayoutType(slide, _slideBullets, _cuePoint)}
          {this.debugConsole('Slide', i,',', slide.id, '--> _cuePoint:', _cuePoint)}

          {/************* POP UP *************/}
          {this.state.showPopup ? 
                <Popup htmlOptTxt={htmlOptTxt} {...this.props} closePopup={this.togglePopup.bind(this)} />
              : null}

          {/************* STAGE CONTROLS *************/}
          <div id='more' className='d-flex justify-content-between'>
            <div id='right'>               
              {/* <div dangerouslySetInnerHTML={this.createMarkup(slide.optionalTxt)} /> */}
              &nbsp;{optTextBtn}
            </div>

            {this.debugHelpers(_cuePoint, allBullets.length)}

            <span>
              {/* <ErrorBoundary> */}
                {  this.checkAudioSource(slide.audio, audioSrc, _cuePoint, allBullets)  /* enable/disable */ }
              {/* </ErrorBoundary> */}
            </span>
          </div>
        </div> 

        {/************* NARRATION ************/}
        <div id='narrContainer'>
          <div dangerouslySetInnerHTML={htmlNar} /><br />
        </div>
      </div>
    )
  }

  checkLayoutType(_slide, __slideBullets, __cuePoint) {
    /* var _state = _layout */
    switch(_slide.layout){
      case 0:
        return <LayoutA /* Split left/right (most common, Grx: 600 x 440) */
          slide={_slide} 
          _slideBullets={__slideBullets} 
          _cuePoint={__cuePoint} 
          cuePointFwd={(e) => this.cuePointFwd(e)} 
          {...this.props} 
        />;
      case 1:
        return <LayoutB /* Split top/bottom (hoagie: 1000 x 350) */
          slide={_slide} 
          _slideBullets={__slideBullets} 
          _cuePoint={__cuePoint} 
          cuePointFwd={(e) => this.cuePointFwd(e)} 
          {...this.props} 
        />;
      case 2:
        return <LayoutC /* Full (hoagie: 1000 x 440) */
          slide={_slide} 
          _slideBullets={__slideBullets} 
          _cuePoint={__cuePoint} 
          cuePointFwd={(e) => this.cuePointFwd(e)} 
          {...this.props} 
        />;
      case 5:
        return <LayoutKC 
          slide={_slide} 
          _slideBullets={__slideBullets} 
          _cuePoint={__cuePoint} 
          cuePointFwd={(e) => this.cuePointFwd(e)} 
          resetSlideCues={(e) => this.resetSlideCues(e)}
          handleSlideRewind={(e) => this.props.handleSlideRewind(e)}
          scoComplete={(e) => this.props.scoComplete(e)}
          {...this.props} 
        />;
    
      default:
        return null;
    }
  }
 
  /* Variable Render Functions */
  checkAudioSource( _audioBooly, _audioSrc, __cuePoint, _allBullets){
    var _state = _audioBooly
    switch(_state){
      case true:
        return <AudioPlayer ref={this.AudioPlayerRef}
          source={_audioSrc}
          isPlaying={true}
          defaultTime={0}
          onProgress={() => this.handleProgress}
          onTimeUpdate={() => this.handleTimeUpdate}
          onEnd={() => this.handleMediaEnd}
          //ND Tweaks
          cuePointFwd={(e) => this.cuePointFwd(e)}
          resetSlideCues={(e) => this.resetSlideCues(e)}
          _cuePoint={__cuePoint}
          allBullets={_allBullets} //fix later, just grabbing sec(s)
          //Grab Markers: https://stackoverflow.com/questions/47651809/getting-audio-markers-cue-points-with-the-web-audio-api
          stopCues={this.stopCues}
          {...this.props}
        />;
      case false:
        return <AudioPlayer ref={this.AudioPlayerRef}
        source={process.env.PUBLIC_URL + '/audio/AudioPlaceholder'}
        isPlaying={true}
        defaultTime={0}
        onProgress={() => this.handleProgress}
        onTimeUpdate={() => this.handleTimeUpdate}
        onEnd={() => this.handleMediaEnd}
        //ND Tweaks
        cuePointFwd={(e) => this.cuePointFwd(e)}
        resetSlideCues={(e) => this.resetSlideCues(e)}
        _cuePoint={__cuePoint}
        allBullets={_allBullets}
        stopCues={this.stopCues} //added back
        disabled={true}
        {...this.props}
        />;
      default:
        return null;
    }
  }
}

Stage.propTypes= {
  //State
  showPopup: PropTypes.bool,
  //Functions (Constructor)
  getSlideIndex_IE: PropTypes.func,
  cuePointFwd: PropTypes.func,
  resetSlideCues: PropTypes.func,
  AudioPlayerRef: PropTypes.node,
  // Render Let(s)
  allBullets: PropTypes.array,
  i: PropTypes.number,
  slide: PropTypes.object,
  _cuePoint: PropTypes.number,
  __cuePoint: PropTypes.number,
  _slideBullets: PropTypes.array,
  audioSrc: PropTypes.string,
  htmlNar: PropTypes.object,
  htmlOptTxt: PropTypes.object
}

export default Stage 