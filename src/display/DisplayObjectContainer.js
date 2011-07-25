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
 * @name DisplayObjectContainer 
 * @class The DisplayObjectContainer class is an abstract base class for all objects that can contain child objects. It cannot be instantiated directly.<br>Each DisplayObjectContainer object has its own child list for organizing the z-order of the objects. The z-order is the front-to-back order that determines which object is drawn in front, which is behind, and so on.<br>
 * @augments DisplayObject 
 * @property children An array list of all children in the display object container.
 * @property mouseChildren Determines whether or not the children of the object are mouse enabled.
 */
var DisplayObjectContainer = function()
{	
	casual.DisplayObject.call(this);
	this.children = [];
	this.mouseChildren = true;
}
casual.inherit(DisplayObjectContainer, casual.DisplayObject);
casual.DisplayObjectContainer = DisplayObjectContainer;

/**
 * Adds a child DisplayObject instance to this DisplayObjectContainer instance.
 */
DisplayObjectContainer.prototype.addChild = function(child)
{
	if(this.getChildIndex(child) != -1)
	{
		child.parent = this;
		return child;
	}

	if(child.parent) child.parent.removeChild(child);
	this.children[this.children.length] = child;
	child.parent = this;
	return child;
}

/**
 * Adds a child DisplayObject instance to the specific index of this DisplayObjectContainer instance.
 */
DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
	if(this.getChildIndex(child) != -1)
	{
		child.parent = this;
		return child;
	}

	if(child.parent) child.parent.removeChild(child);
	this.children.splice(index, 0, child);
	child.parent = this;	
	return child;
}

/**
 * Removes the specified child DisplayObject instance from the child list of the DisplayObjectContainer instance.
 */
DisplayObjectContainer.prototype.removeChild = function(child)
{
	return this.removeChildAt(this.children.indexOf(child));
}

/**
 * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer.
 */
DisplayObjectContainer.prototype.removeChildAt = function(index)
{
	if (index < 0 || index > this.children.length - 1) return false;
	var child = this.children[index];
	if (child != null) 
	{
		child.parent = null;
		child.stage = null;
	}
	this.children.splice(index, 1);
	return true;
}

/**
 * Removes a child DisplayObject with the specified name in the child list of the DisplayObjectContainer.
 */
DisplayObjectContainer.prototype.removeChildByName = function(name)
{	
	for(var i = 0, len = this.children.length; i < len; i++)
	{
		if(this.children[i].name == name) 
		{
			return this.removeChildAt(i);
		}
	}
	return null;
}

/**
 * Removes all children of the DisplayObjectContainer.
 */
DisplayObjectContainer.prototype.removeAllChildren = function()
{
	while(this.children.length > 0) this.removeChildAt(0);
}

/**
 * Returns the child display object that exists with the specified name.
 */
DisplayObjectContainer.prototype.getChildByName = function(name)
{
	for(var i = 0, len = this.children.length; i < len; i++)
	{
		if(this.children[i].name == name) return this.children[i];
	}
	return null;
}

/**
 * Returns the child display object instance that exists at the specified index.
 */
DisplayObjectContainer.prototype.getChildAt = function(index)
{
	if (index < 0 || index > this.children.length - 1) return null;
	return this.children[index];
}

/**
 * Returns the index position of a child DisplayObject instance.
 */
DisplayObjectContainer.prototype.getChildIndex = function(child)
{
	return this.children.indexOf(child);
}

/**
 * Changes the position of an existing child in the display object container.
 */
DisplayObjectContainer.prototype.setChildIndex = function(child, index)
{
	if(child.parent != this) return;
	var oldIndex = this.children.indexOf(child);
	if(index == oldIndex) return;
	this.children.splice(oldIndex, 1);
	this.children.splice(index, 0, child);
}

/**
 * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
 */
DisplayObjectContainer.prototype.contains = function(child)
{
	return this.getChildIndex(child) != -1;
}

/**
 * Returns the number of children of this object.
 */
DisplayObjectContainer.prototype.getNumChildren = function()
{
	return this.children.length;
}

/**
 * Returns an array of objects that lie under the specified point and are children(or grandchildren, and so on) of this DisplayObjectContainer instance.
 */
DisplayObjectContainer.prototype.getObjectUnderPoint = function(x, y, usePixelCollision, tolerance, returnAll)
{
	if(returnAll) var result = [];
	for(var i = this.children.length - 1; i >= 0; i--)
	{
		var child = this.children[i];
		if(child == null || !child.mouseEnabled || !child.visible || child.alpha <= 0) continue;
		
		if((child instanceof DisplayObjectContainer) && child.mouseChildren && child.getNumChildren() > 0)
		{			
			var obj = child.getObjectUnderPoint(x, y, usePixelCollision, tolerance, returnAll);
			if(obj)
			{
				if(returnAll) {if(obj.length > 0) result = result.concat(obj);}
				else return obj;
			}else if(child.hitTestPoint(x, y, usePixelCollision, tolerance))
			{
				if(returnAll) result.push(child);
				else return child;
			}			
		}else
		{
			if(child.hitTestPoint(x, y, usePixelCollision, tolerance)) 
			{
				if(returnAll) result.push(child);
				else return child;
			}
		}
	}
	if(returnAll) return result;
	return null;
}

/**
 * @private Renders all children of the DisplayObjectContainer onto specific context.
 */
DisplayObjectContainer.prototype.render = function(context)
{
	for(var i = 0, len = this.children.length; i < len; i++)
	{
		var child = this.children[i];
		child._render(context);
	}
}

})();