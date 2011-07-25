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
 * Constructor. Creates an Event object to pass as a parameter to event listeners.
 * @name EventBase
 * @class The EventBase class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 * @property type The type of event.
 * @property target The event target.
 * @property currentTarget The object that is actively processing the Event object with an event listener.
 * @property params The passed parameters object to event listeners.
 */ 
var EventBase = function(type, bubbles, cancelable)
{
	this.type = type;
	this.target = null;
	this.currentTarget = null;	
	this.params = null;
	
	this.bubbles = bubbles != undefined ? bubbles : false; //TODO Not implemented yet.
	this.cancelable = cancelable != undefined ? cancelable : false;	//TODO Not implemented yet.
}
casual.EventBase = EventBase;

/**
 * @private Not implemented yet.
 */
EventBase.prototype.stopPropagation = function()
{
	//TODO
}

/**
 * @private Not implemented yet.
 */
EventBase.prototype.preventDefault = function()
{
	//TODO
}

/**
 * Duplicates an instance of the Event object.
 */
EventBase.prototype.clone = function()
{
	return casual.copy(this);
}

/**
 * Deletes all properties of the Event object.
 */
EventBase.prototype.dispose = function()
{
	delete this.type;
	delete this.target;
	delete this.currentTarget;
	delete this.params;
}

/**
 * Returns a string of the Event object.
 */
EventBase.prototype.toString = function()
{
	return "[EventBase type=" + this.type + "]";
}

})();