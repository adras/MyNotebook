<?php
include('Profiler.php');
Profiler::start(md5(__FILE__));
include('../bp/Beilpuz.php');
Beilpuz::enableTemporary();
$template = new BpTemplate('arrays and objects.html');
$template->assign('animals',
	Array(	'livestock'	=>Array('cow','pig','chicken'),
			'pets'		=>Array('cat','hamster','tortoise')));
$template->assign('entry', new Entry);
$render = '';
for ($s = 0; $s < 10; ++$s) {
	$render .= $template->render();
}

class Entry {
	public function getNow() {
		return time();
	}
	public $nr = 3;
	public $array = Array('Eins','Zwei','Drei','Vier');
}
Profiler::end();
echo $render;
?>
