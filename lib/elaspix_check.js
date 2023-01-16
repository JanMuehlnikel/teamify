/**
 *closure for Bootstrap 4 Switches and Checkbox
 *updates the hint-text
 *
 **/


/**settigns must contain
 *	parent				jQuery Object	
 *	id					the id
 *	onChange			click event listener with one string parameter
 *	isclicked			string value if checkbox is clicked
 *	notclicked			string value if checkbox is not clicked
 * [marginBottom]
	[label] the mHintMobile is used as label
 **/
function createCheck(settings)
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
		
		
		mHintMobile=$("<label/>").addClass("").text(settings.label);
		mContainer.append(mHintMobile);
		
		var div=$("<div/>").addClass("form-check");
		mContainer.append(div);
		mCheckbox=$("<input/>").attr("type","checkbox").addClass("form-check-input").attr("id",settings.id);
		div.append(mCheckbox);
		mHint=$("<label/>").addClass("form-check-label d-none__ d-md-block__").attr("for",settings.id).text(settings.notclicked);//display-classes disabled
		//mHintMobile=$("<label/>").addClass("d-block d-md-none").text(settings.notclicked);
		//mHintMobile=$("<label/>").addClass("").text(settings.label);
		
		
		div.append(mHint);
		//mContainer.append(mHintMobile);
		
	}
	
	function setup(){
		mCheckbox.on("click",onClick);
		if (mCheckbox.is(":checked"))mLastValue=settings.isclicked;else mLastValue=settings.notclicked;
	}
	
	function setupCSS()
	{
		if (settings.marginBottom)
		{
			mContainer.css("margin-bottom",settings.marginBottom);
		}
		mHint.css("cursor","pointer");
		mCheckbox.css("cursor","pointer");
		mHint.addClass("parametervalue");
		mHintMobile.addClass("parametervalue");
		mCheckbox.css("margin-top","0.5em");
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
			mHint.text(settings.isclicked);
			//mHintMobile.text(settings.isclicked);
		 }else
		 {
			mLastValue=settings.notclicked;			
			mHint.text(settings.notclicked);			
			//mHintMobile.text(settings.notclicked);			
			
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
	
	return {		
		"getValue":getValue, //get the value of the button
		"isChecked":isChecked,
		"hide":hide,
		"show":show,
		"setValue":setValue
	};
}