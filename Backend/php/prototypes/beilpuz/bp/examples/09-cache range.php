<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
$start_time = microtime(true);
Beilpuz::enableCachingWithKeys(array('number'=>$_GET['number']));
$template = new BpTemplate('cache range.html');
for ($s = 0; $s < 1; ++$s) {
	echo $template->render();
}
Profiler::end();
?>