<?php
include('../bp/Beilpuz.php');
Beilpuz::addSignatureClassPath('signatures');
$template = new BpTemplate('own signatures.html');
echo $template->render();
?>