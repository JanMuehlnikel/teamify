
/*
 *closure to create a bootstrap 5 toast that is non-blocking
 *
 *setings contain
 * parent
 */
 function createToast(settings)
 {
	var mContainer;
	var mToast;
	var mToastHeader;
	var mToastTitle;
	var mToastBody;
	var mToastObj;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mContainer=jQuery("<div/>").addClass("toast-container");
		mContainer.hide();//hide by default to not interfere with interaction
		
		mToast=jQuery("<div/>").addClass("toast").attr("role","alert");
		
		mToastHeader=jQuery("<div/>").addClass("toast-header text-danger");
  
		mToastTitle=jQuery("<strong/>").addClass("me-auto").text("Hinweis");
		mToastHeader.append(mToastTitle);
		var closeButton=jQuery("<button/>").attr("type","button").addClass("btn-close").attr("data-bs-dismiss","toast"); 
		//closeButton.append(jQuery("<span/>").html("&times;"));
		mToastHeader.append(closeButton);
		mToastBody=jQuery("<div/>").addClass("toast-body");
		mToast.append(mToastHeader);
		mToast.append(mToastBody);
		mContainer.append(mToast);
		settings.parent.append(mContainer);
		mToastObj=new bootstrap.Toast(mToast[0],{});//init the Bootrap 5 Toast
		console.log("ToastObj initialized to ",mToastObj);
		//mToast.toast({"delay":4000});
	}
	
	function setup()
	{
		mToast[0].addEventListener("hidden.bs.toast",function(){
			console.log("hide toast");
			mContainer.hide();//make sure the toast does not interfere with clickable area
		});
	}
	
	function setupCSS()
	{
		//now also set using classes top-0, start-0
		//mToast.addClass("position-absolute top-1 end-1 p-3");
		 mToast.addClass("position-fixed top-0 start-0 m-3");
		
		mToast.css("z-index",10);//otherwise input fields occlude the toast
		
		// mToast.css("left","20px");
		// mToast.css("top","20px");
		
 
		
	}
	
	//aTitle and aHeaderClass like text-danger, text-warning, text-success are optional
	function show(aText,aTitle,aHeaderClass){		
		console.log("showToast with aText",aText,"aHeader",aTitle,"aHeaderClass",aHeaderClass);
		if (aHeaderClass!=undefined)
		{
			mToastHeader.removeClass();//removes all classes
			mToastHeader.addClass("toast-header");
			mToastHeader.addClass(aHeaderClass);
		}else
		{
			mToastHeader.removeClass();//removes all classes
			mToastHeader.addClass("toast-header text-danger");//default red
		}
		
		if (aTitle!=undefined)
		{
			mToastTitle.text(aTitle);
		}else
		{
			mToastTitle.text("Hinweis");
		}
		
		mToastBody.text(aText);
		
		//mToast.fadeIn();
		mContainer.css("display","block");
		mToastObj.show();
		//setTimeout(function(){mToast.toast("hide");},2000);
		
	}
	
	function getToastObj()
	{
		return mToastObj;
	}
	
	return {
		"show":show,
		"obj":getToastObj
		
		};
 }
 