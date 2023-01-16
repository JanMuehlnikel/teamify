/*
 *
 *closure to choose among color cards, which span along the whole full width other than colorCards
 *settings must contain
 *	parent: JQueryObject
 *	RALCodes: a JSON Array with RAL-Colors, RAL-Code-JSON can have showname to overwrite RAL-Code	
	height_card: css property
	height_container:css property
	label: aTitle
	startIndex: the colorCard with that index is selected at start
 *	[onChange]: method to be called when color is changed
	[onExpand]: the user has expanded the colorCards, notify the other colorWheel/colorCardsComponent
	[useShowNames]: if true, uses showname[s] attached to RAL-Colors
 *
 */
function createColorCardsFull(settings)
{
	var mContainer;
	var mContainerColorCards;
	
	var mLabel;
	var mCards=[]; //JSONObjects with attribute div and name (both divs)
	var mMapDescription2Index={};
	var mActiveIndex=settings.startIndex;
	var mIsCollapsed=false;
	
	
	var mNumberColors=settings.RALCodes.length;
	
	var mTouchGesture={"isTouchMovement":false,"startX":0,"startIndex":0,"containerWidth":300,"lastIndex":0,
	"cssStripeOneTouchIndex":0, //sets the index of a single CSS-Stripe in case the user only wants a single click (which on mobile is not descriminate from start of slide)
	"wasTouchMoveAfterTouchStart":false, //store whether the touchMovement was entered, afer a touchStart was triggered (if not handle the touchStart as a tap)
	"cardWidthPx":0
	};
	
	
	inflate();	
	setupCSS();
	setup();//must come after SetupCSS as it requires container-height to be set
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("colorcardsFull-container mb-2");
		settings.parent.append(mContainer);
		
		
		mLabel=$("<div/>").text(settings.label);
		mContainer.append(mLabel);
		
		
		mContainerColorCards=$("<div/>").addClass("colorcards-container");
		mContainer.append(mContainerColorCards);
		
		var numberColors=settings.RALCodes.length;
		
		
		
		
		
		for (var i=0;i<numberColors;i++)
		{
			var RALCode=settings.RALCodes[i];
			
			var brightness=(RALCode.r+RALCode.g+RALCode.b)/3;
			//console.log("brightness",brightness);
			//var name="RAL "+RALCode.code+" "+RALCode.name;
			//var name=RALCode.name+" "+RALCode.code;
			var name="RAL "+RALCode.code+" "+RALCode.name;			
			var card=createCard(RALCode.hex,name,brightness,i,RALCode.showname);
			mCards.push(card);
			mMapDescription2Index[name]=mCards.length-1;
			
		}
		
		
		
		
	}
	
	function setup()
	{
		
		selectValue(mCards[settings.startIndex].description);
	}
	
	
	
	
	
	function setupCSS()
	{
		mContainer.css("width","100%");
		mContainer.css("user-select","none");
		
		
		mContainerColorCards.css("height",settings.height_container);
		mContainerColorCards.css("transition","height 500ms");
		mContainerColorCards.css("overflow-y","auto");		
		mContainerColorCards.css("scrollbar-width","5%");
		mContainerColorCards.css("position","relative");//make it a "positioned" element such that .offset returns the distance to this parent
		
		
		mLabel.css("font-size", "20px");
		//mLabel.css("color", "#ff8500");
		//mLabel.css("letter-spacing", "0.1em");
		
		
	}
	
	
	
	
	
	//left,top,width are css values, aHeightPercent is int in percent
	function createCard(aColorHex,aName,aBrightness,index,aShowName)
	{
			var card=$("<div/>").addClass("colorcard-card");
			mContainerColorCards.append(card);			
			card.css("width","100%");
			card.css("height",settings.height_card);
			card.css("background-color",aColorHex);
			card.css("cursor","pointer");
			card.css("border","1px solid");
			card.css("border-color",aColorHex);
			card.css("transition","padding-left 500ms");
			
			if (settings.useShowNames && aShowName)aName=aShowName;
			var name=$("<span/>").addClass("colorcard-name").text(aName);
			name.css("opacity","0.5");
			var textColor="gray";
			card.append(name);
			if (aBrightness>160){
				name.css("color","gray");
			}else
			{
				name.css("color","white");
				textColor="white";
			}
			//name.hide();
			//name.css("position","relative");
			//name.css("top")
			
			card.on("click",function(){onCardClick(index)});
			card.on("dblclick",onDblClick);
			return {"div":card,"name":name,"description":aName,"colorHex":aColorHex,"textColor":textColor};
	}
	
	function onCardClick(aIndex)
	{
		//console.log("click on a card "+aIndex);
		expand();//incase of collapse-view show more cards
		
		var lastIndex=mActiveIndex;
		mActiveIndex=aIndex;
		
		if (aIndex!=lastIndex && settings.onChange!=undefined)
		{
			settings.onChange(true,settings.label);
		}
		
		setHighlightCard(lastIndex,false);		
		setHighlightCard(mActiveIndex,true);	
		//scrollToActiveCard();
	}
	
	function onDblClick()
	{
		collapse();
	}
	
	function setHighlightCard(aIndex,aIsSetToBeOn)
	{
		var card=mCards[aIndex];
		if (card!=undefined)
		{
			if (aIsSetToBeOn)
			{
				
				card.div.css("border-color",card.textColor);
				card.name.css("font-weight","700");
				card.name.css("opacity","1.0");
				card.div.css("padding-left","5%");
				
			}else
			{
				card.div.css("border-color",card.colorHex);
				card.name.css("font-weight","300");
				card.name.css("opacity","0.5");
				card.div.css("padding-left","0px");
			}
			
		}else
		{
			console.log("cannot find a card with Index",aIndex);
		}
			
		
	}
	
	
	function selectValue(aRALCodeStr)
	{
		
		var indexNew=-1;
		$.each(settings.RALCodes, function(index, ral){
			if(aRALCodeStr.includes(ral.code))
			{
				indexNew=index;
			}
			
			if (ral.hasOwnProperty("showname") && ral.showname==aRALCodeStr)
			{
				indexNew=index;
			}
			
		});
		
		if (indexNew>=0)
		{
			if (mActiveIndex!=undefined)setHighlightCard(mActiveIndex,false);//do not highlight if no ActiveIndex is known
			mActiveIndex=indexNew;
			setHighlightCard(mActiveIndex,true);
			scrollToActiveCard();
			
		}else
		{
			console.log("could not find color for this RALCodeStr",aRALCodeStr);
		}
	}
	
	function scrollToActiveCard()
	{
		//mCards[mActiveIndex].div[0].scrollIntoView({"behavior":"smooth"});
		//var heightCard=mCards[0].div.height();
		//var scrollPosY=heightCard*mActiveIndex;
		var posYActiveCard=mCards[mActiveIndex].div.position().top;
		//console.log("scrollPosY",scrollPosY,"posYActiveCard",posYActiveCard);
		mContainerColorCards[0].scrollBy(0,posYActiveCard);
	}
	
	
	function getRGBHex()
	{
		return mCards[mActiveIndex].colorHex;
	}
	
	function getDescription()
	{
		return mCards[mActiveIndex].description;
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
	
	//shows a collapsed view
	function collapse()
	{
		mContainerColorCards.css("height","2em");
		scrollToActiveCard();
		setTimeout(function(){scrollToActiveCard();},500);//make sure the the container is closed when scrollToActiveCard is called
		mIsCollapsed=true;
	}
	
	//show an expanded view
	function expand()
	{
		mContainerColorCards.css("height",settings.height_container);
		if (mIsCollapsed==true && settings.onExpand!=undefined)
		{
			settings.onExpand(settings.label);
		}
		mIsCollapsed=false;
		
	}
	
	function getLabel()
	{
		return settings.label;
	}
	
	function scrollTo(aValue)
	{
		mContainerColorCards[0].scrollTo(0,aValue);
	}
	
	return {	
		"selectValue":selectValue,		
		"getRGBHex":getRGBHex,
		"getDescription":getDescription,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"collapse":collapse,
		"expand":expand,
		"getLabel":getLabel,
		"scrollToActiveCard":scrollToActiveCard,
		"scrollTo":scrollTo
		
		};
	
}


