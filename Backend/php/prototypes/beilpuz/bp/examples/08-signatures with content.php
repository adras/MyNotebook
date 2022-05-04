<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
$template = new BpTemplate('signature content.html');
$render = '';
for ($s = 0; $s < 10; ++$s) {
	$render .= $template->render();
}
Profiler::end();
echo $render;
?>