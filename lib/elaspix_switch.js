/**
 *closure for Bootstrap 5 Switches and Checkbox
 *updates the hint-text
 *
 **/


/**settigns must contain
 *	parent				jQuery Object	
 *	id					the id
 *	onChange			click event listener with one string parameter
 *	isclicked			string value if checkbox is clicked
 *	notclicked			string value if checkbox is not clicked
 *  [marginBottom]
 *  [marginTop]
	[isCheckbox] if true the switch is a checkbox
	[isClickedLabel]		an optional label that is shown when the switch is clicked, overwriting isclicked
	[notClickedLabel]		an optional label that is shown when the switch is not clicked,overwriting notclicked
 **/
function createSwitch(settings)
{
	var mContainer;
	var mCheckbox;
	var mHint
	var mHintMobile;
	var mLastValue;
	
	inflate();
	setup();
	setupCSS();
	
	
	function inflate()
	{
		mContainer=$("<div/>");
		settings.parent.append(mContainer);
		
		var classSwitch="form-switch";
		if (settings.isCheckbox)classSwitch="";//without that class it is a checkbox
		var div=$("<div/>").addClass("form-check "+classSwitch);
		mContainer.append(div);
		mCheckbox=$("<input/>").attr("type","checkbox").addClass("form-check-input").attr("id",settings.id);
		div.append(mCheckbox);
		mHint=$("<label/>").addClass("form-check-label d-none d-md-block").attr("for",settings.id);//filled in updateLabel
		mHintMobile=$("<label/>").addClass("d-block d-md-none ");//filled in UpdateLabel
		
		//mHint.append(mCheckbox);
		div.append(mHint);
		mContainer.append(mHintMobile);
		
	}
	
	function setup(){
		mCheckbox.on("click",onClick);
		if (mCheckbox.is(":checked"))mLastValue=settings.isclicked;else mLastValue=settings.notclicked;
		updateLabel();
	}
	
	function setupCSS()
	{
		if (settings.marginBottom)
		{
			mContainer.css("margin-bottom",settings.marginBottom);
		}
		
		if (settings.marginTop)
		{
			mContainer.css("margin-top",settings.marginTop);
		}
		mHint.css("cursor","pointer");
		mCheckbox.css("cursor","pointer");
		mHint.addClass("parametervalue");
		mHintMobile.addClass("parametervalue");
		//mCheckbox.css("margin-top","0.5em");
	}
	
	//returns the label Optional if not undefined, otherwise returns the valueRequired
	function checkOptional(aValueRequired,aValueOptional)
	{
		if (aValueOptional!=undefined){
			//console.log("checkOptional",aValueOptional)
			return aValueOptional;
		}
		//console.log("checkOptional alternative")
		return aValueRequired;
		
	}
	
	//user clicks on dropdown entry
	function onClick()
	{
		updateLabel();
		
		
		if (settings.onChange!=undefined)
		{
			if (mCheckbox.is(":checked"))
			{
				settings.onChange(settings.isclicked);
			}else
			{
				settings.onChange(settings.notclicked);
			}
		}		
	}
	
	function updateLabel()
	{
		 if (mCheckbox.is(":checked"))
		 {
			mLastValue=settings.isclicked;
			var label=checkOptional(settings.isclicked,settings.isClickedLabel);
			mHint.text(label);
			mHintMobile.text(label);
		 }else
		 {
			mLastValue=settings.notclicked;	
			var label=checkOptional(settings.notclicked,settings.notClickedLabel);
			//console.log("mHint",mHint);
			mHint.text(label);			
			mHintMobile.text(label);			
			
		 }
	}
	
	
	
	
	
	
	//public methods
	
	function show()
	{
		mContainer.show();
	}
	
	function hide()
	{
		mContainer.hide();
	}
	
	
	function getValue()
	{
		return mLastValue.trim();
	}
	
	function isChecked()
	{
		return mCheckbox.prop("checked");
	}
	
	function setValue(aValue)
	{
		if (aValue==settings.isclicked)
		{
			mCheckbox.prop("checked",true);
		}
		
		if (aValue==settings.notclicked)
		{
			mCheckbox.prop("checked",false);
		}
		updateLabel();
	}
	
	function lock(aToLock)
	{
		if (aToLock)mCheckbox.attr("disabled","true");else mCheckbox.removeAttr("disabled");
	}
	
	return {		
		"getValue":getValue, //get the value of the button
		"isChecked":isChecked,
		"hide":hide,
		"show":show,
		"setValue":setValue,
		"lock":lock
	};
}