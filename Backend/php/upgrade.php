<?php
	include "libs/nanolink-sha256.inc.php";
	
	function connectToDatabase () {
		global $dbURL, $dbName, $dbUserName, $dbPwd, $mysqli;


		$dbSelected = $mysqli->select_db ($dbName);
		if ($mysqli->connect_errno) {
			echo "ERROR - Could not find database: " . $dbName . " Check credentials";
			exit;
		}
	}

	function checkOldDatabaseTables ($notesTableName, $noteTagsTableName, $tagsTableName) {
		global $mysqli;
		$queries = array();
		$queries[0] = "SELECT * FROM " . $notesTableName;
		$queries[1] = "SELECT * FROM " . $noteTagsTableName;
		$queries[2] = "SELECT * FROM " . $tagsTableName;
		
		for ($i = 0; $i < 3; $i++) {
			$result = $mysqli->query ($queries[$i]);

			if ($result === FALSE) {
				return false;
			}
		}
		return true;
	}
	
	function createNotesTable ($notesTableName) {
		global $mysqli;
		$query = "CREATE TABLE `" . $notesTableName . "` (
				`id` int(6) NOT NULL AUTO_INCREMENT,
				`content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
				`datetime` int(16) NOT NULL,
				`visibility` binary(1) NOT NULL,
				PRIMARY KEY (`id`)
			) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1;";

		$result = $mysqli->query ($query);

		if ($result === false ) {
			$message = "Could not create table: " . $notesTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
	}
	
	function createNoteTagsTable ($newNoteTagsTableName){
		global $mysqli;
		$query = "CREATE TABLE `" . $newNoteTagsTableName . "` (
					`noteid` int(8) NOT NULL,
					`tagid` int(11) NOT NULL,
					PRIMARY KEY (`noteid`,`tagid`)
				) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";

		$result  = $mysqli->query ($query);

		if ($result === false ) {
			$message = "Could not create table: " . $newNoteTagsTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
	}
	
	function createTagsTable ($newTagsTableName) {
		global $mysqli;
		$query = "CREATE TABLE `" . $newTagsTableName . "` (
					`id` int(8) NOT NULL AUTO_INCREMENT,
					`tagname` varchar(40) CHARACTER SET utf8 NOT NULL,
					`rating` int(4) NOT NULL,
					PRIMARY KEY (`id`)
				) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1;";
		
		$result  = $mysqli->query ($query);

		if ($result === false ) {
			$message = "Could not create table: " . $newTagsTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
	}
	
	function createSettingsTable ($tableName) {
		global $mysqli;

		$query = "CREATE TABLE `" . $tableName . "` (
				`id` int(2) NOT NULL AUTO_INCREMENT,
				`name` varchar(25) NOT NULL,
				`value` varchar(64) NOT NULL,
				`description` varchar(160) NOT NULL,
			PRIMARY KEY (`id`)
			) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci AUTO_INCREMENT=1;"; 
		
		$result  = $mysqli->query ($query);

		if ($result === false ) {
			$message = "Could not create table: " . $tableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
	}

	function createTables ($newNotesTableName, $newNoteTagsTableName, $newTagsTableName, $settingsTableName) {
		createNoteTagsTable ($newNoteTagsTableName);
		createNotesTable ($newNotesTableName);
		createTagsTable ($newTagsTableName);
		createSettingsTable($settingsTableName);
	}
	
	function insertSettingsData ($settingsTableName, $password) {
		global $mysqli;
		$query = "INSERT INTO `" . $settingsTableName . "` (`id`, `name`, `value`, `description`) VALUES 
				(1, 'loginPassword', '" . $password . "', 'Login password'),
				(2, 'encryptionPassword', '', 'Password for note encryption'),
				(3, 'allNotesTagName', 'allnotes', 'Name of the tag to display all notes'),
				(4, 'newNoteTagName', 'new', 'Default tag when none is specified'),
				(5, 'defaultTags', 'new', 'Tags already selected after login'),
				(6, 'editNoteOnDoubleClick', '1', 'Allow editing note by double clicking it');";
				
		$result  = $mysqli->query ($query);
		if ($result === FALSE) {
			$message = "Could not query from: " . $settingsTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
	}
	
	function migrateTags ($oldTagsTableName, $newTagsTableName) {
		global $mysqli;
		$query = "SELECT * FROM `" . $oldTagsTableName . "`;";
		$result  = $mysqli->query ($query);
		if ($result === FALSE) {
			$message = "Could not query from: " . $oldTagsTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}

		while (($row  = $result->fetch_array ()) != NULL) {
			$id = $row["id"];
			$tagName = $row["tagname"];
			$query = "INSERT INTO `" . $newTagsTableName . "` (id, tagname) VALUES('" . $id . "','" . $tagName . "');";
			$res  = $mysqli->query ($query);

			if ($res === FALSE) {
				$error = "Error querying from " . $newTagsTableName . "<br>\n";
				$error .= $mysqli->error;
				echo $error;
				exit;
			}
		}
	}
	
	function migrateNotes ($oldNotesTableName, $newNotesTableName) {
		global $mysqli;
		$query = "SELECT * FROM `" . $oldNotesTableName . "`;";
		$result  = $mysqli->query ($query);
		if ($result === FALSE) {
			$message = "Could not query from: " . $oldNotesTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}
		while (($row  = $result->fetch_array ()) != NULL) {
			$id = $row["id"];
			$content = $row["note"];
			
			$content = stripslashes ($content);
			$content = addslashes ($content);
			
			$datetime = $row["datetime"];
			$new = $row["new"];
			
			$query = "INSERT INTO `" . $newNotesTableName . "` (id, content, datetime, visibility) VALUES('" . $id . "',
																										  '" . $content ."',
																										  '" . $datetime ."',
																										  '0');";
			
			$res  = $mysqli->query ($query);

			if ($res === FALSE) {
				$error = "Error querying from " . $newNotesTableName . "<br>\n";
				$error .= $mysqli->error . "<br>\n";
				$error .= "ID: " . $id;
				echo $error;
				exit;
			}
		}
	}

	function migrateNoteTags ($oldNoteTagsTableName, $newNoteTagsTableName) {
		global $mysqli;
		$query = "SELECT * FROM `" . $oldNoteTagsTableName . "`;";
		$result  = $mysqli->query ($query);
		if ($result === FALSE) {
			$message = "Could not query from: " . $oldNoteTagsTableName . "<br>\n";
			$message .= $mysqli->error;
			Throw new Exception ($message);
		}

		while (($row  = $result->fetch_array ()) != NULL) {
			$noteId = $row["noteid"];
			$tagId = $row["tagid"];
			$query = "INSERT INTO `" . $newNoteTagsTableName . "` (noteid, tagid) VALUES('" . $noteId . "','" . $tagId . "');";
			$res  = $mysqli->query ($query);

			if ($res === FALSE) {
				$error = "Error querying from " . $newNoteTagsTableName . "<br>\n";
				$error .= $mysqli->error;
				echo $error;
				exit;
			}
		}
	}

	if (!isset( $_POST["step"] ) ) {
		echo "<form action=\"upgrade.php\" method=\"post\">";
		echo "<table>";

		echo "<tr>";
		echo "<td>MyNotebook login password:</td>";
		echo "<td><input type=\"password\" name=\"loginPwd\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>Old database prefix:</td>";
		echo "<td><input type=\"text\" name=\"oldDBPrefix\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>New database prefix:</td>";
		echo "<td><input type=\"text\" name=\"newDBPrefix\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>Database URL</td>";
		echo "<td><input type=\"text\" name=\"dbURL\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>Database name</td>";
		echo "<td><input type=\"text\" name=\"dbName\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>Database username</td>";
		echo "<td><input type=\"text\" name=\"dbUserName\"></td>";
		echo "</tr>";

		echo "<tr>";
		echo "<td>database password</td>";
		echo "<td><input type=\"password\" name=\"dbPwd\"></td>";
		echo "</tr>";

		echo "</table>";
		echo "<input type=\"hidden\" name=\"step\" value=\"1\">";
		echo "<input type=\"submit\">";
		echo "</form>";
	}
	else {
		$step = $_POST["step"];
		$dbURL = $_POST["dbURL"];
		$dbName = $_POST["dbName"];
		$dbUserName = $_POST["dbUserName"];
		$dbPwd = $_POST["dbPwd"];
		
		$mysqli = new mysqli($dbURL, $dbUserName, $dbPwd);
		
		if ($mysqli->connect_errno) {
			echo "ERROR - Could not connect to database. Check credentials";
			exit;
		}
		
		connectToDatabase();
		
		switch ($step) {
			case "1":
				$loginPwd = sha256($_POST["loginPwd"]);
				
				$oldDBPrefix = $_POST["oldDBPrefix"];
				$newDBPrefix = $_POST["newDBPrefix"];

				$oldNotesTableName = $oldDBPrefix . "";
				$oldNoteTagsTableName = $oldDBPrefix . "_notetags";
				$oldTagsTableName = $oldDBPrefix . "_tags";

				$newNotesTableName = $newDBPrefix . "_notes";
				$newNoteTagsTableName = $newDBPrefix . "_notetags";
				$newTagsTableName = $newDBPrefix . "_tags";

				$settingsTableName = $newDBPrefix . "_settings";
				
				// Make sure script execution time is long enough for the process
				// For every check that is done, ensure to let it fail once, to verify error handling works correct
				// Make sure all tables are unicode, the tables themselves AND the fields
				
				$result = checkOldDatabaseTables($oldNotesTableName, $oldNoteTagsTableName, $oldTagsTableName);
				if ($result === FALSE) {
					echo "ERROR - Could not verify old database tables";
					exit;
				}

				Try {
					createTables($newNotesTableName, $newNoteTagsTableName, $newTagsTableName, $settingsTableName);
					
					insertSettingsData($settingsTableName, $loginPwd);
					
					migrateTags($oldTagsTableName, $newTagsTableName);
					migrateNotes($oldNotesTableName, $newNotesTableName);
					migrateNoteTags($oldNoteTagsTableName, $newNoteTagsTableName);
				}				
				Catch (Exception $exception) {
					echo $exception;
					exit;
				}
				echo "Success";
				// query all tags from old table, and insert into new table
				// query all notetags from old table, and insert into new one
				// create tag for orphaned notes
				
				// query all notes from old table, and insert into new table
				// assign orphaned tag to all notes which have no tag
				// insert all notes into new db
				
				// create SQL statements to create setings table
			break;
			default:
				echo "Error: Invalid step specified";
				exit;
			break;
		}
		
	}

?>

