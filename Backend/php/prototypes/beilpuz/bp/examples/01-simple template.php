<html><head><title>Simple template</title></head><body>
<?php
include('../bp/Beilpuz.php');
$template = new BpTemplate();
// Create a template from a string, instead reading it from filesystem.
$template->fromString('<li><bp:$text/></li>');
$template->assign('text', 'Hello World!');
echo $template->render();
$template->assign('text', 'Im a simple template');
echo $template->render();
?>
</body></html>