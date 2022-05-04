<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Pure Prototype</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="style.css">
<!--<script src="pure/libs/jquery.js" type="text/javascript"></script>-->
<script src="pure/libs/prototype.js" type="text/javascript"></script>
<script src="pure/libs/pure.js" type="text/javascript"></script>
</head>
<body>
<div id="time"></div>
<!-- Template begins -->
<div id="noteContainer">
<div id="note" class="note">
<div id="noteHeader" class="noteHeader">
<div id="noteDate" class="noteDate">10.10.20010</div>
<div id="noteFunctions" class="noteFunctions"><a id="noteFunctionEdit">Edit</a>
<a id="noteFunctionDelete">Delete</a></div>
<div id="noteTags" class="noteTags">test mysql php notebook</div>
</div>
<div id="noteContent" class="noteContent">content</div>
</div>
</div>
<!-- Template ends -->
<script type="text/javascript">
  function EditNote (id)
  {
	  var note = new Object();
	  note.id = id;
	  note.content = "Edit-Test content";
	  note.tags = "test data php mysql";
	  var directive = {
				   'a#noteFunctionEdit': "'Edit'",
				   'a#noteFunctionEdit@href': 'javascript: EditNote( #{id} )',
				   'a#noteFunctionDelete': "'Delete'",
				   'a#noteFunctionDelete@href': 'javascript: DeleteNote( #{id} )',
				   'div#noteTags':'tags',
				   'div#noteContent':'content'
			};

	// Render the template using only the directive and the notes array
	$("div#noteId-" + note.id).render(note, directive);
  }
  function DeleteNote (id)
  {
		var elem = document.getElementById ("noteId-" + id);
		elem.parentNode.removeChild(elem);
  }
  </script>
<script type="text/javascript">
	var dateStart = new Date();
	var timeStart = dateStart.getTime();

	var notes = new Object();
    notes.notes = new Array();

    var letters = new Array();
    letters[0] = "a";
    letters[1] = "b";
    letters[2] = "c";
    letters[3] = "d";
    letters[4] = "e";
    letters[5] = "f";

    // Generate some test notes
	for (i = 0; i < 8; i++)
    {
                notes.notes[i] = new Object();

                notes.notes[i].content = "";
                notes.notes[i].tags = "";
                var rand =  (Math.random()*100000) % 500+ 150
                for (j = 0; j < rand; j++)
                {

                        var num = Math.floor( (Math.random()*10000)% 5);
                        notes.notes[i].content += letters[num];

                        if ((Math.random() * 10000) % 3 + 3 < 4)
                        {
                                notes.notes[i].content += " ";
                        }
                }
                notes.notes[i].tags = "ashduif sadfhui sadvx asd asda asd";
                notes.notes[i].id = i;

    }
	// The directive tells the rendering engine what has to appear where
    var directiveNotes = {
							'div#note' : { //trigger a loop
							  'note<-notes' : { // loop on the property animals in the JSON
							   '@id+':function(arg){ // add(+) the return value of the function to the class
								var test = 'Id-' + arg.items[arg.pos].id;
								return test;
							   },
							   'div#noteTags':'note.tags',
							   'div#noteContent':"note.content",
							   'a#noteFunctionEdit': "'Edit'",
							   'a#noteFunctionEdit@href': 'javascript: EditNote(#{note.id})',
							   'a#noteFunctionDelete': "'Delete'",
							   'a#noteFunctionDelete@href': 'javascript: DeleteNote(#{note.id})'
							   }
							 }
						};

	// Render the template using only the directive and the notes array
    $('noteContainer').render(notes, directiveNotes);

	// measure time taken
	var dateEnd = new Date();
	var timeEnd = dateEnd.getTime();
	var resultDate = new Date(timeEnd-timeStart);
	var elem = document.getElementById("time");
	elem.innerHTML = "Time in seconds:milliseconds: " + resultDate.getSeconds() + ":" + resultDate.getMilliseconds() ;

	//.innerHtml = test;
    </script>
</body>
</html>