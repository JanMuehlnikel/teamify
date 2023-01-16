/**
 * Base File: Base Files are at the bottom of dependency hierarchies
 * used by: collapserImageUpload
 * 			expertDecisionDropdown
 *
 *closure for input texts with label, input-field and hint
 *settings contains
 *	parent : a jQuery div
 *	id : the unique id
 *	labelText:the text for the label
 *	inputPlaceholder: the text hint for the input
 *	inputType: the type of the input {email,text,..}
 *	hintText: the text for the hint
 *	width: css property
 *	rows: textarea rows
 *	cols: textarea columns
 *	[onKeypress]: event Handler when a key is pressed
	[onKeyup]: event Handler when a key is let go
 *	[marginBottom]: optional lineheight for the form group to set it to 0 removes vertical margin and make the form look more compact
 *	[paddingBottom]: optional lineheight for the form group to set it to 0 removes vertical margin and make the form look more compact
 *	labelVerticalAlign: Vertical Alignment of the label, so it is positioned correctly above the text-field
 *	display: CSS display property: recommended to use block, flex for edge-case scenario
 **/


function createInputTextArea(settings)
{
	var mContainer;
	var mLabel;
	var mInput;
	var mHint;
	//added a forced linebreak to display the label text above the textbox at all times
	var mLinebreak;
	
	inflate();
	setup();
	setupCSS();

	function inflate()
	{
		mContainer=$("<div/>").attr("id",settings.id);
		mLabel=$("<label/>").text(settings.labelText).attr("for",settings.id+"-input").attr("vertical-align",settings.labelVerticalAlign).attr("display",settings.display);
		mLinebreak=$("<br/>");
		mInput=$("<textarea/>").attr("id",settings.id+"-input").attr("name",settings.id+"-input").attr("rows", settings.rows).attr("cols", settings.cols).attr("display",settings.display);
		mInput.attr("placeholder",settings.inputPlaceholder);
		if (settings.onKeypress!=undefined)
		{
			mInput.on("keypress",settings.onKeypress);
		}
		if (settings.onKeyup !=undefined){
			mInput.on("keyup",settings.onKeyup)
		}
		mHint=$("<div/>").text(settings.hintText);
		
		mContainer.append(mLabel);
		mContainer.append(mLinebreak)
		mContainer.append(mInput);
		mContainer.append(mHint);
		settings.parent.append(mContainer);
		//mInput.val("02134567@");
  
	}
	
	function setup()
	{
		if(settings.onKeyup)
		{
			mInput.on("keyup",settings.onKeyup);
		}
	}
	
	function setupCSS()
	{
	
		//mContainer.addClass("form-group");
		if (settings.marginBottom!=undefined)
		{
			mContainer.css("margin-bottom",settings.marginBottom);
		}
		mContainer.css("width",settings.width);//.css("padding","10px");
		if (settings.paddingBottom!=undefined)
		{
			mContainer.css("padding-bottom",settings.paddingBottom);
		}
		//mInput.addClass("form-control");
		mInput.css("width",settings.width);
	
		//mInput.css("font-size","0.8rem");//to be as high as the dropdown text
		//mInput.css("line-height","1em");//make as high as the dropdown-buttons
		mHint.addClass("form-text text-muted");
	}
	
	
	function setLabelText(aText)
	{
		mLabel.text(aText);
	}
	
	function getValue()
	{
		return mInput.val();
	}
	
	function setInputValue(aValue)
	{
		mInput.val(aValue);
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
		$.each(aHintObjects,function(index,hintObject){
					var span=$("<span/>").text(hintObject.hint);
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
	
	function slideToggle(aSpeed)
	{
		mContainer.slideToggle(aSpeed);
	}
	
	function show()
	{
		mContainer.show("slow");
		//mContainer.css("display","block");
	}
	
	function setEnabled(aIsEnabled)
	{
		if (aIsEnabled)
		{
			mInput.removeAttr("disabled");
		}else
		{
			mInput.attr("disabled",true);
		}
	}
	
	
	return {
		"setLabelText":setLabelText,
		"setInputValue":setInputValue,
		"setHintText":setHintText,
		"setHintTextHTML":setHintTextHTML,
		"setHint":setHint,//replaces the html content and appends the passed jQuery-Object
		"clearHint":clearHint,
		"getValue":getValue,
		"setHintClass":setHintClass,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"slideToggle":slideToggle,
		"setEnabled":setEnabled
	};
}
