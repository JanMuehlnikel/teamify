/* closure to 
manage a collapsible diaoge



settings must contains	
	parent: a jQuery-Div
	label: is shown on top to describe the content of the dialoge
	id: id of the collapser, is used for javascript collapsing
	text: the text inside the collapser
	[marginBottom]: css property
	requires
		
*/
function createCollapser(settings)
{
	var mContainer;
	var mLabel;
	
	var iconClosed=" \u21a6";
	var iconOpened=" \u21a7";
	
	var mBodyCollapsable;
	var mCard;
	var mIsFolded;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		// iconClosed=" \u21a6";
		// iconOpened=" \u21a7";
		mContainer=$("<div/>").addClass("collapser-container");
		settings.parent.append(mContainer);
		mLabel=$("<label/>").text(settings.label+iconOpened).attr("data-bs-toggle","collapse").attr("data-bs-target","#"+settings.id);
		mIsFolded=true;
		mContainer.append(mLabel);
		
		mBodyCollapsable=$("<div/>").addClass("collapse show").attr("id",settings.id);
		mContainer.append(mBodyCollapsable);
		
		mCard=$("<div/>").addClass("card card-body").text(settings.text);
		mBodyCollapsable.append(mCard);		
	}
	
	function setup()
	{
		mBodyCollapsable.on("show.bs.collapse",function(){updateLabel(false);});
		mBodyCollapsable.on("hide.bs.collapse",function(){updateLabel(true);});
	}
	
	
	function setupCSS()
	{
		mLabel.css("cursor","pointer");
		mLabel.addClass("text-muted");
		if (settings.marginBottom)
		{
			mContainer.css("margin-bottom",settings.marginBottom);//former 2em
		}
		
		//mCard.css("background-color","#eeeeee");
	}
	
	function updateLabel(aShown)
	{
		mIsFolded=aShown;
		if (aShown)
		{
			mLabel.text(settings.label+iconClosed);
			
		}else
		{
			mLabel.text(settings.label+iconOpened);
		}	
		
		
	}
	
	
	
	
	function unfold()
	{
		mBodyCollapsable.collapse("show");
		updateLabel(false);
	}
	
	function fold()
	{
		mBodyCollapsable.collapse("hide");
		updateLabel(true);
	}
	
	function getBody()
	{
		return mCard;
	}
	
	function setCSSContainer(aParam,aValue)
	{
		mContainer.css(aParam,aValue);
	}
	
	function addClassContainer(aClass)
	{
		mContainer.addClass(aClass);
	}
	
	function setLabel(aLabel)
	{
		settings.label=aLabel;
		updateLabel(mIsFolded);
	}
	
	return{
		"unfold":unfold,
		"fold":fold,
		"getBody":getBody,
		"setCSSContainer":setCSSContainer,
		"addClassContainer":addClassContainer,
		"setLabel":setLabel
	}
}
