/* closure for login dialoge
 *
 * settings contains
 * parent: a jQuery Div  
 * [onLogin]: function that is called when the user has successfully logged in   
 
 
	requires		
		inputText
		buttonBusy
 *
 * */
function createLogin(settings)
{
	
	var mContainer;	
	
	var mEmailInput;
	var mPasswordInput;
	var mOKButton;			
	
	var mDatastoreManager;
	 	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		
		mContainer=$("<div/>").addClass("container login-container mt-4").attr("id","elaspix-login");
		settings.parent.append(mContainer);		
		
		
		mEmailInput=createInputText({"parent":mContainer,"id":"login-email","width":"100%",
										  "labelText":"Email","inputPlaceholder":"Ihre eMail","inputType":"email",
										  "hintText":"",
										  "onKeypress":onKeypress,
										  "marginBottom":"1em"										  
										  });
	
		
		
		mPasswordInput=createInputText({"parent":mContainer,"id":"login-password","width":"100%",
										  "labelText":"Passwort","inputPlaceholder":"Ihr Passwort","inputType":"password",
										  "hintText":"",
										  "onKeypress":onKeypress										  
										});
		
		mOKButton=createButtonBusy({
			"parent":mContainer,
			"title":"Login",
			"onClick":onOKButton,
			"cssClass":"btn-secondary",
			"marginTop":"1em"
		});
	}	
	
	function setup()
	{		
		
	}
	
	function setupCSS()
	{
	}
	
	function onKeypress(event)
	{
		//just reset the warning message in case of input		
		mEmailInput.setHintClass("");		
		if (event.keyCode==13)
		{			
			onOKButton();
		}
		
	}
	
	function onOKButton()
	{
		
		var email=mEmailInput.getValue();
		var missingData=false;
		if (email==undefined || email.length<2 || email.indexOf("@")<0)
		{
			mEmailInput.setHintText("Bitte geben Sie eine gültige Email ein!");
			mEmailInput.setHintClass("text-danger");
			missingData=true;
		}
		var passwordRaw= mPasswordInput.getValue();		
		if (passwordRaw==undefined || passwordRaw.length<2)
		{			
			mPasswordInput.setHintText("Bitte geben Sie Ihr Token ein!");
			mPasswordInput.setHintClass("text-danger");
			missingData=true;
		}
		
		if (missingData==false)
		{//check account
			//var passwordHash=$.md5(passwordRaw);//for hashing the password the jquery-md5 script is needed			
			
			mOKButton.showBusyIcon(true);			
			mPasswordInput.setHintText("prüfe Account... bitte warten");
			mPasswordInput.setHintClass("text-warning");			
			
			if (settings.onLogin!=undefined)
			{
				settings.onLogin(mEmailInput.getValue(),mPasswordInput.getValue());			
			}						
			 
		}
	}
	
	
	
	
	function fadeOut()
	{
		mContainer.fadeOut("slow",function(){mContainer.hide("slow");});				
	}
	
	function hide()
	{		
		mContainer.hide();
	}
	
	function show()
	{		
		mContainer.show("slow");
	}
	
	function showBusyIcon(aToShow)
	{
		mOKButton.showBusyIcon(aToShow);		
	}
	
	return {
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"showBusyIcon":showBusyIcon
	};
}

