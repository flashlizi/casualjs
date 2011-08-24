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
 * Manage all events within framework
 * @name EventManager
 * @class
 * @private
 */
var EventManager = casual.EventManager =
{
	_maps: [] //[{src:srcObj, type1:[listener1, listener2], type2:[listener3, listener4]}]
};

EventManager.addEventListener = function(src, type, listener)
{	
    var map = getMap(this._maps, src, true);    
    var listeners = getListeners(map.map, type, true);
    if(listeners.indexOf(listener) == -1)
    {
    	listeners.push(listener);
    	return true;
    }
    return false;
};

EventManager.removeEventListener = function(src, type, listener)
{
	var map = getMap(this._maps, src, false);
	if(map == null) return false;
    var listeners = getListeners(map.map, type, false);
	if(listeners == null) return false;

	for(var i = 0; i < listeners.length; i++)
	{
		var li = listeners[i];
		if(li === listener)
		{
			listeners.splice(i, 1);
			if(listeners.length == 0) 
			{
				delete map.map[type];
				releaseMap(this._maps, map);
			}
			return true;
		}
	}
	return false;
};

EventManager.removeEventListenerByType = function(src, type)
{
	var map = getMap(this._maps, src, false);
    if(map && map.map.hasOwnProperty(type))
	{
		delete map.map[type];
		releaseMap(this._maps, map);
		return true;
	}
	return false;
};

EventManager.removeAllEventListeners = function(src)
{	
	for(var i = 0; i <this._maps.length; i++)
	{
		var map = this._maps[i];
		if(map.src === src)
		{
			this._maps.splice(i, 1);
			return true;
		}
	}
	return false;
};

EventManager.dispatchEvent = function(src, event)
{
	var map = getMap(this._maps, src, false);
	if(map == null) return false;
	var listeners = getListeners(map.map, event.type, false);
	if(listeners == null) return false;
	
	if(!event.target) event.target = src;

	for(var i = 0; i < listeners.length; i++)
	{
		var listener = listeners[i];
		if(typeof(listener) == "function")
		{
			listener.call(src, event);
		}
	}
	return true;
};

EventManager.hasEventListener = function(src, type)
{
	var map = getMap(this._maps, src, false);
	if(map == null) return false;
	var listeners = getListeners(map.map, type, false);
	return (listeners && listeners.length > 0);
};

function releaseMap(maps, map)
{
	var hasType = false;
	for(var key in map.map)
	{
		if(key != "src")
		{
			hasType = true;
			break;
		}
	}
	if(!hasType)
	{
		maps.splice(map.index, 1);
		return true;
	}
	return false;
}

function getMap(maps, src, autoCreate)
{
	for(var i = 0; i < maps.length; i++)
	{
		var map = maps[i];
		if(map.src === src) return {map:map, index:i};
	}
	
	if(autoCreate)
	{
		var map = {src:src};
		maps.push(map);
		return {map:map, index:maps.length-1};
	}
	return null;
}

function getListeners(map, type, autoCreate)
{
	return map.hasOwnProperty(type) ? map[type] : autoCreate ? (map[type] = []) : null;	
}

})();
