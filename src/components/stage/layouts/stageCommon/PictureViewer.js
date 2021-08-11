import React from 'react'
import './PictureViewer.css'
import CrossFadeImage from './CrossFadeImage' 
import '../../utilities/loader.css'
import FlashObject from './FlashObject'

const PictureViewer = (props) => {
  
  function testUndef () { // tests 'undefined'
    if(props._slideBullets.length >= 1){
      return mediaType(process.env.PUBLIC_URL + props._slideBullets[props._cuePoint-1].graphic);
    }
    return returnLoader();
  }

  function returnLoader(){
    return <div>
            <div style={{height: '190px'}} />
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>;
  }

  function mediaType(_source){
    if(_source !== "false"){

      var _state = _source.split('.').pop()
      switch(_state){
        case 'jpg':
        case 'png':
        case 'svg':
          return <div className='mediaFade'><CrossFadeImage src={_source} duration={500} timingFunction={"ease"} {...props} />
          {/* <img className='mediaFade' src={_source} alt={toString(props.slide.title)} />; */}</div>
        
        case 'mp4':
          return <video /* width="320" height="240" */ controls controlsList="nodownload">
                    <source src={_source} type="video/mp4" />
                    Your brower does not support the video tag.
                </video>;

        case 'html':
          return <FlashObject _data={_source} />;

        default:
          return null;
      }
    }
    return returnLoader();
  }

  function debugHelpers() {
    if(props.slideControls.debug){
      return(
        <div className='mediaCue'>
          <button className="btnBase" onClick={(e) => props.cuePointFwd(e)/* () => props.increment(props.index) */}>Media cue (+): {props._cuePoint}</button>
          {/* <Link className='button' to={`/view/${props.slide.id}`} > */}
            <span className='comment-count'>
              {/* <span className='speech-bubble' /><small> Total Cue Points:&nbsp; 
              {
                // gets length and adds one, I want it to sit on 0 and increment
              }
              {props.slideBullets[props.slide.id] ? props.slideBullets[props.slide.id].length : 0}</small>*/}
            </span>
        </div>
      )
    }
  }

  return (
    <div id='mediaContainer' >
      <div key={props.slide.id} >
        {testUndef() /* Media */ }
      </div>
      {
        //debugging feature
        debugHelpers()
      }
    </div> 
  )
}

export default PictureViewer
