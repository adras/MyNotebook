<?php
	$noteData = $_REQUEST["note"];
  if (isset ($noteData))
  {
	$note = json_decode(stripslashes($noteData));
	if ($note == null)
	{
		// Error parsing JSON
	}

    $note->content = "Successfully edited<br>" . $note->content;
    echo json_encode ($note);
    exit;
  }
  else
  {
	echo "error note not set";
  }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Pure Prototype</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="../pure/pure/libs/jquery.js" type="text/javascript"></script>
<script src="../pure/pure/libs/json2.js" type="text/javascript"></script>
<script src="requesthandler.js" type="text/javascript"></script>
<script src="maincontrol.js" type="text/javascript"></script>
<script type="text/javascript" src="main.js"></script>
</head>
<body>


<div id="noteContainer">
<div class="note" id="noteId-5">
<div class="noteHeader" id="noteHeader">
<div class="noteDate" id="noteDate">10.10.20010</div>
<div class="noteFunctions" id="noteFunctions"><a id="noteFunctionEdit" href="javascript: sendRequest(5);">Edit</a>
<a id="noteFunctionDelete" href="javascript: mainControl.deleteNote(0)">Delete</a></div>
<div class="noteTags" id="noteTags">ashduif sadfhui sadvx asd asda asd</div>
</div>
<div class="noteContent" id="noteContent">dccbeabd d d b a acbba cd dcebdd d cecbd aedaac bae add ddabd deb de e bdab daadddbb cccaeaeac dadb e abddbcc cccababc ca ad ca ba bbee dac e c ab ddb beecc d eacc bbbedebac dbcca eaa b ebaeaeaccde c aceb c b cebbcedabbbeb adcdbbecc babe eca b e ab dec ac dc e abd d beee e baa cb e ebd ddc dab eeb cea b b eb cd c e abd bb bcec ccbcde adeda c bde d aed beaeae cdcabdaea cd ecc ec d b bea c ee bace bea a ddbdbb d bcb bebc e a ce aed b aeecc aecc e db eeeeeb ac cabc dacbca a ac ebb eacdd eecc aabe ecb b c ca c dbdc ceed dbecc aeebebbdcbe ad d c de cadcaebeac eebccdc bd bce ab e dd</div>
</div>

<div class="note" id="noteId-2">
<div class="noteHeader" id="noteHeader">
<div class="noteDate" id="noteDate">10.10.20010</div>
<div class="noteFunctions" id="noteFunctions"><a id="noteFunctionEdit" href="javascript: sendRequest(2);">Edit</a>
<a id="noteFunctionDelete" href="javascript: mainControl.deleteNote(5)">Delete</a></div>
<div class="noteTags" id="noteTags">ashduif sadfhui sadvx asd asda asd</div>
</div>
<div class="noteContent" id="noteContent">dccbeabd d d b a acbba cd dcebdd d cecbd aedaac bae add ddabd deb de e bdab daadddbb cccaeaeac dadb e abddbcc cccababc ca ad ca ba bbee dac e c ab ddb beecc d eacc bbbedebac dbcca eaa b ebaeaeaccde c aceb c b cebbcedabbbeb adcdbbecc babe eca b e ab dec ac dc e abd d beee e baa cb e ebd ddc dab eeb cea b b eb cd c e abd bb bcec ccbcde adeda c bde d aed beaeae cdcabdaea cd ecc ec d b bea c ee bace bea a ddbdbb d bcb bebc e a ce aed b aeecc aecc e db eeeeeb ac cabc dacbca a ac ebb eacdd eecc aabe ecb b c ca c dbdc ceed dbecc aeebebbdcbe ad d c de cadcaebeac eebccdc bd bce ab e dd</div>
</div>

</div>


<?php

?>
</body>
</html>