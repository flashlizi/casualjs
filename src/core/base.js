/**
 * CasualJS Framework by Flashlizi, Copyright (c) 2011 RIAidea.com
 * Project Homepage: www.html5idea.com and http://code.google.com/p/casualjs/
 * 
 * DATE : @DATE 
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
 * No Constructor, cannot be instantiated.
 * @name casual
 * @class Basic object of Casual Framework, provides some core functions.
 */
var casual = 
{
	version: "@VERSION"
};

/**
 * Like trace() in as3, for debug purpose. you can just use trace().
 */
casual.trace = function()
{
	var logs = [];
	for (var i = 0; i < arguments.length; i++) logs.push(arguments[i]);
	//output to console.log by default
	if(typeof(console) != "undefined" && typeof(console.log) != "undefined") console.log(logs.join(" "));
};

/**
 * Inheritance implementation for Javascript.
 */
casual.inherit = function(childClass, parentClass, newProperties) 
{
	var ctor = function() {},
		child;
	
	ctor.prototype = parentClass.prototype;
	// for old program
  	
  	childClass.prototype = new ctor();
  	childClass.prototype.constructor = childClass;
  	childClass.superClass = parentClass.prototype;
	
	// new inherit method;
	if (childClass && childClass.hasOwnProperty('constructor')) {
      child = childClass.constructor;
    } else {
      child = function(){ return parentClass.apply(this, arguments); };
    }

	//copy parentClass static properties to child;
	casual.extend(child , parentClass);
	child.prototype = new ctor();
	child.prototype.constructor = child;
	child.superClass = parentClass.prototype;
	
	//copy childClass prototype  properties to child,
	//this will add all parent prototype function to child.__proto__
	casual.extend(child.prototype, childClass.prototype);
	
	//console.dir(childClass.prototype);
	
	//copy childClass static properties to child;
	casual.extend(child, childClass);
	
	//copy newProperties static properties to child.prototype
	casual.extend(child.prototype, newProperties);

	return child;
};

/**
 * Delegate the reference of this within functions.
 */
casual.delegate = function(func, self, args)
{
	var context = self || window;
  	if (arguments.length > 2) 
  	{
    	var boundArgs = Array.prototype.slice.call(arguments, 2);
    	return function(){
      		var newArgs = Array.prototype.slice.call(arguments);
      		Array.prototype.unshift.apply(newArgs, boundArgs);
      		return func.apply(context, newArgs);
    	};
  	}

	return function() { return func.apply(context, arguments); };

};

/**
 * Make a copy of the parameter obj, you also can specify the target class and set new properties.
 */
casual.copy = function(obj, targetClass, newProperties)
{
	//base type
	if (typeof obj !== 'object') return obj;
	
	var value = obj.valueOf();
	//simple object which wraping native types
	if (obj != value) return new obj.constructor(value);
	
	var o;
	if (obj instanceof obj.constructor && obj.constructor !== Object)
	{ 
		if(targetClass) o = new targetClass();
		else o = casual.clone(obj.constructor.prototype);
		
		for(var key in obj)
		{ 
			if (targetClass || obj.hasOwnProperty(key)) o[key] = obj[key];
		}
	}else
	{
		o = {};
		for(var key in obj) o[key] = obj[key];
	}
	if(newProperties) for(var key in newProperties) o[key] = newProperties[key];
	return o;
};

/**
 *  Extend a given object with all the properties in passed-in object(s).
 *  from underscore.js
 */
casual.extend = function(obj){
	var args = Array.prototype.slice.call(arguments, 1);
	args.forEach(function(source) {
      for (var prop in source) obj[prop] = source[prop];
    });
    
	return obj;
}
/**
 * Make a new object which is the same type as the parameter obj.
 */
casual.clone = function(obj)
{
	casual.__cloneFunc.prototype = obj;
	return new casual.__cloneFunc();
};
casual.__cloneFunc = function() {};