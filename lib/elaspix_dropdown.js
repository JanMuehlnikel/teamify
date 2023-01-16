/* closure for a dropdown menu with busy-Icon and kebap-menu, placeable at text-end (right)
 *
 * settings contain
	 * parent: jQuery Div
	 * id: id of the dropdown-group
	 * labelText: 
	 * titleText: the button's default value
	 * listValues: a JSON-Object with visible values as keys and internal representations values to the respective key
	 * width: css property
	 * [onChange]: event listener that is called if something changes
	   [onOpen]: event listener to notify the owner that the dialoge is opened
	   [marginBottom]
	   [containerClass] e.g. text-end
	   [hasBusyIcon] if true, a Busy Icon is added
	   [onKebapClick] if defined, a kebap menu is added, except hasBusyIcon is true
	   [buttonFullWidth] if true, the button spans over the full width
	   [showKebabEmptySpace] if true, the button is shortened to leave space for the kebab button,even it is not visible
	 *
 
	requires
		pics/three-dots-vertical.svg
 * */
function createDropdown(settings)
{
	
	var mContainer;
	var mLabelContainer;
	var mDropdownContainer;//wraps dropdownDiv and contains BusyIcon
	var mDropdownDiv;//closed div around menu and buttom
	var mMenu;
	var mButton;
	var mButtonText;
	var mButtonToggleIcon;
	var mLastValue="";
	var mLabel;
	var mLabelValue;
	var mHint;
	var mBusyIcon;
	var mKebabIcon;
	var mValuesReadable;//mapping from readable labels to internal values (settings.listValues reversed)
	
	var mValues;//initialized with listValues, overwritten by setValues
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mContainer=jQuery("<div/>").addClass("dropdown-container");
		mContainer.css("width",settings.width);
		
		
		
		mLabelContainer=jQuery("<div/>").addClass("dropdown-label-container");
		//mLabelContainer.addClass("d-none d-md-block");
		mDropdownContainer=jQuery("<div/>").addClass("dropdown-dropdown-container");
		
		
		
		mContainer.append(mLabelContainer);
		mContainer.append(mDropdownContainer);
		
		mLabel=jQuery("<label/>").text(settings.labelText);
		
		//mLabelValue=jQuery("<label/>").text(settings.labelText);//second label for mobile portrait view
		//mLabelValue.addClass("d-block d-md-none");
		//mDropdownContainer.append(mLabelValue);
		
		if (settings.hasBusyIcon==true)
		{
			mBusyIcon=$("<span/>").addClass("spinner-border text-secondary float-end").attr("role","status");
			mBusyIcon.hide();
			mDropdownContainer.append(mBusyIcon);
		}
		
		
		
		mDropdownDiv=jQuery("<div/>").addClass("dropdown");
		
		
		
		mButton=jQuery("<button/>").addClass("btn");//class dropdown-toggle not used here, must be isolated to place it at the right-most position
		mButton.attr("id",settings.id+"-button");
		mButton.attr("type","button").attr("data-bs-toggle","dropdown");
		mButton.on("click",onOpen);
		
		var buttonRow=$("<div/>").addClass("d-flex justify-content-between");
		mButton.append(buttonRow);
		
		mButtonText=jQuery("<span/>").text(settings.titleText);
		mButtonText.attr("data-text",settings.titleText);//is in setValues overwritten with first value
		buttonRow.append(mButtonText);
		
		mButtonToggleIcon=$("<span/>").addClass("dropdown-toggle");//we do not use the default caret-down icon
		
		buttonRow.append(mButtonToggleIcon);
		
		//var icon=jQuery("<img/>").attr("src","https://my-pergola24.elaspix.de/elaspix/konfigurator/pics/dark_hds.svg");
		//icon.css("width","12px").css("position","absolute").css("right","0px");
		//icon.css("margin","8px").css("margin-right","12px");
		mMenu=jQuery("<ul/>").addClass("dropdown-menu");
		
		
		
		mLabelContainer.append(mLabel);
		mDropdownContainer.append(mDropdownDiv);
		mDropdownDiv.append(mButton);
		//mButton.append(icon);
		mDropdownDiv.append(mMenu);
		
		mKebabIcon=$("<img/>").addClass("").attr("src","pics/three-dots-vertical.svg");
		mKebabIcon.hide();
		//console.log("settings.hasBusyIcon",settings.hasBusyIcon)
		//if (settings.hasBusyIcon==undefined)//busy-Icon kills kebap-Icon
		//{		
			mDropdownDiv.append(mKebabIcon);			
		//}
		
		
		if (settings.onKebapClick)
		{			
			mKebabIcon.on("click",onKebapClick);
			mKebabIcon.show();			
		}else
		{
			if (settings.showKebabEmptySpace)
			{
				mKebabIcon.show();			
				mKebabIcon.css("visibility","hidden");//is not visible but consumes space
			}
		}
		
		
		
		
		
		
		if (settings.onKebapClick)
		{
			
			mKebabIcon.on("click",onKebapClick);
			
		}else
		{
			mKebabIcon.css("visibility","hidden");//consumes space for same length as buttons with kebap menu but is not visible
		}
		//mGroupsDiv.append(group);
		
		
		
		mHint=jQuery("<small/>").text(settings.hintText);
		mDropdownContainer.append(mHint);
		settings.parent.append(mContainer);
		//var groupStructure={"group":mContainer,"button":button,"buttonText":buttonText,"menu":menu,"onChange":settings.onChange,"lastValue":""};
		//mDropDownGroups[aId]=groupStructure;
		setValues(settings.listValues);
		
		
	}
	
	function setValues(aValues)
	{		
			mValues=aValues;
			var isFirstValue=true;
			mValuesReadable={};
			
			mMenu.empty();			//key=shown   value=internal
			jQuery.each(mValues,function(key,value){
				
				var entry=jQuery("<li/>").append(jQuery("<span/>").addClass("dropdown-item parametervalue").text(key));//.attr("href","#"));
				entry.on("click",function(){onValueSelect(key);});
				entry.css("cursor","pointer").css("user-select","none");
				entry.css("word-wrap","break-word");
				entry.css("overflow","hidden");			
				mMenu.append(entry);			
				mValuesReadable[value]=key;
				if (isFirstValue)
				{
					isFirstValue=false;
					selectValue(value);
				}
			}); 
	}
	
	function getValues()
	{
		return mValues;
	}
	
	function setTitle(aTitle)
	{
		mButtonText.text(aTitle);
		mButtonText.attr("data-text",aTitle);	
		mLastValue=aTitle;//to allow selection of the same value as before
	}
	
	function onOpen()
	{
		if (settings.onOpen!=undefined)
		{
			settings.onOpen();
		}
	}
	
	function onValueSelect(aKey)
	{
		internalValue=mValues[aKey];
		console.log("onValueSelect with Value "+internalValue);
		mButtonText.text(aKey);
		mButtonText.attr("data-text",internalValue);
		//mLabelValue.text(settings.labelText+" "+aKey);
		
		if ((mLastValue!=internalValue) && (settings.onChange!=undefined))
		{
			mLastValue=internalValue;//only fire if the value is new
			settings.onChange(internalValue,settings.labelText);
		}else{
			clearHint();
		}
	}
	
	function setupCSS()
	{
		
		mLabel.addClass("elaspix-label");
		mLabel.css("padding",".375rem 0");
		//mLabelValue.addClass("parameter");
		mButtonText.addClass("elaspix-button-text");
		
		//mContainer.css("display","flex");//for one-line
		mLabelContainer.css("width","100%");//35% for one-line
		
		//mDropdownContainer.css("width","100%");
		
		
		mHint.addClass("form-text note");//note is used in stead of text-muted
		
		mButton.addClass("btn-outline-secondary");
		mButton.css("width", settings.width);
		
		mMenu.css("width", settings.width);
		
		
		if (settings.marginBottom)
		{
			mContainer.css("margin-bottom",settings.marginBottom);
		}
		
		if (settings.containerClass)
		{
			mContainer.addClass(settings.containerClass);
		}
		if (settings.hasBusyIcon)
		{
			mBusyIcon.css("width","25px").css("height","25px");
			mBusyIcon.css("margin-top","5px");
			mBusyIcon.css("margin-left","5px");
		}
		
		//for consistency reason also style the non-visible kebap-icon
		//mKebabIcon.css("margin-left","5px");
		
							
		mKebabIcon.css("margin-top","8px");
		mKebabIcon.css("width","24px");
		mKebabIcon.css("height","24px");
		mKebabIcon.css("user-select","none");
		
		if (settings.onKebapClick)
		{					
			mKebabIcon.css("cursor","pointer");			
		}
		
		mButtonToggleIcon.css("margin-left","5px");
		
		if (settings.buttonFullWidth)
		{
			mDropdownDiv.addClass("d-flex");
			mButton.addClass("flex-grow-1 text-start");//span to the full width but let space for the toggle-span
			mButtonToggleIcon.addClass("float-end");
			mButtonToggleIcon.css("margin-top","5px");//not requird in normal-width mode
		
		}
	}
	
	function onKebapClick()
	{
		if (settings.onKebapClick)
		{
			settings.onKebapClick();
		}
	}
	
	//returns the internal-Value
	function getValue()
	{
		return mButtonText.attr("data-text");
	}
	
	
	//returns the respective readable value for the internal value
	function getValueReadable()
	{
		var internalValue=getValue();
		if (mValuesReadable.hasOwnProperty(internalValue))
		{
			return mValuesReadable[internalValue];
		}
		return "";
	}
	
	
	//select values based on internal value
	function selectValue(aValue){
		var key;
		jQuery.each(mValues, function(k, value){
			if(aValue == value){
				key = k;
			}
		});
		
		mButtonText.text(key);
		mButtonText.attr("data-text", aValue);
		mLastValue = aValue;
		
	}
	
	function setLabelText(aText){
		mLabel.text(aText);
	}
	
	function setHintText(aText)
	{
		mHint.text(aText);
	}
	
	function setHintTextHTML(aHTML)
	{
		mHint.html(aHTML);
	}
	
		//aHintObjects is a list of tuples with hint:text and click:function-Properties
	function setHint(aHintObjects)
	{
		mHint.empty();
		jQuery.each(aHintObjects,function(index,hintObject){
					var span=jQuery("<span/>").text(hintObject.hint);
					if (hintObject.hasOwnProperty("click"))
					{
						span.css("text-decoration","underline").css("cursor","pointer");
						span.on("click",hintObject.click);
					}
					
					if (hintObject.hasOwnProperty("cssClass"))
					{
						span.addClass(hintObject.cssClass);
					}
					mHint.append(span);
				});
	}
	
	function setHintClass(aClass)
	{
		mHint.removeClass();
		mHint.addClass("form-text");//padding
		
		mHint.addClass(aClass);
		if (aClass!="text-danger" && aClass!="text-warning" && aClass!="text-success")
		{//show gray color only if text-danger is not given which forces to show text in red
			mHint.addClass("text-muted");//gray
		}
	
	}
	
	function clearHint()
	{
		mHint.text("");
		setHintClass("");//uses text-muted
	}
	
	function fadeOut()
	{
		mContainer.fadeOut("slow",function(){mContainer.hide("slow");});		
	}
	
	function hide()
	{
		mContainer.css("display","none");
	}
	
	function show()
	{
		//mContainer.show("fast");
		mContainer.css("display","flex");
	}
	
	function getLabelText()
	{
		return mLabel.text();
	}
	
	//aToShow
	function showBusyIcon(aToShow)
	{
		if (aToShow)mBusyIcon.show();else mBusyIcon.hide()
		
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
	
	return {
		"setValues":setValues,
		"getValue":getValue,
		"getValues":getValues,
		"getValueReadable":getValueReadable,
		"setTitle":setTitle,
		"selectValue":selectValue,
		"setValue":selectValue,//make it compatible to slider
		"setLabelText":setLabelText,
		"getLabelText":getLabelText,
		"setHintText":setHintText,
		"setHintTextHTML":setHintTextHTML,
		"setHint":setHint,//replaces the html content and appends the passed jQuery-Object
		"clearHint":clearHint,
		"setHintClass":setHintClass,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"showBusyIcon":showBusyIcon,
		"setEnabled":setEnabled
	};
	
	
}
