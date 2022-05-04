<html>
<head>
<title>PURE Unobtrusive Rendering Engine</title>
<script src="pure/libs/jquery.js" type="text/javascript"></script>
<script src="pure/libs/pure.js" type="text/javascript"></script>
</head>
<body>
<!-- HTML template -->
<table>
	<tr>
		<td></td>
	</tr>
</table>
<div>List of notes:<br>
<div class="notes">
<div class="note" style="width: 600; height: 100; background: #99EE99;">
<div class="noteContent"
	style="position: relative; background: #33DD33; width: 600">asdfads sauifausdif iuasdhfui ahsduifhauilsdhfiu ahisuldfhiausdfh uiasdhfuihsaduigadhlfgadfgh fgadfghadfg</div>
<div class="noteTags"
	style="position: relative; top: 20; background: #EEFFEE;">adfgadfgcyxbcvb</div>
</div><br><br>
</div>
</div>

<script type="text/javascript">
  var notes = new Object();
  notes.notes = new Array();
  
  var letters = new Array();
  letters[0] = "a";
  letters[1] = "b";
  letters[2] = "c";
  letters[3] = "d";
  letters[4] = "e";
  letters[5] = "f";
  
  for (i = 0; i < 200; i++)
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

  var directiveNotes = {
		    'div.note' : { //trigger a loop
		      'note<-notes' : { // loop on the property animals in the JSON 
		       '@class+':function(arg){ // add(+) the return value of the function to the class
		        
		        return "-id" + arg.items[arg.pos].id;
		       },
		       'div.noteContent':'note.content',
		       'div.noteTags': 'note.tags'    
		       }
		     }
		    };
  
  $('div.notes').render(notes, directiveNotes);
  
  var data = {
	      animals:[
	        {name:'bird'},
	        {name:'cat'},
	        {name:'dog'},
	        {name:'mouse'}
	      ]
	    };

	var directive = {
    'tr' : { //trigger a loop
      'animal<-animals' : { // loop on the property animals in the JSON 
       '@deimudda+':function(arg){ // add(+) the return value of the function to the class
        var oddEven, firstLast;
        oddEven = (arg.pos % 2 == 0) ? ' even' : ' odd';
        firstLast = (arg.pos == 0) ? 
         ' first' : 
         (arg.pos == arg.animal.items.length - 1) ? 
          ' last' : 
          '';
        return oddEven + firstLast;
       },
       'td':'animal.name'
       }
     }
    };

    $('table').render(data, directive);
  </script>
</body>
</html>
<?php
?>