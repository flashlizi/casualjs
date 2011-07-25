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
 * @name Rectangle
 * @class The Rectangle object is an area defined by its position.
 * @property x The horizontal coordinate of the rectangle.
 * @property y The vertical coordinate of the rectangle.
 * @property width The width of the rectangle.
 * @property height The height of the rectangle.
 */ 
var Rectangle = function(x, y, width, height)
{
	this.x = x != undefined ? x : 0;
	this.y = y != undefined ? y : 0;
	this.width = width != undefined ? width : 0;
	this.height = height != undefined ? height : 0;
}
casual.Rectangle = Rectangle;

//TODO: more manipulation functions.

/**
 * Returns whether this rectangle intersects the rectangle parameter.
 * @param rect A Rectangle.
 */
Rectangle.prototype.intersects = function(rect)
{
	return (this.x <= rect.x + rect.width && rect.x <= this.x + this.width &&
			this.y <= rect.y + rect.height && rect.y <= this.y + this.height);
};

/**
 * Computes the intersection of this rectangle and the rectangle parameter. 
 * @param rect A Rectangle.
 */
Rectangle.prototype.intersection = function(rect)
{
	var x0 = Math.max(this.x, rect.x);
	var x1 = Math.min(this.x + this.width, rect.x + rect.width);

	if(x0 <= x1)
	{
		var y0 = Math.max(this.y, rect.y);
		var y1 = Math.min(this.y + this.height, rect.y + rect.height);

		if(y0 <= y1)
		{
			return new Rectangle(x0, y0, x1 - x0, y1 - y0);
		}
	}
	return null;
};

/**
 * Checks this rectangle whether contains the point parameter.
 */
Rectangle.prototype.containsPoint = function(x, y)
{
	return (this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height);
}

/**
 * Creates a copy of this Rectangle object.
 */
Rectangle.prototype.clone = function()
{
	return new Rectangle(this.x, this.y, this.width, this.height);	
}

/**
 * Returns a string that represent this Rectangle object.
 */
Rectangle.prototype.toString = function()
{
	return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";	
}

})();