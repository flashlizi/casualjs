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
 * @name Color
 * @class The Color class provides methods for manipulating colors.
 * @param r red 0-255
 * @param g green 0-255
 * @param b blue 0-255
 * @param a alpha 0-1
 */
var Color = function(r, g, b, a)
{
	this.r = r != undefined ? r : 0;
	this.g = g != undefined ? g : 0;
	this.b = b != undefined ? b : 0;
	this.a = a != undefined ? a : 1;
}
casual.Color = Color;

/**
 * Returns the R+G+B combination currently in use by the color object.
 */
Color.prototype.getRGB = function()
{
	return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
}

/**
 * Returns the R+G+B+A combination currently in use by the color object.
 */
Color.prototype.getRGBA = function()
{
	return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
}

/**
 * Returns the HEX string currently in use by the color object.
 */
Color.prototype.getHEX = function()
{
	var r = this.r.toString(16);
    r = (r.length == 1) ? ('0' + r) : r;
	var g = this.g.toString(16);
    g = (g.length == 1) ? ('0' + g) : g;
    var b = this.b.toString(16);
    b = (b.length == 1) ? ('0' + b) : b;
    return r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
}

/**
 * Converts the color to grayscale mode.
 */
Color.prototype.toGrayscale = function()
{
	var average = parseInt((this.r * 0.3 + this.g * 0.59 + this.b * 0.11).toFixed(0), 10);
   	this.r = this.g = this.b = average;
}

/**
 * Converts the color to black and white mode.
 */
Color.prototype.toBlackWhite = function(threshold)
{
	threshold = threshold || 127;
	var average = (this.r * 0.3 + this.g * 0.59 + this.b * 0.11).toFixed(0);    
    average = average < threshold ? 0 : 255;
	this.r = this.g = this.b = average;
}
 
})();