<?php
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
$template = new BpTemplate('collectors.html');
echo $template->render();
?>