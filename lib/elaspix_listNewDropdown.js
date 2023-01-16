

/**
 *closure to show existing entries and to create new ones using input field (Bootstrap5)
 settings must contain
 *	parent: JQuery-Object as parent
	id: the unique id for the input field and label	
 *	placeholder		placeholder-text and label-Text on dropdow-button
	dropdownText: the text on the dropdown button
	buttonText: the text on the button 
 *	[onDropdownClick]	click event handler that accepts a string of the clicked dropdown entry
 *	[onKeyUp]			keyboard event handler that accepts a string of the curent text-input value
 *	[onButtonClick]		event that is called when the new button is pressed
	[help}			small-Tag to show help messages
 **/
function createListNewDropdown(settings)
{
	
	var mEntries=[];//stores the list of dropdown values to make filtering
	//var mDropdownShown;//states whether dropdown is shown or not
	
	var mFormGroup;
	var mLabel;
	var mDropdownButton;
	var mDropdownMenu;
	var mInput;
	var mHelp;
	var mButton;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mFormGroup=$("<div/>").addClass("form-group");
		settings.parent.append(mFormGroup);
		mLabel=$("<label/>").attr("for",settings.id).text(settings.dropdownText);
		mFormGroup.append(mLabel);
		var inputGroup=$("<div/>").addClass("input-group");
		mFormGroup.append(inputGroup);
		var inputGroupPrepend=$("<div/>").addClass("input-group-prepend");
		inputGroup.append(inputGroupPrepend);
		mDropdownButton=$("<button/>").addClass("btn dropdown-toggle").attr("id",settings.id+"-button").
			attr("data-bs-toggle","dropdown").attr("type","button").text("bitte wählen");
		inputGroupPrepend.append(mDropdownButton);
		mDropdownMenu=$("<ul/>").addClass("dropdown-menu").attr("id",settings.id+"-dropdown");
		inputGroupPrepend.append(mDropdownMenu);
		mInput=$("<input/>").attr("type","text").attr("id",settings.id).addClass("form-control").attr("placeholder",settings.placeholder);
		inputGroup.append(mInput);
		
		var inputGroupAppend=$("<div/>").addClass("input-group-append");
		mButton=$("<button/>").addClass("btn btn-outline-primary").attr("type","button").text(settings.buttonText);
		inputGroupAppend.append(mButton);
		inputGroup.append(inputGroupAppend);
		var helpText="";
		if (settings.help!=undefined)helpText=settings.help;
		mHelp=$("<small/>").addClass("form-text text-muted").attr("id",settings.id+"-help").text(helpText);
		mFormGroup.append(mHelp);
		
		
		
	}
	
	
	
	function setupCSS()
	{
		mFormGroup.addClass("mt-4 mb-4");
		mDropdownButton.addClass("btn-outline-primary");
		mDropdownButton.addClass("elaspix-button-text");
		mButton.addClass("elaspix-button-text");
		
	}
	
	
	
	
	function setup()
	{	
		
		mInput.keyup(onKeyUp);		
		if (settings.onButtonClick!=undefined)
		{
			mButton.on("click",settings.onButtonClick);
		}
		
		
	}
	
	
	//user clicks on dropdown entry
	function onEntryClick(aText)
	{
		mDropdownButton.text(aText);
		
		
		if (settings.onDropdownClick!=undefined)
		{
			settings.onDropdownClick(aText);//external clickListener
		}
	}
	
	//user enters text in the input-text
	function onKeyUp(event)
	{
		
		// var filter=updateDropdownList();
		
		
		// if (settings.onkeyup!=undefined)
		// {
			// settings.onkeyup(filter);
		// }
		if (event.keyCode==13 && settings.onButtonClick!=undefined)
		{
			settings.onButtonClick(getInput());
		}
		
	}
	
		
	//public methods
	function fill(aList)
	{
		mEntries=[];
		mDropdownMenu.empty();
		$.each(aList,function(key,aText)
			   {
					var li=$("<li/>");
					var entry=$("<span/>").addClass("dropdown-item");
					//entry.attr("href","#");
					entry.click(function(){onEntryClick(aText);}).text(aText);
					//entry.attr("data-toggle","dropdown");
					entry.css("cursor","pointer");
					li.append(entry);
					mDropdownMenu.append(li);
					mEntries.push(entry);
				
				
				});
		
	}
	
	function getValue()
	{
		return mDropdownButton.text().trim();
	}
	
	function setValue(aValue)
	{
		mDropdownButton.text(aValue);
		
	}
	
	
	
	
	
	function getInput()
	{
		var filter=mInput.val();//.toLowerCase();
		//if (filter==""){filter=settings.placeholder.toLowerCase();}//placeholder default 
		return filter;
	}
	
	function setHelp(aText)
	{
		mHelp.text(aText);
	}
	
	function setTextValue(aValue)
	{
		mInput.val(aValue);
	}
	
	function getTextValue()
	{
		return mInput.val();
	}
	
	function hide()
	{
		mFormGroup.hide();
	}
	
	function show()
	{
		mFormGroup.show();
	}
	
	
	return {		
		"fill":fill, //fills the dropdown list with strings
		"getValue":getValue, //get the value of the button	
		"getTextValue":getTextValue, //get the value of the input text
		"setValue":setValue,	
		"setTextValue":setTextValue,
		"getInput":getInput, //return the actual filter prefix,
		"setHelp":setHelp,
		"hide":hide,
		"show":show
	};
}