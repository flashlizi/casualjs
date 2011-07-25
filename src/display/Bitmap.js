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
 * @name Bitmap
 * @class The Bitmap class represents bitmap images which are display objects. Different from Bitmap class in AS3, it can accept mouse interactions.
 * @augments DisplayObject
 * @property image The image source for bitmap.
 * @property frame A special frame of image to render. The format is [x, y, width, height, regX, regY].
 * @param image Image data, can be HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
 * @param frame format: [x, y, width, height, regX, regY]
 */ 
var Bitmap = function(image, frame)
{	
	casual.DisplayObject.call(this);
	this.name = NameUtil.createUniqueName("Bitmap");
	
	//default is mouse disabled, but differ from Bitmap in AS3, this Bitmap can accept interaction
	this.mouseEnabled = false;
	
	//save image and image frame data
	this.image = image;	
	if(!frame) this.frame = [0, 0, image.width, image.height];
	else this.frame = frame;
	this.width = this.frame[2];
	this.height = this.frame[3];
	this.regX = this.frame[4] || 0;
	this.regY = this.frame[5] || 0;
}
casual.inherit(Bitmap, casual.DisplayObject);
casual.Bitmap = Bitmap;

Bitmap.prototype.render = function(context)
{
	context.drawImage(this.image, this.frame[0], this.frame[1], this.frame[2], this.frame[3], 0, 0, this.width, this.height);
}

})();