import React, {PureComponent} from 'react';
// Brand new Tyler React-Router 4 explanation - https://tylermcginnis.com/react-router-url-parameters/
import {Route, Switch} from 'react-router-dom';
import Header from './header/Header';
import Stage from './stage/Stage';
import PlaceHolder from './stage/PlaceHolder';
import Help from './stage/Help';
import Footer from './footer/Footer';
import Debugger from './Debugger';

//(Context depreciated) why do some props flow through with const that don't with class?? 
// Answer: const reduces lots boilerplate (such as declaring a var, and having it avail to
// all other functions), if you don't need a state

class Main extends PureComponent {

  constructor(props) {
    super(props);
    /******** Audio Controls for Stage **********/
    this.StageRef = React.createRef(); // this is the only eeason for the component
    this._scormObj = window.gnScormSessionState // 0 (none), 1 (Initiated), 2 (Terminating)
    
    this.handleSlideRewind = this.handleSlideRewind.bind(this);
    this.handleSlideNarr = this.handleSlideNarr.bind(this);
    this.handleSlidePlay = this.handleSlidePlay.bind(this);
    this.debugConsole = this.debugConsole.bind(this);
    this.debugHelpers = this.debugHelpers.bind(this);
    this.getBookmark= this.getBookmark.bind(this); 
    this.setBookmark= this.setBookmark.bind(this); 
    this.scoComplete= this.scoComplete.bind(this); 
  }
  
  /* URL Route Tracking -- turn on 'component', turn off 'render' below and will return url.  They cannot work together 
  function Stage({location}) {
    return <p>{debugConsole(location.pathname)}</p>
  }*/

  handleSlideRewind() {
    if(this.StageRef.current) {
      this.StageRef.current.resetSlideCues();
    }else{
      this.debugConsole('stage slide not yet mounted')
    }
  } 

  handleSlideNarr() {
    if(this.StageRef.current) {
      this.StageRef.current.toggleNarr();
    }else{
      this.debugConsole('stage slide not yet mounted')
    }
  } 

  // getter/setter concept
  handleSlidePlay() {
    if(this.props.slideControls.play) {
      this.StageRef.current.AudioPlayerRef.current.pauseEvent();

      /* let _time = this.StageRef.current.AudioPlayerRef.current.getTime();
      return(_time); */
    }else{
      this.StageRef.current.AudioPlayerRef.current.playEvent();
    }
  }

  /* function getCurrentTime() {
    let _time = this.StageRef.current.AudioPlayerRef.current.getTime();
    return(_time);
  } */
  /******** End Audio Controls for Stage **********/

  debugConsole (...msgArr) {
    if(this.props.slideControls.debug) {
      console.log(...msgArr)
    }
  }

  debugHelpers() {
    if(this.props.slideControls.debug){
      return(
          <Debugger {...this.props} />
      )
    }
  }
  
  // Singleton, called once
  getBookmark() {
    // 1.) INITIALIZE  
    let _scormInit = window.ScormInitialize(); //should return "true"  
    let importBookmark = null // str or number?

    if(_scormInit){ // SCORM envir
      // 2.) if true, Bookmark called from SCOSessionInitializedHandler() on index.html
      importBookmark = parseFloat(window.BM)
      
      if( !isNaN(importBookmark) && typeof importBookmark === 'number'){ // Test for blank string, should be cmi.location default, trouble if (NaN or undefined)
        console.log('Main: cmi.location found=', importBookmark, typeof importBookmark)
        this.props.loadSlide(this.props.slideControls.currentLesson, importBookmark, importBookmark)

      }else{
        console.log('Main: cmi.location blank or', importBookmark, typeof importBookmark)
      }
    }else{
      console.log('Main: no SCORM detected (default 0)')
    }
    this.props.dataLoaded(true) // Singleton
  }

  setBookmark(_bookmark) {
    if(this._scormObj !== 0){
      window.ScormSetValue("cmi.location", _bookmark.toString())
    }
  }

  scoComplete() {
    if(this._scormObj !== 0){
      window.ScormSetValue("cmi.completion_status", "completed");
      window.ScormTerminate();
    }
  }
  /*
   function gradeObjective(theObj, theResult) {
    window.ScormGetValue("cmi.objectives._count");
    window.ScormGetValue("cmi.objectives."+ theObj +".id");
    window.ScormSetValue("cmi.objectives."+ theObj +".success_status", theResult);
    
    if(theResult=="passed"){
      window.ScormSetValue("cmi.objectives."+ theObj +".score.scaled", "1");
      window.ScormSetValue("cmi.objectives."+ theObj +".completion_status", "completed");
    }else{
      //window.ScormSetValue( "cmi.objectives."+ theObj +".score.scaled", "0");
      window.ScormSetValue("cmi.objectives."+ theObj +".completion_status", "incomplete");
    }
  } */
  
  /**************************************/
  render() {
    if(!this.props.slideControls.singleton){this.getBookmark()}

    return (
      <div>
        <div className="headerObj">
          <Header {...this.props} />
        </div>
    
        <div className="stageObj">
          <Switch>
            <Route 
              path={`${this.props.match.url}view/:slideId`} 
              /* component={Stage} */
              render={ ({match}) =>
              <Stage {...this.props}
                ref={this.StageRef}
                match={match} 
                scoComplete={this.scoComplete.bind(this)}
              />}
            />
            <Route exact path='/' 
              render={() => 
              <PlaceHolder {...this.props} 
                setBookmark={this.setBookmark.bind(this)}
              />} 
            />
            <Route path='/help'><Help {...this.props} /></Route>
            <Route render={()=>(<h1>No slide found, check lesson URL</h1>)} />
          </Switch>
        </div>

        <div className="footerObj">
          <Footer {...this.props} 
            handleSlideRewind={this.handleSlideRewind.bind(this)}
            handleSlideNarr={this.handleSlideNarr.bind(this)} 
            handleSlidePlay={this.handleSlidePlay.bind(this)} 
            setBookmark={this.setBookmark.bind(this)}
          />
          {/* Took off 'exact' (see inclusive vs exclusive routing), which means everything shows */}
          {this.debugHelpers()}
        </div>
        
      </div>
    );
  }
}

export default Main
