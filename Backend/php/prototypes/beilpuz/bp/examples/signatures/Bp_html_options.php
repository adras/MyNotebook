<?php
class Bp_html_options extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$render = '';
		$values = $template->findValue($sig->values);
		$selected = $template->findValue($sig->selected);
		$output= $template->findValue($sig->output);

		$len = count($values);
		for ($s = 0; $s < $len; ++$s) {
			$render .= '<option label="'.$values[$s].'" value="' . $values[$s] . '"';
			if ($selected[$s]) $render .= ' selected="selected"';
			$render .= '>' . $output[$s] . '</option>';
		}
		return $render;
	}
}
?>
