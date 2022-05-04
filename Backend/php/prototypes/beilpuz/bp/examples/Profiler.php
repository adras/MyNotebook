<?php
class Profiler {
	const COUNT=20;
	private static $startTime  = 0;
	public static function start($id) {
		session_id($id);
		session_start();
		if (isset($_SESSION['profile']) === false) {
			$_SESSION['profile'] = array('time'=>0,'count'=>0);
		}
		self::$startTime = microtime(true);
	}
	public static function end() {
		$time = (microtime(true)-self::$startTime);
		$_SESSION['profile']['time'] += $time;
		$_SESSION['profile']['count']++;
		echo 'run ' . $_SESSION['profile']['count'] . ' ('.self::COUNT.'): ' . $time . ' (' .($_SESSION['profile']['time']/$_SESSION['profile']['count']) . ')<br>';
		if ($_SESSION['profile']['count']==self::COUNT) {
			unset($_SESSION['profile']);
		}
	}
}