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
 * An abstracted event interface
 * @name EventManager
 * @class
 * @private
 */
var EventManager = function() {};
casual.EventManager = EventManager;

EventManager._maps = {};
EventManager._sources = {};
EventManager._listeners = {};
EventManager._counter = 1;

EventManager.addEventListener = function(src, type, listener)
{	
    var map = EventManager._maps[type];
    if(map == undefined) map = EventManager._maps[type] = {};
   	
   	//get src or save it
   	var srcid = EventManager._sources[src];
   	if(srcid == undefined) srcid = EventManager._sources[src] = EventManager._counter++;   	
   	
   	if(map[srcid] == undefined) map[srcid] = {};
   	map = map[srcid];
   	
   	//get listener or save it
   	var lid = EventManager._listeners[listener];
   	if(lid == undefined) lid = EventManager._listeners[listener] = EventManager._counter++;
   	
   	if(!(lid in map))
   	{
   		map = map[lid] = {};
   		map.type = type;
   		map.src = srcid;
   		map.listener = listener;
   		return true;
   	}
   	return false;
};

EventManager.removeEventListener = function(src, type, listener)
{
	//get event map by source
	var map = EventManager._maps[type];
	if(map == undefined) return false;	
	var srcid = EventManager._sources[src];
	if(srcid == undefined) return false;	
	map = map[srcid];
	if(map == undefined) return false;
	
	var empty = true;
	for(var id in map)
	{
		var obj = map[id];
		var lid = EventManager._listeners[listener];
		if(lid == id)
		{
			delete EventManager._listeners[listener];
			delete map[id];
		}else
		{
			empty = false;
		}
	}
	
	//TODO: bug?
	if(empty)
	{
		delete EventManager._maps[type][srcid];
		delete EventManager._sources[src];
	}
	
	return true;
};

EventManager.removeEventListenerByType = function(src, type)
{
	//get event map by source
	var map = EventManager._maps[type];
	if(map == undefined) return false;	
	var srcid = EventManager._sources[src];
	if(srcid == undefined) return false;	
	
	if(map != undefined) delete map[srcid];
	
	//delete type mapping if its empty
	var empty = true;
	for(var key in map) 
	{
		empty = false;
		break;
	}
	if(empty) delete EventManager._maps[type];
	
	return true;
	
};

EventManager.removeAllEventListeners = function(src)
{	
	var srcid = EventManager._sources[src];
	if(srcid == undefined) return false;
	for(var type in EventManager._maps)
	{
		var map = EventManager._maps[type];
		if(map[scrid] != undefined) delete map[scrid];
	}
	delete EventManager._sources[src];
};

EventManager.dispatchEvent = function(src, event)
{
	//get event map by source
	var map = EventManager._maps[event.type];
	if(map == undefined) return false;	
	var srcid = EventManager._sources[src];
	if(srcid == undefined) return false;	
	map = map[srcid];
	if(map == undefined) return false;
	
	//pass source as event.target if it's not set
	if(!event.target) event.target = src;
	
	for(var id in map)
	{
		var obj = map[id];
		var listener = obj.listener;
		if(typeof(listener) == "function")
		{
			listener.call(src, event);
		}
	}
	return true;
};

EventManager.hasEventListener = function(src, type)
{
	var map = EventManager._maps[type];
	if(map == undefined) return false;	
	var srcid = EventManager._sources[src];
	if(srcid == undefined) return false;
	return map[srcid] != undefined;
};

})();
