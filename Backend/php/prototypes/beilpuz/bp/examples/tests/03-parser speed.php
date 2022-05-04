<?php
include('../Profiler.php');
Profiler::start(md5(__FILE__));
include('../../bp/Beilpuz.php');
include('../../bp/BpSignatureHandler.php');
class Bp_sig extends BpSignatureHandler {
	public static function render($sig,$template) {
		$value = $template->findValue('number');
		$value++;
		$template->assign('number', $value);
		return $sig->n. ': ' . $value;
	}
}
Beilpuz::$templates = '../templates';
Beilpuz::$compiled = '../compiled';
$template = new BpTemplate('parser speed.html');
$render = $template->render();
Profiler::end();
echo $render;
?>