<?php
class Bp_set_dot extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		$index = $template->v['_index'];
		$template->v['_index'] = (++$index);
		$bullet = '*';
		if ($index > 2) $bullet = '.';
		$template->v['bullet'] = $bullet;
	}
}
?>
