/** Closure to inflate a menu with closure examples,
 * this menu is (image)-cards
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorCards(settings){
    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorDialogs: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;

        switch (aName) {
            
			
			case "tagCard":
				text("Shows a card with image, title,description and tags", aName);
				inflateClosure(aName,mContent);
			
				func("createTagCard", "Constructor");
				arg("parent", "");
				arg("title", "");
				arg("description", "");
				arg("imageURL", "");
				arg("[tags]", "optional array of tags");
				func("hide");
				func("show");
			break;	
			
			case "imageText":
                text("Displays an image with a description text above", aName);
                inflateClosure(aName,mContent);
				
                func("createImageText", "Constructor");
                arg("parent", "");
                arg("imageURL", "the location of the image in the project structure: i.e. 'pics/examplePicture.jpeg'");
                arg("text", "");
                arg("height", "the height of the image, should be in px or em");
                arg("width","the width of the container, surrounding the image")
                arg("margin", "");
                arg("id", "");
                arg("onDelete", "function to be called when 'x' in the top right is pressed");
                arg("closeButtonVisible", "boolean");
                func("getImage", "");
                func("getText", "");
                func("getHeader", "");
                func("setCloseButtonVisible", "");
                arg("aIsVisible", "a boolean to change visibility")
                break;

            case "mediaCard":
                text("A closure that wraps a media card, note that the CSS is fixed for now",aName);
                inflateClosure(aName,mContent);
				
                
                func("createMediaCard","Constructor");
                arg("parent","");
                arg("title","");
                arg("text","");
                arg("url","the URL to the image");

                break;

            case "imageButton":
                text("closure to hold a button with image and text, note that the button toggles between active states on click",aName)
                inflateClosure(aName,mContent);
				
                func("createImageButton","Constructor");
                arg("parent")
                arg("width","The width of the image in PIXEL, determines the width of the whole button")
                arg("imageURL","the path to the image on the button")
                arg("value","value of the button, passed to the onClick function")
                arg("label", "")
                arg("onClick","function to be called on button click")

                func("isActive","returns the sate of the button")


                break;

            case "imageButtonHolder":
                text("Holds multiple imageButtons with flex-display, Button interaction only works properly when singleActive is true",aName);
                inflateClosure(aName,mContent);
				
                
                func("createImageButtonHolder","Constructor")
                arg("parent")
                arg("singleActive","if true, only one button is active at once, has to be true for most onEvent function calls to properly work / be displayed")
                arg("width","the width in PIXEL for all buttons, note that therefore images should be same proportion")
                arg("onClick","function to call when a button is clicked")
                arg("onDragStart","function to call on drag event of a button")
                arg("onClose","if provided, buttons can be closed")
                arg("onKebabClick","if provided buttons have a kebab menu")
                arg("maxTextLength","max number of chars a text can have, longer texts are truncated to keep the layout")
                arg("padding","CSS property")
                arg("margin","CSS property")
                arg("marginBottom","CSS property")
                arg("addPrepend","if true, images are added in front not at the end")

                func("addImageButton","")
                arg("aLabel")
                arg("aImageURL")
                arg("aInfo")
                arg("aRemovable","optional, if true the button can be closed")

                func("getConfig", "returns a map for labels to imageButtons")

                func("setImageURL")
                arg("aLabel")
                arg("aURL")

                func("setActive","deactivates all other buttons")
                arg("aLabel")

                func("removeImageButton")
                arg("aLabel")

                func("clear","removes all buttons")

                func("deactivateAll")

                func("toggle","calls the DOMTokenList function toggle on the passed button")
                arg("aLabel")

                func("getActive")


                break;

            case "imageTextButton":
                text("closure to hold a button with image and Text aka swatch, providing close button",aName)
                inflateClosure(aName,mContent);
				
				
                func("createImageTextButton","Constructor")
                arg("parent")
                arg("width","width of the image")
                arg("label","")
                arg("onCLick", "function to call on button click")
                arg("margin","CSS property")
                arg("padding","CSS property")
                arg("stateful","if true the button has 2 states, (in-)active")
                arg("onDragStart","function to call when drag event starts")
                arg("onClose","function to call when button is closed")
                arg("onKebabClick","if defined, passes label and a kebab icon is visible in active mode, otherwise hidden")
                arg("maxTextLength", "if set, longer text will be cropped to keep format")

                func("setActive","boolean based setting of active state")
                arg("aIsActive")

                func("setImageURL")
                arg("aURL")

                func("remove","removes the entire button container")

                func("toggle","toggles active state")

                func("isActive","returns active-state")

                func("show")
                func("hide")
                break;
        }
    }
	
	
	
	function inflateClosure(aName,aParent)
	{
		switch (aName)
		{
			case "tagCard":
				
				
				var row=$("<div/>").addClass("row");
				aParent.append(row);
				var col=$("<div/>").addClass("col-6");
				row.append(col);
				
				var tagCard=createTagCard({
					"parent":col,
					"title":"Kartentitel",
					"description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
					"imageURL":"pics/emptyImage.svg",
					"tags":["Tag 1","Tag 2","Tag 3"]
				});				
			break;
			
			case "imageText":
				let imageText = createImageText({
                    "parent": parent(),
                    "imageURL": "pics/emptyImage.svg",
                    "text": "Text here",
                    "height": "200px",
                    "width":"300px",
                    "margin": "5%",
                    "id": "imageText",
                });
			break;
			
			case "mediaCard":
				let mediaCard = createMediaCard({
                    "parent": parent(),
                    "title": "A title",
                    "text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod" +
                        " tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " +
                        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
                        " no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " +
                        "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore " +
                        "magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
                        "Stet clita kasd gubergren," +
                        " no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                    "url": "pics/javascriptLogo.svg",
                });
			break;
			
			case "imageButton":
				
				var row=$("<div/>").addClass("row");
				aParent.append(row);
				var col=$("<div/>").addClass("col-6");
				row.append(col);
				
				let imageButton = createImageButton({
                    "parent": col,
                    "width": "60%",
                    "imageURL": "pics/javascriptLogo.svg",
                    "value": "buttonValue",
                    "label": "button label",

                });
			break;
			
			case "imageButtonHolder":
				
				var row=$("<div/>").addClass("row");
				aParent.append(row);
				var col=$("<div/>").addClass("col-6");
				row.append(col);
				
				let imageButtonHolder = createImageButtonHolder({
                    "parent": aParent,
                    "singleActive": true,
                    "width": "100px",
                    "padding": "5px",
                    "margin": "10px",
                    "onClose": buttonOnClose,
                    "onKebabClick":buttonOnKebabClick,

                });
				imageButtonHolder.addImageButton("button1","pics/javascriptLogo.svg","info button 1",true);
                imageButtonHolder.addImageButton("button2","pics/jQuery.svg","info button 2",true);

			break;
			
			case "imageTextButton":
			
				var row=$("<div/>").addClass("row");
				aParent.append(row);
				var col=$("<div/>").addClass("col-6");
				row.append(col);
				let imageTextButton = createImageTextButton({
                    "parent": col,
                    "width": "80%",
                    "imageURL": "pics/javascriptLogo.svg",
                    "label":"label here",
                    "stateful": "true",
                    "onClose": buttonOnClose,
                    "onKebabClick": buttonOnKebabClick,

                });
			break;
			
			
			
		}
	}
	
    function text(aText, aTitle) {
        mPresentationHelper.text(aText, aTitle, mContent);
    }

    function func(aFunctionName, aDescription) {
        mFunctionTableBody = mPresentationHelper.func(aFunctionName, aDescription, mFunctionTableBody, mContent)

    }

    function arg(aArgumentName, aDescription) {
        mPresentationHelper.arg(aArgumentName, aDescription, mFunctionTableBody)

    }

    function parent() {
        var wrapperContainer = $("<div/>").addClass("wrapper-container");
        mContent.append(wrapperContainer);
        wrapperContainer.addClass("bg-white m-5 p-2 rounded");
        return wrapperContainer;
    }

    function buttonOnClose(){
        console.log("close")
    }
    function buttonOnKebabClick(){
        console.log("kebab click")
    }
    return {
        "inflate": inflate,
		"inflateClosure":inflateClosure
    }
}