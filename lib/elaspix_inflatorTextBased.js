/** closure to inflate a menu with closure examples

 settings contain
 parent


 requires

 **/
function createInflatorTextBased(settings) {
    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorTextBased: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {


            case "InputText":
                text("A very basic input-text-field with label and hint.", aName);

                let inputText = createInputText({
                    "parent": parent(),
                    "id": "myid",
                    "labelText": "The label",
                    "inputPlaceholder": "the placeholder when empty",
                    "inputType": "text",
                    "hintText": "A small text to give some hint what should be overlooked.",
                    "width": "100%",
                    "marginBottom": "2em"
                });

                func("createInputText", "Constructor");
                arg("parent", "");
                arg("id", "");
                arg("labelText", "");
                arg("inputPlaceholder", "");
                arg("inputType", "one of email, text, number, phone etc.");
                arg("hintText", "the hint below the field");
                arg("width", "CSS-Property to the the width e.g. 100%");
                arg("[onKeypress]", "function that is called when a key is pressed");
                arg("[marginBottom]", "");
                arg("paddingBottom","CSS property")
                arg("imgappend","optional JSON-Object [{imgsrc,onhoverin,onhoverout,onclick}] with an imgsrc of an image that is appended " +
                    "at the end of input with a function that is called on hover or click")

                func("setLabelText", "");
                func("setInputValue", "");
                func("setHintText", "");

                func("setHintTextHTML", "sets the hint-Text as html e.g. for containing links");

                func("setHint","replaces the html content and appends the passed jQuery-Object")
                func("clearHint", "");
                func("getValue", "");
                func("setHintClass", "");
                func("hide", "");
                func("show", "");
                func("setDisabled", "");
                break;

            case "inputTextArea":
                text("similar to inputText, this is for user input, but provides a scalable input area",aName);

                let inputTextArea = createInputTextArea({
                    "parent": parent(),
                    "id": "inputTextArea",
                    "labelText": "Label-Text here",
                    "inputPlaceholder":"input placeholder here",
                    "inputType":"text",
                    "hintText":"hint here",
                    "width":"80%",
                    "rows":"10",
                    "cols":"10",
                    "marginBottom":"5%",
                    "paddingBottom":"5%",
                    "labelVerticalAlign":"top",
                    "display":"block",
                })
                func("createInputTextArea", "Constructor");
                arg("parent", "");
                arg("id", "");
                arg("labelText", "");
                arg("inputPlaceholder", "");
                arg("inputType", "one of email, text, number, phone etc.");
                arg("hintText", "the hint below the field");
                arg("width", "CSS-Property to the the width e.g. 100%");
                arg("rows", "amount of rows on initialise");
                arg("cols", "amount of columns on initialise");
                arg("marginBottom", "CSS property");
                arg("paddingBottom", "CSS property");
                arg("labelVerticalAlign", "CSS property for the label alignment");
                arg("display", "CSS property for display, should set block most of the time");
                arg("onKeypress", "function that is called when a key is pressed");
                arg("onKeyup","function that is called when a key is released")
                func("setLabelText", "");
                func("setInputValue", "");
                func("setHintText", "");
                func("setHintTextHTML", "sets the hint-Text as html e.g. for containing links");
                func("setHint","");
                func("clearHint", "");
                func("getValue", "");
                func("setHintClass", "");
                func("hide", "");
                func("show", "");
                func("slideToggle","jQuery slideToggle")
                func("setEnabled", "");
                break;



            case "inputTextButton":
                text("closure to allow editing a name to save it",aName)
                let inputTextButton = createInputTextButton({
                    "parent":parent(),
                    "id":"inputTextButton",
                    "placeholder": "placeholder here",
                    "buttonText": "button text",
                    "label": "label here",
                    "help": "help here",
                })
                func("createInputButton","Constructor")
                arg("parent")
                arg("id")
                arg("placeholder","the placeholder text")
                arg("buttonText")
                arg("label")
                arg("onKeyUp","function to be called on the event keyup")
                arg("onButtonClick", "function to be called on click of the button")
                arg("help", "the help text")

                func("getValue")

                func("setHelp","replaces the help text")
                arg("aText")
                arg("aClass", "CSS class for the text")

                func("setDisabled","takes boolean to dis-/enable the button")
                arg("aIsDisabled")

                func("showBusyIcon","boolean to toggle busy icon visibility")
                arg("aToShow")
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

    return {
        "inflate": inflate
    }
}