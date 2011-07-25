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
 * @name Shape
 * @class The Shape class includes a graphics property, which lets you create shapes and graphics. Known issue: the width and height are 0, need to be specified manually.
 * @augments DisplayObject
 * @property graphics Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
 */ 
var Shape = function(graphics)
{	
	casual.DisplayObject.call(this);
	this.name = NameUtil.createUniqueName("Shape");
	
	this.mouseEnabled = false;
	this.graphics = graphics || new casual.Graphics();
}
casual.inherit(Shape, casual.DisplayObject);
casual.Shape = Shape;

/**
 * @private
 */
Shape.prototype.render = function(context)
{
	context.drawImage(this.graphics.get(), 0, 0);
}

})();