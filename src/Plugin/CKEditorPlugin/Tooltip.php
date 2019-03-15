<?php

namespace Drupal\ckeditor_tooltip\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "tooltip" plugin.
 *
 * @CKEditorPlugin(
 *   id = "tooltip",
 *   label = @Translation("Tooltip"),
 *   module = "ckeditor_tooltip"
 * )
 */
class Tooltip extends CKEditorPluginBase {


  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'Tooltip' => [
        'label' => t('Tooltip'),
        'image' => drupal_get_path('module', 'ckeditor_tooltip') . '/js/plugins/tooltip/icons/tooltip.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'ckeditor_tooltip') . '/js/plugins/tooltip/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}
