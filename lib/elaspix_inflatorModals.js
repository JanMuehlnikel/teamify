/** Closure to inflate a menu with closure examples,
 * this menu is for Modals (pop-ups)
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorModals(settings) {

    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorModals: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "Toast":
                text("Shows a Toast that is used to provide small hints or feedback to the user.", aName);
                text("Besides inflating your very own instance, the menu already holds a toast for you that you can access using menu.showToast().");

                func("createToast", "Constructor");
                arg("parent", "");
                func("show", "shows the toast");
                arg("text", "");
                arg("[title]", "");
                arg("[CSS-Class]", "like text-success, text-warning or text-danger");

                func("getToastObj")

                var toast = createToast({"parent": parent()});
                toast.show("The Message", "The Title", "text-success");
                break;

            case "Modal":
                text("Shows a Modal visually blocking the current screen.", aName);
                text("Besides inflating your very own instance, the menu already holds a modalDialoge for you that you can access using menu.getModal().");

                func("createModalDialoge", "Constructor");
                arg("parent", "");
                arg("[isStatic]", "if true it cannot be clicked away");

                func("show", "just makes it visible");

                func("showText", "makes it visible, sets the header and fills with a p-Tag");
                arg("aTitle", "");
                arg("aText", "");

                func("getBody", "returns the body to which closures can be inflated");

                func("setTitle", "sets the header");
                arg("aTitle", "");
                arg("aFootrVisible", "if true the footer with a close button is shown");

                func("clear", "clears the body, same as getBody().empty()");
                func("hide", "makes it disappear");

                func("setFooterVisible","sets visibility based on passed boolean")
                arg("aIsVisible")

                func("setMaxWidth")
                arg("aCSSProperty")

                func("exchangeFooterButton","builds a new button and labels it with passed text")
                arg("text")

                func("setHeaderInvisible","hides the header, no passed arguments here")
                var modal = createModalDialoge({"parent": parent()});
                modal.show();
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
