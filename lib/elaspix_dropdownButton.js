/* closure to wrap a desktop dropdown menu
 *
 * settings contain
 * parent: jQuery Div
 * id: id of the dropdown-group
 * labelText:
 * type: type of the part you can choose 
 * buttonText: the text on the button
 * listValues: a JSON-Object with visible values as keys and internal representations values to the respective key
 * width: css property
 * [onChange]: event listener that is called if something changes
   [onClick]: event listener to notify the owner that button is clicked
   [marginBottom]
   [spinner]: rotatable spinner
 *
 * */
function createDropdownButton(settings)
{
	
	var mContainer;
	var mLabel;
	var mDropdownContainer;
	var mSelect;
	var mButton;
	//var mButtonText;
	var mLastValue="";
	var mHint;
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mContainer=jQuery("<div/>").addClass("dropdown-container");
		mContainer.css("width",settings.width);
		
		var col=$("<div/>").addClass("col");
		mContainer.append(col);
		
		mLabel=jQuery("<label/>").text(settings.labelText);
		col.append(mLabel);
		
		mDropdownContainer=jQuery("<div/>").addClass("dropdown-dropdown-container");
		col.append(mDropdownContainer);
		
		var dropdown=jQuery("<div/>").addClass("input-group");
		mSelect=jQuery("<select/>").addClass("form-select");
		dropdown.append(mSelect);
		
		mButton=jQuery("<button/>").addClass("btn");
		mButton.text(settings.buttonText);
		mButton.attr("id",settings.id+"-button");
		mButton.attr("type","button");
		mButton.on("click",onClicked);
		if (settings.spinner)
		{
			mButton.append(settings.spinner);
		}
		
		//mButtonText=jQuery("<span/>").text(settings.titleText);
		//mButtonText.attr("data-text",settings.titleText);		
		//mButton.append(mButtonText);
		dropdown.append(mButton);
		
		
		
		
		mDropdownContainer.append(dropdown);
		
		//mButton.append(icon);
		
		//mGroupsDiv.append(group);
		
		mHint=jQuery("<small/>").text(settings.hintText);
		mDropdownContainer.append(mHint);
		settings.parent.append(mContainer);
		
		setValues(settings.listValues);
	}
	
	function setValues(aValues)
	{		
			mSelect.empty();			
			settings.listValues=aValues;
			$.each(Object.keys(aValues),function(index,key){
				
				var option=$("<option/>").text(key);
				option.on("click",function(){onValueSelect(key);});
				option.css("cursor","pointer").css("user-select","none");
				//option.css("word-wrap","break-word");
				//option.css("overflow","hidden");
				
				mSelect.append(option);			
			}); 
	}
	
	
	
	function onClicked()
	{
		if (settings.onClick!=undefined)
		{
			//gets the key of the value
			var name=Object.keys(settings.listValues).find(key => settings.listValues[key] === getValue());
			settings.onClick(settings.type, name, getValue());
		}
	}
	
	function onValueSelect(aKey)
	{
		internalValue=settings.listValues[aKey];
		//console.log("onValueSelect with Value "+internalValue);
		//mButtonText.text(aKey);
		//mButtonText.attr("data-text",internalValue);
		
		
		if ((mLastValue!=internalValue) && (settings.onChange!=undefined))
		{
			mLastValue=internalValue;//only fire if the value is new
			settings.onChange(internalValue,settings.labelText);
		}else{
			setHint("");
		}
	}
	
	function setupCSS()
	{
		//mSelect.addClass("parametervalue");
		// mLabel.addClass("parameter");
		//mLabel.css("padding",".375rem .75rem");
		//mButtonText.addClass("parametervalue");
		
		mContainer.css("display","flex");
		//mLabelContainer.css("width","35%");
		//mLabelContainer.css("background-color","blue");
		mDropdownContainer.css("width","100%");
		//mDropdownContainer.css("background-color","red");
		
		mHint.addClass("form-text note");//note is used in stead of text-muted
		
		mButton.addClass("btn-dropdown btn-outline-primary");//style now handled in css section
		
		// mButton.css("color","#333333");
		// mButton.css("border","none");
		// mButton.css("background-color","white");//default bootstrap is overwritten by elementor
		// mButton.hover(
				// function(){mButton.css("background-color","white");},//take all all hover effects from elementor
				// function(){mButton.css("background-color","white");}
				// );
		// mButton.css("letter-spacing","normal");
		if (settings.marginBottom)
		{
			mContainer.css("margin-bottom",settings.marginBottom);
		}
		
	}
	
	function getValue()
	{
		return settings.listValues[mSelect.val()];
		//return mButtonText.attr("data-text");
	}
	
	function selectValue(aValue){
		console.log("todo");
		var key;
		jQuery.each(settings.listValues, function(k, value){
			if(aValue == value){
				key = k;
			}
		});
		
		//mButtonText.text(key);
		//mButtonText.attr("data-text", aValue);
		mSelect.val(key);
		mLastValue = aValue;
		
	}
	
	function selectKey(aKey)
	{
		mSelect.val(aKey);
		mLastValue=settings.listValues[aKey];
	}
	
	
	
	function setHint(aText)
	{
		mHint.text(aText);
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
		mContainer.show("fast");
		//mContainer.css("display","block");
	}
	
	function getLabelText()
	{
		return mLabel.text();
	}
	
	function setEnabled(aEnabled)
	{
		if (aEnabled)
		{
			mButton.removeAttr("disabled");
		}else
		{
			mButton.attr("disabled","true");
		}
	}
	
	return {
		"setValues":setValues,
		"getValue":getValue,		
		"selectValue":selectValue,
		"selectKey":selectKey,		
		"setHint":setHint,		
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"setEnabled":setEnabled
	};
	
	
}
