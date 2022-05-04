<?php
include('../../bp/Beilpuz.php');
Beilpuz::$templates = '../templates';
Beilpuz::$compiled = '../compiled';
$template = new BpTemplate('broken signature.html');
try {
	echo $template->render();
} catch (ErrorException $e) {
	echo $e->getMessage();
}
?>