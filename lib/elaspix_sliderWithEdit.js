/*
 *closure to manage a slider with clickable, editable label
 *
 *setings contains
 *parent: a jQuery-Div
 *id 
 *label: text shown above the slider
  unit: to be shown behind the current value
  [imageURLPath] an absolute https://-prefixed path to be used in non-IFRame-mode
 *[values]: list of values
  [scale]:{min,max,step}: if values are not provided
  [onChange]: method to be notified in case of value has changed
  [tooltip]: if provided the label has a tooltip
 */
function createSliderWithEdit(settings)
{
	
	var mLabelContainer;//LabelContainer for desktop
	var mSliderContainer;
	var mUnitContainer;
	
	var mInput;
	var mLabel;
	var mLabelValueSurfaceMobile;//Label for mobile
	var mTicks;
	var mContainer;
	var mValue;//the actual value as shadow buffer
	var mUnit;//shows the unit behind the text-input-field
	var mHint
	
	var mInputEditContainer;//als holds Arrow-Keys
	var mInputEditOptional;//an optional input field that appears after click of the value label
	var mInputEditOptionalClock;
	
	var mMode="slider";//"slider" | "edit"
	var mIconEdit;
	
	var mImageURLPath="";
	
	inflate();
	setup();
	setupCSS();
	function inflate()
	{
		if (settings.imageURLPath)mImageURLPath=settings.imageURLPath;
		mContainer=$("<div/>").attr("id",settings.id+"-container");
		settings.parent.append(mContainer);
		
		mLabelContainer=$("<div/>").addClass("slider-label-container d-none d-sm-block");
		mContainer.append(mLabelContainer);
		mSliderContainer=$("<div/>").addClass("slider-slider-container");
		mContainer.append(mSliderContainer);
		mUnitContainer=$("<div/>").addClass("slider-value-container d-none d-sm-block");
		
		
		mInputEditContainer=$("<div/>").addClass("input-edit-container d-none d-sm-block");		
		mInputEditOptional=$("<input/>").attr("type","number").attr("step","0.1");
		mInputEditContainer.append(mInputEditOptional);
		mContainer.append(mInputEditOptional);
		
		mLabel=$("<label/>").attr("for",settings.id).text(settings.label);
		mLabel.addClass("parameter");
		
		if (settings.tooltip)
		{//initialization of tooltip see setup
			mLabel.attr("data-bs-toggle","tooltip");
			mLabel.attr("title",settings.tooltip);			
		}
		
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
		
		mUnit=$("<span/>").addClass("parametervalue");		
		mUnitContainer.append(mUnit);
		
		mIconEdit=$("<img/>").attr("src",mImageURLPath+"pics/edit-2.svg");
		mUnitContainer.append(mIconEdit);
		
		
		mLabelContainer.append(mLabel);
		mSliderContainer.append(mTicks);
		mSliderContainer.append(mInput);
		mContainer.append(mInputEditContainer);
		mContainer.append(mUnitContainer);
		mHint=$("<small/>").addClass("note");
		mSliderContainer.append(mHint);
	}
	
	function setup()
	{
		mInputEditOptionalClock=createEventclock({
			"event":onInputEditOptionalTimeUp,
			"cycle":1000
		});
		mUnitContainer.click("on",onValueClicked);
		mLabelValueSurfaceMobile.click("on",onValueClicked);
		mInputEditOptional.on("keyup",onKeyUp);
		updateSurface();
		mInput.val(1);
		onInput();//init mValue
		
		if (settings.tooltip)
		{
			const tooltip = new bootstrap.Tooltip(mLabel[0], {});
		}
		
	}
	
	function setupCSS()
	{
		
		mContainer.css("display","flex");
		//mInput.css("color","red");
		//mLabel.css("font-weight","600");
		mInput.css("cursor","pointer");
		mInput.css("position","relative");
		mInput.css("bottom","5px");
		
		if (settings.tooltip)
		{
			//mLabel.css("text-decoration","underline");
			mLabel.css("border-bottom","1px solid rgba(244,244,244,0.5)");
		}
		
		mLabelContainer.css("width","35%").css("box-sizing","border-box");
		mLabelContainer.addClass("text-end").css("padding-right","20px");
		
		
		
		mSliderContainer.css("box-sizing","border-box");
		mSliderContainer.css("width","60%");//do not set width, for mobile 100%
		mSliderContainer.css("padding-right","5px");
		//mInputEditOptional.css("width","20%");
		mInputEditOptional.css("max-width","62px");
		mUnitContainer.css("width","30%").css("box-sizing","border-box");
		mIconEdit.css("margin-left","4px");
		mIconEdit.css("height","0.9rem");
		mIconEdit.css("opacity","0.6");
		mIconEdit.css("position","relative");
		mIconEdit.css("bottom","3px");
		
		
		if( settings.values)
		{
			mLabel.css("margin-top","1rem");
			mUnit.css("margin-top","1rem");
		}else
		{
			mInput.css("margin-top","0.3rem");
		}
		
		
		mUnit.css("margin-left","10px");
		mUnitContainer.css("cursor","pointer");//can be clicked to switch to edit-field
		mLabelValueSurfaceMobile.css("cursor","pointer");
		
		mInputEditOptional.css("max-height","2em");
		
		
		
	}
	
	function onValueClicked()
	{
		mMode="edit";
		updateSurface();
	}
	
	function onKeyUp(event)
	{
		if (event.keyCode==13)
		{
			mMode="slider";
			updateSurface();
		}
		
		mInputEditOptionalClock.start();
	}
	
	function onInputEditOptionalTimeUp()
	{
		mInput.val(mInputEditOptional.val());
		onInput(true);//bubble up
	}
	
	function updateSurface()
	{
		//optional-Input always visible, value (unit), as well
		if (mMode=="edit")
		{
			mUnit.hide();//only relevant in desktop resolution
			mInputEditOptional.show();//both in desktop as well as mobile
			mIconEdit.hide();
		}else
		{//"slider" mode
			mUnit.show();//only relevant in desktop resolution
			mInputEditOptional.hide();//both in desktop as well as mobile
			mIconEdit.show();
		}
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
		
		updateLabels();
		
		
		mInputEditOptional.val(mValue);
		
		if (aBubbleUp && aBubbleUp!=false)
		{
			if (settings.onChange)
			{
				settings.onChange(getValue());
			}
		}
	}
	
	function updateLabels()
	{
		mUnit.text(mValue+" "+settings.unit);
		//mUnit.text(settings.unit);
		mLabelValueSurfaceMobile.text(settings.label+" "+mValue+" "+settings.unit);
		
	}
	
	function getValue()
	{
		return mValue;
	}
	
	function setHint(aHint)
	{
		mHint.text(aHint);
		
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
	
	function setValue(aValue)
	{
		mInput.val(aValue);
		mValue=aValue;
		if (settings.values)
		{
				mValue=settings.values[mValue];
		}
		updateLabels();
		mInputEditOptional.val(mValue);
	}
	
	function setBorderValues(aMin, aMax)
	{
		mInput.attr("min",aMin);
		mInput.attr("max",aMax);
	}
	
	
	return {
		"getValue":getValue,
		"setValue":setValue,
		"setHint":setHint,
		"hide":hide,
		"show":show,
		"setBorderValues":setBorderValues
	};
}
