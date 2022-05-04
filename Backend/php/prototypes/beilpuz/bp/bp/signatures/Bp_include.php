<?php
/**
 * Includes another template.
 * @author Mike Reiche
 * @version $Revision: 1.1 $ $Date: 2010/01/13 12:19:19 $
 * @since 0.3
 * @package Beilpuz
 * @subpackage Signatures
 */
class Bp_include extends BpSignatureHandler {
	public static $requiredAttributes = array('template'=>true);
	public static function render(BpSignature $sig, BpITemplate $template) {
		$includeTemplate = new BpTemplate($sig->a['template']);
		if ($sig->a['shared_values'] === true) {
			$includeTemplate->v = &$template->v;
		}
		return $includeTemplate->render();
	}
}
?>