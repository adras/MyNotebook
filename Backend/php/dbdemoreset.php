<?php
include "config.php";

$mysqli = new mysqli(Config::$db_address, Config::$db_username, Config::$db_pwd);
$mysqli->select_db (Config::$db_name);

$dbSqlFile = "demo-tables/notesdemo.sql";

$query = file_get_contents($dbSqlFile);

$result = $mysqli->multi_query($query);

if ($mysqli->errno !== 0) {
	echo $mysqli->error ."\n" . "Query: " . $query;
	exit;
}

echo "<div style=\"color: #00FF00;\"><b>Db reset successful</b></div>";