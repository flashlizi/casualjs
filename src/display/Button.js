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
 * @name Button
 * @class This class is the Button implementation in HTML5 Canvas.<br>You can specify mouse handlers for specific events. You can also change the appearance of the button by associating a different skin with each button state.
 * @augments MovieClip
 * @param upState A display object for normal state.
 * @param overState A display object for mouse over state, optional.
 * @param downState A display object for mouse down state, optional.
 * @param disabledState A display object for disabled state, optional.
 * @property state Current button state name.
 * @property enabled A Boolean value that indicates whether the button can accept mouse events. 
 */
var Button = function(upState, overState, downState, disabledState)
{
	casual.MovieClip.call(this);
	this.name = NameUtil.createUniqueName("Button");

	if(upState) this.setUpState(upState);
	if(overState) this.setOverState(overState);
	if(downState) this.setDownState(downState);
	if(disabledState) this.setDisabledState(disabledState);
	
	//default state
	this.state = Button.state.UP;

	this.enabled = true;
	//disable mouse children, so the button act as one object, and get fast mouse target tracing.
	this.mouseChildren = false;
	//use hand cursor default
	this.useHandCursor = true;

	this.stop();
}
casual.inherit(Button, casual.MovieClip);
casual.Button = Button;

Button.state = 
{
	/** 
	 * @description State constant of "up".
	 * @memberOf Button 
	 */
	UP: "up",
	/** 
	 * @description State constant of "over".
	 * @memberOf Button
	 */
	OVER: "over",
	/** 
	 * @description State constant of "down".
	 * @memberOf Button
	 */
	DOWN: "down",
	/** 
	 * @description State constant of "disabled".
	 * @memberOf Button
	 */
	DISABLED: "disabled"
}

/**
 * Sets display object for the normal state.
 */
Button.prototype.setUpState = function(upState)
{
	var frame = new casual.Frame(upState, Button.state.UP);
	this.addFrameAt(frame, 0);
	this.upState = upState;
	return this;
}

/**
 * Sets display object for the mouse over state.
 */
Button.prototype.setOverState = function(overState)
{
	var frame = new casual.Frame(overState, Button.state.OVER);
	this.addFrameAt(frame, 1);
	this.overState = overState;
	return this;
}

/**
 * Sets display object for the mouse down state.
 */
Button.prototype.setDownState = function(downState)
{
	var frame = new casual.Frame(downState, Button.state.DOWN);
	this.addFrameAt(frame, 2);
	this.downState = downState;
	return this;
}

/**
 * Sets display object for the disbaled state.
 */
Button.prototype.setDisabledState = function(disabledState)
{
	var frame = new casual.Frame(disabledState, Button.state.DISABLED);
	this.addFrameAt(frame, 3);
	this.disabledState = disabledState;
	return this;
}

/**
 * Enables or disables the button.
 */
Button.prototype.setEnabled = function(enabled)
{
	if(this.enabled == enabled) return this;
	this.mouseEnabled = this.enabled = enabled;	 
	if(!enabled)
	{
		if(this.disabledState) this.gotoAndStop(Button.state.DISABLED);
		else this.gotoAndStop(Button.state.UP);
	}else
	{
		if(this.currentFrame == 4) this.gotoAndStop(Button.state.UP);
	}
	return this;
}

/**
 * Sets the button's state name. Developers can use it to change button state manually.
 */
Button.prototype.setState = function(state)
{
	if(this.state == state) return;
	this.state = state;

	switch(state)
	{
		case Button.state.OVER:
		case Button.state.DOWN:
		case Button.state.UP:
			if(!this.enabled) this.mouseEnabled = this.enabled = true;
			this.gotoAndStop(state);
			break;
		case Button.state.DISABLED:
			this.setEnabled(false);
			break;
	}
}

/**
 * Internal handler for mouse events. Normally developers should not modify it.
 * @private
 */
Button.prototype.onMouseEvent = function(e)
{
	if(!this.enabled) return;
	
	switch(e.type)
	{
		case "mousemove":  
			if(this.onMouseOver && this.state != Button.state.OVER) 
			{
				e.type = "mouseover";
				this.onMouseOver(e);
			}else if(this.onMouseMove && this.state == Button.state.OVER) 
			{
				this.onMouseMove(e);
			}
			if(this.overState && this.state == Button.state.UP) this.setState(Button.state.OVER); 			
			break;	
		case "mouseout":
			if(this.upState) this.setState(Button.state.UP); 
			if(this.onMouseOut) 
			{
				e.type = "mouseout";
				this.onMouseOut(e);
			}
			break;
		case "mousedown":  
			if(this.downState) this.setState(Button.state.DOWN); 
			if(this.onMouseDown) this.onMouseDown(e);
			break;
		case "mouseup":
			if(this.overState) this.setState(Button.state.OVER);
			else this.setState(Button.state.UP);
			if(this.onMouseUp) this.onMouseUp(e);
			break;
	}
}

/**
 * A Handler for mouse move event. Default is null.
 * @function
 * @param event
 */
Button.prototype.onMouseMove = null;

/**
 * A Handler for mouse over event. Default is null.
 * @function
 * @default null
 * @param event
 */
Button.prototype.onMouseOver = null;
/**
 * A Handler for mouse out event. Default is null.
 * @function
 * @param event
 */

Button.prototype.onMouseOut = null;
/**
 * A Handler for mouse down event. Default is null.
 * @function
 * @param event
 */

Button.prototype.onMouseDown = null;
/**
 * A Handler for mouse up event. Default is null.
 * @function
 * @param event
 */
Button.prototype.onMouseUp = null;

})();