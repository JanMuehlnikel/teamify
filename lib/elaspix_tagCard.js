/*closure for a card with tags
	settings contains	
		parent
		title
		description
		imageURL
		[tags]: an Array of strings
		
		
		
		
*/
function createTagCard(settings)
{
	var mContainer;
	var mCard;
	var mBody;
	var mFooter;
	
	
	inflate();
	setup();
	setupCSS();
	function inflate()
	{
		mContainer=$("<div/>").addClass("col");
		settings.parent.append(mContainer);	
		mCard=$("<div/>").addClass("card h-100");		
		mContainer.append(mCard);
		
		
		
		
		var img=$("<img/>").addClass("card-img-top").attr("src",settings.imageURL);
		mCard.append(img);
		mBody=$("<div/>").addClass("card-body");
		
		var h5=$("<h3/>").addClass("card-title").text(settings.title);
		mBody.append(h5);
		
		
		
		var p=$("<p/>").addClass("card-text").text(settings.description);
		mBody.append(p);
		
		
		
		
		
		
			
		
		var tagsPricing=$("<div/>").addClass("row row-cols-2 g-1 mt-2");
		mBody.append(tagsPricing);
		
		var tags=$("<div/>").addClass("col-7");
		
		if (settings.tags)inflateTags(settings.tags,tags);		
		
		tagsPricing.append(tags);		
		
		mCard.append(mBody);
		
		mFooter=$("<div/>").addClass("card-footer text-end");		
		
		
		
	}
	
	function inflateTags(aTags,aParent)
	{
		
		$.each(aTags,function(index,tagName){
			var tag=$("<span/>").addClass("badge rounded-pill me-1");
			//tag.css("background-color","#a53500");
			tag.addClass("bg-secondary");
			
			tag.text(tagName.trim());
			aParent.append(tag);
		});
	}
	
	function setup()
	{
		
	}
	
	function setupCSS()
	{
		mCard.css("overflow","hidden");
	}
	
	function hide()
	{
		mContainer.hide();
	}
	
	function show()
	{
		mContainer.show();
	}
	
	return{		
		"hide":hide,
		"show":show		
	}
}

			  