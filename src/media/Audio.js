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
 * @name Audio
 * @class The helper for playing audio.
 * @param filePath The audio path to play.
 * @param autoPlay Whether auto play the audio when loaded.
 * @param loop Whether loop the audio or not.
 */
var Audio = function(filePath, autoPlay, loop)
{
	this._loaded = false;
    this._playing = false;
	this._autoPlay = autoPlay;
	this._loop = loop || false;
	
	try
	{
		this._element = document.createElement('audio');
		this._element.preload = true;
		//this._element.loop = loop || false;
		this._element.src = filePath;
		this._element.load();
		//fix known issue: some browsers(like GECKO) don't support Audio.loop property.
		//so add an 'ended' event listener to handle looping.
		this._element.addEventListener("ended", casual.delegate(this._endHandler, this), false);
		this._loadInterval = setInterval(casual.delegate(this._loadHandler, this), 10);
	}catch(e){};
}
casual.Audio = Audio;

/**
 * @private
 */
Audio.prototype._loadHandler = function()
{
	if (this._element.readyState > 2)
	{
        this._loaded = true;
        clearTimeout(this._loadInterval);
		this._loadInterval = null;
		if(this._autoPlay) this.play();
    }
    if (this._element.error) 
	{
		clearTimeout(this._loadInterval);
		this._loadInterval = null;
	}
}

/**
 * @private
 */
Audio.prototype._endHandler = function()
{
	if(this._loop) this.play();
	else this._playing = false;
}

/**
 * Starts playing the audio.
 */
Audio.prototype.play = function()
{
	if (this.isLoaded())
	{
        this._element.play();
        this._playing = true;
    }else
	{
		this._autoPlay = true;
	}
};

/**
 * Stops playing the audio.
 */
Audio.prototype.stop = function()
{
    if (this.isPlaying())
	{
        this._element.pause();
        this._playing = false;
    }
};

/**
 * Returns true if audio file has been loaded.
 */
Audio.prototype.isLoaded = function()
{
    return this._loaded;
};

/**
 * Returns true if audio file is playing.
 */
Audio.prototype.isPlaying = function()
{
    return this._playing;
};

})();






