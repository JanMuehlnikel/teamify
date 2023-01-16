/*
 *
 *closure to oparate  a color fan
 *settings must contain
 *	parent: JQueryObject
 *	RALCodes: a JSON Array with RAL-Colors 
 *	spare: number of strip-positions spared adjacent to the north-strip
 *	width: css property,
 *	widthFan:css property [optional]
 *	label: a prefix to the colorcode
 *	startIndex: the index of the RALColor in RALCodes that is shown at the beginning
 *	[onChange]: method to be called when color is changed
 *
 */
function createColorfan(settings)
{
	var mContainer;
	var mFanOuterContainer;
	var mFanContainer;
	var mCodeContainer;
	var mCode;
	var mLabelSpan;
	var mRalSpan;
	
	var mStrips=[];
	
	
	var mDRot;//the rotational distance betweeen stripes
	var mNumberColors=settings.RALCodes.length;
	
	var mTouchGesture={"isTouchMovement":false,"startX":0,"startIndex":0,"containerWidth":300,"lastIndex":0,
	"cssStripeOneTouchIndex":0, //sets the index of an signgle CSSStripe in case the user only wants a single click (which on mobile is not descriminate from start of slide)
	"wasTouchMoveAfterTouchStart":false //store whether the touchMovement was entered, afer a touchStart was triggered (if not handle the touchStart as a tap)
	};
	var mNorthIndex=0;//index of the strip the is heading straight north
	
	inflate();
	
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("colorfan-container");
		settings.parent.append(mContainer);
		
		mCodeContainer=$("<div/>").addClass("colorfan-code");
		mContainer.append(mCodeContainer);
		
		mFanOuterContainer=$("<div/>").addClass("colorfan-fanoutercontainer");		
		mContainer.append(mFanOuterContainer);
		
		mFanContainer=$("<div/>").addClass("colorfan-fancontainer");		
		mFanOuterContainer.append(mFanContainer);
		
		//mCode=$("<div/>").text("RAL "+settings.RALCodes[0].code+" "+settings.RALCodes[0].name);
		console.log(settings.label);
		mCode=$("<div/>");
		mLabelSpan = $("<div/>").text(settings.label);
		mRalSpan = $("<div/>").text(settings.RALCodes[0].name+" "+settings.RALCodes[0].code);
		mCode.append(mLabelSpan);
		mCode.append(mRalSpan);
		mCodeContainer.append(mCode);		
		
		//console.log("ncolors="+mNumberColors);
		
		mDRot=360/(mNumberColors+settings.spare*2);//is computed such that n position can be spared
		for (var i=0;i<mNumberColors;i++)
		{
			//if ((i!=1)&&(i!=number))//skip the position besides the north-strip
			{
				var strip=$("<div/>");
				var rot=i*mDRot;
				
				var RALCode=settings.RALCodes[i];
				setupCSSStrip(strip,"45%","0%","10%",52,RALCode.hex,i);
				
				mFanContainer.append(strip);
				mStrips.push({"div":strip,"rot":rot,"RALCode":RALCode});
				
			}
			
		}
		setRotationStripes(settings.startIndex,false);
		
	}
	
	function setRotationStripes(aIndexNorthStripe,aCallOnChange)
	{
		
		mNorthIndex=aIndexNorthStripe;
		$.each(mStrips,function(aIndex,aStrip)
			   {
					//var rot=aStrip.rot+aDeltaRotation;
					var d2NorthStripe=aIndex-aIndexNorthStripe;//number distance to the north stripe
					var spare=0;//spares two position adjacent to the NorthStripe
					if (d2NorthStripe>=1)
					{
						spare=settings.spare;
					}
					
					if (d2NorthStripe<=-1)
					{
						spare=-settings.spare;
					}
					
					var rot=(d2NorthStripe+spare)*mDRot;
					aStrip.rot=rot;
					aStrip.div.css("transform","rotate("+rot+"deg)");//eventually for IE9 and other browser further commands required		
					
				
				});
		//console.log("set to index "+aIndexNorthStripe);
		var northStripe=mStrips[aIndexNorthStripe];
		//mCode.text("RAL "+northStripe.RALCode.code+" "+northStripe.RALCode.name);
		// mCode.text(settings.label+" "+northStripe.RALCode.name+" "+northStripe.RALCode.code);
		
		mLabelSpan.text(settings.label);
		mRalSpan.text(northStripe.RALCode.name+" "+northStripe.RALCode.code);
		
		if (aCallOnChange && settings.onChange!=undefined)
		{
			settings.onChange();
		}
		
	}
	
	function setupCSS()
	{
		mContainer.css("width",settings.width);
		
		
		//mContainer.css("background-color","yellow");
		
		if (settings.widthFan!=undefined)
		{
			mFanOuterContainer.css("width",settings.widthFan);//the fan could be smaller, the label could be larger
		}else
		{
			mFanOuterContainer.css("width","100%");
		}
		mFanContainer.css("width","100%");
		mFanContainer.css("position","relative");//anchor for absolute positioning
		mFanContainer.css("padding-bottom","100%");//just for debugging
		//mFanContainer.css("background-color","yellow");
		
		
		mFanContainer.on("mousedown",onContainerMouseDown);		
		mFanContainer.on("mouseup mouseleave",onContainerMouseUp);
		mFanContainer.on("touchend",onContainerTouchEnd);
		mFanContainer.on("mousemove",onContainerMouseMove);
		mFanContainer.on("touchmove",onContainerTouchMove);
		mFanContainer.on("touchstart",onContainerTouchstart);
		
		// settings.parent.on("mousedown",onContainerMouseDown);		
		// settings.parent.on("mouseup mouseleave touchend",onContainerTouchEnd);
		// settings.parent.on("mousemove",onContainerMouseMove);
		// settings.parent.on("touchmove",onContainerTouchMove);
		// settings.parent.on("touchstart",onContainerTouchstart);
		
		mCodeContainer.css("width","100%");
		//mCodeContainer.css("background-color","blue");
		mCodeContainer.css("text-align","left");
		
		mRalSpan.css("color","#333333");
		mRalSpan.css("font-size","16px");
		
		mLabelSpan.css("font-size", "23px");
		mLabelSpan.css("color", "#ff8500");
		mLabelSpan.css("letter-spacing", "0.1em");
	}
	
	function onContainerMouseDown(event)
	{
		event.preventDefault();
		//log("mouse down");
		if (mTouchGesture.isTouchMovement==false)
		{
			mTouchGesture.isTouchMovement=true;
			mTouchGesture.startX=event.clientX;
			mTouchGesture.startIndex=mNorthIndex;
			mTouchGesture.lastIndex=mNorthIndex;
			mTouchGesture.containerWidth=mFanContainer.width();
		}
	}
	
	function onContainerTouchstart(event)
	{
		event.preventDefault();
		//log("touchstart");
		if (mTouchGesture.isTouchMovement==false)
		{
			mTouchGesture.isTouchMovement=true;
			mTouchGesture.startX=event.touches[0].clientX;
			mTouchGesture.startIndex=mNorthIndex;
			mTouchGesture.lastIndex=mNorthIndex;
			mTouchGesture.containerWidth=mFanContainer.width();
		}
	}
	
	function onContainerMouseUp(event)
	{
		//log("mouseup");
		if (mTouchGesture.isTouchMovement)
		{
			mTouchGesture.isTouchMovement=false;			
		}
		
	}
	
	function onContainerTouchEnd(event)
	{
		//log("touchend.");
		if (mTouchGesture.isTouchMovement)
		{
			if (mTouchGesture.wasTouchMoveAfterTouchStart==false)
			{//in case the use did only a tap not a slide 
				setRotationStripes(mTouchGesture.cssStripeOneTouchIndex,true);
			}
			mTouchGesture.isTouchMovement=false;			
		}
		
	}
	
	function onContainerTouchMove(event)
	{
		
		if (mTouchGesture.isTouchMovement)
		{
			mTouchGesture.wasTouchMoveAfterTouchStart=true;
			var diffX=mTouchGesture.startX-event.touches[0].clientX;
			//log("touchMove diffX="+diffX);
			if (diffX!=0)
			{
				var movedPercent=100*(diffX/mTouchGesture.containerWidth);//normalize with container width
				
				var movedIndices=Math.round(movedPercent/15);//move slowly
				var newIndex=makeEndless(mTouchGesture.startIndex+movedIndices);
				if (newIndex!=mTouchGesture.lastIndex)
				{
					mTouchGesture.lastIndex=newIndex;
					setRotationStripes(newIndex,true);
				}
				
				
				//log("movedIndices:"+movedIndices);
			}
			
		}
		
	}
	
	function onContainerMouseMove(event)
	{
		//log("mouseMove");
		if (mTouchGesture.isTouchMovement)
		{
			var diffX=mTouchGesture.startX-event.clientX;
			//log("mouseMove "+diffX);
			if (diffX!=0)
			{
				var movedPercent=100*(diffX/mTouchGesture.containerWidth);//normalize with container width
				
				var movedIndices=Math.round(movedPercent/2);//move slowly
				var newIndex=makeEndless(mTouchGesture.startIndex+movedIndices);
				if (newIndex!=mTouchGesture.lastIndex)
				{
					mTouchGesture.lastIndex=newIndex;
					setRotationStripes(newIndex,true);
				}
				
				
				//log("movedIndices:"+movedIndices);
			}
			
		}
		
	}
	
	function makeEndless(aIndex)
	{
		
		if (aIndex<0)
		{
			return mNumberColors+aIndex;
		}
		
		if (aIndex>=mNumberColors)
		{
			return aIndex-mNumberColors;
		}
		return aIndex;
	}
	
	
	
	//left,top,width are css values, aHeightPercent is int in percent
	function setupCSSStrip(aStrip,aLeft,aTop,aWidth,aHeightPercent,aColorHex,aIndex)
	{
		aStrip.css("width",aWidth);
		var randomHeight=Math.random()*1.6-0.8;
		aStrip.css("height",(aHeightPercent+randomHeight)+"%");
		aStrip.css("position","absolute");//anchor for absolute positioning
		aStrip.css("left",aLeft).css("top",aTop);		
		aStrip.css("background-color",aColorHex);
		
		
		aStrip.css("border-radius","4px");
		
		//aStrip.css("background-color","rgb("+r+","+g+","+b+")");
		
		//mStrip1.css("transform","rotate(90deg)");//eventually for IE9 and other browser further commands required
		//aStrip.css("transform","rotate("+aRotDegree+"deg)");//eventually for IE9 and other browser further commands required
		aStrip.css("transform-origin","50% 90%");//percent related to the width and height of the object
		if (aColorHex=="#FFFFFF")
		{
			aStrip.css("border","1px solid #333333");
		}
		aStrip.css("transition","transform 0.4s");
		
		aStrip.on("touchstart",function(event){
			if (mTouchGesture.isTouchMovement==false)
			{//use clickable rotationstripe only if movement is not under way
				//log("store CSSStrip Index"+aIndex);
				mTouchGesture.cssStripeOneTouchIndex=aIndex;//store the index of this CSSStrip in case the user only does a single tap instead of slide
				mTouchGesture.wasTouchMoveAfterTouchStart=false;
				//setRotationStripes(aIndex,true);
			}
			//event.stopPropagation();//continue to bubble up to fancontainer
			});
			
		aStrip.on("click",function(event){//mouse click is discriminated from mouseMove
			if (mTouchGesture.isTouchMovement==false)
			{			
				setRotationStripes(aIndex,true);
			}
			event.stopPropagation();//stop to bubbling up to fancontainer
			});
		aStrip.css("cursor","pointer");
		
	}
	
	function selectValue(aValue){
		//console.log(settings.RALCodes);
		//console.log(aValue);
		$.each(settings.RALCodes, function(i, ral){
			if(aValue.includes("" +ral.code))
			{
				setRotationStripes(i, false);
			}
		});
	}
	
	
	function getStrips()
	{
		return mStrips;
	}
	
	function getRGBHex()
	{
		return mStrips[mNorthIndex].RALCode.hex;
	}
	
	function getDescription()
	{
		return mStrips[mNorthIndex].RALCode.name+" RAL "+mStrips[mNorthIndex].RALCode.code;
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
		"getStrips":getStrips,
		"getRGBHex":getRGBHex,
		"getDescription":getDescription,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show
		};
	
}


