<?php
class Bp_draw_div extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpITemplate $template) {
		$content = '';
		if ($sig->tpl !== null) {
			$content = $sig->tpl->render();
		}
		$render = '<div style="width:' . $sig->width . 'px;height:'.$sig->height.'px;background-color:' . $sig->color;
		if ($sig->border === true) $render .= ';border-width:2px;border-color:#000000;border-style:solid;';
		$render .= '">' . $content . '</div>';
		return $render;
	}
}
?>