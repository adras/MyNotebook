<?php
include "Note.php";
include "HelperFunctions.php";

// TODO
// check all functions to use new queryParameter function and add error checking
// add try catch around each database action for proper error handling

class Dispatcher {

	function __construct() {
		$this->userAuth = new UserAuth();
	}
	
	private function requestParameter ($parameterName) {
		return (isset($_REQUEST[$parameterName])) ? $_REQUEST[$parameterName] : NULL;
	}
	
	private function dispatchLoggedInActions ($action) {
		switch ($action) {
			case "logout":
				$this->handleLogout();
				break;
			case "newNote":
				$this->handleNewNote();
				break;
			case "editNote":
				$this->handleEditNote();
				break;
			case "deleteNote":
				$this->handleDeleteNote();
				break;
			case "setNoteVisibility":
				$this->handleSetNoteVisibility();
				break;
			case "renameTag":
				$this->handleRenameTag();
				break;
			case "deleteTag":
				$this->handleDeleteTag();
				break;
			case "queryAll":
				$this->handleQueryAll();
				break;
			case "updateSettings":
				$this->handleUpdateSettings();
				break;
			case "login":
				// Already logged in, no further login possible
				$this->handleLoggedInLogin();
				break;
			default:
				$this->handleLoggedInDefault();
				break;
		}
	}

	private function dispatchNotLoggedInActions ($action) {
		switch ($action) {
			case "queryPublic":
				$this->queryPublicNotes();
				break;
			case "login":
				$this->handleLogin();
				break;
			default:
				$this->handleNotLoggedInDefault();
				break;
			break;
		}
	}
	
	private function queryPublicNotes() {
		$info = new stdClass();

		$notes = DatabaseManager::SelectPublicNotes();
		$tags = DatabaseManager::SelectAllTags();
		
		$info->notes = $notes;
		$info->tags = $tags;
		$info->settings = DatabaseManager::GetSettings();
		$info->result = true;
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		echo json_encode ($info);
	}
	
	private function handleLogin () {
		$password = $this->requestParameter ("password");
		$info = new stdClass();

		if ($password === NULL) {
			$info->result = false;
			$info->message = "Could not login. No password specified";
			echo json_encode ($info);
		}
		
		if ($this->userAuth->login ($password))	{
			// Login successful
			$info->isLoggedIn = $this->userAuth->isLoggedIn();
			$info->message="Login successfull";
			$info->result = true;
			echo json_encode ($info);
		}
		else {
			// Password wrong
			$info->isLoggedIn = $this->userAuth->isLoggedIn();
			$info->message = "Password wrong";
			$info->result = false;
			echo json_encode ($info);
		}
	}
	
	private function handleNotLoggedInDefault () {
		$info = new stdClass();
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		$info->message = "Not logged in";
		$info->result = false;
		echo json_encode ($info);
	}
	
	private function handleLogout () {
		$info = new stdClass();

		$this->userAuth->logout();

		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		$info->result = true;
		echo json_encode ($info);
	}
	
	private function handleNewNote() {
		$info = new stdClass();
		$note = HelperFunctions::MagicStripslashes($_REQUEST["note"]);

		$note = json_decode ($note);
		
		// Lazy json_decode doesn't decode the tags to an array, tell it again to do so
		$note->tags = HelperFunctions::DecodeTags($note->tags);

		$note =	DatabaseManager::CreateNote($note);
		$info->tags = DatabaseManager::SelectAllTags();
		$info->result = true;
		$info->note = $note;
		echo json_encode($info);
	}

	private function handleEditNote () {
		$info = new stdClass();

		$note = HelperFunctions::MagicStripslashes($_REQUEST["note"]);
		$note = json_decode ($note);

		// Lazy json_decode doesn't decode the tags to an array, tell it again to do so
		$note->tags = HelperFunctions::DecodeTags($note->tags);

		DatabaseManager::EditNote($note);

		$info->tags = DatabaseManager::SelectAllTags();
		$info->result = true;
		$info->note = $note;
		
		echo json_encode ($info);
	}

