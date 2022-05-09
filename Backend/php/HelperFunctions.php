<?php
class HelperFunctions{
	public static function MagicStripslashes ($value){
	// Logic removed, since get_magic_quotes was removed in PHP 7.4
	// This could be a security risk and allow SQL-injections
	// Please investigate
	
	// if (get_magic_quotes_gpc() === 1)
	// {
	// 	return stripslashes($value);
	// }
	// else
	// {
	// 	return $value;
	// }
		
		return $value;
	}
	
	// Creates an sql query with proper encoded values
	// $queryTemplate should be in a form like: SELECT * FROM test WHERE id=%1\$s and id < %2\$d
	// Note: $ must be escaped when the string is in double quotes
	// $valueArray: single dimension array containing the non encoded data to be added to the query
	// You must be connected to a database for this function to work
	// TODO: Add proper error checking, check if connection exists
	public static function CreateSafeSqlQuery($mysqli, $queryTemplate, $valueArray) {
		// Escape each string in array
		for ($i = 0; $i < count($valueArray); $i++)
		{
			$valueArray[$i] = $mysqli->real_escape_string($valueArray[$i]);
		}
		// $valueArray = array_map("$mysqli->real_escape_string", $valueArray);
		
		// insert query at first index into array
		array_unshift ($valueArray, $queryTemplate);
		
		// call sprintf and pass all array values as parameters
		$query = call_user_func_array('sprintf', $valueArray);

		return $query;
	}

	// Removes all invalid characters from the tags and creates an array containing tag-objects
	// $tags parameter - string containing tags seperated by spaces
	// return value: array containing tag-objects consisting of an id and name
	public static function DecodeTags ($tags){
		$tags = strip_tags ($tags);
		$tags = preg_replace ("/[^A-Za-z0-9_ ]*/", "", $tags);
		$tags = trim($tags);

		$tagArray = explode(" ", $tags);

		$result = array();

		for ($i = 0; $i < count ($tagArray); $i++)
		{
			$tagName = trim($tagArray[$i]);
			if (strlen ($tagName) != 0)
			{
				$tag = new stdClass();;
				$tag->name = $tagArray[$i];
				$result[] = $tag;
			}
		}
		return $result;
	}
}


?>