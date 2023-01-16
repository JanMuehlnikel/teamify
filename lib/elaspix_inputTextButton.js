

/**
 *closure to allow editing a name to save it 
 settings must contain
 *	parent: JQuery-Object as parent
	id: the unique id for the input field and label	
 *	placeholder		placeholder-text and label-Text on dropdow-button	
	buttonText: the text on the button 
	label: label above input fields
 *	[onKeyUp]			keyboard event handler that accepts a string of the curent text-input value
 *	[onButtonClick]		event that is called when the new button is pressed
	[help]			small-Tag to show help messages
 **/
function createInputTextButton(settings)
{
	
	var mFormGroup;
	var mLabel;	
	var mInput;
	var mHelp;
	var mButton;
	var mBusyIcon;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mFormGroup=$("<div/>").addClass("form-group");
		settings.parent.append(mFormGroup);
		mLabel=$("<label/>").attr("for",settings.id).text(settings.label);
		mFormGroup.append(mLabel);
		var inputGroup=$("<div/>").addClass("input-group");
		mFormGroup.append(inputGroup);		
		mInput=$("<input/>").attr("type","text").attr("id",settings.id).addClass("form-control").attr("placeholder",settings.placeholder);
		inputGroup.append(mInput);
		
		var inputGroupAppend=$("<div/>").addClass("input-group-append");
		mButton=$("<button/>").addClass("btn btn-outline-primary").attr("type","button");//.text(settings.buttonText);
		mButton.append($("<span/>").text(settings.buttonText));
		mBusyIcon=$("<span/>").addClass("spinner-border").attr("role","status");
		mBusyIcon.hide();
		mButton.append(mBusyIcon);
		inputGroupAppend.append(mButton);
		inputGroup.append(inputGroupAppend);
		var helpText="";
		if (settings.help!=undefined)helpText=settings.help;
		mHelp=$("<small/>").addClass("form-text text-muted").attr("id",settings.id+"-help").text(helpText);
		mFormGroup.append(mHelp);
	}	
	
	
	function setupCSS()
	{
		mFormGroup.addClass("mb-4");	
		mButton.addClass("elaspix-button-text");	
		mLabel.addClass("elaspix-label");
		mBusyIcon.css("width","22px");
		mBusyIcon.css("height","22px");
		mBusyIcon.css("position","relative");
		mBusyIcon.css("top","2px");
		mBusyIcon.css("margin-left","7px");
		
	}
	
	
	function setup()
	{			
		mInput.keyup(onKeyUp);		
		
		mButton.on("click",onButtonClick);
			
	}
	
	function onButtonClick()
	{
		
		if (settings.onButtonClick!=undefined)
		{
			settings.onButtonClick(getValue());
		}	
	}
	
	
	
	
	//user enters text in the input-text
	function onKeyUp(event)
	{
		if (event.keyCode==13 && settings.onButtonClick!=undefined)
		{
			settings.onButtonClick(getValue());
		}

		if (settings.help)setHelp(settings.help);//clear danger-message
	}		
	
	
	
	function setHelp(aText,aClass)
	{
		mHelp.text(aText);
		if (aClass!=undefined)
		{
			mHelp.removeClass("text-muted");
			mHelp.removeClass("text-danger");
			mHelp.removeClass("text-warning");
			mHelp.removeClass("text-success");
			mHelp.addClass(aClass);
			
		}else
		{
			mHelp.removeClass("text-danger");
			mHelp.removeClass("text-warning");
			mHelp.removeClass("text-success");
			mHelp.addClass("text-muted");
			
		}
	}
	
	function setTextValue(aValue)
	{
		mInput.val(aValue);
	}
	
	function getValue()
	{
		return mInput.val();
	}
	
	function setDisabled(aIsDisabled)
	{
		if (aIsDisabled)
		{
			mButton.attr("disabled",true);
		}else
		{
			mButton.removeAttr("disabled");
		}
	}
	
	function showBusyIcon(aToShow)
	{
		if (aToShow)mBusyIcon.show();else mBusyIcon.hide();
	}
	
	
	return {		
		"getValue":getValue, 
		"setHelp":setHelp,
		"setDisabled":setDisabled,
		"showBusyIcon":showBusyIcon
	};
}