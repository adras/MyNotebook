<?php
class Bp_setup extends BpSignatureHandler {
	public static function render(BpSignature $sig, BpTemplate $template) {
		// Setup
		$template->assign('title', 'foo');
		$template->assign("bold", true);

		$template->assign("Name","Fred Irving Johnathan Bradley Peppergill");
		$template->assign("names",array(array("John", "Doe"), array("Mary", "Smith"), array("James", "Johnson"), array("Henry", "Case")));

		$template->assign("contacts", array(array("phone" => "1", "fax" => "2", "cell" => "3"),
			array("phone" => "555-4444", "fax" => "555-3333", "cell" => "760-1234")));

		$template->assign("option_values", array("NY","NE","KS","IA","OK","TX"));
		$template->assign("option_output", array("New York","Nebraska","Kansas","Iowa","Oklahoma","Texas"));
		$template->assign("option_selected", "NE");
	}
}
?>
