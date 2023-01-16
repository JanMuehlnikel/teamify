/* closure to hold a button with image and Text aka swatch, providing close button

settings must contain
	parent
	[width]
	imageURL
	[label]
	[onClick]
	[margin] //the button margin
	[padding] //the button padding
	stateful //if true the button has two states active and not active
	[onDragStart] //if provied, calls this method ewn drag stars
	[onClose] //if provided call this method if the close-button was pressed
	[onKebabClick] //if defined, passes label and a kebab Icon is visble in active mode, otherwise hidden (for design-consistency it is not displayed-none)
	[maxTextLength] if set to a number, the text is truncated after the number to keep the layout
	
*/

function createImageTextButton(settings)
{
	var mContainer;//to hold button and kebab menu
	var mButton;
	var mImage;
	var mText;
	var mCloseButton;
	var mKebabDiv;
	var mKebabIcon;
	
	var mIsActive;
	
	inflate();
	setupCSS();
	setup();
	
	
	function inflate()
	{
		
		mContainer=$("<div/>").addClass("imageTextButton-swatch-container");
		settings.parent.append(mContainer);
		
		mKebabDiv=$("<div/>").addClass("kebab-div");
		mContainer.append(mKebabDiv);
		mKebabIcon=$("<img/>").addClass("").attr("src","pics/three-dots.svg");
		mKebabDiv.append(mKebabIcon);
		
		mIsActive=false;
		mButton=$("<button/>").addClass("btn");
		mContainer.append(mButton);
		mImage=$("<img/>").attr("src",settings.imageURL);
		mButton.append(mImage);
		
		mText=$("<div/>").text("");
		if (settings.label)
		{
			var label=settings.label;
			if (settings.maxTextLength)label=label.slice(0,settings.maxTextLength);
			mText.text(label);
			mButton.attr("data-label",settings.label);//is read in onDragStart
		}
		mButton.append(mText);
		
		if (settings.onClose)
		{
			mCloseButton=$("<span/>").addClass("btn-close").attr("type","button").attr("aria-label","Close");
			mCloseButton.on("click",onCloseButtonClick);
			mCloseButton.hide();
			mButton.append(mCloseButton);
			
		}
	
		
	}
	
	function setup()
	{
		mButton.on("click",onClick);
		
		// if (settings.stateful)
		// {
			// setActive(false);
		// }else
		// {
			// setActive(true);
		// }
		if (settings.onDragStart)
		{
			mButton.on("dragstart",function(event){settings.onDragStart(event,settings.label);
			console.log("ondragstart");
			setActive(!mIsActive);
			});
		}else
		{
			mButton.on("dragstart",function(){return false});
		}
		
		if (settings.onKebabClick)
		{
			mKebabIcon.on("click",onKebabClick);
		}
		
	}
	
	
	
	function setupCSS()
	{
		mButton.css("position","relative");
		mButton.addClass("rounded-0");//Brasilheroe-Design
		if (settings.margin)
		{
			mButton.css("margin",settings.margin);
		}
		
		if (settings.padding)mButton.css("padding",settings.padding);
			
		
		if (settings.width)
		{
			mImage.css("width",settings.width);
		}
		
		if (mCloseButton)
		{
			mCloseButton.css("position","absolute");
			mCloseButton.css("right","0px");
			mCloseButton.css("top","0px");			
		}
		
		
		
		
		mKebabIcon.css("display","block");
		mKebabIcon.css("visibility","hidden");//hidden by default
		//var marginLeftPx=70;
		//if (settings.width)marginLeftPx=parseInt(settings.width);
		//mKebabIcon.css("margin-left",marginLeftPx+"px");
		
		
		mKebabIcon.css("width","26px");
		mKebabIcon.css("padding","3px");
		mKebabIcon.css("margin-bottom","4px");
		mKebabIcon.css("user-select","none");
		mKebabIcon.css("margin-right","3px");
		mKebabIcon.addClass("float-end");
		
		if (settings.onKebabClick)
		{
			mKebabIcon.css("cursor","pointer");
		}
		
		
	}
	
	function onClick()
	{
		if (settings.stateful)
		{
			//switch active-nonactive
			//bubble up if beeing active
			setActive(!mIsActive);
			if (mIsActive)
			{
				if (settings.onClick)
				{
					if (settings.label)
					{
						settings.onClick(settings.label);
					}else
					{
						settings.onClick();
					}
				}
			}
		}else
		{
			if (settings.onClick)
			{
				if (settings.label)
				{
					settings.onClick(settings.label);
				}else
				{
					settings.onClick();
				}
			}
		}
	}
	
	function onKebabClick()
	{
		if (settings.onKebabClick)
		{
			settings.onKebabClick(settings.label);
		}
	}
	
	function onCloseButtonClick()
	{
		
		if (settings.onClose)
		{
			settings.onClose(settings.label);
		}
		remove();
		
	}
	
	function setActive(aIsActive)
	{
		// console.log("set Active",settings.label,aIsActive);
		if (aIsActive)
		{
			mIsActive=true;			
			mText.css("opacity","1.0");
			mButton.css("border","1px solid");
			mButton.addClass("border-primary");
			
			if (settings.onKebabClick)
			{
				mKebabIcon.css("visibility","visible");
			}
			
			if (settings.onClose)
			{
				mCloseButton.show();
			}
		}else
		{
			mIsActive=false;			
			mText.css("opacity","0.7");
			mButton.removeClass("border-primary");
			mButton.css("border","1px solid transparent");
			mKebabIcon.css("visibility","hidden");//always invisible in off-state
			if (settings.onClose)
			{
				mCloseButton.hide();
			}
		}
	}
	
	function setImageURL(aURL)
	{
		mImage.attr("src",aURL);
	}
	
	function remove()
	{
		mContainer.hide("slow",function(){mContainer.remove();});
	}
	
	function toggle()
	{
		setActive(!mIsActive);
	}
	
	function isActive()
	{
		return mIsActive;
	}
	
	function show(aSpeed)
	{
		mContainer.show(aSpeed);
	}
	
	function hide(aSpeed)
	{
		mContainer.hide(aSpeed);
	}
	
	
	return {
		"setActive":setActive,
		"setImageURL":setImageURL,
		"remove":remove,
		"toggle":toggle,
		"isActive":isActive,
		"show":show,
		"hide":hide
		}
}
