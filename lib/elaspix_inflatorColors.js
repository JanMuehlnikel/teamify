/** Closure to inflate a menu with closure examples,
 * this menu is for color pickers
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorColors(settings) {

    let numberRALCodes = Object.keys(elaspixRALCodes).length
    let colorSorting = createColorsorting({
        "RALCodes": elaspixRALCodes
    });
    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorModals: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "colorCards":
                text("Closure to choose among color cards, tailored for mobile use only. Note that 'elaspixRALCodes' has to be loaded before this script works. Therefore, it is best practice to call the constructor in a onLoad function, which is called like This: '<script src=\"...\" onload=\"onLoadFunction()\"...' " + "\n" + " requires colorsorting and RALCodes", aName)

                console.log("numberRalCodes: " + numberRALCodes)

                let colorCards = createColorCards({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "height_vh": "30",
                    "startIndex": 100,
                    "label": "label here",
                })
                func("createColorCards", "Constructor")
                arg("parent")
                arg("RALCodes", "define a variable as myVar = createColorsorting({\"RALCodes\": elaspixRALCodes })\n and pass myVar.getColors() here")
                arg("height_vh", "height in vh, here '30'")
                arg("startIndex", "the colorCard with that index is selected at start, here '100'")
                arg("label", "the label for the color select")
                arg("onChange", "function to call on change of the color")

                func("selectValue", "changes to the passed color")
                arg("aValue", "used as an array index")

                func("getRGBHex", "returns the Hex value of the currently selected color")

                func("getDescription", "currently returns a string that literally says 'the description'")

                func("hide")
                func("show")
                func("fadeOut")

                break;

            case "colorCardsFull":
                text("closure to choose among color cards, which span along the whole full width, desktop version", aName)

                let colorCardsFull = createColorCardsFull({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "height_card": "2em",
                    "height_container": "20em",
                    "label": "label here",
                    "startIndex": 100,
                    "useShowNames": true

                })

                func("createColorCardsFull", "Constructor")
                arg("parent")
                arg("RALCodes", "define a variable as myVar = createColorsorting({\"RALCodes\": elaspixRALCodes })\n and pass myVar.getColors() here")
                arg("height_card", "the height of each color card, has to be in 'em'")
                arg("height_container", "the height of the scrollable container, has to be in 'em'")
                arg("label", "the label for the color selector")
                arg("startIndex", "the color with this index is selected at start")
                arg("onChange", "function to call on change")
                arg("onExpand", "used to notify the other colorCards")
                arg("useShowNames", "boolean, if true show names are used attached to the RAL-Colors, here true")

                func("selectValue", "changes to the passed color")
                arg("aValue", "used as an array index")

                func("getRGBHex", "returns the Hex value of the currently selected color")

                func("getDescription", "currently returns a string that literally says 'the description'")

                func("hide")
                func("show")
                func("fadeOut")

                func("collapse", "shows a collapsed view")

                func("expand", "shows an expanded view")

                func("getLabel", "returns the label of currently selected color")

                func("scrollToActiveCard", "jumps to the currently selected color")

                func("scrollTo", "scrolls to passed color")
                arg("aValue", "index of the wanted color")
                break

            case "colorfan":
                text("closure to operate  a color fan", aName)
                let colorfan = createColorfan({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "spare": 10,
                    "width": "80%",
                    "widthFan": "80%",
                    "label": "label here",
                    "startIndex": 100,

                })
                func("createColofan", "Constructor")
                arg("parent")
                arg("RALCodes", "define a variable as myVar = createColorsorting({\"RALCodes\": elaspixRALCodes })\n and pass myVar.getColors() here")
                arg("spare", "number of strip-positions spared adjacent to the north-strip, here 10")
                arg("width", "CSS property")
                arg("widthFan", "CSS property, this is optional")
                arg("label", "the label for the color select")
                arg("startIndex", "the colorCard with that index is selected at start, here '100'")
                arg("onChange", "function to call on change of selected color")

                func("selectValue", "changes to the passed color")
                arg("aValue", "used as an array index")

                func("getStrips", "returns the array that contains all color strips")

                func("getRGBHex", "returns the Hex value of the currently selected color")

                func("getDescription", "currently returns a string that literally says 'the description'")

                func("hide")
                func("show")
                func("fadeOut")


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
