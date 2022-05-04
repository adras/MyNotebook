<?php
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
$template = new BpTemplate('signature attributes.html');
echo $template->render();
?>