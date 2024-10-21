<?php
/* Smarty version 4.5.4, created on 2024-10-20 18:27:17
  from 'C:\xampp\htdocs\T24Crafts\T24Crafts-admin\layouts\v7\modules\Vtiger\ModalFooter.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.4',
  'unifunc' => 'content_67154b8565b854_05849183',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2be7c95c7c5e6606e4c6f36536bac6e0023afffa' => 
    array (
      0 => 'C:\\xampp\\htdocs\\T24Crafts\\T24Crafts-admin\\layouts\\v7\\modules\\Vtiger\\ModalFooter.tpl',
      1 => 1727609712,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67154b8565b854_05849183 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="modal-footer "><center><?php if ($_smarty_tpl->tpl_vars['BUTTON_NAME']->value != null) {
$_smarty_tpl->_assignInScope('BUTTON_LABEL', $_smarty_tpl->tpl_vars['BUTTON_NAME']->value);
} else {
ob_start();
echo vtranslate('LBL_SAVE',$_smarty_tpl->tpl_vars['MODULE']->value);
$_prefixVariable7 = ob_get_clean();
$_smarty_tpl->_assignInScope('BUTTON_LABEL', $_prefixVariable7);
}?><button <?php if ($_smarty_tpl->tpl_vars['BUTTON_ID']->value != null) {?> id="<?php echo $_smarty_tpl->tpl_vars['BUTTON_ID']->value;?>
" <?php }?> class="btn btn-success" type="submit" name="saveButton"><strong><?php echo $_smarty_tpl->tpl_vars['BUTTON_LABEL']->value;?>
</strong></button><a href="#" class="cancelLink" type="reset" data-dismiss="modal"><?php echo vtranslate('LBL_CANCEL',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</a></center></div><?php }
}
