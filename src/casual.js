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
 
 
/**
 * Alias for CasualJS Framework
 */

(function()
{	
	var conflictMap = {}, cacheMap = {};	
	function mapClass(className, host)
	{
		if(window[className] != undefined) conflictMap[className] = window[className];
		cacheMap[className] = window[className] = (host || casual)[className];
	}
		
	casual.noConflict = function()
	{
		for(var p in cacheMap) 
		{
			if(conflictMap[p] != undefined) window[p] = conflictMap[p];
			else delete window[p];
		}
	}
	
	mapClass("trace");
	
	mapClass("EventBase");
	mapClass("StageEvent");
	mapClass("EventDispatcher");
	
	mapClass("Matrix");
	mapClass("Point");
	mapClass("Rectangle");
	
	mapClass("Astar");
	mapClass("NameUtil");	
	
	mapClass("DisplayObject");
	mapClass("DisplayObjectContainer");
	mapClass("Graphics");
	mapClass("Shape");
	mapClass("Bitmap");
	mapClass("Sprite");
	mapClass("Frame");
	mapClass("MovieClip");
	mapClass("Stage");
	mapClass("Text");
	mapClass("Button");
	
})();