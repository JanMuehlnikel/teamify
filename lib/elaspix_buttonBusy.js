/* a closure for a button with a busy icon

settings contain
	parent
	title the title of the button
	onClick
	[cssClass] e.g. btn-primary or  w-100 (for full width)
	[marginTop]
	[marginBottom]
	
*/
function createButtonBusy(settings)
{
	//var mContainer;
	var mButton;
	var mTitle;
	var mSpinner;
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		//mContainer=$("<div/>").addClass("button-busy-container");
		//settings.parent.append(mContainer);
		
		mButton=$("<button/>").addClass("btn");
		//mContainer.append(mButton);
		settings.parent.append(mButton);
		mTitle=$("<span/>").text(settings.title);
		mButton.append(mTitle);
		mSpinner=$("<div/>").addClass("spinner-border").attr("role","status");
		mSpinner.hide();
		mButton.append(mSpinner);
		mButton.on("click",onClick);
	}
	
	function setupCSS()
	{
		//mButton.css("position","relative");//ref for spinner
		if (settings.cssClass)setCSSClass(settings.cssClass);
		//if (settings.marginTop)mContainer.css("margin-top",settings.marginTop);
		if (settings.marginTop)mButton.css("margin-top",settings.marginTop);
		if (settings.marginBottom)mButton.css("margin-bottom",settings.marginBottom);
		mSpinner.css("float","right");
		mSpinner.css("width","18px").css("height","18px");
		mSpinner.addClass("ms-1");
		mSpinner.css("position","relative");
		mSpinner.css("top","4px");
		
	}
	
	function onClick()
	{
		if (settings.onClick)settings.onClick();
	}
	
	function showBusyIcon(aToShow)
	{
		if (aToShow)mSpinner.show();else mSpinner.hide();
	}
	
	function setTitle(aTitle)
	{
		mTitle.text(aTitle);
	}
	
	function setCSSClass(aClasses)
	{
		mButton.removeClass("btn-primary btn-danger btn-warning btn-success btn-secondary bg-danger bg-warning bg-success");
		mButton.addClass(aClasses);
	}
	
	function setEnabled(aIsEnabled)
	{
		if (aIsEnabled)
		{
			mButton.removeAttr("disabled");
		}else
		{
			mButton.attr("disabled",true);
		}
	}
	
	function hide()
	{
		mButton.hide();
	}
	
	function show()
	{		
		mButton.show("slow");
	}
	
	
	return {
		"showBusyIcon":showBusyIcon,
		"setTitle":setTitle,
		"setCSSClass":setCSSClass,
		"setEnabled":setEnabled,
		"hide":hide,		
		"show":show,
	}
}