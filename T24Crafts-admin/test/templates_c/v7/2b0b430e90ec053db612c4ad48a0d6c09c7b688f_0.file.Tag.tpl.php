<?php
/* Smarty version 4.5.4, created on 2024-10-19 18:15:33
  from 'C:\xampp\htdocs\vtigercrm\layouts\v7\modules\Vtiger\Tag.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.4',
  'unifunc' => 'content_6713f7454b13d9_94489952',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2b0b430e90ec053db612c4ad48a0d6c09c7b688f' => 
    array (
      0 => 'C:\\xampp\\htdocs\\vtigercrm\\layouts\\v7\\modules\\Vtiger\\Tag.tpl',
      1 => 1727609712,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6713f7454b13d9_94489952 (Smarty_Internal_Template $_smarty_tpl) {
?> 
 <span class="tag <?php if ($_smarty_tpl->tpl_vars['ACTIVE']->value == true) {?> active <?php }?>" title="<?php echo $_smarty_tpl->tpl_vars['TAG_MODEL']->value->getName();?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['TAG_MODEL']->value->getType();?>
" data-id="<?php echo $_smarty_tpl->tpl_vars['TAG_MODEL']->value->getId();?>
">
    <i class="activeToggleIcon fa <?php if ($_smarty_tpl->tpl_vars['ACTIVE']->value == true) {?> fa-circle-o <?php } else { ?> fa-circle <?php }?>"></i>
    <span class="tagLabel display-inline-block textOverflowEllipsis" title="<?php echo $_smarty_tpl->tpl_vars['TAG_MODEL']->value->getName();?>
"><?php echo $_smarty_tpl->tpl_vars['TAG_MODEL']->value->getName();?>
</span>
    <?php if (!$_smarty_tpl->tpl_vars['NO_EDIT']->value) {?>
        <i class="editTag fa fa-pencil"></i>
    <?php }?>
    <?php if (!$_smarty_tpl->tpl_vars['NO_DELETE']->value) {?>
        <i class="deleteTag fa fa-times"></i>
    <?php }?>
</span><?php }
}
