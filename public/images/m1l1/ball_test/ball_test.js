(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.ball = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0.498)").ss(1,1,1).p("AGkAAQAACuh7B7Qh7B7iuAAQitAAh7h7Qh7h7AAiuQAAitB7h7QB7h7CtAAQCuAAB7B7QB7B7AACtg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#AD6600").s().p("AkoEpQh7h7AAiuQAAitB7h7QB7h7CtAAQCuAAB7B7QB7B7AACtQAACuh7B7Qh7B7iuAAQitAAh7h7g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.ball, new cjs.Rectangle(-43,-43,86,86), null);


// stage content:
(lib.ball_test = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.ball = new lib.ball();
	this.ball.name = "ball";
	this.ball.parent = this;
	this.ball.setTransform(-40.9,176.7,0.893,0.893);

	this.timeline.addTween(cjs.Tween.get(this.ball).to({regX:0.1,regY:0.1,guide:{path:[-40.9,176.8,-34.9,176.8,-24.9,177.9,-4.9,180,15.4,185.3,80.1,202.2,122.4,244.6,164.8,287,187.1,350.4,194.1,370.2,198.3,389.7,199.9,397.5,200.7,402.7]}},21,cjs.Ease.quadIn).to({regX:0,regY:0,guide:{path:[200.7,402.6,200.9,404,201.1,405.3,203.1,394.4,208.1,378.5,218.2,346.5,233.1,320.9,253.9,285,281.4,266.8,315.9,244.1,359,250.6,402.3,257.3,435.5,282.8,462,303.2,480.9,334.7,494.3,357.2,502.6,383.1,506.4,394.7,507.9,402.7]}},16,cjs.Ease.none).to({guide:{path:[508,402.7,508.2,403.6,508.3,404.4,508.7,396.6,511.3,384.7,516.4,361.2,527.5,341.5,542.9,313.9,567.8,298.2,598.9,278.5,643.2,278.5]}},14,cjs.Ease.quadOut).wait(29));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(221.1,358.7,75.9,75.9);
// library properties:
lib.properties = {
	id: 'D4E852121A8F1340B50F423A81B3B660',
	width: 600,
	height: 440,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['D4E852121A8F1340B50F423A81B3B660'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;