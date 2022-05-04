<?php
include "config.php";
include "DatabaseManager.php";
include "UserAuth.php";
include "Dispatcher.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dispatcher = new Dispatcher ();
$dispatcher->dispatch();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
<title>MyNotebook Uranus</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="stylesheet" type="text/css" href="stylecontextmenu.css">
<link href="libs/windows_js_1.3/themes/default.css" rel="stylesheet" type="text/css"/>
<link href="libs/windows_js_1.3/themes/alphacube.css" rel="stylesheet" type="text/css"/>
<script src="libs/prototype.min.js" type="text/javascript"></script>
<script src="libs/tiny_mce/tiny_mce_gzip.js" type="text/javascript" ></script>
<script src="tinymce.js" type="text/javascript"></script>
<script src="libs/webtoolkit.sha256.js" type="text/javascript"></script>

<script src="libs/livepipe/src/livepipe.js" type="text/javascript"></script>
<script src="libs/livepipe/src/contextmenu.js" type="text/javascript"></script>


<script src="libs/windows_js_1.3/javascripts/effects.min.js" type="text/javascript"></script>
<script src="libs/windows_js_1.3/javascripts/window.min.js" type="text/javascript"></script>
<script src="libs/windows_js_1.3/javascripts/window_effects.js" type="text/javascript"></script>
<script src="libs/windows_js_1.3/javascripts/debug.js" type="text/javascript"></script>


<script src="libs/json2.js" type="text/javascript"></script>
<script src="libs/pure.js" type="text/javascript"></script>
<script src="templateengine.js" type="text/javascript"></script>
<script src="responsehandler.js" type="text/javascript"></script>
<script src="windowmanager.js" type="text/javascript"></script>
<script src="maincontrol.js" type="text/javascript"></script>
<script src="autosuggest.js" type="text/javascript"></script>
<script src="requesthandler.js" type="text/javascript"></script>
<script src="contextmenu.js" type="text/javascript"></script>


</head>

<body id="body" class="body">
<div id="mainContent">
</div>
</body>

<script src="main.js" type="text/javascript"></script>
</html>