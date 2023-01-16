/*
 *closure to manage a slider with labels
 *
 *setings contains
 *parent: a jQuery-Div
 *id 
 *label: text shown above the slider
  unit: to be shown behind the current value
 *[values]: list of values
  [scale]:{min,max,step}: if values are not provided
  [onChange]: method to be notified in case of value has changed
 */
function createSlider(settings)
{
	
	var mLabelContainer;
	var mSliderContainer;
	var mValueContainer;
	
	var mInput;
	var mLabel;
	var mLabelValueSurfaceMobile;
	var mTicks;
	var mContainer;
	var mValue;
	var mValueSurface;
	var mHint

	
	inflate();
	setup();
	setupCSS();
	function inflate()
	{
		mContainer=$("<div/>").attr("id",settings.id+"-container").css("padding","10px");
		settings.parent.append(mContainer);
		
		mLabelContainer=$("<div/>").addClass("slider-label-container d-none d-sm-block");
		mContainer.append(mLabelContainer);
		mSliderContainer=$("<div/>").addClass("slider-slider-container");
		mContainer.append(mSliderContainer);
		mValueContainer=$("<div/>").addClass("slider-value-container d-none d-sm-block");
		//mContainer.append(mValueContainer);//temporarely located in mSliderContainer
		
		
		
		mLabel=$("<label/>").attr("for",settings.id).text(settings.label);
		mLabel.addClass("parameter");
		
		mLabelValueSurfaceMobile=$("<label/>").attr("for",settings.id).text(settings.label).addClass("parameter d-block d-sm-none");
		mSliderContainer.append(mLabelValueSurfaceMobile);
		if (settings.values)
		{
			mTicks=$("<div/>").css("height","1.3em").css("position","relative").addClass("note");
			createTicks(mTicks,settings.values);
		}
		mInput=$("<input/>").attr("type","range").addClass("form-range").attr("id",settings.id);
		
		if (settings.values)
		{
			mInput.attr("min","0").attr("max",settings.values.length-1);
		}
		
		if (settings.scale)
		{
			mInput.attr("min",settings.scale.min).attr("max",settings.scale.max).attr("step",settings.scale.step);
		}
		
		
		//mInput.attr("min","0").attr("max",4).attr("step",0.01);
		mInput.on("input",onInput);
		
		mValueSurface=$("<div/>").addClass("parametervalue");
		mValueContainer.append(mValueSurface);
		
		mLabelContainer.append(mLabel);
		mSliderContainer.append(mTicks);
		mSliderContainer.append(mInput);
		mSliderContainer.append(mValueContainer);//makes it locate in same row as slider
		mHint=$("<small/>").addClass("note");
		mSliderContainer.append(mHint);
	}
	
	function setup()
	{
		mInput.val(1);
		onInput();//init mValue
	}
	
	function setupCSS()
	{
		//mContainer.css("display","flex");//do not let label and slide be in same row
		mInput.css("cursor","pointer");
		mLabelContainer.css("width","50%").css("box-sizing","border-box");
		//mLabelContainer.addClass("text-end").css("padding-right","20px");		

		mSliderContainer.css("box-sizing","border-box");
		mSliderContainer.css("width","60%");//do not set width, for mobile 100%
		mSliderContainer.css("padding-right","5px");
		//mValueContainer.css("width","20%").css("box-sizing","border-box");
		mValueContainer.css("width","50%").css("box-sizing","border-box");
		
		
		if( settings.values)
		{
			mLabel.css("margin-top","1rem");
			mValueSurface.css("margin-top","1rem");
		}else
		{
			mInput.css("margin-top","0.3rem");
		}
		
		
		mValueSurface.css("margin-left","10px");
	}

	function createTicks(aDiv,aList)
	{
		var number=0;
		var dWidth=100/(aList.length-1);
		var dEpsilonPercent=1;
		$.each(aList,function(index,value){
			var tick=$("<small/>").text(value);
			tick.css("position","absolute").addClass("design-farat");
			tick.css("left",(number*dWidth-number*dEpsilonPercent)+"%");
			number++;
			aDiv.append(tick);
			});
	}
	
	function onInput(aBubbleUp)
	{
		mValue=mInput.val();
		if (settings.values)
		{
				mValue=settings.values[mValue];
		}
		
		
		
		mValueSurface.text(mValue+" "+settings.unit);
		mLabelValueSurfaceMobile.text(settings.label+" "+mValue+" "+settings.unit);
		if (aBubbleUp && aBubbleUp!=false)
		{
			if (settings.onChange)
			{
				settings.onChange(getValue());
			}
		}
	}
	
	function getValue()
	{
		//return mValue;
		return mInput.val();
	}
	
	function setHint(aHint)
	{
		mHint.text(aHint);
		
	}
	
	function setValue(aValue)
	{
		mInput.val(aValue);
		onInput(false);
	}
	
	function setBorderValues(aMin, aMax)
	{
		mInput.attr("min",aMin);
		mInput.attr("max",aMax);
	}
	
	function hide(aValue)
	{
		if (aValue)
		{
			mContainer.hide(aValue);
		}else
		{
			mContainer.hide();
		}
	}
	
	function show(aValue)
	{
		if (aValue)
		{
			mContainer.show(aValue);
		}else
		{
			mContainer.show();
		}
	}
	
	
	return {
		"getValue":getValue,
		"setHint":setHint,
		"setValue":setValue,
		"setBorderValues":setBorderValues,
		"hide":hide,
		"show":show,
	};
}
