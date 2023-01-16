/*closure for navigation tabs in form of pills



settings must contains	
	parent
	[onTabChange] function that is called when the tab has changed
	requires
	
*/
function createNavpills(settings)
{
	var mContainer;
	var mPills;	
	var mTabContent;
	
	var mTabs={};
	
	inflate();
	setupCSS();
	
	function inflate()
	{
	
		mContainer=$("<div/>").addClass("nav-pills-container d-flex align-items-start justify-content-end");//justify-content-end so the the mobile menu icon of the IFRame-Hoste does not interfere
		settings.parent.append(mContainer);
		
		//mPills=$("<div/>").addClass("nav flex-column nav-pills me-3 d-none d-sm-block");//used in combination with elaspix_navpillsMobileExtension.js
		mPills=$("<div/>").addClass("nav flex-column nav-pills me-3");		
		mContainer.append(mPills);
		
		mTabContent=$("<div/>").addClass("tab-content");
		mContainer.append(mTabContent);
	}
	
	function setupCSS()
	{
		mPills.css("width","25%");
		//mPills.addClass("col-3");//whenever visible consume 25% of the width
		//mTabContent.css("width","75%");
		mTabContent.addClass("col-12 col-sm-9");//full width, except from sm and above (75%) as here the default pills are shown
	}
	
	//adds a new tab to the menu
	//aID must be unique among all tabs
	function addTab(aID,aTitle)
	{
		var pill=$("<button/>").addClass("nav-link text-start").attr("id",aID+"-tab");
		pill.attr("data-bs-toggle","pill").attr("data-bs-target","#"+aID);
		pill.attr("type","button").attr("role","tab").attr("aria-controls",aID);
		pill.text(aTitle);
		pill.on("click",function(){onTab(aID);});
		mPills.append(pill);
		
		var content=$("<div/>").addClass("tab-pane fade").attr("id",aID);
		content.attr("role","tabpanel").attr("area-labelledby",aID+"-tab");
		
		mTabContent.append(content);
		if (Object.keys(mTabs).length==0)
		{//this is the first tab
			pill.addClass("active");
			content.addClass("show active");
		}
		
		mTabs[aID]={"pill":pill,"content":content};
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
	
	//returns the pill to the active tab
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
	//update the pill-frontFace and show the content tab
	//if aOnlyPills is true, only the pills are updated, used to synch mobile and default nav-pills
	function show(aID,aOnlyPills)
	{
		$.each(Object.keys(mTabs),function(index,id){
			var tabJSON=mTabs[id];
			if (id!=aID)
			{
				tabJSON.pill.removeClass("active");
				if( aOnlyPills==undefined ||(aOnlyPills==false ))tabJSON.content.removeClass("show active")
			}else
			{
				tabJSON.pill.addClass("active");
				if( aOnlyPills==undefined ||(aOnlyPills==false ))tabJSON.content.addClass("show active")
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
				ret=id;
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