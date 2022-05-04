<?php
class Bp_print extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$format = strtolower($sig->format);
		$value = $template->findValue($sig->value);

		switch ($format) {
			case 'capitalize': {
				$value = ucwords($value);
				break;
			}
			case 'upper': $value = strtoupper($value); break;
			case 'lower': $value = strtolower($value); break;
		}
		return $value;
	}
}
?>
