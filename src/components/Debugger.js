import React from "react";
//import './Content.css';

const Debugger = (props) => {

    let n = props.slideControls.currentLesson
    let _currentSlide = props.slideControls.lessons[n].currentSlide
    let _cuePoint = props.slideInfo[_currentSlide].cuePoint
    let _bookmark = props.slideControls.lessons[n].bookmark
    let _exam = Boolean(props.slideInfo[_currentSlide].layout === 5)
    
    return(
        <div className="debugger">
            <div>
                <small>
                    <h6 className='d-flex'>UI-Level</h6>
                    <span><b>URL:</b> {props.location.pathname}</span><br />
                    <span><b>scormObj:</b> {window.gnScormSessionState}</span><br />
                    <span><b>singleton:</b> {props.slideControls.singleton.toString()}</span><br />
                    <span><b>currentLesson:</b> {n}</span><br />
                    <span><b>locked:</b> {props.slideControls.locked.toString()}</span><br />
                </small>
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>
                <small>
                    <h6 className='d-flex'>Lesson Specific</h6>
                    <span><b>lessons[ id:</b> {props.slideControls.lessons[n].id} <b>].name:</b>  {props.slideControls.lessons[n].name}</span><br />
                    <span><b>currentSlide:</b> {_currentSlide}</span><br />
                    <span><b>bookmark:</b> {_bookmark}</span><br />
                    <span><b>window.BM:</b> {window.BM}, {typeof window.BM}</span><br />
                    <span><b>completed:</b> {props.slideControls.lessons[n].completed.toString()}</span><br />
                </small>
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>
                <small>
                    <h6 className='d-flex'>Slide Controls</h6>
                    <span><b>play (not paused):</b> {props.slideControls.play.toString()}</span><br />
                    <span><b>audioStream:</b> {props.slideControls.audioStream.toString()}</span><br />
                    <span><b>audioEnd (Next):</b> {props.slideControls.audioEnd.toString()}</span><br />
                    <span><span aria-label='glyph' role='img'>&#9757;</span><b>_exam (prevent Next):</b> {_exam.toString()}</span><br />
                    <span><b>timeSync:</b> {props.slideControls.timeSync}</span><br />
                </small>
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>
                <small>
                    <h6 className='d-flex'>Slide Info</h6>
                    <span><b>cuePoint:</b> {_cuePoint.toString()}</span><br />
                    {/* <span><b>currentImage:</b> {props.slideBullets.bullet.toString()}</span><br /> */}
                </small>
            </div>
        </div>
    );
}
export default Debugger