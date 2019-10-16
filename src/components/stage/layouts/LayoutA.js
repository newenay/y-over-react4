import React from 'react';
import PictureViewer from './stageCommon/PictureViewer'
import Bullets from './stageCommon/Bullets'
import './stageStylz/LayoutA.css';

const LayoutA = (props) => {
  return (
    <div className='d-flex flex-row'>
      <div className='stage-left'>
        <h2 className="animateTitle" key={props.slide.id} >{props.slide.title}</h2>
        <Bullets {...props} />
      </div>
      <div className='stage-right'>
        <PictureViewer {...props} />
      </div>
    </div>
  );
}

export default LayoutA;
