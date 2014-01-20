(function ($, window, document, undefined) {

  'use strict';

  /* jQuery SmartResize {{{
   * Source: http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/ */

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout

    return function debounced () {
      var obj = this, args = arguments
      function delayed () {
        if (!execAsap) {
          func.apply(obj, args)
        }
        timeout = null
      }

      if (timeout) {
        clearTimeout(timeout)
      }
      else if (execAsap) {
        func.apply(obj, args)
      }

      timeout = setTimeout(delayed, threshold || 100)
    }
  }
  // smartresize
  jQuery.fn.smartresize = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger('smartresize') }

  /*}}}*/

  /* Boxes Layout {{{
   * Inspiration: http://benholland.me/javascript/how-to-build-a-site-that-works-like-pinterest/ */

  var colCount = 0,
      colWidth = 0,
      margin = 12,
      spaceLeft = 0,
      windowWidth = 0,
      boxes = [],
      boxWrapSelector = '.box'

  $(window).load(function(){
    setupBoxes()
    $(window).resize(setupBoxes)
  })

  function setupBoxes() {
    windowWidth = $(window).width()
    boxes = []
    colWidth = $(boxWrapSelector).outerWidth()
    colCount = Math.floor(windowWidth/(colWidth+margin*2))
    spaceLeft = (windowWidth - ((colWidth*colCount)+(margin*(colCount-1)))) / 2
    for(var i=0;i<colCount;i++){
      boxes.push(margin)
    }
    positionBoxes()
  }

  function positionBoxes() {
    $(boxWrapSelector).each(function(){
      var min = Array.min(boxes),
          index = $.inArray(min, boxes),
          leftPos = margin+(index*(colWidth+margin))

      $(this).css({
        'left':(leftPos+spaceLeft)+'px',
        'top':min+'px',
        'visibility': 'visible'
      })

      boxes[index] = min+$(this).outerHeight()+margin
    })
  }

  // Function to get the Min value in Array
  Array.min = function(array) {
    return Math.min.apply(Math, array)
  }

  /*}}}*/

  /* Item Handling {{{*/

  $('.itemWrap').each(function(){
    var $this = $(this)

    /* Add itemWrap .focus class on itemLink focus {{{*/

    $this.find('.itemLink').on('keyup',function(e) {
      if ( e.which === 9 ) {
        $this.addClass('focus')
      }
    })
    $this.find('.itemLink').on('blur', function() {
      $this.removeClass('focus')
    })

    /*}}}*/

  })

  /*}}}*/

})(jQuery, window, document)


// Use GitHub as API to Load patterns
// Inspired from: https://github.com/subtlepatterns/SubtlePatterns/blob/gh-pages/demo.html
var loadPatterns = function () {
  var ajax, ajaxTimeout, requrl;
  ajax = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : (XMLHttpRequest && new XMLHttpRequest()) || null;

  ajaxTimeout = window.setTimeout(function () {
    ajax.abort();
  }, 6000);

  ajax.onreadystatechange = function () {
    var selectEle, itemsArray, itemsString, i;
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        clearTimeout(ajaxTimeout);
        if (ajax.status !== 200) {

        } else {
          selectEle = document.getElementById('patterns-selector');
          itemsArray = JSON.parse(ajax.responseText);
          itemsString = '';
          for(i = 0; i < itemsArray.length; i++) {
            if(itemsArray[i].name.indexOf('.png') !== -1) {
              itemsString += '<option value="'+itemsArray[i].html_url.replace("blob", "raw")+'">'+itemsArray[i].name+'</option>';
            }
          }
          selectEle.innerHTML = itemsString;
          selectEle.setAttribute("onchange", "setPattern(this.value);"); // = setPattern(selectEle.value);
        }
      }
    }
  };

  requrl = 'https://api.github.com/repos/jpsirois/patterns-browser/contents/source/img/subtlepatterns';
  ajax.open("GET", requrl, true);
  ajax.send();
}

var setPattern = function (url) {
  var bodyEle = document.getElementsByTagName('body')[0];
  bodyEle.style.backgroundImage = 'url("'+url+'")';
}

window.onload = loadPatterns();