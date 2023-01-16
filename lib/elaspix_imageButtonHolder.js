/* closure to hold multiple image buttons


settings must contain
	parent
	singleActive if true only one button is active
	width of each single imageButton
	[onClick]
	[onDragStart] if provided, the items can be draggeds
	[onClose] if provided, swatches can be removed
	[onKebabClick] if provided swatches have a kebab menu
	[maxTextLength] if set to a number, the text is truncated after the number to keep the layout
	[padding] //paddings of imageButtons
	[margin] //margins of imageButtons
	[marginBottom] 
	[addPrepend] if true, images are added in front not at the end
*/

function createImageButtonHolder(settings)
{
	var mContainer;
	
	var mImageButtons={};//map from label to imageButtons, label of added Buttons must be unique
	var mActiveLabel;
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mActiveLabel=undefined;
		mContainer=$("<div/>").addClass("imagebuttonHolder-container");
		settings.parent.append(mContainer);
	}
	
	function setupCSS()
	{
		mContainer.addClass("d-flex");
		if (settings.addPrepend)
		{
			mContainer.addClass("flex-wrap-reverse");
		}else
		{
			mContainer.addClass("flex-wrap");
		}
		mContainer.css("width","100%");
		mContainer.css("flex-wrap","wrap");
		
		if (settings.marginBottom)mContainer.css("margin-bottom",settings.marginBottom);
			
	}
	
	//[aRemovable] is optional, if provided "true" it will add a close button
	function addImageButton(aLabel,aImageURL,aInfo,aRemovable)
	{
		if (mImageButtons.hasOwnProperty(aLabel))return undefined;//swatch names must be unique
		
		
		var onCloseFct=settings.onClose;
		if (!aRemovable)onCloseFct=undefined;//overwrites eventually existent default removeable functionality
		
		var imageButton=createImageTextButton({
				"parent":mContainer,
				"label":aLabel,
				"imageURL":aImageURL,
				"onClick":onClick,
				//"margin":"5px",
				"margin":settings.margin,
				"padding":settings.padding,
				"width":settings.width,
				"stateful":settings.singleActive,
				"onDragStart":onDragStart,//may be undefined
				"onClose":onCloseFct, //may be undefined
				"onKebabClick":settings.onKebabClick,
				"maxTextLength":settings.maxTextLength //may be undefined
			});

		mImageButtons[aLabel]={"button":imageButton,"info":aInfo};
		imageButton.hide();
		// if (settings.addPrepend)
		// {
			// mContainer.prepend(imageButton);
		// }else
		// {
			mContainer.append(imageButton);
			imageButton.show("slow");
		//}
		
		return imageButton;
	}
	
	function onClick(aLabel)//those how fires has itself set in active mode
	{
		mActiveLabel=aLabel;
		
		if (mImageButtons.hasOwnProperty(aLabel))
		{
			
			if (settings.singleActive==true)
			{
				$.each(mImageButtons,function(label,imageButton){
					if (aLabel!=label)imageButton.button.setActive(false);
				});
			}
			
			var imageButton=mImageButtons[aLabel];
			if (settings.onClick)
			{
				settings.onClick(aLabel,imageButton.info);
			}
		}
		
		
	}
	
	function onDragStart(event, aLabel)
	{
		console.log("drag");
		mActiveLabel=aLabel;
		
		if (mImageButtons.hasOwnProperty(aLabel))
		{
			
			if (settings.singleActive==true)
			{
				$.each(mImageButtons,function(label,imageButton){
					if (aLabel!=label)imageButton.button.setActive(false);
				});
			}
			
			var imageButton=mImageButtons[aLabel];
			if (settings.onDragStart)
			{
				settings.onDragStart(event, aLabel);
			}
		}
		
	}
	
	function setImageURL(aLabel,aURL)
	{
		if (mImageButtons.hasOwnProperty(aLabel))
		{
			mImageButtons[aLabel].button.setImageURL(aURL);
		}
	}
	
	function setActive(aLabel)
	{
		if ( mImageButtons.hasOwnProperty(aLabel))
		{
			if (settings.singleActive)
			{//deactivate all others
				deactivateAll();
			}			
			mImageButtons[aLabel].button.setActive(true);
			mActiveLabel=aLabel;
		}
	}
	
	//deselects all 
	function deactivateAll()
	{
			$.each(mImageButtons,function(label,imageButton){
					imageButton.button.setActive(false);
				});
	}
	
	function toggle(aLabel)
	{
		if ( mImageButtons.hasOwnProperty(aLabel))
		{
			mImageButtons[aLabel].button.toggle();
		}
	}
	
	function getConfig()
	{
		return mActiveLabel;
	}
	
	function removeImageButton(aLabel)
	{
		if (mImageButtons.hasOwnProperty(aLabel))
		{
			mImageButtons[aLabel].button.remove();
			delete mImageButtons[aLabel];
		}
	}
	
	//removes all imageButtons
	function clear()
	{
		$.each(mImageButtons,function(key,imageButtonJSON){
			removeImageButton(key);
		});
	}
	
	//returns a list of all active buttons
	function getActive()
	{
		var activeButtons=[];
		$.each(mImageButtons,function(label,imageButtonJSON){			
			if (imageButtonJSON.button.isActive())
			{
				activeButtons.push(label);
			}
		});
		return activeButtons;
		
	}
	
	return {
		"addImageButton":addImageButton,
		"getConfig":getConfig,
		"setImageURL":setImageURL,
		"setActive":setActive,
		"removeImageButton":removeImageButton,
		"clear":clear,
		"deactivateAll":deactivateAll,
		"toggle":toggle,
		"getActive":getActive
	}
}
