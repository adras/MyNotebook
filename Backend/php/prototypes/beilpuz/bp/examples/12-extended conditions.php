<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
$template = new BpTemplate('extended conditions.html');
$template->assign('border',5);
$template->assign('number',8);
$render = '';
for ($s = 0; $s < 10; ++$s) {
	$render .= $template->render();
}
Profiler::end();
echo $render;
?>