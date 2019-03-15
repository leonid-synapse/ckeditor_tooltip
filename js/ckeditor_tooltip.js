/**
 * @file
 * Author: Synpase-studio.
 *
 * Module: ckeditor_tooltip.module.
 */

(function ($) {
  $(function() {
    $('body').tooltip({
  		selector: '[class="ckeditor-tooltip"][title]',
  		effect: 'slide',
          trigger: "click hover focus",
          html: true,
          placement: 'top',
          container: 'body',
  		template: '<div class="tooltip tooltip-html opacity-one" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  	});
  });
})(this.jQuery);
