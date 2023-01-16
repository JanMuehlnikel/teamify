/** Closure to inflate a menu with closure examples,
 * this menu is for the menu itself
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorMenu(settings) {

    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorMenu: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "menu":
                text("closure for providing a header with menu for bootstrap 5. Requires 'toast','modalDialoge' and 'login'", aName)
                let menu = createMenu({
                    "parent": parent(),
                    "menuTitle": "Menu title here",
                    "logourl": "pics/favicon.ico"
                })
                menu.addMenuItem("item0",)
                menu.addDropdown("dropdown0", "dropdown0")
                menu.addDropdownItem("dropdown0", "entry0",onInflateClosure)
                menu.addDropdownItem("dropdown0", "entry1",onInflateClosure)
                func("createMenu", "Constructor")
                arg("parent")
                arg("onSelect", "function to call on selection of an entry")
                arg("logourl", "path to the logo, here it is the blue 'X'")
                arg("menuTitle")
                arg("homeurl", "add description here")

                func("setActiveItem", "marks a menu item as active, visible through a brighter shine")
                arg("aItemName")

                func("showToast", "meant for external calls to use the toast")
                arg("aMessage")
                arg("aHeader")
                arg("aHeaderClass")

                func("getModal", "meant for external call to pop the modal")

                func("showBusyIcon", "boolean based dis-/enable of the busy icon")
                arg("aToShow")

                func("hideModalDialoge")

                func("addMenuItem")
                arg("aName", "")
                arg("aFunctionCall")
                arg("aURL")

                func("addBusyIcon")

                func("addDropdown")
                arg("aName")
                arg("aKey", "the identifier of this dropdown, has to be unique")
                arg("aFunctionCall", "function to call when the head of a dropdown is clicked")

                func("addDropdownItem", "adds an item to the passed dropdown")
                arg("aDropdownKey", "the key of the wanted dropdown")
                arg("aName", "name of the entry")
                arg("aFuntionCall", "function to call when the entry is clicked")
                arg("aURL", "if the dropdown should redirect instead of calling a function, use this value")


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

    function onInflateClosure(aName, aDropdownKey) {
        console.log("inflate closure", aName, aDropdownKey);


    }

    return {
        "inflate": inflate,
    }
}