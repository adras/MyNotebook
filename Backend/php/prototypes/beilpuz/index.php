<?php
include "../../config.php";
// This is a prototype to test beilbuz template engine
echo "This is a prototype to test beilbuz template engine<br>\n";

$mySQL = new mysqli(Config::$db_address, Config::$db_username, Config::$db_pwd, Config::$db_name);
//$mySQL->connect();
//$mySQL->select_db();

$result = $mySQL->query("SELECT * FROM " . Config::$db_tableName);
echo "<h1>Content as it is in the database:<br>\n";
while ($row = $result->fetch_array())
{
	echo "Id:" .  $row["id"] . "<br>\n";
	echo "Note:" . $row["note"] . "<br>\n";
	echo "<br>";
}

$result->data_seek(0);
echo "<h1>Content fed into template:<br>\n";

?>