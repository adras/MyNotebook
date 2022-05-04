<?php
class Bp_server extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		return $_SERVER[$sig->variable];
	}
}
?>
