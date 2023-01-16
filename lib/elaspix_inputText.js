/**
 *closure for input texts with label, input-field and hint
 *settings contains
 *	parent : a jQuery div
 *	id : the unique id
 *	labelText:the text for the label
 *	inputPlaceholder: the text hint for the input
 *	inputType: the type of the input {email,text,..}
 *	hintText: the text for the hint
 *	width: css property
 *	[onKeypress]: event Handler when a key is pressed
 *	[marginBottom]: optional lineheight for the form group to set it to 0 removes vertical margin and make the form look more compact
 *	[paddingBottom]: optional lineheight for the form group to set it to 0 removes vertical margin and make the form look more compact
	[imgappend]: optional JSON-Object [{imgsrc,onhoverin,onhoverout,onclick}] with an imgsrc of an image that is appended at the end of input with a function that is called on hover or click
 **/


function createInputText(settings)
{
	var mContainer;
	var mLabel;
	var mInput;
	var mHint;
	var mImgAppend;//may be undefined
	
	inflate();
	setupCSS();

	function inflate()
	{
		mContainer=$("<div/>").attr("id",settings.id);
		mLabel=$("<label/>").text(settings.labelText).attr("for",settings.id+"-input");
		var inputgroup=$("<div/>").addClass("input-group");//to prepend buttons / images after the input-field
		mInput=$("<input/>").attr("id",settings.id+"-input").attr("placeholder",settings.inputPlaceholder).attr("type",settings.inputType);
		inputgroup.append(mInput);
		if (settings.imgappend)
		{
			//console.log("imgappend for "+settings.id);
			var inputgroupAppend=$("<div/>").addClass("input-group-append");		
			mImgAppend=$("<img/>").attr("src",settings.imgappend.imgsrc);
			inputgroup.append(inputgroupAppend);
			inputgroupAppend.append(mImgAppend);
			mImgAppend.on("click",settings.imgappend.onclick);
		}
		
		if (settings.onKeypress!=undefined)
		{
			mInput.on("keypress",settings.onKeypress);
			if (settings.inputType=="date")
			{			
				mInput.on("change",settings.onKeypress);//add onChange Event as mouseclicked date does not trigger a keypress				
			}
		}
		
		mHint=$("<small/>").text(settings.hintText);
		
		mContainer.append(mLabel);
		mContainer.append(inputgroup);
			
				
		mContainer.append(mHint);
		settings.parent.append(mContainer);
		//mInput.val("02134567@");		
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
		mInput.addClass("form-control");
		//mInput.css("font-size","0.8rem");//to be as high as the dropdown text
		//mInput.css("line-height","1em");//make as high as the dropdown-buttons
		mHint.addClass("form-text text-muted");
		if (settings.imgappend)
		{
			mImgAppend.css("margin-left","5px");
			mImgAppend.css("cursor","pointer");
			mImgAppend.hover(function(){mImgAppend.css("opacity","0.5");settings.imgappend.onhoverin();},function(){mImgAppend.css("opacity","1.0");settings.imgappend.onhoverout();});
		}
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
		return mInput.val(aValue);
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
	
	function show()
	{
		mContainer.show("slow");
		//mContainer.css("display","block");
	}
	
	function setInputType(aType)
	{
		mInput.attr("type",aType);
	}
	
	
	function setDisabled(aIsDisabled)
	{
		if (aIsDisabled)
		{
			mInput.attr("disabled",true);
		}else
		{
			mInput.removeAttr("disabled");
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
		"setInputType":setInputType,
		"setDisabled":setDisabled
	};
}
