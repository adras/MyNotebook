<?php
include_once('Bp_collector.php');
class Bp_collector_output extends Bp_collector {
	public static $directAllowed = false;
	public static $directOnly = false;
	public static function render(BpSignature $sig, BpTemplate $template) {
		$render = '';
		$tpls=array();
		if (isset($sig->collected)) {
			$tpls = $sig->collected;
			//echo '<pre>'.print_r($tpls,true).'</pre>';
		} else if (isset(self::$collected[$template->name])) {
			$sig->collected = self::$collected[$template->name];
			$tpls = self::$collected[$template->name];
			$template->update = true;
		}
		foreach ($tpls as $tpl) {
			$render .= $tpl->render();
		}
		return $render;
	}
}
?>