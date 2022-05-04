<?php
class Bp_hello extends BpSignatureHandler {
	public static $directAllowed = true;
	public static function direct(BpSignature $sig, BpTemplate $template) {
		return Beilpuz::PHP_BEGIN . ' echo \'direct: Hallo liebe ' . $sig->name . '\'' . Beilpuz::PHP_END;
	}
	public static function render(BpSignature $sig, BpTemplate $template) {
		return 'Hallo liebe ' . $sig->name . '<br>';
	}
}
?>