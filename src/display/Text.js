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

(function () {
    /**
     * Constructor.
     * @name Text
     * @class The Text class provides basic methods to draw text onto Stage.
     * @augments DisplayObject
     * @property text The text string to be displayed.
     * @property color The color of the text, default is "#000".
     * @property font The font style for text, default is "12px Arial".
     * @property align Indicates the alignment of the text paragraph, default is "start".
     * @property outline A Boolean that indicates whether the text is outline or not, default is false.
     * @property maxWidth Indicates the maximum width of the text paragraph.
     */
    var Text = function (text, color, font) {
        casual.DisplayObject.call(this);
        this.name = NameUtil.createUniqueName("Text");

        this.text = text;
        this.color = color || "#000";
        this.font = font || "12px Arial";
        this.align = "start";
        this.baseline = "alphabetic";
        this.maxWidth = undefined;
        this.outline = false;
        this.fontHeight = 0;
    }
    casual.inherit(Text, casual.DisplayObject);
    casual.Text = Text;

    /**
     * @private Internal render function overriding from DisplayObject.
     */
    Text.prototype.render = function (context) {
        if (!this.text || this.text.length === 0) {
            return;
        }
        if (this.outline) {
            context.strokeStyle = this.color;
        } else {
            context.fillStyle = this.color;
        }
        context.font = this.font;
        context.textAlign = this.align;
        context.textBaseline = this.baseline;
        if (!this.fontHeight) {
            this.fontHeight = this.getFontHeight(context);
        }
        if (this.outline) {
            context.strokeText(this.text, 0, this.fontHeight, this.maxWidth);
        } else {
            context.fillText(this.text, 0, this.fontHeight, this.maxWidth);
        }

    };

    /**
     * Gets the width of the text.
     */
    Text.prototype.getWidth = function (context) {
        if (!this.text || this.text.length == 0) return 0;
        return context.measureText(this.text).width;
    };

    /**
     * Gets the font height of the text.
     * @param context
     * @returns {number} font height
     */
    Text.prototype.getFontHeight = function (context) {
        return context.measureText("啊").width;
    }
})();