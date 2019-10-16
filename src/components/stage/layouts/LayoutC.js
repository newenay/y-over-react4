import React from 'react';
import PictureViewer from './stageCommon/PictureViewer'
import './stageStylz/LayoutFull.css';

const LayoutC = (props) => {
  return (
    <div>
      <div className="stage-full">
        <h2 className="animateTitleLong" key={props.slide.id} >{props.slide.title}</h2>
        <PictureViewer {...props} />
      </div>
    </div>
  );
}

export default LayoutC;
