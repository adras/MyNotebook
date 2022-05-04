<?php
class Bp_collector extends BpSignatureHandler {
	public static $directOnly = true;
	protected static $collected = array();
	public static function direct(BpSignature $sig, BpTemplate $template) {
		if ($sig->tpl!==null) self::$collected[$template->name][] = $sig->tpl;
	}
}
?>