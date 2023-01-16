/*closure for navigation tabs for mobile resolution in form of pills on the top
  is a variant of elaspix_navpills



settings must contains	
	parent
	[onTabChange] function that is called when the tab has changed
	requires
		nothing
	
	
*/
function createNavpillsTop(settings)
{
	var mContainer;
	var mPillsMobile;	
	var mTabContent;
	
	var mTabs={};
	
	inflate();
	setupCSS();
	
	function inflate()
	{
	
		mContainer=$("<div/>").addClass("nav-pills-mobile-extension-container");
		settings.parent.append(mContainer);
		
		mPillsMobile=$("<ul/>").addClass("nav justify-content-end nav-pills").attr("role","tablist");		
		mContainer.append(mPillsMobile);
		
		mTabContent=$("<div/>").addClass("tab-content");
		mContainer.append(mTabContent);
	}
	
	function setupCSS()
	{
		//mPillsMobile.css("width","100%");
		mTabContent.addClass("col-12");
	}
	
	//adds a new tab to the menu
	//aID must be unique among all tabs
	function addTab(aID,aTitle)
	{
		var li=$("<li/>").addClass("nav-item me-1").attr("role","presentation");
		
		var pill=$("<button/>").addClass("nav-link").attr("id",aID+"-tab");
		pill.attr("data-bs-toggle","pill").attr("data-bs-target","#"+aID);
		pill.attr("type","button").attr("role","tab").attr("aria-controls",aID);
		pill.text(aTitle);
		pill.on("click",function(){onTab(aID);});
		li.append(pill);
		mPillsMobile.append(li);
		
		var content=$("<div/>").addClass("tab-pane fade").attr("id",aID);
		content.attr("role","tabpanel").attr("area-labelledby",aID+"-tab");
		
		mTabContent.append(content);
		if (Object.keys(mTabs).length==0)
		{//this is the first tab
			pill.addClass("active");
			content.addClass("show active");
		}
		
		mTabs[aID]={"pill":pill,"content":content};
		//mTabs[aID]={"pill":pill};
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
	
	//returns the pill of a tab 
	function getPill(aID)
	{
		if (mTabs.hasOwnProperty(aID))
		{
			return mTabs[aID].pill;
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
	function show(aID)
	{
		$.each(Object.keys(mTabs),function(index,id){
			var tabJSON=mTabs[id];
			if (id!=aID)
			{
				tabJSON.pill.removeClass("active");
				tabJSON.content.removeClass("show active")
			}else
			{
				tabJSON.pill.addClass("active");
				tabJSON.content.addClass("show active")
			}
		});
	}
	
	//returns the ID of the active tab
	function getActiveTab()
	{
		var ret="unknown";
		$.each(Object.keys(mTabs),function(index,id){
			var tabJSON=mTabs[id];
			
			if (tabJSON.pill.hasClass("active"))
			{
				return id;
			}			
		});
		return ret;
	}
	
	
	
	return{
		"addTab":addTab,
		"getBody":getBody,
		"getPill":getPill,
		"show":show,
		"getActiveTab":getActiveTab
	}
	
}