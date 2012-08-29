// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require, exports, module) {
    'use strict';

    var ColorEditor, InlineColorEditor, InlineWidget, inlineEditorTemplate;
    InlineWidget = brackets.getModule("editor/InlineWidget").InlineWidget;
    ColorEditor = require('ColorEditor');
    inlineEditorTemplate = require("text!InlineColorEditorTemplate.html");
    InlineColorEditor = (function(_super) {

      __extends(InlineColorEditor, _super);

      InlineColorEditor.prototype.parentClass = InlineWidget.prototype;

      function InlineColorEditor(initialColor, pos) {
        this.initialColor = initialColor;
        this.pos = pos;
        this._colorUpdateHandler = __bind(this._colorUpdateHandler, this);

        InlineWidget.call(this);
        this.currentColorString = this.initialColor;
      }

      InlineColorEditor.prototype.load = function(hostEditor, linePos) {
        this.hostEditor = hostEditor;
        this.linePos = linePos;
        this.parentClass.load.call(this, this.hostEditor);
        this.$wrapperDiv = $(inlineEditorTemplate);
        this.$htmlContent.append(this.$wrapperDiv);
        return this.colorEditor = new ColorEditor(this.$wrapperDiv, this.initialColor, this._colorUpdateHandler);
      };

      InlineColorEditor.prototype.close = function() {
        this.hostEditor.removeInlineWidget(this);
        if (this.onClose) {
          return this.onClose(this);
        }
      };

      InlineColorEditor.prototype.onAdded = function() {
        return window.setTimeout(this._sizeEditorToContent.bind(this));
      };

      InlineColorEditor.prototype._sizeEditorToContent = function() {
        return this.hostEditor.setInlineWidgetHeight(this, this.$wrapperDiv.outerHeight(), true);
      };

      InlineColorEditor.prototype._colorUpdateHandler = function(colorLabel) {
        var end, lineString, start;
        lineString = this.hostEditor._codeMirror.getLine(this.hostEditor.getSelection(false).start.line);
        start = lineString.indexOf(this.currentColorString);
        end = start + this.currentColorString.length;
        this.currentColorString = colorLabel;
        if (colorLabel !== this.initialColor) {
          return this.hostEditor._codeMirror.setSelection({
            line: this.linePos,
            ch: start
          }, {
            line: this.linePos,
            ch: start + colorLabel.length
          });
        }
      };

      return InlineColorEditor;

    })(InlineWidget);
    return module.exports = InlineColorEditor;
  });

}).call(this);