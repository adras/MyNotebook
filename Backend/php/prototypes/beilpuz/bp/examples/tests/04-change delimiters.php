<?php
include('../../bp/Beilpuz.php');
include('../../bp/BpSignatureHandler.php');
class Bp_delimiter extends BpSignatureHandler {
	public static function render($sig,$tpl) {
		$sig->tpl->assign('delimiters', Beilpuz::$SIG_BEGIN . Beilpuz::$SIG_END . ' / ' . Beilpuz::$SIG_CLOSE.Beilpuz::$SIG_END);
		return $sig->tpl->render();
	}
}
Beilpuz::$templates = '../templates';
Beilpuz::$compiled = '../compiled';
Beilpuz::setDelimiters('{', '}');
$template = new BpTemplate('delimiters.html');
echo $template->render();
?>