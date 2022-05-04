<?php
class Note {
	function __construct ($id, $content, $tags, $visibility)
	{
		//$content = stripslashes ($content);
	
		$this->id = $id;
		$this->content = $content;//addslashes($content);
		$this->tags = $tags;
		$this->visibility = $visibility;
	}
}

?>