<?php
/**
 * Prints a template value.
 * Use this signature if you want to cache a value. Otherwise, just use <bp:$value/>.
 * @author Mike Reiche
 * @version $Revision: 1.1 $ $Date: 2010/01/13 12:19:19 $
 * @since 0.3
 * @package Beilpuz
 * @subpackage Signatures
 */
class Bp_value extends BpSignatureHandler {
	public static $requiredAttributes = array('name'=>true);
	public static function render(BpSignature $sig, BpITemplate $template) {
		return $template->findValue($sig->a['name']);
	}
}