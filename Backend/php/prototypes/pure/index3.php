<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta name="generator" content=
    "HTML Tidy for Windows (vers 14 February 2006), see www.w3.org">
    <title>
      My Notebook
    </title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="pure/libs/jquery.js" type="text/javascript">
</script>
    <script src="pure/libs/pure.js" type="text/javascript">
</script>
  </head>
  <body id="body" onload="">
    <br>
    <div class="overlay" id="Overlay" onclick="">
      <div style=
      "background-color: #FFDD99; vertical-align: bottom; text-align: center; height: 30px;">
      <span id="OverlayMessage" style=
      "vertical-align: middle; text-align: center;"></span> <img style=
      "vertical-align: bottom; text-align: center;" src="images/loading.gif"
      alt="Loading...">
      </div>
    </div>
    <div class="window" id="w_NewNoteBox" style="width: 650px; height: 250px;">
      <div class="window-title">
        Enter new note:
      </div>
      <textarea cols="80" rows="1" name="Note" class="window-input" id=
      "w_NewNoteText" style="width: 600px; height: 150px;">
</textarea> <button type="button" class="ButtonLeft" onclick=
"javascript: CloseNewNote();">Cancel</button> <button type="button"
      class="ButtonRight" onclick="javascript: submitNewNote()">Insert</button>
      <input id="w_NewNoteInput" class="window-input" style=
      "position: relative; width: 300px; height: 20px;" type="text">
    </div>
    <div class="window" id="RenameTag" style="width: 400px; height: 80px;">
      <div id="Message" class="window-title">
        Rename Tag
      </div><br>
      New name: <input id="RenameTagInput" class="window-input" style=
      "position: relative : width : 300px; height: 20px;" type="text"><br>
      <br>
      <button type="button" class="ButtonLeft" id="RTCancelButton" onclick=
      "">Cancel</button> <button type="button" class="ButtonRight" id=
      "RTRenameButton" onclick="">Rename</button>
    </div>
    <div class="window" id="_Question" style="width: 400px; height: 80px;">
      <div id="_Question" class="window-title">
        Do you really want to delete this tag?
      </div><br>
      <br>
      <button type="button" class="ButtonLeft" id="_DTCancelButton" onclick=
      "">Cancel</button> <button type="button" class="ButtonRight" id=
      "_DTDeleteButton" onclick="">Delete</button>
    </div>
    <div id="w_DeleteMessageWindow" class="window" style=
    "width: 400px; height: 100px;">
      <div id="Message" class="window-title">
        Ich möchte diesen Teppich nicht kaufen!
      </div><br>
      <br>
      <br>
      <button type="button" onclick="CancelMessageWindow();" class="ButtonLeft"
      id="NoButton">No</button> <button type="button" onclick=
      "DeleteMessageWindow();" class="ButtonRight" id="YesButton">Yes</button>
    </div>
    <div style="width: 900; height: 137;">
      <div class="banner">
         <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <a style=
        "position: relative; top: 75; color: #FFFFFF; vertical-align: text-bottom; float: right; font-weight: bold; font-size: 12pt;"
        href="index.php?Action=Logout">Logout</a>
      </div>
      <div class="spacer">
         
      </div>
      <div class="tags">
        <span id="Tags"><span id="_TagAllNotes" class="tag" onmouseover=
        "TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">alle</span><span class="tagmenu" id="alle" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">gelesen</span><span class="tagmenu" id="gelesen"
        onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">musik</span><span class="tagmenu" id="musik" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">hacking</span><span class="tagmenu" id="hacking"
        onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">coding</span><span class="tagmenu" id="coding"
        onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">games</span><span class="tagmenu" id="games" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">fun</span><span class="tagmenu" id="fun" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">wow</span><span class="tagmenu" id="wow" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">sonstiges</span><span class="tagmenu" id="sonstiges"
        onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">nr0p</span><span class="tagmenu" id="nr0p" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">PU</span><span class="tagmenu" id="PU" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">MyNotebook</span><span class="tagmenu" id=
        "MyNotebook" onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">party</span><span class="tagmenu" id="party" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span id="_TagDefaultNotes"
        class="tag" onmouseover="TagOnMouseOver (this)" style=
        "font-weight: 700;" onclick="ToggleTag(this)">neu</span><span class=
        "tagmenu" id="neu" onclick="ShowTagContextMenu(this)"><img style=
        "position: relative; top: 3px;" src="images/downarrow.png" alt=
        "*"></span> <span class="tag" onmouseover="TagOnMouseOver (this)"
        style="font-weight: 400;" onclick=
        "ToggleTag(this)">FTB</span><span class="tagmenu" id="FTB" onclick=
        "ShowTagContextMenu(this)"><img style="position: relative; top: 3px;"
        src="images/downarrow.png" alt="*"></span> <span class="tag"
        onmouseover="TagOnMouseOver (this)" style="font-weight: 400;" onclick=
        "ToggleTag(this)">bewerbung</span><span class="tagmenu" id=
        "bewerbung"><img style="position: relative; top: 3px;" src=
        "images/downarrow.png" alt="*"></span> </span>
      </div>
      <div class="spacer">
         
      </div>
      <div class="spacer" style="text-align: left;">
         <a style="background-color: #0062A0; text-align: left;" href=
        "javascript:%20EnterNewNode();">Create new note</a>
      </div>
      <div style="width: 900; background-color: #0062A0; display: block;">
        <div style="text-align: right;">
          <span class="search">Find: <input class="search" style=
          "text-align: left;" id="SearchBox" type="text"></span>
        </div>
      </div><span id="_info"></span><br>
      <br>
      <div class="noteContainer" id="_notes">
        <div class="noteId">
          <div class="noteTitle">
            23/12/2009 22:15:15  <a href="">delete</a>  <a id="EditLink-267"
            href="" name="EditLink-267">edit</a>  
            <div class="noteTagsLabel">
              Tags: <b>neu</b>
            </div>
            <div style="position: relative; width: 500px; display: block"
            class="Tags">
              Tags: <input class="note-input" style=
              "padding: 0px; width: 300px;" id="EditTags-267" type="text" name=
              "tags" value="neu">
            </div>
          </div>
          <div class="noteText">
			<!-- Note content goes here -->
          </div>
          <div id="noteContainer-267" style="display: none; width: 900px;">
            <textarea cols="109" rows="3" name="Note" id="EditBox-267" class=
            "note-input">
</textarea>
            <p>
              Raute musik
            </p>
            <p>
              <strong>Soil - Breaking Me Down</strong>
            </p>
            <p>
              <strong>Seether</strong> - Out Of My Way
            </p><button type="button" id="CancelButton-267" class=
            "ButtonLeft">Cancel</button> <button type="button" id=
            "OkButton-267" class="ButtonRight">Save</button>
          </div><br>
        </div>
      </div>
    </div><br>
    <br>
    <br>
    <br>
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
							'div.noteId' : { //trigger a loop
							  'note<-notes' : { // loop on the property animals in the JSON 
							   '@class+':function(arg){ // add(+) the return value of the function to the class
								var test = 'aaaa-' + arg.items[arg.pos].id; 
								return test;
							   },
							   'div.noteTagsLabel':'note.tags',
							   'div.noteText':"test: #{note.content}"
							   }
							 }
						};

    $('div.noteContainer').render(notes, directiveNotes);
    </script>
  </body>
</html>
