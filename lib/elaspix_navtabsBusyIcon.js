/*closure for navigation tabs in form of buttons that also have busy-spinners



settings must contains	
	parent
	[onTabChange] function that is called when the tab has changed
	
	requires
	
*/
function createNavtabsBusyIcon(settings)
{
	var mContainer;
	var mTabsHeader;	
	var mTabContent;
	
	var mTabs={};
	
	inflate();
	setupCSS();
	
	function inflate()
	{
	
		mContainer=$("<div/>").addClass("");//justify-content-end so the the mobile menu icon of the IFRame-Hoste does not interfere
		settings.parent.append(mContainer);
		
		mTabsHeader=$("<ul/>").addClass("nav nav-tabs");		
		mContainer.append(mTabsHeader);
		
		mTabContent=$("<div/>").addClass("tab-content");
		mContainer.append(mTabContent);
	}
	
	function setupCSS()
	{
		//mTabs.css("width","25%");
		
		//mTabContent.addClass("col-12 col-sm-9");//full width, except from sm and above (75%) as here the default buttons are shown
	}
	
	//adds a new tab to the menu
	//aID must be unique among all tabs
	function addTab(aID,aTitle)
	{
		var navItem=$("<li/>").addClass("nav-item").attr("role","representation");
		var button=$("<button/>").addClass("nav-link").attr("id",aID+"-tab");
		button.attr("data-bs-toggle","tab").attr("data-bs-target","#"+aID);
		button.attr("type","button").attr("role","tab").attr("aria-controls",aID);
		
		var buttonWrapper=$("<div/>").addClass("button-wrapper");//wrap label and spinner
		button.append(buttonWrapper);
		//button.text(aTitle);
		var label=$("<label/>").text(aTitle);
		label.css("cursor","pointer");
		buttonWrapper.append(label);
		buttonWrapper.css("cursor","pointer");
		
		var spinner=$("<div/>").addClass("spinner-border").attr("role","status");
		spinner.css({"width":"15px","height":"15px","margin-left":"3px"});
		spinner.hide();
		buttonWrapper.append(spinner);
		
		button.on("click",function(){onTab(aID);});
		navItem.append(button);
		mTabsHeader.append(navItem);
		
		var content=$("<div/>").addClass("tab-pane fade").attr("id",aID);
		content.attr("role","tabpanel").attr("area-labelledby",aID+"-tab");
		
		mTabContent.append(content);
		if (Object.keys(mTabs).length==0)
		{//this is the first tab
			button.addClass("active");
			content.addClass("show active");
		}
		
		mTabs[aID]={"button":button,"content":content,"label":label,"spinner":spinner};
		return content;//to use it as body for filling
		
	}
	
	//returns the body of a tab 
	function getBody(aID)
	{
		if (mTabs.hasOwnProperty(aID))
		{
			return mTabs[aID].content;
		}else
		{
			return undefined;
		}
	}
	
	//returns the body of a tab 
	function getButton(aID)
	{
		if (mTabs.hasOwnProperty(aID))
		{
			return mTabs[aID].button;
		}else
		{
			return undefined;
		}
	}
	
	function onTab(aID)
	{
		if (settings.onTabChange)
		{
			settings.onTabChange(aID);
		}
	}
	
	//activate the tab with aID
	//update the button-frontFace and show the content tab
	//if aOnlybuttons is true, only the buttons are updated, used to synch mobile and default nav-buttons
	function show(aID,aOnlybuttons)
	{
		$.each(Object.keys(mTabs),function(index,id){
			var tabJSON=mTabs[id];
			if (id!=aID)
			{
				tabJSON.button.removeClass("active");
				if( aOnlybuttons==undefined ||(aOnlybuttons==false ))tabJSON.content.removeClass("show active")
			}else
			{
				tabJSON.button.addClass("active");
				if( aOnlybuttons==undefined ||(aOnlybuttons==false ))tabJSON.content.addClass("show active")
			}
		});
	}
	
	//returns the ID of the active tab
	function getActiveTab()
	{
		$.each(Object.keys(mTabs),function(index,id){
			var tabJSON=mTabs[id];
			
			if (tabJSON.button.hasClass("active"))
			{
				return id;
			}			
		});
	}
	
	function setTabLabel(aTabID,aTabLabel)
	{
		if (mTabs.hasOwnProperty(aTabID))
		{
			mTabs[aTabID].label.text(aTabLabel);
		}
	}
	
	function showBusyIcon(aTabID,aIsToShowBusyIcon)
	{
		if (mTabs.hasOwnProperty(aTabID))
		{
			if (aIsToShowBusyIcon)mTabs[aTabID].spinner.show();
			else mTabs[aTabID].spinner.hide();			
		}
	}
	
	return{
		"addTab":addTab,
		"getBody":getBody,
		"getButton":getButton,
		"show":show,
		"getActiveTab":getActiveTab,
		"setTabLabel":setTabLabel,
		"showBusyIcon":showBusyIcon
	}
	
}