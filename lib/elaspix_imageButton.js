/* closure to hold a button with image and Text

settings must contain
	parent
	[width]: width of image
	imageURL: url of image
	value:value of button
	[label]: label text of button
	[onClick]
*/
function createImageButton(settings)
{
	console.log("here");
	var mContainer;
	var mButton;
	var mImage;
	var mLabel;
	var mIsActive;
	
	inflate();
	setup();
	setupCSS();

	function inflate()
	{
		mContainer=$("<div/>").addClass("image-btn-container");
		settings.parent.append(mContainer);			
			
		mButton=$("<button/>").addClass("btn");
		mContainer.append(mButton);
		mImage=$("<img/>").attr("src",settings.imageURL);
		mButton.append(mImage);
		mLabel=$("<div/>").text("");
		
		if(settings.label)
		{
			mLabel.text(settings.label);
		}
		mButton.append(mLabel);
	}
	
	function setup()
	{
			
		mIsActive=false;
			
		mButton.on("click",onClick);
		
	}
	
	function setupCSS()
	{
		if(settings.width)
		{
			mImage.css("width", settings.width);
		}
		
		mButton.css("opacity",0.3);
		mLabel.addClass("mt-2");
	}
	
	function onClick()
	{
		mIsActive=!mIsActive;
		if(settings.onClick)
		{
			settings.onClick(settings.value, mLabel.text());
		}
		
		if(mIsActive)
		{
			mButton.css("opacity",1);
			
		} else{
			mButton.css("opacity",0.4);
		}
	}
	
	function isActive()
	{
		return mIsActive;
	}
	
	return {
		"isActive":isActive
	}
}