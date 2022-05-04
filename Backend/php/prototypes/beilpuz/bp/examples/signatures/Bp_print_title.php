<?php
class Bp_print_title extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$number = intval($_GET['number']);
		if ($number < 1) $number = 0;
		$template->v['number'] = $number;
		return 'Page: ' . $number;
	}
}
?>