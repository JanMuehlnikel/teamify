/*
 *
 *closure to choose among color cards, tailored for mobile use only
 *settings must contain
 *	parent: JQueryObject
 *	RALCodes: a JSON Array with RAL-Colors  *	
	height_vh: height in vh
	label: aTitle
 *	[onChange]: method to be called when color is changed
 *
 */
function createColorCards(settings)
{
	var mContainer;
	
	var mLabel;
	var mCards=[]; //JSONObjects with attribute div and name (both divs)
	var mMapDescription2Index={};
	var mActiveIndex=settings.startIndex;
	var mCardWidthPc//cardWidth in % of evenly placed cards
	
	var mNumberColors=settings.RALCodes.length;
	
	var mTouchGesture={"isTouchMovement":false,"startX":0,"startIndex":0,"containerWidth":300,"lastIndex":0,
	"cssStripeOneTouchIndex":0, //sets the index of an signgle CSSStripe in case the user only wants a single click (which on mobile is not descriminate from start of slide)
	"wasTouchMoveAfterTouchStart":false, //store whether the touchMovement was entered, afer a touchStart was triggered (if not handle the touchStart as a tap)
	"cardWidthPx":0
	};
	
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("colorcard-container mb-2");
		settings.parent.append(mContainer);
		
		
		mLabel=$("<div/>").text(settings.label);
		mContainer.append(mLabel);
		
		var numberColors=settings.RALCodes.length;
		mCardWidthPc=100/numberColors;
		
		
		
		var posX=0;		
		for (var i=0;i<numberColors;i++)
		{
			var RALCode=settings.RALCodes[i];
			
			var brightness=(RALCode.r+RALCode.g+RALCode.b)/3;
			//console.log("brightness",brightness);
			//var name="RAL "+RALCode.code+" "+RALCode.name;
			//var name=RALCode.name+" "+RALCode.code;
			var name=RALCode.name+" RAL "+RALCode.code;
			
			var card=createCard(posX,mCardWidthPc,RALCode.hex,name,brightness,i);
			mCards.push(card);
			mMapDescription2Index[name]=mCards.length-1;
			posX=posX+mCardWidthPc;
		}
		
		//console.log("cards",mCards);
		updateCardPos(mActiveIndex,false);
		
		
		// for (var i=0;i<mNumberColors;i++)
		// {			
			// {
				// var strip=$("<div/>");
				// var rot=i*mDRot;
				
				// var RALCode=settings.RALCodes[i];
				// setupCSSStrip(strip,"45%","0%","10%",52,RALCode.hex,i);
				
				// mFanContainer.append(strip);
				// mStrips.push({"div":strip,"rot":rot,"RALCode":RALCode});
				
			// }
			
		// }
		
		
	}
	
	function setup()
	{
		mContainer.on("mousemove",onMouseMove);
		mContainer.on("mousedown",onMouseDown);
		mContainer.on("mouseup mouseleave",onMouseUp);
		
		mContainer.on("touchstart",onTouchStart);
		mContainer.on("touchend",onTouchEnd);
		mContainer.on("touchmove",onTouchMove);
	}
	
	function onMouseMove(event)
	{
		var sensitivity=1;//1 is default
			if (mTouchGesture.isTouchMovement)
			{
				var dx=event.clientX-mTouchGesture.startX;
				var numberColorsSwiped=(dx/mTouchGesture.cardWidthPx)/sensitivity;
				
				var newActiveIndex=Math.round(mTouchGesture.startIndex+numberColorsSwiped);
				
				if (newActiveIndex>=mCards.length)newActiveIndex=mCards.length-1;
				if (newActiveIndex<0)newActiveIndex=0;
				//console.log("dx",dx,"numberColorsSwiped",numberColorsSwiped,"newActiveIndex",newActiveIndex);
				updateCardPos(newActiveIndex,true);
			}
	}
	
	function onTouchMove(event)
	{
		
		var sensitivity=10;//1 is default
			if (mTouchGesture.isTouchMovement)
			{
				var dx=event.touches[0].clientX-mTouchGesture.startX;
				var numberColorsSwiped=(dx/mTouchGesture.cardWidthPx)/sensitivity;
				
				var newActiveIndex=Math.round(mTouchGesture.startIndex+numberColorsSwiped);
				
				if (newActiveIndex>=mCards.length)newActiveIndex=mCards.length-1;
				if (newActiveIndex<0)newActiveIndex=0;
				//console.log("dx",dx,"numberColorsSwiped",numberColorsSwiped,"newActiveIndex",newActiveIndex);
				updateCardPos(newActiveIndex,true);
				//log("onTouchMove "+dx+" "+numberColorsSwiped+" "+newActiveIndex);
			}
	}
	
	
	
	function onMouseDown(event)
	{
		
		 mTouchGesture.isTouchMovement=true;
		 
		 mTouchGesture.startX=event.clientX;
		 mTouchGesture.containerWidth=mContainer.width();
		 mTouchGesture.cardWidthPx=(mCardWidthPc/100)*mTouchGesture.containerWidth; 
		 
		var newActiveIndex=Math.round(event.clientX/mTouchGesture.cardWidthPx);//on which Card has the user clicked (has some vagueness, as the width of the active card is not considered)
		if (newActiveIndex>mCards.length)newActiveIndex=mCards.length-1;
		if (newActiveIndex<0)newActiveIndex=0;
		mTouchGesture.startIndex=newActiveIndex;
		 
		 //console.log("cardWidthPx",mTouchGesture.cardWidthPx,"newActiveCard",newActiveIndex);
		
	}
	
	function onTouchStart(event)
	{
		//log("onTouchStart");
		 mTouchGesture.isTouchMovement=true;
		 
		 mTouchGesture.startX=event.touches[0].clientX;
		 mTouchGesture.containerWidth=mContainer.width();
		 mTouchGesture.cardWidthPx=(mCardWidthPc/100)*mTouchGesture.containerWidth; 
		 
		//var newActiveIndex=Math.round(event.touches[0].clientX/mTouchGesture.cardWidthPx);//on which Card has the user clicked (has some vagueness, as the width of the active card is not considered)
		//if (newActiveIndex>mCards.length)newActiveIndex=mCards.length-1;
		//if (newActiveIndex<0)newActiveIndex=0;
		//mTouchGesture.startIndex=newActiveIndex;
		mTouchGesture.startIndex=mActiveIndex;
		
		//log(mTouchGesture.startX+" "+mTouchGesture.cardWidthPx);
	}
	
	function onMouseUp(event)
	{
		 mTouchGesture.isTouchMovement=false;
	}
	
	function onTouchEnd(even)
	{
		//log("onTouchEnd");
		 mTouchGesture.isTouchMovement=false;
	}
	
	function updateCardPos(aSelectedIndex,aReport)
	{
		if (aReport && mActiveIndex!=aSelectedIndex)
		{
			if (settings.onChange!=undefined)
			{
				settings.onChange(mCards[aSelectedIndex].description);
			}
		}
		
		mActiveIndex=aSelectedIndex;
		var numberColors=settings.RALCodes.length;
		var cardWidth=80/numberColors;
		
		var selectedCardNr=aSelectedIndex;//has width 10%
		
		var posX=0;
		
		for (var i=0;i<mCards.length;i++)
		{			
			var width=cardWidth;
			if (i==selectedCardNr)
			{
				width=20;//20% for the selected card
			}
			
			placeCard(mCards[i].div,posX,width);
			if (i==mActiveIndex)
			{
				mCards[i].name.show();
			}else
			{
				mCards[i].name.hide();
			}
			
			
			posX=posX+width;
		}
	}
	
	
	
	function setupCSS()
	{
		mContainer.css("width","100%");
		mContainer.css("position","relative");
		mContainer.css("height",settings.height_vh+"vh");
		mContainer.css("overflow","hidden");
		mContainer.css("font-size","100%");
		mContainer.css("user-select","none");
		mContainer.css("cursor","pointer");
		
		mLabel.css("font-size", "23px");
		mLabel.css("color", "#ff8500");
		mLabel.css("letter-spacing", "0.1em");
		
		
	}
	
	
	
	
	
	//left,top,width are css values, aHeightPercent is int in percent
	function createCard(aPosXPc,aWidthPc,aColorHex,aName,aBrightness,index)
	{
			var card=$("<div/>").addClass("colorcard-card");
			mContainer.append(card);
			card.css("position","absolute");
			card.css("left",aPosXPc+"%");			
			card.css("width",aWidthPc+0.1+"%");//the additional 0.1 is to prevent white lines between cards
			card.css("height",settings.height_vh+"vh");//adapt to the height of the mobile device
			card.css("background-color",aColorHex);
			card.css("text-align","center");
			card.css("transition","left 0.1s, width 0.1s");
			//card.css("vertical-align","middle");
			//card.css("padding-top",settings.height_vh/2+"vh");
			
			var name=$("<span/>").addClass("colorcard-name").text(aName);
			card.append(name);
			if (aBrightness>128){
				name.css("color","black");
			}else
			{
				name.css("color","white");
			}
			name.hide();
			//name.css("position","relative");
			//name.css("top")
			
			card.on("click",function(){onCardClick(index)});
			
			return {"div":card,"name":name,"description":aName};
	}
	
	function onCardClick(aIndex)
	{
			updateCardPos(aIndex,true);
	}
	
	//left,top,width are css values, aHeightPercent is int in percent
	function placeCard(aCard,aPosXPc,aWidthPc)
	{			
			aCard.css("left",aPosXPc+"%");			
			aCard.css("width",aWidthPc+0.1+"%");//the additional 0.1 is to prevent white lines between cards
	}
	
	function selectValue(aValue){		
			
		var index=mMapDescription2Index[aValue];		
		updateCardPos(index,false);
	}
	
	
	
	
	function getRGBHex()
	{
		return "ffff00";//mStrips[mNorthIndex].RALCode.hex;
	}
	
	function getDescription()
	{
		return "the description";//mStrips[mNorthIndex].RALCode.name+" RAL "+mStrips[mNorthIndex].RALCode.code;
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
	
	return {	
		"selectValue":selectValue,		
		"getRGBHex":getRGBHex,
		"getDescription":getDescription,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show
		};
	
}


