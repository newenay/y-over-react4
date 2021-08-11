import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CrossfadeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSrc: props.src,
      bottomOpacity: 0,
      bottomSrc: props.src
    };
  }

  componentDidMount() {
    //PreLoad Graphics
    const slideBullets = this.props.slideBullets[this.props.match.params.slideId]
    const slideImages = []
    for (var n=0; n < slideBullets.length; n++){
      slideImages.push(process.env.PUBLIC_URL + slideBullets[n].graphic)
    };

    //console.log( slideImages )

    slideImages.forEach((image) => {
      new Image().src = image
      //window[image] = 
    });
      
  }

  static getDerivedStateFromProps(nextProps, prevState){
    
    //console.log(nextProps.src, prevState.topSrc)
    
    if (nextProps.src !== prevState.topSrc) {
      // Reset the component everytime we receive new prop, to
      // cancel out any animation that's still going on
      return { bottomSrc: false, topSrc: false }
    }
    else return null;
 }
 
 componentDidUpdate(prevProps, prevState) {
    if(prevProps.src !== this.props.src) { 
      
      this.setState( { bottomSrc: prevState.topSrc, topSrc: this.props.src, bottomOpacity: .99 }, () => 
          
        setTimeout ( e => { 
          this.setState({ bottomOpacity: 0 })
        }, 20)
        
      )
    }
 }

  render() {
    const { containerClass, duration, timingFunction, delay, style, alt } = this.props;
    const { topSrc, bottomOpacity, bottomSrc } = this.state;
    return (
      <div className={containerClass} style={{ ...defaultStyle, ...{ position: "relative" } }}>
        {topSrc &&
          <img
            style={{ ...defaultStyle, ...style, ...{ position: "absolute" } }}
            src={topSrc}
            alt={alt}
          />}
        {bottomSrc &&
          <img
            style={{
              ...defaultStyle,
              ...style,
              ...{
                opacity: bottomOpacity,
                transition: `opacity ${duration / 1000}s ${timingFunction} ${delay / 1000}s`
              }
            }}
            src={bottomSrc}
            alt={alt}
          />}
      </div>
    );
  }
}

const defaultStyle = { maxWidth: "1000px", maxHeight: "480px" };

CrossfadeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  duration: PropTypes.number,
  timingFunction: PropTypes.string,
  delay: PropTypes.number,
  style: PropTypes.object,
  containerClass: PropTypes.string,
};

CrossfadeImage.defaultProps = {
  duration: 500,
  timingFunction: "ease",
  delay: 500,
  containerClass: "CrossFadeImage",
};