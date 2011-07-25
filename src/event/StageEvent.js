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
 * @name StageEvent
 * @class A StageEvent object is dispatched whenever enter frame event or mouse events occur on Stage.
 * @augments EventBase
 * @property mouseX The x accordinate of mouse postion on Stage.
 * @property mouseY The y accordinate of mouse postion on Stage.
 */ 
var StageEvent = function(type, bubbles, cancelable)
{
	casual.EventBase.call(this, type, bubbles, cancelable);
		
	this.mouseX = 0;
	this.mouseY = 0;
}
casual.inherit(StageEvent, casual.EventBase);
casual.StageEvent = StageEvent;

//Stage event types
/** Defines the value of the type property of a enter frame event object. */
StageEvent.ENTER_FRAME = "enterframe";
/** Defines the value of the type property of a mousedown event object. */
StageEvent.MOUSE_DOWN = "mousedown";
/** Defines the value of the type property of a mouseup event object. */
StageEvent.MOUSE_UP = "mouseup";
/** Defines the value of the type property of a mousemove event object. */
StageEvent.MOUSE_MOVE = "mousemove";
/** Defines the value of the type property of a mouseover event object. */
StageEvent.MOUSE_OVER = "mouseover";
/** Defines the value of the type property of a mouseout event object. */
StageEvent.MOUSE_OUT = "mouseout";


/**
 * Returns whether the browser support touch.
 */
StageEvent.supportTouch = function()
{
	return "ontouchstart" in document;
}

/**
 * Returns a string of the StageEvent object.
 */
StageEvent.prototype.toString = function()
{
	return "[StageEvent type=" + this.type + ", mouseX=" + this.mouseX + ", mouseY=" + this.mouseY + "]";
}

})();