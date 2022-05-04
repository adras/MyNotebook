<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::enableCachingWithKeys(array('foo'=>'bar'));
Beilpuz::allowCacheKey('foo');
$template = new BpTemplate('conditions.html');
$template->assign('headline','Hello');
$template->assign('subject','Kitty');
echo $template->render().'<br>';
echo Profiler::end();
?>