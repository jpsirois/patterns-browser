/*! Echo v1.4.0 | (c) 2013 @toddmotto | MIT license | github.com/toddmotto/echo */
/* With the little modification to add background-image support based on tagName */
/* https://github.com/jpsirois/echo/commit/ddd1bf */
window.Echo = (function (window, document, undefined) {

  'use strict';

  var store = [], offset, throttle, poll, type;

  var _inView = function (el) {
    var coords = el.getBoundingClientRect();
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
  };

  var _pollImages = function () {
    for (var i = store.length; i--;) {
      var self = store[i];
      if (_inView(self)) {
        if (self.tagName.toLowerCase() === 'img') {
          self.src = self.getAttribute('data-echo');
        } else {
          self.style.backgroundImage = 'url(' + self.getAttribute('data-echo') + ')';
        }
        store.splice(i, 1);
      }
    }
  };

  var _throttle = function () {
    clearTimeout(poll);
    poll = setTimeout(_pollImages, throttle);
  };

  var init = function (obj) {
    var nodes = document.querySelectorAll('[data-echo]');
    var opts = obj || {};
    offset = opts.offset || 0;
    throttle = opts.throttle || 250;

    for (var i = 0; i < nodes.length; i++) {
      store.push(nodes[i]);
    }

    _throttle();

    if (document.addEventListener) {
      window.addEventListener('scroll', _throttle, false);
    } else {
      window.attachEvent('onscroll', _throttle);
    }
  };

  return {
    init: init,
    render: _throttle
  };

})(window, document);