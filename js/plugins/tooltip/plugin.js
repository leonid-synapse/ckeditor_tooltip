/*
* Tooltip Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.5.0
*/
(function ($, CKEDITOR) {

  CKEDITOR.plugins.add('tooltip', {
    lang: [
      'en', 'fr'
    ],
    afterInit: function(editor) {
      CKEDITOR.addCss('.cke_editable .' + editor.config.tooltip_class + '{' + 'cursor:pointer' + '}');
    },
    init: function(editor) {
      editor.ui.addButton('Tooltip', {
        label: editor.lang.tooltip.button,
        command: 'tooltip',
        toolbar: 'insert',
        icon: this.path + 'icons/tooltip.png'
      });
      editor.addCommand('tooltip', new CKEDITOR.dialogCommand('tooltipDialog'));
      CKEDITOR.dialog.add('tooltipDialog', this.path + 'dialogs/tooltip.js');
      editor.on('doubleclick', function(evt) {
        var element = evt.data.element;
        if (element.is(editor.config.tooltip_tag) && element.hasClass(editor.config.tooltip_class))
          evt.data.dialog = 'tooltipDialog';
        }
      );
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
  CKEDITOR.config.tooltip_html = true;
  CKEDITOR.config.tooltip_toolbar = [
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
  ];
})(jQuery, CKEDITOR);
