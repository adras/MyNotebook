<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
Beilpuz::enableCachingWithKeys(array('foo'=>'bar'));
Beilpuz::allowCacheKey('foo');
$template = new BpTemplate('cached template.html');
echo $template->render();
echo '<br>';
Profiler::end();
?>