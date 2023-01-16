/**
 *closure for Bootstrap 5 Switches with central switch, left and right are modes
 *updates the hint-text
 *
 **/


/**settigns must contain
 *	parent				jQuery Object	
 *	id					the id
 *	onChange			click event listener with one string parameter
 *	isclicked			string value if checkbox is clicked
 *	notclicked			string value if checkbox is not clicked	
 *	[forceMobile]	 	if true, the labels are shown in the next line
	[labelElement]      if span -> same line, if dif (default) on top of each other)
	[hintIntermediate] a text that is between both labels
 **/
function createSwitchCentral(settings)
{
	var mContainer;
	var mCheckbox;
	var mHint;
	var mLabelNotclicked;
	var mLabelClicked;
	var mLabelIntermediate;
	var mDivSwitch;
	
	var mLastValue;
	
	inflate();
	setup();
	setupCSS();
	
	
	function inflate()
	{
		
		mContainer=$("<div/>").addClass("switch-central");
		settings.parent.append(mContainer);
		
		
		var labelElement="div";
		if (settings.labelElement)labelElement=settings.labelElement;
		
		mLabelNotclicked=$("<"+labelElement+"/>").addClass("").text(settings.notclicked);
		mLabelClicked=$("<"+labelElement+"/>").addClass("").text(settings.isclicked);
		
		
		mDivSwitch=$("<span/>").addClass("form-check form-switch");
		mContainer.append(mDivSwitch);
		
		
		
		mCheckbox=$("<input/>").attr("type","checkbox").addClass("form-check-input").attr("id",settings.id);
		mDivSwitch.append(mCheckbox);
		
		
		mHint=$("<label/>").addClass("form-check-label").attr("for",settings.id);//.text(settings.notclicked);
		mHint.append(mLabelClicked);
		
		if (settings.hintIntermediate)
		{
			mLabelIntermediate=$("<"+labelElement+"/>").addClass("").text(settings.hintIntermediate);
			mHint.append(mLabelIntermediate);
		}
		
		
		mHint.append(mLabelNotclicked);
		
		
		if (settings.forceMobile)
		{
			mContainer.append(mHint);//next line
		}else
		{
			mDivSwitch.append(mHint);//same line as switch
		}
		
		
	}
	
	function setup(){
		mCheckbox.on("click",onClick);
		if (mCheckbox.is(":checked"))mLastValue=settings.isclicked;else mLastValue=settings.notclicked;
		//mLabelClicked.on("click",onHintPrefixClick);//the label behind the switch is controlled by bootstrap/browser
		
			
		updateLabel();
		
	}
	
	function setupCSS()
	{
		//mContainer.css("user-select","none");
		mDivSwitch.css("cursor","pointer");
		mCheckbox.css("cursor","pointer");
		mHint.css("cursor","pointer");
		mHint.addClass("parametervalue");
		mLabelClicked.css("margin-right","6px");				
		mLabelClicked.css("font-weight","600");//default is not clicked		
		mLabelNotclicked.css("margin-right","6px");
		
		if (settings.hintIntermediate)
		{
			mLabelIntermediate.css("opacity","0.5");
			mLabelIntermediate.css("margin-right","4px");
			mLabelIntermediate.css("font-weight","300");
			mLabelIntermediate.addClass("note fs-6");
		}
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
	
	function onHintPrefixClick()
	{
		console.log("prefix");
		setValue(settings.notclicked);
	}
	
	
	
	function updateLabel()
	{
		 if (mCheckbox.is(":checked"))
		 {
			mLastValue=settings.isclicked;
			//mHint.css("font-weight","600");
			mLabelClicked.css("font-weight","600");		
			mLabelClicked.css("text-decoration","");
			mLabelNotclicked.css("font-weight","300");		
			//mLabelNotclicked.css("text-decoration","line-through");
			mLabelNotclicked.css("opacity","0.5");
			mLabelClicked.css("opacity","1");
			
			mHint.prepend(mLabelClicked);
			if (settings.hintIntermediate)
			{
				mHint.append(mLabelNotclicked);//only required in case of intermdiate label
			}
			
			mLabelClicked.removeClass("note fs-6");
			mLabelNotclicked.addClass("note fs-6");
			
		 }else
		 {
			mLastValue=settings.notclicked;			
			//mHint.css("font-weight","300");
			mLabelClicked.css("font-weight","300");	
			//mLabelClicked.css("text-decoration","line-through");
			
			mLabelNotclicked.css("opacity","1");
			mLabelClicked.css("opacity","0.5");
			
			mLabelNotclicked.css("font-weight","600");	
			mLabelNotclicked.css("text-decoration","");	
			
			mHint.prepend(mLabelNotclicked);
			if (settings.hintIntermediate)
			{
				mHint.append(mLabelClicked);//only required in case of intermdiate label
			}
			mLabelNotclicked.removeClass("note fs-6");
			mLabelClicked.addClass("note fs-6");
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
	
	function isChecked()
	{
		return mCheckbox.prop("checked");
	}
	
	return {		
		"getValue":getValue, //get the value of the button
		"isChecked":isChecked,
		"hide":hide,
		"show":show,
		"setValue":setValue
	};
}