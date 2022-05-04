<?php
class Bp_strip extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		return preg_replace("/\n|\r/", '', $sig->tpl->render());
	}
}
?>
