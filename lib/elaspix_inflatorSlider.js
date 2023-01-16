/** Closure to inflate a menu with closure examples,
 * this menu is for sliders
 *
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorSliders(settings){

    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorModals: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "slider":
                text("Closure to manage a slider with labels", aName);
                let slider = createSlider({
                    "parent": parent(),
                    "id": "slider",
                    "label": "label here",
                    "unit": "unit here",
                    "values": ["value0", "value1", "value2", "value3"],
                    "scale": ["0", "5", "1"],
                })
                func("createSlider", "Constructor");
                arg("parent");
                arg("id");
                arg("label", "label here");
                arg("unit", "unit shown on the right, here 'm'");
                arg("values", "an array of values for the slider");
                arg("scale", "if no values are provided, this array sets the steps on the slider with:[min,max,scale]")
                arg("onChange", "function to be called when the slider is changed")

                func("getValue", "returns the current slider value")

                func("setHint", "changes the hint message")
                arg("aHint",)

                func("setValue", "changes the slider's value")
                arg("aValue")

                func("setBorderValues", "Changes the slider's range")
                arg("aMin")
                arg("aMax")

                func("hide")
                func("show")
                break;

            case "sliderWithEdit":
                text("closure to manage a slider with clickable, editable label", aName);
                let sliderWithEdit = createSliderWithEdit({
                    "parent": parent(),
                    "id": "sliderWithEdit",
                    "label": "label here",
                    "unit": "unit here",
                    "imageURLPath": "",
                    "values": ["0", "1", "2"],
                    "scale": [0, 5, 1],
                    "tooltip": "tooltip here",
                })
                func("createSliderWithEdit", "Constructor")
                arg("parent")
                arg("id")
                arg("label", "label here")
                arg("unit", "unit shown on the right, here 'm'")
                arg("imageURLPath", "note that: 'pics/edit-2.svg' is affixed at the end of your path")
                arg("values", "an array for slider values")
                arg("scale", "an array to set the scale of the slider, if no value is given: [min,max,interval]")
                arg("onChange", "function to call on slider change")
                arg("tooltip", "tooltip that is visible when you hover over the label")

                func("getValue", "returns current slider value")
                func("setValue", "sets a slider Value")
                arg("aValue")

                func("hide")
                func("show")

                func("setBorderValues", "changes min and max")
                arg("aMin")
                arg("aMax")
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