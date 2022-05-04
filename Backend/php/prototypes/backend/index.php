<?php
include "../../config.php";
include "UserAuth.php";
include "Dispatcher.php";

$dispatcher = new Dispatcher ();
$dispatcher->dispatch();
?>