<?php
class DatabaseManager {
	private static function ExecuteQuery ($mysqli, $query) {
		$result = $mysqli->query($query);

		if ($mysqli->errno !== 0) {
			throw new Exception ($mysqli->error ."\n" . "Query: " . $query);
		}

		return $result;
	}

	private static function createSqlConnection() {
		$mysqli = new mysqli(Config::$db_address, Config::$db_username, Config::$db_pwd);
		$mysqli->select_db (Config::$db_name);
		
		return $mysqli;
	}

	// Returns an array which contains all tag-names of a specific note
	// Requires that a database connection is existing
	private static function GetNoteTags ($mysqli, $noteId) {
		$query = "SELECT id, tagname FROM `" . Config::$db_tagTableName . "`, `" . Config::$db_noteTagsTableName .
				"` WHERE `" . Config::$db_tagTableName . "`.id = `" . Config::$db_noteTagsTableName . "`.tagid
				AND `" . Config::$db_noteTagsTableName . "`.noteid = %1\$d;";
		
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($noteId));
				
		$result = self::ExecuteQuery ($mysqli, $query);
				
		$tags = array();
		while (($row = $result->fetch_array ()) != null) {
			$tag = new stdClass();;
			$tag->id = $row["id"];
			$tag->name = $row["tagname"];
			$tags[] = $tag;
		}
		return $tags;
	}

	// Deletes every tag from the list of tags a specific note uses. See Config::$db_noteTagsTable table
	// Requires that a database connection is existing
	private static function DeleteNoteTags ($mysqli, $noteId) {
		$query = "DELETE FROM `" . Config::$db_noteTagsTableName . "` WHERE noteid=%1\$d;";
		
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($noteId));

		$result = self::ExecuteQuery ($mysqli, $query);
	}

	// Adds each tag used by a specific note to the Config::$db_noteTagsTable  table
	// Requires that a database connection is existing
	private static function InsertNoteTags ($mysqli, $note) {
		$query = "DELETE FROM `" . Config::$db_noteTagsTableName . "` WHERE noteid='%1\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->id));

		$result = self::ExecuteQuery ($mysqli, $query);

		if (count($note->tags) == 0) {
			$settings = self::GetSettings();
			$tag = new stdClass();
			$tag->name = $settings["newNoteTagName"]->value;
			
			$note->tags[] = $tag;
		}

		// TODO: Currently is called by edit note to update the text. although deletenotetags is called before
		// if a note contains a duplicate tag the following code will try to add the same primary keys twice
		
		foreach ($note->tags as $value) {
			// Check if the tag is already in the database
			$query = "SELECT * FROM `" . Config::$db_tagTableName . "` WHERE tagname='%1\$s';";
			$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($value->name));
			
			$result = self::ExecuteQuery ($mysqli, $query);

			// If not, insert it
			if ($result->num_rows == 0) {
				$query = "INSERT INTO `" . Config::$db_tagTableName . "` (tagname) VALUES ('%1\$s');";
				$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($value->name));

				$result = self::ExecuteQuery ($mysqli, $query);

				// Tag is inserted, get the id
				$tagId = $mysqli->insert_id;
				$value->id = $tagId;
			}
			else {
				// This tag exists, get the id
				$row = $result->fetch_array();
				$tagId = $row["id"];
				$value->id = $tagId;
			}
			
			$query = "INSERT INTO `" . Config::$db_noteTagsTableName . "`(noteid, tagid) VALUES('%1\$d','%2\$d');";
			$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->id, $tagId));
			$result = self::ExecuteQuery ($mysqli, $query);
		}
	}
	
	private static function checkForEmptyNote ($note) {
		if (strlen(trim($note->content)) == 0) {
			$note->content = "<p></p>";
		}
	}
	
	public static function SelectAllTags () {
		$mysqli = self::createSqlConnection();

		$query = "SELECT tagname, id FROM `" . Config::$db_tagTableName . "`;";
		// CreateSafeSqlQuery not required since there are no variables used in query
		
		$result = self::ExecuteQuery ($mysqli, $query);

		$tags = array();
		while (($row = $result->fetch_array ()) != null) {
			$tag = new stdClass();;
			$tag->id = $row["id"];
			$tag->name = $row["tagname"];
			$tags[] = $tag;
		}
		return $tags;
	}

	private static function QueryNotes ($query) {
		$mysqli = self::createSqlConnection();
		
		$result = self::ExecuteQuery ($mysqli, $query);
		
		$notes = array();
		$i = 0;
		while (($row = $result->fetch_array ()) != null) {
			$id = $row["id"];
			$visibility = $row["visibility"];
			
			$content = stripslashes($row["content"]);

			$tags = self::GetNoteTags($mysqli, $id);

			$note = new Note ($id, $content, $tags, $visibility);
			$notes[$i] = $note;
			
			$i++;
		}
		return $notes;
	}
	
	public static function SelectAllNotes () {
		$query = "SELECT * FROM `" . Config::$db_tableName . "`  ORDER BY datetime DESC;";
		//////////////////////////////////
		return self::QueryNotes($query);
	}

	public static function SelectPublicNotes () {
		$query = "SELECT * FROM `" . Config::$db_tableName . "` WHERE visibility=1  ORDER BY datetime DESC;";
		//////////////////////
		return self::QueryNotes($query);
	}

	public static function CreateNote ($note) {
		self::checkForEmptyNote ($note);
		
		$mysqli = self::createSqlConnection();
		
		$dateTime = time ();
		$query = "INSERT INTO `". Config::$db_tableName . "` (content, visibility, datetime) VALUES ('%1\$s', 0, '%2\$s');";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->content, $dateTime));

		$result = self::ExecuteQuery ($mysqli, $query);

		$note->id = $mysqli->insert_id;

		self::InsertNoteTags ($mysqli, $note);

		return $note;
	}

	public static function EditNote ($note) {
		self::checkForEmptyNote($note);

		$mysqli = self::createSqlConnection();

		$query = "UPDATE `". Config::$db_tableName . "` SET content='%1\$s' WHERE id='%2\$s';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->content, $note->id));

		$result = self::ExecuteQuery ($mysqli, $query);

		self::DeleteNoteTags ($mysqli, $note->id);
		self::InsertNoteTags ($mysqli, $note);

		return $note;
	}
	
	public static function SetNoteVisibility($note) {
		$mysqli = self::createSqlConnection();

		$query = "UPDATE `". Config::$db_tableName . "` SET visibility='%1\$d' WHERE id='%1\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->visibility, $note->id));

		$result = self::ExecuteQuery ($mysqli, $query);
		
		return $note;
	}

	public static function DeleteNote ($note) {
		$mysqli = self::createSqlConnection();

		$query = "DELETE FROM `"	.Config::$db_tableName . "` WHERE id='%1\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($note->id));

		$result = self::ExecuteQuery ($mysqli, $query);

		self::DeleteNoteTags($mysqli, $note->id);
	}
	
	public static function GetSettings () {
		$mysqli = self::createSqlConnection();

		$settings = array ();

		$query = "SELECT * FROM `" . Config::$db_settingsTableName . "`;";
		$result = self::ExecuteQuery ($mysqli, $query);

		while (($row = $result->fetch_array ()) != null) {
			$setting = new stdClass();
			$setting->name = $row["name"];
			
			switch ($setting->name)
			{
				case "defaultTags":
					// tags are seperated by spaces, the value should be an array containing all values
					$setting->value = array();

					foreach (explode (" ", $row["value"]) as $tag)
					{
						$setting->value[] = $tag;
					}
					break;
				default:
					$setting->value = $row["value"];
					break;
			}
			
			$setting->description = $row["description"];
			$settings[$setting->name] = $setting;
		}
		return $settings;
	}
	
	public static function UpdateSettings ($settings) {
		$mysqli = self::createSqlConnection();
		
		// Check if old passwords are correct
		
		foreach ($settings as $key => $value) {
			$query = "UPDATE `" . Config::$db_settingsTableName . "` SET value='%1\$s' WHERE name='%2\$s';";
			$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($value->value, $value->name));
			$result = self::ExecuteQuery ($mysqli, $query);
		}
	}
	
	public static function DeleteTag ($tagId) {
		$mysqli = self::createSqlConnection();

		$query = "DELETE FROM `" . Config::$db_tagTableName . "` WHERE id='%1\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($tagId));
		
		$result = self::ExecuteQuery ($mysqli, $query);
		
		$query = "DELETE FROM `" . Config::$db_noteTagsTableName . "` WHERE tagid='%1\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($tagId));
		
		$result = self::ExecuteQuery ($mysqli, $query);
	}
	
	public static function RenameTag ($tag) {
		$mysqli = self::createSqlConnection();
		
		$query = "UPDATE `" . Config::$db_tagTableName . "` SET tagname='%1\$s' WHERE id='%2\$d';";
		$query = HelperFunctions::CreateSafeSqlQuery($mysqli, $query, array($tag->newName, $tag->id));
		
		$result = self::ExecuteQuery ($mysqli, $query);
	}	
}
?>