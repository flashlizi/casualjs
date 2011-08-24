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
 * @name EventDispatcher
 * @class The EventDispatcher class is the base class for all classes that dispatch events. It is the base class for the DisplayObject class.
 */
var EventDispatcher = casual.EventDispatcher = function(){ };

/**
 * Registers an event listener with an EventDispatcher object so that the listener receives notification of an event.
 */
EventDispatcher.prototype.addEventListener = function(type, listener)
{
	return casual.EventManager.addEventListener(this, type, listener);
}

/**
 * Removes a listener from the EventDispatcher object.
 */
EventDispatcher.prototype.removeEventListener = function(type, listener)
{
	if(listener) return casual.EventManager.removeEventListener(this, type, listener);
	return casual.EventManager.removeEventListenerByType(this, type);
}

/**
 * Removes all listeners from the EventDispatcher object.
 */
EventDispatcher.prototype.removeAllEventListeners = function()
{
	return casual.EventManager.removeAllEventListeners(this);
}

/**
 * Dispatches an event to its registered listeners.
 */
EventDispatcher.prototype.dispatchEvent = function(event)
{
	return casual.EventManager.dispatchEvent(this, event);
}

/**
 * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
 */
EventDispatcher.prototype.hasEventListener = function(type)
{
	return casual.EventManager.hasEventListener(this, type);
}

})();