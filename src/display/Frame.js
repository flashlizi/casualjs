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
 * @name Frame
 * @class The Frame class represents a frame in a MovieClip.
 * @property disObj The display object of the frame.
 * @property label The label of the frame.
 * @property gotoFrame Specify a frame the playhead moves to, it can be either frameNumber or frameLabel.
 * @property pauseFrames Specify the number of frames to pause.
 * @property stop A Boolean indicates whether stop after this frame.
 */
var Frame = function(disObj, label, gotoFrame, pauseFrames, stop)
{
	this.disObj = disObj; //display object of the frame
	this.label = label || null; //label for the frame
	this.gotoFrame = gotoFrame || 0; //can be either frameNumber or frameLabel
	this.pauseFrames = pauseFrames || 0; //number of frames to pause
	this.stop = stop || false; //whether stop after this frame
}
casual.Frame = Frame;

/**
 * Simple render interface.
 */
Frame.prototype.render = function(context, x, y)
{
	if(x) this.disObj.x = x;
	if(y) this.disObj.y = y;
	this.disObj._render(context, false, false);
}

})();
 