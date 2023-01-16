/*closure for providing a modal dialoge
*
*settings require
*	parent JQuery-Obj where to add the dialoge
	[isStatic] if true it cannot be closed by clicking outside and has no close button
*
*/
function createModalDialoge(settings)
{
	var mContainer;//collable for .modal() 
	var mModalHeader
	var mTitle;
	var mBody;
	var mFooter;
	
	var mModalDialog;
	
	inflate();
	
	function inflate()
	{
		
		 mContainer=$("<div/>").addClass("modal").attr("role","dialog").attr("tabindex","-1");
		 
		 mModalDialog=$("<div/>").addClass("modal-dialog modal-dialog-centered").attr("role","document");
		 mContainer.append(mModalDialog);
		 var modalContent=$("<div/>").addClass("modal-content");
		 mModalDialog.append(modalContent);
		 mModalHeader=$("<div/>").addClass("modal-header");
		 modalContent.append(mModalHeader);
		 mTitle=$("<h5/>").addClass("modal-title").text("Bitte Email angeben.");
		 
		 mModalHeader.append(mTitle);
		 
		 if (settings.isStatic!=undefined && settings.isStatic==false)
		 {
			 
			 
			 var closeButton=$("<button/>").addClass("btn-close").attr("data-bs-dismiss","modal").attr("aria-label","Close");
			 closeButton.css("border","none");		
			 closeButton.hover(
					function(){closeButton.css("background-color","white");},//take all all hover effects from elementor
					function(){closeButton.css("background-color","white");}
					);
			 mModalHeader.append(closeButton);		 
		 }else
		 {
			 mContainer.attr("data-bs-backdrop","static").attr("data-bs-keyboard","false"); 
		 }
		 mBody=$("<div/>").addClass("modal-body").append($("<p/>").text("..."));
		 
		 modalContent.append(mBody);
		 mFooter=$("<div/>").addClass("modal-footer");
		 modalContent.append(mFooter);
		 var closeButtonFooter=$("<button/>").addClass("btn btn-secondary");
		 closeButtonFooter.attr("data-bs-dismiss","modal").text("schließen");
		 mFooter.append(closeButtonFooter);
		 settings.parent.append(mContainer);
		 
	}
	
	function show()
	{
		mContainer.modal("show");
	}
	
	//convenience function to add title and text, as well show it 
	function showText(aTitle,aText)
	{
		clear();
		setTitle(aTitle,true);		
		mBody.append($("<p/>").text(aText));
		show();
	}
	
	function hide()
	{
		mContainer.modal("hide");
	}
	
	//the footer contains another close button
	function setFooterVisible(aIsVisible)
	{
		if (aIsVisible)
		{
			mFooter.show();
		}else
		{
			mFooter.hide();
		}
	}
	
	//can be emptied and filled again
	function getBody()
	{
		return mBody;
	}
	
	function clear()
	{
		mBody.empty();
	}
	
	function setTitle(aTitle,aFootrVisible)
	{
		setFooterVisible(aFootrVisible);
		mTitle.text(aTitle);		
	}
	
	function setMaxWidth(aCSSProperty)
	{
		
		mModalDialog.css("max-width",aCSSProperty);
		
	}
	
	function exchangeFooterButton(text)
	{
		mFooter.empty();
		var buttonFooter=$("<button/>").addClass("btn btn-secondary");
		buttonFooter.text(text);
		mFooter.append(buttonFooter);
		
	}
	
	function setHeaderInvisible()
	{
		mModalHeader.hide();
	}
	
	return {
		"show":show,
		"showText":showText,
		"hide":hide,
		"setFooterVisible":setFooterVisible,
		"getBody":getBody,
		"setTitle":setTitle,
		"clear":clear,
		"setMaxWidth":setMaxWidth,
		"exchangeFooterButton":exchangeFooterButton,
		"setHeaderInvisible":setHeaderInvisible
	}
	
	
}