	private function handleDeleteNote () {
		$info = new stdClass();
		$note = HelperFunctions::MagicStripslashes($_REQUEST["note"]);
		$note = json_decode ($note);

		DatabaseManager::DeleteNote($note);

		$info->result = true;
		$info->note = $note;
		echo json_encode($info);
	}
	
	private function handleSetNoteVisibility() {
		$info = new stdClass();

		$note = HelperFunctions::MagicStripslashes($_REQUEST["note"]);
		
		$note = json_decode ($note);

		DatabaseManager::SetNoteVisibility($note);

		$info->note = $note;
		echo json_encode($info);
	}
	
	private function handleRenameTag(){
		$info = new stdClass();
		$tag = HelperFunctions::MagicStripslashes($_REQUEST["tag"]);
		$tag = json_decode ($tag);

		DatabaseManager::RenameTag($tag);

		$notes = DatabaseManager::SelectAllNotes();
		$tags = DatabaseManager::SelectAllTags();

		$info->notes = $notes;
		$info->tags = $tags;
		
		$info->result = true;
		echo json_encode($info);
	}
	
	private function handleDeleteTag() {
		$info = new stdClass();
		$tag = HelperFunctions::MagicStripslashes($_REQUEST["tag"]);
		$tag = json_decode ($tag);

		DatabaseManager::DeleteTag($tag->id);

		$notes = DatabaseManager::SelectAllNotes();
		$tags = DatabaseManager::SelectAllTags();

		$info->notes = $notes;
		$info->tags = $tags;
		
		$info->result = true;
		echo json_encode($info);
	}
	
	private function handleQueryAll() {
		$info = new stdClass();
		$notes = DatabaseManager::SelectAllNotes();
		$tags = DatabaseManager::SelectAllTags();

		$info->notes = $notes;
		$info->tags = $tags;
		$info->settings = DatabaseManager::GetSettings();
		$info->result = true;
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		
		echo json_encode ($info);
	}
	
	private function handleUpdateSettings() {
		$info = new stdClass();
		$settings = HelperFunctions::MagicStripslashes($_REQUEST["settings"]);

		$settings = json_decode ($settings);
		DatabaseManager::UpdateSettings($settings);
		
		$info->result = true;
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		$info->settings = $settings;
		
		echo json_encode ($info);
	}
	
	private function handleLoggedInLogin() {
		$info = new stdClass();
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		$info->message = "Cannot log in. Already logged in";
		$info->result = false;
		echo json_encode ($info);
	}
	
	private function handleLoggedInDefault() {
		$info = new stdClass();
		$info->isLoggedIn = $this->userAuth->isLoggedIn();
		$info->message = "Invalid action specified";
		$info->result = false;

		echo json_encode ($info);
	}
	
	function dispatch () {
		$action = $this->requestParameter("action");
		
		if ($action === NULL) {// && $this->userAuth->isLoggedIn()) {
			return;
		}

		
		header ("content-type: application/json");
		if ($this->userAuth->isLoggedIn()) {
			try {
				$this->dispatchLoggedInActions ($action);
			}
			catch (Exception $e) {
				$info = new stdClass();
				$info->isLoggedIn = $this->userAuth->isLoggedIn();
				$info->result = false;
//				$info->message = "An error has occured:\n" . $e->getMessage() . "\n" . $e;
				$info->message = "An error has occured:\n" . $e;
				echo json_encode ($info);
			}
		}
		else {
			try {
				$this->dispatchNotLoggedInActions ($action);
			}
			catch (Exception $e) {
				$info = new stdClass();
				$info->isLoggedIn = $this->userAuth->isLoggedIn();
				$info->result = false;
				$info->message = "An error has occured:\n" . $e->getMessage() . "\n" . $e;
				echo json_encode ($info);
			}
		}
		exit;
	}
}