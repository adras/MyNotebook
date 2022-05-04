<?php
  class UserAuth {
	public function __construct ()
	{
		session_start();
	}
	
	public function isLoggedIn ()
	{
		if (isset ($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == true)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public function login ($password)
	{
		if ($password == "test")
		{
			$_SESSION["loggedIn"] = true;
			return true;
		}
		else
		{
			$_SESSION["loggedIn"] = false;
			return false;
		}
	}
	
	public function logout ()
	{
		session_destroy();
	}
  }
?>