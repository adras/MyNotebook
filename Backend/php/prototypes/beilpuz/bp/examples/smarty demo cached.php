<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
Beilpuz::enableCachingWithKeys(array('foo'=>'bar'));
Beilpuz::allowCacheKey('foo');
Beilpuz::$templates = 'smarty_templates';
$template = new BpTemplate('index.tpl');
echo $template->render();
Profiler::end();
?>
