(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window) {
    var DOMChangePlugin, defaults, pluginName;
    pluginName = 'domchange';
    defaults = {
      events: {
        attributes: true,
        children: true,
        characterData: true
      },
      descendents: true,
      recordPriorValues: {
        attributes: false,
        characterData: false
      },
      attributeFilter: null
    };
    DOMChangePlugin = (function() {
      function DOMChangePlugin(element, options) {
        this.element = element;
        this.callback = __bind(this.callback, this);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      DOMChangePlugin.prototype.init = function() {
        var MutationObserver;
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        this.observer = new MutationObserver(this.callback);
        return this.observer.observe(this.element, {
          childList: this.options.events.children,
          attributes: this.options.events.attributes,
          characterData: this.options.events.characterData,
          subtree: this.options.descendents,
          attributeOldValue: this.options.recordPriorValues.attributes,
          characterDataOldValue: this.options.recordPriorValues.characterDataOldValue
        });
      };

      DOMChangePlugin.prototype.callback = function(mutations) {
        return $(this.element).trigger('domchange', mutations);
      };

      return DOMChangePlugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if ($.data(this, 'plugin_#{pluginName}') == null) {
          return $.data(this, 'plugin_#{pluginName}', new DOMChangePlugin(this, options));
        }
      });
    };
  })(jQuery, window);

}).call(this);
