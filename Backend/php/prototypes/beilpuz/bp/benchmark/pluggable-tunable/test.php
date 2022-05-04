<?php
Beilpuz::$templates = 'Beilpuz';
// Comment if, if you want to store compiled templates on filesystem
//Beilpuz::$compiled = 'Beilpuz/compiled';
// Comment out to enabled storage of compiled templates
Beilpuz::enableTemporary();
function Beilpuz_test() {
	global $path, $loop;
	try {
      	$template = new BpTemplate('test.html');
       	$template->assignRef('loop', $loop);
		return strlen($template->render());
	} catch (Exception $e) {
		trigger_error('Unable to benchmark Beilpuz: ' . $e->getMessage(), E_USER_ERROR);
	}
}
?>
