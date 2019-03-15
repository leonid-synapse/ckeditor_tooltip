/*
* Tooltip remove Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.5.0
*/
(function ($, Drupal, CKEDITOR) {

  CKEDITOR.plugins.add('tooltip_remove', {
    lang: [
      'en', 'fr'
    ],
    afterInit: function(editor) {
      CKEDITOR.addCss('.cke_editable .' + editor.config.tooltip_class + '{' + 'cursor:pointer' + '}');
    },
    init: function(editor) {
      editor.ui.addButton('RemoveTooltip', {
        label: editor.lang.tooltip.remove,
        command: 'removeTooltip',
        toolbar: 'insert',
        icon: this.path + 'icons/tooltip-remove.png'
      });
      editor.addCommand('removeTooltip', new CKEDITOR.removeTooltipCommand());
    }
  });

  CKEDITOR.removeTooltipCommand = function() {};
  CKEDITOR.removeTooltipCommand.prototype = {

    exec: function(editor) {
      var style = new CKEDITOR.style({element: editor.config.tooltip_tag, type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1});
      editor.removeStyle(style);
    },

    refresh: function(editor, path) {
      // Despite our initial hope, document.queryCommandEnabled() does not work
      // for this in Firefox. So we must detect the state by element paths.

      var element = path.lastElement && path.lastElement.getAscendant(editor.config.tooltip_tag, true);

      if (element && element.getName() == editor.config.tooltip_tag && element.getAttribute('title') && element.getChildCount())
        this.setState(CKEDITOR.TRISTATE_OFF);
      else
        this.setState(CKEDITOR.TRISTATE_DISABLED);
      }
    ,

    contextSensitive: 1,
    startDisabled: 1,
    requiredContent: CKEDITOR.config.tooltip_tag + "[title]"
  };

  CKEDITOR.config.tooltip_tag = 'span';
  CKEDITOR.config.tooltip_class = 'ckeditor-tooltip';
})(jQuery, Drupal, CKEDITOR);
