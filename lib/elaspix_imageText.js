/*
closure to hold an image with a text underneath

settings must contain
	parent
	imageURL
	text
	height
	margin
	id: resource id for identifying
	onDelete: function to be called when the image is deleted
	[closeButtonVisible] if false close button is not shown
*/

function createImageText(settings)
{
	var mContainer;
	var mImage;
	var mText;
	var mDeleteButton;
	var mHeader;
	
	inflate()
	setup()
	setupCSS()
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("image-text-container");
		settings.parent.prepend(mContainer);
		
		//mDeleteButton=$("<img/>").attr("src","pics/x.svg");
		
		mHeader=$("<div/>").addClass("imageText-header");
		mContainer.append(mHeader);
		mText=$("<div/>").text(settings.text);
		mHeader.append(mText);
		
		mImage=$("<img/>").attr("src",settings.imageURL);
		mContainer.append(mImage);		
		
		mDeleteButton=$("<button/>").attr("type","button").addClass("btn-close").attr("aria-label","Close");
		mHeader.append(mDeleteButton);
		
		
		
		
	}
	
	function setup()
	{
		
		mDeleteButton.on("click",function(){settings.onDelete(settings.id, mContainer)});
		if (settings.closeButtonVisible!=undefined)
		{
			setCloseButtonVisible(settings.closeButtonVisible);
		}
		
		if (settings.id.startsWith("beispiel"))
		{
			setCloseButtonVisible(false);
		}
		
	}
	
	function setupCSS()
	{
		//mText.css("text-align","center");
		mImage.css("height",settings.height);
		mImage.addClass("card-img-bottom");

		mContainer.addClass("card");
		
		mContainer.css("padding",settings.padding);
		mContainer.css("margin",settings.margin);
		mContainer.css("width",settings.width)
		//mContainer.css("border","1px solid lightgray");
		//mContainer.css("position","relative");
		
		mHeader.css("position","relative");
		//mHeader.css("min-height","1.5em");//in case no text is given
		//mHeader.addClass("bg-light");
		mHeader.addClass("card-header");
		
		//mDeleteButton.css("z-index","100");
		mDeleteButton.css("position","absolute");
		mDeleteButton.css("top","8px");
		mDeleteButton.css("right","8px");
		//mDeleteButton.css("height","42px");
	}
	
	function getImage()
	{
		return mImage;
	}
	
	function getText()
	{
		return mText;
	}
	
	function getHeader()
	{
		return mHeader;
	}
	
	function setCloseButtonVisible(aIsVisible)
	{
		if (aIsVisible)mDeleteButton.show();else mDeleteButton.hide();
	}
	
	return{
		"getImage":getImage,
		"getText":getText,
		"getHeader":getHeader,
		"setCloseButtonVisible":setCloseButtonVisible
	}
}
