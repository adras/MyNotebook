<?php
?>
<div id="content" class="content">
	<!--<img src="images/banner.png">-->
	<div style="color: #FF8040; font-size: 60pt; font-family: helvetica; text-align: center;">MyNotebook</div>
	<div style="color: #EEEE00; font-size: 20pt; font-family: helvetica; text-align: center; position: relative; left: -100px;">Uranus</div>
	<br>
	<br>
	<div id="tagArea" class="tagArea">
		<span>
			<div class="tag"></div>
			<div style="display: inline;">
				<img class="downArrow" src="images/downarrow.png">
			</div>
			<br>
		</span>
	</div>
	<!-- Note Template begins -->
	<div style="width: 800px; margin: 0px auto;">
	<button id="createNoteButton" class="createNoteButton" type="button" onclick="javascript: mainControl.showNewNoteWindow();">Create Note</button> &nbsp; &nbsp;
	<button type="button" class="logoutButton" onClick="javascript: mainControl.logout();">Logout</button>
	<button type="button" class="settingsButton" onClick="javascript: mainControl.showSettings();">Settings</button>
		Search: <input id="searchInput" type="text" onkeyup="javascript: mainControl.search()"></input>
	</div><br><br><br>
	<div id="noteContainer" class="noteContainer" >
		<div class="note">
			<div class="noteHeader">
				<div class="noteDate"></div>
				<div class="noteFunctions">
					<button class="editButton" href="javascript: void();">Edit</button>
					<button class="deleteButton" href="javascript: void();">Delete</button>
				</div>
				<div class="noteVisibility">
					<img src="images/btnPublic.png" alt="Public">
				</div>
				<div class="noteTags"></div>
			</div>
			<div class="noteContent"></div>
		</div>
	</div>
	<!-- Note Template ends -->
</div>

	<!-- Login template begins -->
	<div id="loginArea" style="display: none;">
		<br><br><br>
		<div id="login" class="login">
			<form action="javascript: mainControl.login($('loginPassword').getValue());">
				Password: <input type="password" id="loginPassword"></input>
				<button type="submit">Login</button>
			</form>
		</div>
	<!-- Login template ends -->
	</div>
	
	<!-- Settings template begins -->
	<div id="settingsArea" style="display: none;">
		<table id="settingsTable">
			<tr class="settings">
				<td class="settingsTableLeftColumn">sdafasdf</td>
				<td class="settingsTableRightColumn">xcyvyxcv</td>
			</tr>
		</table>
	<button type="button" onClick="javascript: mainControl.windowManager.hideSettingsWindow();" class="leftButton">Cancel</button>
	<button type="button" onClick="javascript: mainControl.saveSettings();" class="rightButton">Save</button>
	</div>
	<!-- Settings template ends -->