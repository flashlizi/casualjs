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
 * No Constructor, cannot be instantiated.
 * @name NameUtil
 * @class The NameUtil utility class defines static methods for creating names for objects in CasualJS Framework.
 */ 
var NameUtil = { _counter:0 };
casual.NameUtil = NameUtil;

/**
 * Gets a unique number id.
 */
NameUtil.getUID = function()
{
	return NameUtil._counter++;
}

/**
 * Creates a unique name for any Object instance, such as "MovieClip12", by combining the unqualified class name with an incrementing counter.
 */
NameUtil.createUniqueName = function(name)
{
	//if end with a digit, then append an underscore before appending
	var charCode = name.charCodeAt(name.length - 1);
    if (charCode >= 48 && charCode <= 57) name += "_";
    return name + NameUtil.getUID();
}

/**
 * Returns a string, such as "Stage0.scene1.buttonContainer2.Sprite3", for a DisplayObject object that indicates its position in the ierarchy of DisplayObject objects in an application.
 */
NameUtil.displayObjectToString = function(displayObject)
{
	var result;
	for(var o = displayObject; o != null; o = o.parent)
	{		
		//prefer id over name if specified
        var s = o.id != null ? o.id : o.name;
        result = result == null ? s : (s + "." + result);
        if (o == o.parent || o.parent instanceof Stage) break;
	}
	return result;
}

})();