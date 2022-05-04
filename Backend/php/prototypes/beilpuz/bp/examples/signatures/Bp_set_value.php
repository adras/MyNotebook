<?php
class Bp_set_value extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$template->setValue('tellmesomething', 'Nachts ist es k&auml;lter als drau&szlig;en');
	}
}
?>