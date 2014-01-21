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

// Use GitHub as API to Load patterns
// Inspired from: https://github.com/subtlepatterns/SubtlePatterns/blob/gh-pages/demo.html

var $body = $('body'),
    $librarySelector = $('#library-selector'),
    $layoutSelector = $('#layout-selector'),
    $patternsSelector = $('#patterns-selector'),
    $bgcolorSelector = $('#bgcolor-selector'),
    $patternsViewport = $('.main')

var loadPatterns = function (library, layout) {
  $patternsSelector.html('<option>Downloading Pattern List…</option>');
  var requrl;
  requrl = 'https://api.github.com/repos/jpsirois/patterns-browser/contents/source/img/' + library;

  $.ajax({
    url        : requrl,
    localCache : true,
    cacheTTL   : 24,
    success: function(reply) {
      itemsArray = reply;
      itemsString = '';
      if (layout === 'grid') {
        $body.css('background-image','none');
        for(i = 0; i < itemsArray.length; i++) {
          if(itemsArray[i].name.indexOf('.png') !== -1) {
            imgUrl = itemsArray[i].html_url.replace("blob", "raw");
            itemsString += '<div class="box">\
              <div class="patternWrap">\
                <a href="' + imgUrl + '" class="patternLink">\
                  <div class="patternFadeWrap" data-echo="' + imgUrl + '"></div>\
                  <div class="patternMeta"><h2 class="patternTitle">' + itemsArray[i].name + '</h2></div>\
                </a>\
              </div>\
            </div>';
          }
        }
        $patternsViewport.html(itemsString);
        setupBoxes()
        Echo.init({
          offset: 1000,
          thrasdfottle: 50
        });
      } else if (layout === 'bg') {
        $patternsViewport.html('');
        for(i = 0; i < itemsArray.length; i++) {
          if(itemsArray[i].name.indexOf('.png') !== -1) {
            itemsString += '<option value="'+itemsArray[i].html_url.replace("blob", "raw")+'">'+itemsArray[i].name+'</option>';
          }
        }
        $patternsSelector.html(itemsString);
      }
    }
  });
}

$librarySelector.on('change', function(){
  loadPatterns($librarySelector.val(),$layoutSelector.val())
});

$layoutSelector.on('change', function(){
  if ($(this).val() === 'bg') {
    $patternsSelector.parent('label').removeClass('is-hidden')
  }
  else {
    $patternsSelector.parent('label').addClass('is-hidden')
  }
  loadPatterns($librarySelector.val(),$layoutSelector.val())
});

$patternsSelector.on('change', function(){
  $body.css('background-image','url("' + $(this).val() + '")');
})

function updateBodyBgColorInfo(color) {
  $body.css('background-color', '#' + color);
}

window.onload = loadPatterns($librarySelector.val(),$layoutSelector.val());