/*closure wraps a media card


settings must contains
	parent
	title
	text
	url for the image
	requires


*/
function createMediaCard(settings)
{
	var mContainer;
	var mImageWrappper;
	var mImage;
	var mBody;
	var mTitle;
	var mText;
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("media-card-container");
		settings.parent.append(mContainer);
		mImageWrappper=$("<div/>");
		mContainer.append(mImageWrappper);
		
		mImage=$("<img/>").attr("src",settings.url);
		mImageWrappper.append(mImage);
		mBody=$("<div/>");
		mContainer.append(mBody);
		
		mTitle=$("<h4/>").text(settings.title);
		mBody.append(mTitle);
		mText=$("<p/>").text(settings.text);
		mBody.append(mText);
	}
	
	function setupCSS()
	{
		mContainer.addClass("d-flex");
		mImageWrappper.addClass("flex-shrink-0");		
		mBody.addClass("flex-grow-1 ms-3");
		mTitle.addClass("sublines text-secondary");
		mText.addClass("text");//euronics style
		mImage.css("width","100px");
		
	}
}