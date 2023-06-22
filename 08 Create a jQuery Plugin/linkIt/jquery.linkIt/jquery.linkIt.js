/**
 * name: LinkIt
 * author: Hpone Thit Htoo
 * version: 0.1.0
 * license: MIT
 */

(function($) {
  $.fn.linkIt = function(options) {
    let object;

    // alert(this.html());

    // Default Settings
    let settings = $.extend({
      // whatever: null,
      href: null,
      text: null,
      target: '_self',
    }, options);

    // alert(settings.whatever);

    // Validation
    if (settings.href == null) {
      console.log('You need an href option for LinkIt to work');
      return this;
    }

    return this.each(function() {
      // console.log($(this).html());

      object = $(this);

      if (settings.text == null) {
        settings.text = object.text();
      }
      
      object.wrap('<a target="' + settings.target + '" href="' + settings.href + '"></a>').text(settings.text);
    });

  }
}(jQuery));