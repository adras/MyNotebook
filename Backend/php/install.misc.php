<?php
	
  function requestVariables ()
  {
    global $note;
    global $id;
    global $pwd;
    global $tags;
    global $search;
    global $action;
    global $selectedTags;
    global $module;
    
    if (isset ($_REQUEST["Module"]))
    {
    	$module = $_REQUEST["Module"];
    }
    
    if (isset ($_REQUEST["Action"]))
    {
      $action = $_REQUEST["Action"];
    }
    
    if (isset ($_POST["Note"]))
    {
    	$note = $_POST["Note"];
    }
    
    if (isset ($_REQUEST["Id"]))
    {
      $id = $_REQUEST["Id"];
    }
  
    if (isset ($_POST["Pwd"]))
    {
      $pwd = $_POST["Pwd"];
    }
    
    if (isset ($_POST["Tags"]))
    {
      $tags = $_POST["Tags"];
    }
    
    if (isset ($_POST["Search"]))
    {
      $search = $_POST["Search"];
      $search = ereg_replace ("[^[[:alpha:]][[:alnum:]] ]*", "", $search);
      $search = eregi_replace ("[[:space:]]+", " ", $search);
      $search = trim ($search, " ");
    }

    if (isset ($_POST["SelectedTags"]))
    {
      $selectedTags = $_POST["SelectedTags"];
      $selectedTags = str_replace ("-", " ", $selectedTags);
      $selectedTags = trim ($selectedTags);
    }
  }
  
?>
