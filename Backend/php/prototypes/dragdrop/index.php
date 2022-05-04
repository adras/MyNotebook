<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="prototype.js" type="text/javascript"></script>
<script src="mouseeventhandler.js" type="text/javascript"></script>
<script src="ddhandler.js" type="text/javascript"></script>
<script type="text/javascript">
	var ddHandler = new DDHandler();
</script>
</head>
<body onmouseup="javascript: ddHandler.onMouseUp();" onMouseMove="ddHandler.onMouseMove">
<div id="container">
	<div class="note" id="noteId-8" onmousedown="javascript: ddHandler.onMouseDown(this);">
		<div class="noteHeader">
			<div class="noteDate"/>
			<div class="noteFunctions">
				<a class="noteFunctionEdit">Edit</a>
				<a class="noteFunctionDelete">Delete</a>
			</div>
			<div class="noteTags">test </div>
			</div>
		</div>
		<div class="noteContent"><p><span class="sourceRowText ">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		asddafgadfg
		adfpgakdfü
		gdafg
		adfg
		adfg/div>
		</div>	
	</div>
	<div class="note" id="noteId-2" onmousedown="javascript: ddHandler.onMouseDown(this);">
		<div class="noteHeader">
			<div class="noteDate"/>
			<div class="noteFunctions">
				<a class="noteFunctionEdit">Edit</a>
				<a class="noteFunctionDelete">Delete</a>
			</div>
			<div class="noteTags">test </div>
			</div>
		</div>
		<div class="noteContent"><p><span class="sourceRowText ">bbbbbbbbbbbbbbbbbbbbbbbbbbbb
		asddafgadfg
		adfpgakdfü
		gdafg
		adfg
		adfg/div>
		</div>	
	</div>
</div>
</body>