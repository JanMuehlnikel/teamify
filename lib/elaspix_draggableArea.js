
/**
 *closure for an input dialog controlling the width and depth
 *settings contain
 *	parent: a JQuery-Object
 *	valueWidth: initial value 
 *	valueDepth: initial value 
 *	widthMin:minValue 
 *	widthMax:maxValue
 *	depthMin:minValue 
 *	depthMax:maxValue expressed in the unity of the dimension
	[depthMaxPercent] a value that cannot be exceeded, is expressed in Percent
	label
 *	minHandlePercent: the handle will not go below the min-Percent (otherwise the other handle disappears)
 *	[onChange] event that is called if values change
 *	width: css property
	[unit] the unit shown for the dimension labels	
	[labelPadding]: optimal CSS padding for the label
	[scaleHeight] reduces height of container by this scale-value, computes the containerHeight as scaleHeight*containerWidth
 *
 **/
function createDraggableArea(settings)
{
	var mContainer;
	var mWidthContainer;//just to apply the width
	var mReferenceContainer;	//the reference container with 100% width
	var mLabel;
	var mHandle;
	var mDragActionWidth={"isDragged":false,"startXPixel":0,"areaHeight":0,"positionPercent":settings.valueWidth,"positionStartPercent":settings.valueWidth};
	var mDragActionDepth={"isDragged":false,"startYPixel":0,"areaHeight":0,"positionPercent":settings.valueDepth,"positionStartPercent":settings.valueDepth};
	
	var mHandleSizePercent=5;//percent
	var mValueDepth;//in units that correspond to widthMin and widthMax
	var mValueWidth;//in units that correspond to widthMin and widthMax
	var mValueArea;
	var mWidthInterval;//in units that correspond to widthMin and widthMax
	var mDepthInterval;//in units that correspond to widthMin and widthMax	
	var mDrawBox;//a bordered box that shows the dimensions
	
	var mTextWidth;//shows width with unit
	var mTextDepth;//shows depth with unit
	var mTextArea;//show the area with unit²
	var mUnit;
	var mUnitSquare;
	var mScaleHeight=1;//for values <1 the height is smaller then width
	
	
	inflate();
	setup();
	setupCSS();
	setValue(settings.valueWidth,settings.valueDepth);
	
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("draggable-area-container");
		settings.parent.append(mContainer);
		
		mLabel=$("<label/>").text(settings.label);
		mContainer.append(mLabel);
		
		mWidthContainer=$("<div/>").addClass("draggable-area-container-width");
		mReferenceContainer=$("<div/>").addClass("draggable-area-container-reference");
		mWidthContainer.append(mReferenceContainer);
		mContainer.append(mWidthContainer);
		
		mDrawBox=$("<div/>").addClass("draw-box");
		mReferenceContainer.append(mDrawBox);				
		
		mHandle=$("<div/>").attr("id","draggable-handle");
		mReferenceContainer.append(mHandle);
		
		mTextWidth=$("<div/>").text("4 m");
		mReferenceContainer.append(mTextWidth);
		mTextDepth=$("<div/>").text("4 m");
		mReferenceContainer.append(mTextDepth);
		mTextArea=$("<div/>").text("16 m²");
		mReferenceContainer.append(mTextArea);
	}
	
	function setup()
	{
		mScaleHeight=1;
		if (settings.scaleHeight!=undefined)mScaleHeight=settings.scaleHeight;
		
		mReferenceContainer.on("mousemove",onMouseMoveContainer);
		mReferenceContainer.on("touchmove",onTouchMoveContainer);
		mReferenceContainer.on("mouseleave",onMouseLeaveContainer);
		mReferenceContainer.on("mouseup",onMouseUpContainer);		
				
		mHandle.on("mousedown",onHandleDown);
		mHandle.on("touchstart",onTouchStart);
		mHandle.on("touchend",onHandleUp);
		mHandle.on("mouseup",onHandleUp);
		
		mWidthInterval=(settings.widthMax*(1+(mHandleSizePercent/100))-settings.widthMin);//the interval larger in internal representation as the handle-bar has a width so that it can never get to 100%
		mDepthInterval=(settings.depthMax*(1+(mHandleSizePercent/100))-settings.depthMin);//the interval larger in internal representation as the handle-bar has a width so that it can never get to 100%
		mValueDepth=Math.round(settings.depthMin+mDepthInterval*(mDragActionDepth.positionPercent/100));
		mValueWidth=Math.round(settings.widthMin+mWidthInterval*(mDragActionWidth.positionPercent/100));
		mValueArea=mValueDepth*mValueWidth;
		mUnit="";
		if (settings.unit)mUnit=" "+settings.unit;
		
		mUnitSquare="";
		if (settings.unit)mUnitSquare=" "+settings.unit+"²";
		
		
		
	}
	
	function setupCSS()
	{
		
		
		if (settings.width!=undefined)
		{
			mWidthContainer.css("width",settings.width);
		}
		
		mReferenceContainer.css("position","relative");
		mReferenceContainer.css("width","100%");//required as it is the reference for all height-based computations
		
		
		//mReferenceContainer.css("padding-bottom","100%");//relative to parent height
		mReferenceContainer.css("padding-bottom",sclHeightPc(100,true));//relative to parent height
				
		mHandle.css("position","absolute");
		mHandle.css("width",mHandleSizePercent+"%").css("height",sclHeightPc(mHandleSizePercent)).css("border-radius","100%");
		mHandle.addClass("bg-primary");
		mHandle.css("cursor","pointer");
		
		mDrawBox.css("position","absolute");
		mDrawBox.css("top",0).css("left",0);
		mDrawBox.css("border","1px solid");
		mDrawBox.addClass("border-primary");
		mDrawBox.css("padding-top",(100-mDragActionDepth.positionPercent)-mHandleSizePercent/2+"%");//relative to parent height
		mDrawBox.css("width",mDragActionWidth.positionPercent-mHandleSizePercent/2+"%");

		mTextWidth.css("position","absolute");
		mTextDepth.css("position","absolute");
		mTextArea.css("position","absolute");
		
		mTextWidth.addClass("text-muted");
		mTextDepth.addClass("text-muted");
		mTextArea.addClass("text-muted");
		
		if (settings.labelPadding)
		{
			mLabel.css("padding",settings.labelPadding);
		}
		
		
	}
	
	//returns a scaled Height with "%" suffix
	//[aInverse] if true uses the inverse of mScaleHeight
	function sclHeightPc(aValue,aInverse)
	{
		var valueScaled=(1/mScaleHeight)*aValue;
		if (aInverse)valueScaled=(mScaleHeight)*aValue;
		return valueScaled+"%";
	}
	
	function onHandleDown(event)
	{		
		startDragging(event.clientX,event.clientY);
	}
	
	function onTouchStart(event)
	{		
		startDragging(event.touches[0].clientX,event.touches[0].clientY);	
	}
	
	function startDragging(aPosXPixel,aPosYPixel)
	{
		mDragActionDepth.startYPixel=aPosYPixel;
		mDragActionDepth.areaHeight=mReferenceContainer.width();//the Container height is zero but the proportion ist 1:1 -> height==width
		mDragActionDepth.positionStartPercent=mDragActionDepth.positionPercent;		
		mDragActionDepth.isDragged=true;
		
		mDragActionWidth.startXPixel=aPosXPixel;
		mDragActionWidth.areaHeight=mReferenceContainer.width();//the Container height is zero but the proportion ist 1:1 -> height==width
		mDragActionWidth.positionStartPercent=mDragActionWidth.positionPercent;	
		mDragActionWidth.isDragged=true;	
	}
	
	function moveHandle(aPosXPixel,aPosYPixel)
	{
		//console.log("clientY"+aPosYPixel);
		
		
		if (mDragActionDepth.isDragged)
		{
			var deltaYPixel=mDragActionDepth.startYPixel-aPosYPixel;			
			var percentY=100*(deltaYPixel/mDragActionDepth.areaHeight);	
			mDragActionDepth.positionPercent=mDragActionDepth.positionStartPercent+percentY;
			
			//console.log("positionPercent",mDragActionDepth.positionPercent);
			if (mDragActionDepth.positionPercent>100-mHandleSizePercent-settings.minHandlePercent)mDragActionDepth.positionPercent=100-mHandleSizePercent-settings.minHandlePercent;
			if (settings.depthMaxPercent!=undefined)
			{
				if (100-mDragActionDepth.positionPercent>settings.depthMaxPercent)mDragActionDepth.positionPercent=100-settings.depthMaxPercent;
			}
			
			if (mDragActionDepth.positionPercent<0)mDragActionDepth.positionPercent=0;
			//console.log("mDragActionDepth.positionPercent="+mDragActionDepth.positionPercent);
		}		
		
		if (mDragActionWidth.isDragged)
		{
			var deltaXPixel=mDragActionWidth.startXPixel-aPosXPixel;		
			var percentX=100*(deltaXPixel/mDragActionWidth.areaHeight);//the same areaHeight as in mDragActionDepth.areaHeight by the way
			mDragActionWidth.positionPercent=mDragActionWidth.positionStartPercent+percentX;
			
			if (mDragActionWidth.positionPercent>100-mHandleSizePercent-settings.minHandlePercent)mDragActionWidth.positionPercent=100-mHandleSizePercent-settings.minHandlePercent;
			if (mDragActionWidth.positionPercent<0)mDragActionWidth.positionPercent=0;
			//console("startXPixel="+mDragActionWidth.startXPixel+" positionPercent="+mDragActionWidth.positionPercent);
			
		}
		
		
		
		var newValueDepth=settings.depthMax-mDepthInterval*(mDragActionDepth.positionPercent/100);
		var newValueWidth=settings.widthMax-mWidthInterval*(mDragActionWidth.positionPercent/100);
		
		
		
		//var newValueDepthRounded=Math.round(newValueDepth);			
		//var newValueWidthRounded=Math.round(newValueWidth);			
		
		if (newValueDepth!=mValueDepth || newValueWidth!=mValueWidth)
		{
			mValueDepth=newValueDepth;
			mValueWidth=newValueWidth;
			setVisuals(mDragActionWidth.positionPercent,mDragActionDepth.positionPercent);
			if (settings.onChange!=undefined)
			{
				settings.onChange(mValueWidth,mValueDepth);
			}
		}
	}
	
	function setVisuals(aPercentWidth,aPercentDepth)
	{			
			mDrawBox.css("padding-top",(100-aPercentDepth)+"%");//relative to parent height
			mDrawBox.css("width",100-aPercentWidth+"%");		
			
			
			mHandle.css("left",(100-aPercentWidth-mHandleSizePercent/2)+"%");
			//mHandle.css("top",(100-aPercentDepth-mHandleSizePercent/2)+"%");
			mHandle.css("top",sclHeightPc(100-aPercentDepth-mHandleSizePercent/2));
			
			mTextWidth.css("left",(100-aPercentWidth-mHandleSizePercent)/2+"%").css("top",sclHeightPc(100-aPercentDepth+mHandleSizePercent/4));
			mTextDepth.css("left",(100-aPercentWidth+mHandleSizePercent/4)+"%").css("top",sclHeightPc((100-aPercentDepth-mHandleSizePercent)/2));
			mTextArea.css("left",(100-aPercentWidth-mHandleSizePercent)/2+"%").css("top",sclHeightPc((100-aPercentDepth-mHandleSizePercent)/2));
			
			mTextWidth.text(mValueWidth.toFixed(1)+mUnit);
			mTextDepth.text(mValueDepth.toFixed(1)+mUnit);
			mValueArea=mValueWidth*mValueDepth;
			mTextArea.text(mValueArea.toFixed(0)+mUnitSquare);
			
	}
	
	function onMouseMoveContainer(event)
	{
		if (mDragActionDepth.isDragged|| mDragActionWidth.isDragged)
		{
			moveHandle(event.clientX,event.clientY);
		}
	}



	function onTouchMoveContainer(event)
	{
		if (mDragActionDepth.isDragged|| mDragActionWidth.isDragged)
		{
			moveHandle(event.touches[0].clientX,event.touches[0].clientY);
		}
		event.preventDefault();
	}
	
	function onHandleUp(event)
	{
		
		mDragActionDepth.isDragged=false;
		mDragActionWidth.isDragged=false;
	}
	
	function onMouseLeaveContainer(event)
	{
		if (mDragActionDepth.isDragged || mDragActionWidth.isDragged)
		{			
			moveHandle(event.clientX,event.clientY);
			mDragActionDepth.isDragged=false;
			mDragActionWidth.isDragged=false;
		}
	}
	
	function onTouchLeaveContainer(event)
	{
		if (mDragActionDepth.isDragged || mDragActionWidth.isDragged)
		{			
			moveHandle(event.touches[0].clientX,event.touches[0].clientY);
			mDragActionDepth.isDragged=false;
			mDragActionWidth.isDragged=false;
		}
	}
	
	function onMouseUpContainer(event)
	{		
		onMouseLeaveContainer(event);//force a rerender
	}
	
	function onTouchEndContainer(event)
	{
		onTouchLeaveContainer(event);//force a rerender
	}
	
	function getConfig()
	{
		var config={};
		config.width=mValueWidth;
		config.depth=mValueDepth;
		config.area=mValueArea;
		config.breite=parseFloat(mValueWidth.toFixed(1));
		config.tiefe=parseFloat(mValueDepth.toFixed(1));
		config.area=mValueArea;
		config.flaeche=Math.round(mValueArea);
		config.unit=settings.unit;
		return config;
	}
	
	function setValue(aValueWidthInRangeUnit,aValueDepthInRangeUnit)
	{		
		//console.log("setValue",aValueWidthInRangeUnit,aValueDepthInRangeUnit);
		mDragActionWidth.positionPercent=checkPercentBounds(aValueWidthInRangeUnit,mWidthInterval,settings.widthMax);
		mDragActionDepth.positionPercent=checkPercentBounds(aValueDepthInRangeUnit,mDepthInterval,settings.depthMax);	
		
		mValueDepth=aValueDepthInRangeUnit;
		mValueWidth=aValueWidthInRangeUnit;
		setVisuals(mDragActionWidth.positionPercent,mDragActionDepth.positionPercent);
		
		
	}
	
	function checkPercentBounds(aValue,aRangeInterval,awidthMax)
	{		
		var percent=100*(awidthMax-aValue)/aRangeInterval;
		
		if (percent>100)percent=100;
		if (percent<0)percent=0;
		return percent;
	}
	
	function getContainer()
	{
		return mContainer;
	}
	
	return {
		"getConfig":getConfig,
		"setValue":setValue,
		"getContainer":getContainer
	};
}
