import React from 'react'
import "./Bullets.css";

const Bullets = (props) => {

  // Don't use in a form submission, or will open up to cross-scripting (XSS) attack
  function createMarkup(_jsonStr){
    return{ __html: _jsonStr }
  }
    
  function renderBullets (bullet, _cuePoint) {
    if(bullet.text !== false) {

      let bulletType = bullet.text.slice(0, 10)
      let htmlBullet = createMarkup(bullet.text); //Sanitize into <tags>

      if(bulletType === "<SubTitle>"){
        return (
          <div key={_cuePoint} className="bulletContainer">
            <div className="noSprite" id='left' />
            <div className="animateBullet" id='right' >
              <div>
                <div className='dangerousBullet' dangerouslySetInnerHTML={htmlBullet} />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={_cuePoint} id='row' className="bulletContainer">
            <div className="spriteContainer" />
            <div className="animateBullet" id='right' >
              <div>
                <div className='dangerousBullet' dangerouslySetInnerHTML={htmlBullet} />
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  }

  return (
    <div /* Hover appear buttons */ >
      {
        props._slideBullets.map(renderBullets)
        /* renderBullets(props.slideBullets[props._cuePoint], props._cuePoint) */
      }
    </div>
  );
}

export default Bullets
