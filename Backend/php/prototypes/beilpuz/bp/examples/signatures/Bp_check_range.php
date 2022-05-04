<?php
class Bp_check_range extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$number = $template->findValue('number');
		if ($number >= 20 && $number <= 40) {
			Beilpuz::allowCacheKey('number');
			return $sig->tpl->render();
		}
	}
}
?>