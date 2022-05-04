<?php
include('../bp/Beilpuz.php');
$template = new BpTemplate('shared values.html');
$template->assign('tellmesomething','Nachts ist es k&auml;lter als drau&szlig;en');
echo $template->render();
?>