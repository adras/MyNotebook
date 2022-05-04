<?php
class Bp_now extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		if (isset($sig->format) === false) $format = 'r';
		else $format = $sig->format;
		return date($format);
	}
}
?>
