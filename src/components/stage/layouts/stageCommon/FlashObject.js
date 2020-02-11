import React from 'react'
/* import './libs/createjs-2015.11.26.min.js'
import './ball_test.js' */

const FlashObject = (props) => {
    
    /*var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation
    let AdobeAn, createjs;
    
    function init() {
        canvas = document.getElementById("canvas");
        anim_container = document.getElementById("animation_container");
        dom_overlay_container = document.getElementById("dom_overlay_container");
        var comp=AdobeAn.getComposition("D4E852121A8F1340B50F423A81B3B660");
        var lib=comp.getLibrary();
        createjs.MotionGuidePlugin.install();
        handleComplete({},comp);
    }

    function handleComplete(evt,comp) {
        //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
        var lib=comp.getLibrary();
        var ss=comp.getSpriteSheet();
        exportRoot = new lib.ball_test();
        stage = new lib.Stage(canvas);	
        //Registers the "tick" event listener.
        fnStartAnimation = function() {
            stage.addChild(exportRoot);
            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
        }	
        //Code to support hidpi screens and responsive scaling.
        function makeResponsive(isResp, respDim, isScale, scaleType) {		
            var lastW, lastH, lastS=1;		
            window.addEventListener('resize', resizeCanvas);		
            resizeCanvas();		
            function resizeCanvas() {			
                var w = lib.properties.width, h = lib.properties.height;			
                var iw = window.innerWidth, ih=window.innerHeight;			
                var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
                if(isResp) {                
                    if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
                        sRatio = lastS;                
                    }				
                    else if(!isScale) {					
                        if(iw<w || ih<h)						
                            sRatio = Math.min(xRatio, yRatio);				
                    }				
                    else if(scaleType==1) {					
                        sRatio = Math.min(xRatio, yRatio);				
                    }				
                    else if(scaleType==2) {					
                        sRatio = Math.max(xRatio, yRatio);				
                    }			
                }			
                canvas.width = w*pRatio*sRatio;			
                canvas.height = h*pRatio*sRatio;
                canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';				
                canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
                stage.scaleX = pRatio*sRatio;			
                stage.scaleY = pRatio*sRatio;			
                lastW = iw; lastH = ih; lastS = sRatio;            
                stage.tickOnUpdate = false;            
                stage.update();            
                stage.tickOnUpdate = true;		
            }
        }
        makeResponsive(false,'both',false,1);	
        AdobeAn.compositionLoaded(lib.properties.id);
        fnStartAnimation();
    }

    init();  */

    return (
        /*<div onLoad= {() => this.init()} id="animation_container" style="background-color:rgba(255, 255, 255, 0); width:600px; height:440px">
            <canvas id="canvas" width="600" height="440" style="position: absolute; display: block; background-color:rgba(255, 255, 255, 0.00);"></canvas>
            <div id="dom_overlay_container" style="pointer-events:none; overflow:hidden; width:600px; height:440px; position: absolute; left: 0px; top: 0px; display: block;">
            </div>
        </div>*/
        <object aria-label='animation' role='img' width="600" height="440" type="text/html" data={props._data} ></object>
    )
}

export default FlashObject