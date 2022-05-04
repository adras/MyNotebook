var AutoSuggest = Class.create({
	initialize: function (parentElement) {
		this.suggestBox = this.createSuggestBox();
		this.highlightIndex = 1;
		
		parentElement.appendChild (this.suggestBox);
	},
	
	keyUp: function (e) {
		this.suggestBox.show();
		var list = this.availableTagArray;
		
		var newList = Array();
		var newTags = "";
		
		// Replace every non alphanumeric letter by a space so users can seperate tags by anything
		this.inputElement.value = this.inputElement.value.replace (/[^a-zA-Z0-9]/g, " ");

		var wordNumber = this.inputElement.value.split(" ").length;
		var searchWords = this.inputElement.value.split(" ");
		var searchText = searchWords[wordNumber-1];
		key = e.keyCode;

		if (key == 38)
			this.highlightIndex --;
		if (key == 40)
			this.highlightIndex ++;

		// Add all items that match search criteria to a new list
		for (var i = 0; i < this.availableTagArray.length; i++)
		{
			if (list[i].search (searchText) == 0)
			{
				var addItem = list[i];
				// Format the item so the found searchText becomes highlighted
				//addItem = addItem.replace (searchText, "<span class=\"autoSuggestSearch\">" + searchText + "</span>");
				newList.push (addItem);
			}		
		}
		newList.sort ();
		if (this.highlightIndex < 0)
			this.highlightIndex = 0;
			
		if (this.highlightIndex >= newList.length)
			this.highlightIndex = newList.length-1;

		if (key == 13)
		{
			if (wordNumber == 1)
			{
				// In case the list does not contain the tag just append a space. Otherwise select the tag from the list
				if (newList[this.highlightIndex] == undefined)
				{
					this.inputElement.value += " ";
				}
				else
				{
					this.inputElement.value = newList[this.highlightIndex];
				}
			}
			else
			{
				this.inputElement.value = "";
				for (i = 0; i <= wordNumber-2; i++)
				{
					this.inputElement.value += " " + searchWords[i];  
				}
				// In case the list does not contain the tag, append the last word
				if (newList[this.highlightIndex] == undefined)
				{
					this.inputElement.value += " " + searchWords[i] + " ";  
				}
				else
				{
					this.inputElement.value += " " + newList[this.highlightIndex];
				}
				this.inputElement.value = this.inputElement.value.substr(1);
			}
			this.suggestBox.hide();
			return;
		}
		newList[this.highlightIndex] = "<div class=\"autoSuggestHighlight\">" + newList[this.highlightIndex] + "</div>";

		for (i = 0; i < newList.length; i++)
		{
			var tag = newList[i];
			// If tag has already a <span> around it, highlight the search tag inside the <span> and put <span> back around
			
			if ((start = tag.search(">")) != -1)
			{
				end = tag.search(">");
				tag = tag.substr(0,start+1) + tag.substr(start+1, end).replace (searchText, "<span class=\"autoSuggestSearch\">" + searchText + "</span>") + "</span>";
			}
			
			newTags += tag + "<br>";
		}
	
		this.suggestBox.innerHTML = newTags;

	},
	
	createSuggestBox: function () {
		var suggestBox = document.createElement ("div");
		
		var idAttr = document.createAttribute ("id");
		var classAttr = document.createAttribute ("class");
		
		idAttr.nodeValue = "autoSuggest";
		classAttr.nodeValue = "autoSuggest";
		suggestBox.setAttributeNode (idAttr);
		suggestBox.setAttributeNode (classAttr);
		suggestBox.hide();
		return suggestBox;
	},
	
	attach : function(inputElementName) {
		// Show suggest box here
		this.inputElement = $(inputElementName);
		
		
		this.inputElement.observe ("keyup", this.keyUp.bind(this));
		this.updatePosition ();
		
		this.availableTagArray = Array();
		for (var i = 0; i < mainControl.info.tags.length; i++) {
			this.availableTagArray[i] = mainControl.info.tags[i].name;
		}

		$("autoSuggest").show();
	},
	
	updatePosition : function () {
		// Will also be called by the windowObserver whcih is set up and attached to ALL windows in windowmanager.js
		this.suggestBox.style["left"] = this.inputElement.cumulativeOffset()[0] + "px";
		this.suggestBox.style["top"] = (this.inputElement.cumulativeOffset()[1] + 40) + "px";
	},
	
	detach : function() {
		this.inputElement.stopObserving ("keyup");
		$("autoSuggest").hide();
	}
});