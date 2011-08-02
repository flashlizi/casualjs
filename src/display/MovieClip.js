/**
 * CasualJS Framework by Flashlizi, Copyright (c) 2011 RIAidea.com
 * Project Homepage: www.html5idea.com and http://code.google.com/p/casualjs/
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function(){
/**
 * Constructor.
 * @name MovieClip
 * @class The MovieClip class inherits from Sprite, but unlike Sprite, a MovieClip object has frames.
 * @augments Sprite
 * @property currentFrame Specifies the number of the frame in which the playhead is located in the frames sequence.
 */
var MovieClip = function(frames)
{
	casual.Sprite.call(this);
	this.name = NameUtil.createUniqueName("MovieClip");
	
	this._frameLables = {};
	this._frames = [];
	if(frames) this.addFrame(frames);
	this.currentFrame = 1; //starts from 1
	this._frameDisObj = null;
	this._pauseFrames = 0;
	this._paused = false;
}
casual.inherit(MovieClip, casual.Sprite);
casual.MovieClip = MovieClip;

/**
 * Appends a frame data to the frame sequence.
 */
MovieClip.prototype.addFrame = function(data)
{
	if(data[0] instanceof casual.Frame || data[0] instanceof Array) for(var i in data) this.addFrame(data[i]);
	else this.setFrame(this._frames.length + 1, data);
        return this;
}

/**
 * Adds a frame data to the specified index position.
 */
MovieClip.prototype.addFrameAt = function(data, frameNumber)
{
	this._frames.splice(frameNumber, 0, null);
	this.setFrame(frameNumber + 1, data);
}

/**
 * @private
 */
MovieClip.prototype.setFrame = function(frameNumber, data)
{
	var frame;
	if(data instanceof casual.Frame) frame = data;
	else frame = new casual.Frame(data);
	this._frames[frameNumber - 1] = frame;
	if(frame.label) this._frameLables[frame.label] = frame;
	if(frameNumber == 1)
	{
		this._frameDisObj = frame.disObj;
		this.width = Math.max(this.width, this._frameDisObj.width);
		this.height = Math.max(this.height, this._frameDisObj.height);
	}
}

/**
 * Gets the specified frame number.
 */
MovieClip.prototype.getFrameNumber = function(frameNumberOrLabel)
{
	if(typeof(frameNumberOrLabel) == "number") return frameNumberOrLabel;
	var frame = frameNumberOrLabel;
	if(typeof(frame) == "string") frame = this._frameLables[frameNumberOrLabel];	
	for(var i = 0; i < this._frames.length; i++)
	{
		if(frame == this._frames[i]) return i + 1;
	}
	return -1;
}

/**
 * Gets the specified frame.
 */
MovieClip.prototype.getFrame = function(frameNumberOrLabel)
{
	if(typeof(frameNumberOrLabel) == "number") return this._frames[frameNumberOrLabel - 1];
	return this._frameLables[frameNumberOrLabel];
}

/**
 * Removes the specified frame.
 */
MovieClip.prototype.removeFrame = function(frameNumberOrLabel)
{
	var frame = this.getFrame(frameNumberOrLabel),
		frameNumber = frameNumberOrLabel;
	if(frame.label)
	{
		frameNumber = this.getFrameNumber(frame);
		delete this._frameLables[frame.label];
	}
	this._frames.splice(frameNumber - 1, 1);
}

/**
 * Remove All Frame
 */
MovieClip.prototype.removeAllFrames = function()
{
	var _this = this;
	this._frames.forEach(function( ele, index){
		_this.removeFrame(index + 1);
	});
	this._frames = [];
	this.removeAllChildren();
	return this;
}

/**
 * Returns the total number of frames.
 */
MovieClip.prototype.getTotalFrames = function()
{
	return this._frames.length;
}

/**
 * Moves the playhead to next frame.
 */
MovieClip.prototype.nextFrame = function()
{
	var frame = this.getFrame(this.currentFrame);
	
	//pause frames
	if(frame.pauseFrames)
	{		
		if(frame.pauseFrames > this._pauseFrames) this._pauseFrames++;	
		else this._pauseFrames = 0;
	}
	
	//go to a specific frame
	if(frame.gotoFrame) 
	{
		if(this._pauseFrames == 0 || !frame.pauseFrames) 
		{
			return this.currentFrame = this.getFrameNumber(frame.gotoFrame);
		}
	}
	
	if(frame.pauseFrames && this._pauseFrames > 0) return this.currentFrame;
	else if(this.currentFrame >= this._frames.length) return this.currentFrame = 1;
	else return ++this.currentFrame;
}

/**
 * Moves the playhead in the movie clip.
 */
MovieClip.prototype.play = function()
{
	this._paused = false;
}

/**
 * Stops the playhead in the movie clip.
 */
MovieClip.prototype.stop = function()
{
	this._paused = true;
}

/**
 * Moves the playhead to the specified frame and stops it there.
 */
MovieClip.prototype.gotoAndStop = function(frameNumberOrLabel)
{	
	this.currentFrame = this.getFrameNumber(frameNumberOrLabel);
	this._paused = true;
}

/**
 * Starts playing the MovieClip at the specified frame.
 */
MovieClip.prototype.gotoAndPlay = function(frameNumberOrLabel)
{
	this.currentFrame = this.getFrameNumber(frameNumberOrLabel);
	this._paused = false;
}

/**
 * @private
 */
MovieClip.prototype.render = function(context)
{
	var frame = this.getFrame(this.currentFrame);
	//remove display object of last frame
	if(this._frameDisObj && this._frameDisObj != frame.disObj) this.removeChild(this._frameDisObj);
	//add display object of current frame	
	this.addChildAt(frame.disObj, 0);
	this._frameDisObj = frame.disObj;	
	this.width = Math.max(this.width, this._frameDisObj.width);
	this.height = Math.max(this.height, this._frameDisObj.height);
	if(frame.stop) this.stop();

	//render children
	MovieClip.superClass.render.call(this, context);

	//go to next frame
	if(!this._paused && context == this.getStage().context) this.nextFrame();
}

})();