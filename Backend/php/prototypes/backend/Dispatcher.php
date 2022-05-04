<?php
class Dispatcher {
  
  function __construct() {
    $this->userAuth = new UserAuth();
  }
  
  function dispatch () {
    $action = $_REQUEST["action"];

	if (!$this->userAuth->isLoggedIn())
    {
      if (isset ($action) && $action == "login")
	  {
		$password = $_REQUEST["password"];
		if (isset ($password))
		{
			if ($this->userAuth->login ($password))
			{
				// Login successful
				echo "Login successful<br>";
				echo "<a href=\"index.php\">Back</a>";
				
			}
			else
			{
				// Password wrong
				echo "Password wrong";
			}
		}
		else
		{
			echo "No password";
			// Action login but no password shouldn't happen unless somebody messes with the parameters
			exit;
		}
	  }
	  else
	  {
		// User not logged in, and doesn't attempt to do so. Show standard page
		echo "<a href=\"index.php?action=login&password=test\">Login</a>";
		exit;
	  }
    }
    else
    {
		// User is logged in, do whatever he wants
		if (!isset ($action))
		{
			// No action defined, user logged in, show standard screen?
			include "header.php";
			include "body.php";
			include "footer.php";
			echo "<a href=\"index.php?action=logout>Logout</a>";
			exit;
		}
		
		switch ($action)
		{
			case "logout":
				$this->userAuth->logout();
				echo "Logged out<br>";
				break;
			case "editnote":
				// edit note request
				break;
			case "newnote":
				// new note request
				break;
			case "deletenote":
				// delete note
				break;
			case "query":
				// Query notes according to parameters  e.g. search, select tags
				break;
		}
    }
  }
}