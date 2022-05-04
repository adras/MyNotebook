<?php
include('../../bp/Beilpuz.php');
include('../../bp/BpSignatureHandler.php');
class Bp_any extends BpSignatureHandler {}
Beilpuz::$templates = '../templates';
Beilpuz::$compiled = '../compiled';
$template = new BpTemplate('unclosed signature.html');
try {
	echo $template->render();
} catch (ErrorException $e) {
	echo $e->getMessage();
}
?>