

/**
 *closure for a filter dropdown
 settings must contain
 *	parent: JQuery-Object as parent
	id: the unique id for the input field and label	
 *	placeholder		the string that is used as placeholder if inputtext is empty
 *	[ondropdownclick]	click event handler that accepts a string of the clicked dropdown entry
 *	[onkeyup]			keyboard event handler that accepts a string of the curent text-input value
 *	help			small-Tag to show help messages
	rightButtonText				the text for the right-appended button
	[onRightButtonClick]       	to be called when the right-appended button is clicked
	[width]
 **/
function createLookupDropdown(settings)
{
	
	var mEntries=[];//stores the list of dropdown values to make filtering
	//var mDropdownShown;//states whether dropdown is shown or not
	
	var mFormGroup;
	var mLabel;
	var mButton;
	var mDropdownMenu;
	var mInput;
	var mHelp;
	var mRightButton;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mFormGroup=$("<div/>").addClass("form-group");
		settings.parent.append(mFormGroup);
		mLabel=$("<label/>").attr("for",settings.id).text(settings.placeholder);
		mFormGroup.append(mLabel);
		var inputGroup=$("<div/>").addClass("input-group");
		mFormGroup.append(inputGroup);
		var inputGroupPrepend=$("<div/>").addClass("input-group-prepend");
		inputGroup.append(inputGroupPrepend);
		mButton=$("<button/>").addClass("btn dropdown-toggle").attr("id",settings.id+"-button").
			attr("data-bs-toggle","dropdown").attr("type","button").text("bitte wählen");
		inputGroupPrepend.append(mButton);
		mDropdownMenu=$("<ul/>").addClass("dropdown-menu").attr("id",settings.id+"-dropdown");
		inputGroupPrepend.append(mDropdownMenu);
		mInput=$("<input/>").attr("type","text").attr("id",settings.id).addClass("form-control").attr("placeholder",settings.placeholder);
		inputGroup.append(mInput);
		
		var inputGroupAppend=$("<div/>").addClass("input-group-append");
		mRightButton=$("<button/>").addClass("btn btn-outline-secondary").attr("type","button").text(settings.rightButtonText);
		inputGroupAppend.append(mRightButton);
		inputGroup.append(inputGroupAppend);
		
		
		
		mHelp=$("<small/>").addClass("form-text text-muted").attr("id",settings.id+"-help").text(settings.help);
		mFormGroup.append(mHelp);
		
		
		
	}
	
	
	
	function setupCSS()
	{
		mFormGroup.addClass("mb-4");
		if (settings.width)mFormGroup.css("width",settings.width);
		mButton.addClass("btn-outline-secondary");
		
	}
	
	
	
	
	function setup()
	{	
		
		mInput.keyup(onInputChange);
		fill(settings.entries);
		//mDropdownShown=false;
		if (settings.onRightButtonClick)
		{
			mRightButton.on("click",settings.onRightButtonClick);
		}
		
		
		
	}
	
	
	//user clicks on dropdown entry
	function onEntryClick(aText)
	{
		mButton.text(aText);
		
		
		if (settings.ondropdownclick!=undefined)
		{
			settings.ondropdownclick(aText);//external clickListener
		}
	}
	
	//user enters text in the input-text
	function onInputChange()
	{
		
		var filter=updateDropdownList();
		//if (mDropdownShown==false)
		//{
		//	mList.show();
		//	mList.dropdown("toggle");
		//	console.log("show dropdown");
		//	mDropdownShown=true;
		//}
		
		if (settings.onkeyup!=undefined)
		{
			settings.onkeyup(filter);
		}
		
	}
	
	function updateDropdownList()
	{
		
		var filter=getFilterPrefix();
		var numberShown=0;
		var numberNotShown=0;
		
		
		$.each(mEntries,function(index,aEntry)
			   {
						if (filter=="" || (aEntry.text().toLowerCase().indexOf(filter)>-1))
						{//add all if filter is empty
							aEntry.show();
							numberShown=numberShown+1;
						}else
						{							
							aEntry.hide();
							numberNotShown=numberNotShown+1;
						}
				});
		
		mHelp.text("("+numberShown+" von "+(numberNotShown+numberShown)+" in der Liste)");
		
		return filter;
	}
	
	
	
	
	//public methods
	function fill(aList)
	{
		mEntries=[];
		mDropdownMenu.empty();
		$.each(aList,function(key,aText)
			   {
					// var li=$("<li/>");
					// var entry=$("<a/>").addClass("dropdown-item");
					// entry.attr("href","#").click(function(){onEntryClick(aText);}).text(aText);
					
					// li.append(entry);
					// mDropdownMenu.append(li);
					// mEntries.push(entry);
					add(aText);
				
				
				});
		updateDropdownList();//hide items that do not match the placeholder
	}
	
	function add(aText)
	{
		var li=$("<li/>");
		var entry=$("<a/>").addClass("dropdown-item");
		entry.attr("href","#").click(function(){onEntryClick(aText);}).text(aText);
		
		li.append(entry);
		mDropdownMenu.append(li);
		mEntries.push(entry);
		updateDropdownList();
	}
	
	function getValue()
	{
		return mButton.text().trim();
	}
	
	function setValue(aValue)
	{
		mButton.text(aValue);
		
	}
	
	
	
	
	
	function getFilterPrefix()
	{
		//var filter=mInput.val().toLowerCase();
		//if (filter==""){filter=settings.placeholder.toLowerCase();}//placeholder default 
		return mInput.val();
	}
	
	function setTextValue(aValue)
	{
		mInput.val(aValue);
	}
	
	
	return {
		"list":mInput,
		"fill":fill, //fills the dropdown list with strings
		"getValue":getValue, //get the value of the button		
		"setValue":setValue,
		"setTextValue":setTextValue,
		"getFilterPrefix":getFilterPrefix, //return the actual filter prefix
		"add":add
	};
}