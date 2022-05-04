<html><head><title>Examples</title></head>
<body>
<?php
$dirs = array("."=>"Examples", "tests"=>"Tests");
foreach ($dirs as $dir => $title) {
	echo "<h3>".$title."</h3><ul>";
	$files = glob($dir."/*");
	foreach ($files as $file) {
		if (preg_match("/[^(inc)].php/", $file)) {
			echo "<li><a href=\"" . $file . "\">" . $file . "</a></li>";
		}
	}
	echo "</ul>";
}
?>
</body>
</html>
