/** Closure to inflate a menu with closure examples,
 * this menu is for Dialogs
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorDialogs(settings) {

    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorDialogs: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;

        switch (aName) {

            case "Login":
                text("Shows a Login-Dialog with email and password input and a login-button.", aName);
                text("Provide your own Cloud-Controller as datastoreManager inside the login-closure to check for a valid password.");
                text("Looks best inside a static modal-Menu.");

                var parentContainer = parent();
                parentContainer.addClass("pb-5");
                var login = createLogin({"parent": parentContainer});
                login.show();

                func("createLogin", "Constructor");
                arg("parent", "");
                arg("[onLogin]", "function that is called after successfull login");

                func("show", "");
                arg("parent", "");
                func("hide")
                func("fadeOut")
                break;

            case "draggableArea":
                text("Creates a draggable area, to let the user set the size of something", aName);

                let draggableArea = createDraggableArea({
                    "parent": parent(),
                    "valueWidth": 3,
                    "valueDepth": 1.5,
                    "widthMin": 1,
                    "widthMax": 5,
                    "depthMin": 1,
                    "depthMax": 5,
                    "minHandlePercent": 0,
                    "width": "90%",
                    "unit": "m",
                    "label": "Set label here",
                    "labelPadding": "5%",
                    "scaleHeight": 0.3,
                    "depthMaxPercent": 25,
                })
                func("createDraggableArea", "Constructor");
                arg("parent", "");
                arg("valueWidth", "initial width");
                arg("valueDepth", "initial depth");
                arg("widthMin", "");
                arg("widthMax", "");
                arg("depthMin", "");
                arg("depthMax", "");
                arg("depthMaxPercent", "Note: the '%' is added, just set the number: i.e. '80' for 80%. Describes the actual max based on max value, i.e. 80% of depthMax");
                arg("label", "");
                arg("minHandlePercent", "the handle will not go underneath this value, as to not make it disappear, based on Min values: i.e. if Min is 1, and this is 10, the actual min is 1.1 ");
                arg("onChange", "function to call onChange");
                arg("width", "CSS property");
                arg("unit", "i.e. meters");
                arg("labelPadding", "CSS property");
                arg("scaleHeight", "sets the maximum percentage of depthMax that can actually be set, floating point")
                func("getConfig", "");
                func("setValue", "");
                func("getContainer", "");
                break;


            case "switch":
                text("A closure for Bootstrap 5 switches and checkboxes. The top version has 'isCheckbox' set true", aName)
                let elaspixSwitch = createSwitch({
                    "parent": parent(),
                    "id": "elaspixSwitch",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "isCheckbox": true,
                    "isClickedLabel": "clicked label here",
                    "notClickedLabel": "not clicked label here",
                })
                let elaspixSwitch2 = createSwitch({
                    "parent": parent(),
                    "id": "elaspixSwitch",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "isCheckbox": false,

                })
                func("createSwitch", "Constructor")
                arg("parent")
                arg("id")
                arg("onChange", "function to call when changed")
                arg("isclicked", "A string to display next to the switch, if it's clicked");
                arg("notclicked", "A string to display next to the switch, if it's not clicked")
                arg("marginBottom", "CSS property")
                arg("marginTop", "CSS property")
                arg("isCheckbox", "if 'true' the dialog is a checkbox instead of a switch. See the top version in the example")
                arg("isClickedLabel", "Optional: show a label instead of isclicked string")
                arg("notClickedLabel", "Optional:show a label instead of notclicked string")

                func("getValue", "gets the value of teh button")

                func("isCkecked")

                func("hide")

                func("show")

                func("setValue")

                func("lock", "stops the user from clicking the switch/box")
                arg("aToLock", "Boolean: if true the box can't be clicked anymore")
                break;

            case "switchCentral":
                text("Closure for Boostrap 5 switches witch central switch, left and right are modes", aName)
                let switchCentral = createSwitchCentral({
                    "parent": parent(),
                    "id": "switchCentral",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "forceMobile": true,
                    "labelElement": "span",
                    "hintIntermediate": "hint between both labels"
                })
                let switchCentral2 = createSwitchCentral({
                    "parent": parent(),
                    "id": "switchCentral",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "forceMobile": false,
                    "labelElement": "span",
                    "hintIntermediate": "hint between both labels"
                })

                func("createSwitchCentral", "Constructor")
                arg("parent")
                arg("id")
                arg("onChange", "function to call when changed")
                arg("isclicked", "A string to display next to the switch, if it's clicked");
                arg("notclicked", "A string to display next to the switch, if it's not clicked")
                arg("forceMobile", "if true, the labels are moved into the next line. True on top example")
                arg("labelElement", "if span -> same line, if dif (default) on top of each other. NOTE: seems to not work")
                arg("hintIntermediate", "Hint between the two labels, here 'hint between both labels'")

                func("getValue", "get the value of the button")

                func("isChecked")

                func("hide")

                func("show")

                func("setValue")
                break;

            case "collapser":
                text("closure to manage a collapsible dialog",aName)
                let collapser = createCollapser({
                    "parent":parent(),
                    "label":"label here",
                    "id":"collapserID",
                    "text": "text here",
                    "marginBottom":"10%",
                })
                func("createCollapser","Constructor")
                arg("parent")
                arg("label")
                arg("id")
                arg("text")
                arg("marginBottom")

                func("unfold","")
                func("fold")

                func("getBody")

                func("setCSSContainer","sets a css parameter with passed value")
                arg("aParam","something like position, or margin-bottom")
                arg("aValue")

                func("addClassContainer","adds passed class to the CSS classes of the container")
                arg("aClass")

                func("setLabel")
                arg("aLabel")

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
        "inflate": inflate,
    }
}