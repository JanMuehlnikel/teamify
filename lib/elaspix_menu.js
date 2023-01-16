/*close for providing a header with menu for bootstrap 5
*
*settings require
*	parent JQuery-Obj where to add the menu	
	[onSelect] function that is called when an entry is clicked
	[logourl]		
	[menuTitle]	
	[homeurl]
	
	requires		
		toast
		modalDialoge
		login
		
*
*/

function createMenu(settings)
{
	var mContainer;
	var mNav;
	var mToggleMenu;	
	var mToggleList;
	var mMenuItemList={};//holds all menu items as hashMap with the name of the item as key
	var mCartIcon={};// is the shopping cart button with a number property
	var mModalDialoge;
	var mCurrentDialog;	
	
	var mFunctionCalls={};//map fram element-Name to function Call
	var mDropdowns={};//map from dropdown-Key to its dropdown-JSON
	
	var mElaspixToast;	
	
	
	inflate();
	setup();
	setupCSS();
	
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("container-navbar");
		settings.parent.prepend(mContainer);
		mNav=$("<nav/>").addClass("navbar navbar-expand-md navbar-light")
		mContainer.append(mNav);
		
		mCurrentDialog=$("<div/>");
		settings.parent.append(mCurrentDialog);
		
		var homeElement="<span/>";
		if (settings.homeurl)homeElement="<a/>";
		var home=$(homeElement).addClass("navbar-brand");
		if (settings.homeurl)home.attr("href",settings.homeurl);//must be set to home url
		if (settings.logourl)
		{
			var logo=$("<img/>").attr("src",settings.logourl);
			logo.addClass("d-inline-block align-top").attr("height","30").attr("alt","LOGO");
			home.append(logo);
		}
		
		var menuTitle="Menu Title";
		if (settings.menuTitle)menuTitle=settings.menuTitle;
		home.append($("<span/>").text(menuTitle).css("margin-left","14px").css("position","relative").css("top","4px"));
		
		mNav.append(home);
		
		var toggler=$("<button/>").addClass("navbar-toggler").attr("type","button");
		toggler.attr("data-bs-toggle","collapse").attr("data-bs-target","#navbarNav");
		toggler.attr("aria-controls","navbarNav").attr("aria-expanded","false").attr("aria-label","Toggle navigation");
		toggler.css("background-color","rgba(0,0,0,0.0)");//elementor forces button-background to be orange
		mNav.append(toggler);
		var toggleIcon=$("<span/>").addClass("navbar-toggler-icon");
		toggler.append(toggleIcon);
		mToggleMenu=$("<div/>").addClass("collapse navbar-collapse").attr("id","navbarNav");
		mNav.append(mToggleMenu);
		mToggleList=$("<ul/>").addClass("navbar-nav ms-auto me-4");
		mToggleMenu.append(mToggleList);
		
		
		
		
		mElaspixToast=createToast({"parent":settings.parent});
		
	}
	
	function setup()
	{
		
		mModalDialoge=createModalDialoge({"parent":mContainer,"isStatic":true});
		
		
	}
	
	
	
	function setupCSS()
	{
		
	}
	
	
	
	function inflateNavItem(aName,aURL)
	{
		var li=$("<li/>").addClass("nav-item");
		var a;
		if (aURL!=undefined)
		{		
			a=$("<a/>").addClass("nav-link").text(aName);
			a.attr("href",aURL);
		}else
		{
			a=$("<span/>").addClass("nav-link").text(aName);			
		}
		li.append(a);
		a.css("cursor","pointer");
		li.on("click",function(){
			onMenuItemClick(aName);
		});
		return {"li":li,"a":a};
	}
	
	function addBusyIcon()
	{
		var li=$("<li/>").addClass("nav-item");
		var icon=$("<div/>").addClass("spinner-border").attr("role","status");
		icon.css("position","relative").css("top","8px").css("width","25px").css("height","25px");
		icon.hide();
		li.append(icon);
		mToggleList.append(li);
		mMenuItemList["busyIcon"]={"li":li,"icon":icon};
		
	}
	
	function addMenuItem(aName,aFunctionCall,aURL)
	{
		if (aFunctionCall!=undefined)mFunctionCalls[aName]=aFunctionCall;
		var navItem=inflateNavItem(aName,aURL);		
		mToggleList.append(navItem.li);
		mMenuItemList[aName]=navItem;
	}
	
	function onMenuItemClick(aName,aDropdownKey)
	{
		
		setActiveItem(aName);
		if (mFunctionCalls.hasOwnProperty(aName))
		{			
			mFunctionCalls[aName](aName,aDropdownKey);
		}
	}
	
	function addDropdown(aName,aKey, aFunctionCall, )
	{
		var li=$("<li/>").addClass("nav-item dropdown");
		var a=$("<span/>").addClass("nav-link dropdown-toggle").attr("id","id"+aName).attr("role","button");
		a.attr("data-bs-toggle","dropdown").attr("aria-haspopup","true").attr("aria-expanded","false");
		a.text(aName);
		if(aFunctionCall !== undefined){
			a.on("click",function (){
				console.log(aName +" clicked")
				aFunctionCall(aKey);
			})
		}
		li.append(a);
		var menu=$("<ul/>").addClass("dropdown-menu").attr("aria-labelledby","id"+aName);
		li.append(menu);
		mToggleList.append(li);
		mMenuItemList[aKey]={"li":li,"menu":menu,"a":a};
		var dropdownJSON={"li":li,"menu":menu,"a":a};

		mDropdowns[aKey]=dropdownJSON;

		return dropdownJSON;
	}
	
	//dropdownItem must either have aFunction (calles a functoin staying on same page) or aURL (changes the page)
	function addDropdownItem(aDropdownKey,aName,aFunctionCall,aURL)
	{		
		var li=$("<li/>");
		
		var activeItem;//is either a button or a link
		if (aFunctionCall!=undefined)
		{
			
			mFunctionCalls[aName]=aFunctionCall;
			activeItem=$("<span/>");
			activeItem.on("click",function(){onMenuItemClick(aName,aDropdownKey);});
		}
		
		if (aFunctionCall==undefined && aURL!=undefined)		
		{
			activeItem=$("<a/>");			
			activeItem.attr("href",aURL);
		}
		activeItem.css("cursor","pointer");
		activeItem.addClass("dropdown-item").text(aName);			
		li.append(activeItem);
		
		if (mDropdowns.hasOwnProperty(aDropdownKey))
		{
			mDropdowns[aDropdownKey].menu.append(li);
		}
		mMenuItemList[aName]={"a":activeItem};
	}
	
	
	
			
	
	//catches the opening of another modal-window (is used if dialoges are not already part of the menu-modal-dialoge)
	function showModal(aTitle,aText)
	{
			var modalBody=mModalDialoge.getBody();
			modalBody.append($("<h5/>").addClass("mt-4").text(aTitle));
			modalBody.append($("<p/>").text(aText));
	}
	
	
	
	
	
	
	//called from franchiseNehmerBackend after name of region was obtained
	function setMenuItemText(aKey,aText)
	{
		mMenuItemList[aKey].a.text(aText);				
	}
	
	
	
	
	function showToast(aMessage,aHeader,aHeaderClass)
	{
		mElaspixToast.show(aMessage,aHeader,aHeaderClass);
		
	}
	
	//called from extern by configurator to make a hint to the user after a product was set into basket
	function getModal(){
		return mModalDialoge;
	}
	
	
	
	//make an menu-Item the active one (shines brighter)
	function setActiveItem(aItemName)
	{
		for (key in mMenuItemList)
		{			
			if (mMenuItemList[key].hasOwnProperty("a"))
			{
				mMenuItemList[key].a.removeClass("active");
			}
				
		}
		if (mMenuItemList.hasOwnProperty(aItemName) && mMenuItemList[aItemName].hasOwnProperty("a"))
		{
			mMenuItemList[aItemName].a.addClass("active");
		}
	}
	
	function hideModalDialoge()
	{
		mModalDialoge.hide();
	}
	
	function getMenuItem(aKey)
	{
		return mMenuItemList[aKey];
	}
	
	
	function showBusyIcon(aToShow)
	{
		console.log("showBusyIcon",aToShow);
		var icon=mMenuItemList["busyIcon"].icon;
		if (aToShow)icon.show(); else icon.hide();
		
	}
	
	
	
	
		
	return {
		"setActiveItem":setActiveItem,		
		"showToast":showToast,
		"getModal":getModal,						
		"showBusyIcon":showBusyIcon,
		"hideModalDialoge":hideModalDialoge,
		"addMenuItem":addMenuItem,
		"addBusyIcon":addBusyIcon,
		"addDropdown":addDropdown,
		"addDropdownItem":addDropdownItem
	};
}