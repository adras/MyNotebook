<?php
/**************************************/
/********** Installer Form ***********/
/*Sets the config.php varaibles, so  */
/* that people won't have to manually*/
/*          edit them                */
/*************************************/
require "install.misc.php";
RequestVariables ();
$form_action = $_SERVER['PHP_SELF'];

if(is_writable("config.php"))
{
	if (phpversion()<'5')
	{
		echo "Please install php5.<br>";
		exit();
	}
	else
	{
		if ($_SERVER['REQUEST_METHOD'] != 'POST')
		{		//display the form if it hasn't been filled.
			?>															
			<html>
			<title>My Notebook Installer</title>
			<link href="install_form.css" rel="stylesheet" type="text/css">
			<head>
			<style type="text/css">

			body{
				font-family: Trebuchet MS, Lucida Sans Unicode, Arial, sans-serif;	/* Font to use */
				background-color:#FFF;
				font-size:0.9em;
				
			}
			
			/* General styling for both valid and invalid input */
			.invalidInput,.validInput{
			display:compact;
			padding:1px;
			}
			/* Style for invalid input */
			.invalidInput{
			border:1px solid #F00;
			}
			
			/* Style for valid input */
			.validInput{
			border:1px solid #FFF;
			}
			</style>
			<script src="formvalidation.js" type="text/javascript"></script>

			</head>
			<body>
			<b>Do not use this script to update your Notebook. Refer to readme.txt for update instructions</b>
			<script src="tooltip.js" type="text/javascript"></script>
			<form name="form1" method="post" onsubmit="if(!isFormValid()) { alert('Please fill the entire form.');return false; }" action="<?php $form_action ?>">
			<fieldset class=""> <legend>MyNotebook Installer</legend>
			<fieldset><legend>Fill In The Following</legend>
			<label for="hostname">Database Hostname: (If you're not sure, it's usually localhost)</label>
			<input type="text" name="hostname" value="localhost" required="1"/>
			<label for="dbname">Database Name:</label>
			<input type="text" name="dbname" required="1"/>
			<label for="dbusername">Database Username:</label>
			<input type="text" name="dbusername" required="1"/>
			<label for="dbpassword">Database Password:</label>
			<input type="password" name="dbpassword" required="1"/>
			<label for="tablename">Database Table Name:</label>
			<input type="text" name="tablename" value="MyNotebook"/>
			<label for="userpass">User Password:</label>
			<input type="password" name="userpass" />
			<label for="deftags">Default Tags:</label>
			<input type="text" name="deftags" value="info" onMouseover="ddrivetip('The notebooks tag that will be set to default.', 300)";
			onMouseout="hideddrivetip()"/>
			<label for="notestag">All Notes Tag Name:</label>
			<input type="text" name="notestag" value="allnotes" />
			<input type="submit" name="Submit" value="Send">
			</fieldset>
			</fieldset>

			</form>
			<?php
		}
		else
		{   //if the form has been entered, start the installation
			/*End of form, beginning of form processing*/
			$adress = stripslashes($_POST['hostname']);
			$db_username = stripslashes($_POST['dbusername']);
			$db_name = stripslashes($_POST['dbname']);
			$db_pwd = stripslashes($_POST['dbpassword']);
			$user_pwd = stripslashes($_POST['userpass']);
			$defaultTags = stripslashes($_POST['deftags']);
			$db_tableName = stripslashes($_POST['tablename']);
			$allNotesTagName = stripslashes($_POST['notestag']);
			$db_tagTableName = $db_tableName . "_" . "tags";            
			$db_noteTagsTableName = $db_tableName . "_" . "notetags";
			/* End of Form Processing */
			
			if($adress && $db_name && $db_username &&
					$db_pwd && $defaultTags && $db_tableName
					&& $allNotesTagName)	
			{
				$mysqli = new mysqli($adress, $db_username, $db_pwd);
				if ($mysqli->connect_errno) {
					die ('mysqli connection error: ' . $mysqli->connect_error);
				}
				$mysqli->select_db ($db_name);

				//$queries[]="DROP TABLE `$db_tableName`";
				//$queries[]="DROP TABLE `$db_noteTagsTableName`";
				//$queries[]="DROP TABLE `$db_tagTableName`";
				
				$queries[]="CREATE TABLE `$db_tableName` (`id` int(4) NOT NULL auto_increment,`note` text character set utf8 collate utf8_general_ci NOT NULL,`datetime` int(16) NOT NULL,  `new` binary(1) NOT NULL,  PRIMARY KEY  (`id`)) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=196;";
				$queries[]="CREATE TABLE `$db_noteTagsTableName` (  `noteid` int(8) NOT NULL,  `tagid` int(11) NOT NULL,  PRIMARY KEY  (`noteid`,`tagid`)) ENGINE=MyISAM  DEFAULT CHARSET=utf8;";
				$queries[]="CREATE TABLE `$db_tagTableName` (  `id` int(8) NOT NULL auto_increment,  `tagname` varchar(40) character set utf8 NOT NULL,  `rating` int(4) NOT NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;";

				$queries[]="INSERT INTO `$db_tableName` (`id`, `note`, `datetime`, `new`) VALUES (1, 'Welcome to MyNotebook', 1177104551, 0x20), (2, 'This is an example of a note with \"new\" tag', 1177104604, 0x20), (3, 'I am a note with read Tag', 1177104647, 0x20), (4, 'Read and new', 1177104689, 0x20);";
				$queries[]="INSERT INTO `$db_noteTagsTableName` (`noteid`, `tagid`) VALUES (1, 1), (2, 3), (3, 4), (4, 3),(4, 4);";
				$queries[]="INSERT INTO `$db_tagTableName` (`id`, `tagname`, `rating`) VALUES (1, 'info', 0), (2, 'allnotes', 0),(3, 'new', 0),(4, 'read', 0);";

				$query = "SELECT * FROM `$db_tableName`";
				$result = $mysqli->query ($query);
				if ($mysqli->affected_rows == -1)
				{
					
					foreach ($queries as $query)
					{
						$result = $mysqli->query($query);

						if (!$result)
						{
							echo "Could not execute query: " . $query . "<br>";
							echo $mysqli->error;
							die ("Could not set up database");
						}
					}
					echo "<br>My Notebook Database successfully created<br>";
				}
				else
				{
					echo "<br>Database already exists. Not installing, only updating config";
				}

				$config = "";
				$config .= "<?php\r\n";
				$config .= "\$adress         = \"$adress\";	// Db-server adress\r\n";
				$config .= "\$db_username    = \"$db_username\";	// Db-username\r\n";
				$config .= "\$db_name        = \"$db_name\";	// Dbname\r\n";
				$config .= "\$db_pwd         = \"$db_pwd\";		// Db-userpassword\r\n";
				$config .= "\$db_tableName   = \"$db_tableName\";	// Name of Table in Db\r\n";
				$config .= "\$db_tagTableName = \"$db_tagTableName\";\r\n";            
				$config .= "\$db_noteTagsTableName = \"$db_noteTagsTableName\";\r\n";
				$config .= "\$user_pwd       = \"$user_pwd\";\r\n";
				$config .= "\$defaultTags    = \"$defaultTags\";	// Default active tags seperated by spaces\r\n";
				$config .= "\$allNotesTagName = \"$allNotesTagName\";	// Tag-name that is used to display all notes\r\n";
				$config .= "?>\r\n";

				
				if ($handle = fopen("config.php",'wb'))
				{
					if (fwrite($handle, $config)) 
					{
						echo "<div style=\"color: 00AA00;\">";
						echo "<br>Successfully wrote the config.php file.</b><br>";
						echo "</div>";
						fclose ($handle);
					}

				}
				else 
				{
					echo "<div style=\"color: #AA0000;\">";
					echo "<br>Cannot open config.php, please check if it exists.<br>";
					echo "</div>";
					exit();
				}
			}
		}
		


	} //end else (php version is 5 or higher)
} //end if(is_writable("config.php")
else 
{
	echo "<br>Cannot write to config.php, please check file permissions. (chmod to 0777)<br>";
	echo "The file might not exist, check to see if it exists, and if it doesn't exist create it and run this installer.";
	exit();
}
?>





