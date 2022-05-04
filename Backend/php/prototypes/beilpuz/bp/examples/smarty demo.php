<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
Beilpuz::$templates = 'smarty_templates';
$template = new BpTemplate('index.tpl');
echo $template->render();
Profiler::end();
?>
