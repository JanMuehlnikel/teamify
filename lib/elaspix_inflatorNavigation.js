/** Closure to inflate a menu with closure examples,
 * this menu is for navigational items
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorNavigation(settings) {
    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();
    let fillerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod" +" tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " + "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," + " no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " + "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore " + "magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea " + "rebum. Stet clita kasd gubergren," + " no sea takimata sanctus est Lorem ipsum dolor sit amet."
    let fillerText2 = "this is a second filler text, which is much shorter and also self-written, but this is purely to prove that another tab is actually loaded"
    function inflate(aName) {
        console.log("inflatorNavigation: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "navtabs":
                text("creates a navigation menu that uses tabs", aName);
                var navtabs = createNavtabs({
                    "parent": parent(),
                    "marginBottom": "5%",

                });
                navtabs.addTab("tab1", "Tab1");
                navtabs.getBody("tab1").empty()
                navtabs.getBody("tab1").append(fillerText)
                navtabs.addTab("tab2", "Tab2");
                navtabs.getBody("tab2").empty()
                navtabs.getBody("tab2").append(fillerText2)
                navtabs.showBusyIcon("tab2",true)

                func("createNavtabs", "Constructor");
                arg("parent", "");
                arg("onChange", "function to call on tab change");
                arg("marginBottom", "CSS property");

                func("addTab", "")
                arg("aID", "the identifier of the tab");
                arg("aTitle", "");

                func("getBody", "returns the body of the tab with matching ID");
                arg("aID");

                func("getButton", "returns a button, seems like legacy USE BUTTON TABLE")
                arg("aID");

                func("show", "");

                func("getActiveTab", "returns the ID of the tab that is currently open");

                func("setTabLabel", "");
                arg("aTabID", "");
                arg("aTabLabel", "the new label");

                func("showBusyIcon", "boolean based setting of busy icon state on given tab label");
                arg("aTabID");
                arg("aIsToShowBusyIcon", "boolean");
                break;

            case "navpills":
                text("Navigation in form of Navpills", aName);

                let navpills = createNavpills({
                    "parent": parent(),
                })
                navpills.addTab("tab1", "Tab1");
                navpills.getBody("tab1").empty()
                navpills.getBody("tab1").append(fillerText)
                navpills.addTab("tab2", "Tab2");
                navpills.getBody("tab2").empty()
                navpills.getBody("tab2").append(fillerText2)


                func("createNavpills", "Constructor");
                arg("parent", "");
                arg("onTabChange", "function to call on tab change")

                func("addTab", "")
                arg("aID", "")
                arg("aTitle", "")

                func("getBody", "returns the body of a tab")
                arg("aID", "")

                func("show", "activate the tab with aID " +
                    "update the pill-frontFace and show the content tab " +
                    "if aOnlyPills is true, only the pills are updated, used to synch mobile and default nav-pills")
                arg("aID", "");
                arg("aOnlyPills", "the boolean")

                func("getActiveTab", "returns the ID of the active tab")
                break;

            case "navpillsTop":
                text("closure for navigation tabs for mobile resolution in form of pills on the top" +
                    "  is a variant of elaspix_navpills", aName)

                let navpillsTop = createNavpillsTop({
                    "parent": parent(),
                })
                navpillsTop.addTab("tab1", "Tab1");
                navpillsTop.getBody("tab1").empty()
                navpillsTop.getBody("tab1").append(fillerText)
                navpillsTop.addTab("tab2", "Tab2");
                navpillsTop.getBody("tab2").empty()
                navpillsTop.getBody("tab2").append(fillerText2)

                func("createNavpillsTop", "constructor")
                arg("parent", "")
                arg("onTabChange", "function to be called on tab change")

                func("addTab", "")
                arg("aID", "")
                arg("aTitle", "")

                func("getBody", "returns the body of a tab")
                arg("aID", "")

                func("getPill", "returns the pill of a tab")
                arg("aID", "")

                func("show", "activates a tab by ID")
                arg("aID", "")

                func("getActiveTab", "")
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