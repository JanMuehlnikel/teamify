/**
 * Inflator for tables
 *
 * settings contain:
 *  parent
 *
 *  requires
 */

function createInflatorTables(settings) {
    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();

    function inflate(aName) {
        console.log("inflatorDialogs: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;

        switch (aName) {
            case "buttonTable":
                text("A table that has a button at the end of each row, useful for data interaction", aName);
                let buttonTable = createButtonTable({
                    "parent": parent(),
                    "head": ["head1", "head2", "head3"],
                    "indexKey": 0,
                    "indexTimestamp": 1,
                    "hideKey": true,
                    "valueType": "html",

                })
                buttonTable.addRow(["data01", "data02", "data03"], "buttonText0");
                buttonTable.addRow(["data11", "data12", "data13"], "buttonText1");
                func("createButtonTable", "Constructor");
                arg("parent", "");
                arg("head", "array of headers i.e. ['head1','head2']");
                arg("indexKey", "index of the key to identify the rows, usually the ID or likewise, often 0, as it should be your first entry");
                arg("indexTimestamp", "the column that is transformed to a readable date");
                arg("hideKey", "a boolean usually 'true', if true does not show the key in the table (otherweise must also be provided as col in constructor)");
                arg("valueType", "either text (default) or html (with html a non-breaking space &nbsp; can be used)");

                func("addRow", "adds a row");
                arg("aValues", "array of data for the row");
                arg("aButtonText", "text for the button on the row");

                func("setButtonText", "sets a new text for *ALL* rows");
                arg("aText", "")

                func("unBusy", "stops the spinner on the given key");
                arg("aKey", "the key identifier of the row to stop the spinner in")

                func("get", "returns the row, based on the key");
                arg("aKey", "the key identifier");

                func("removeRow", "removes a row based on the passed key");
                arg("key", "the key identifier");

                func("getRows", "returns all rows in an array");
                break;

            case "clickTable":
                text("A table where the rows are clickable", aName)
                let clickTable = createClickTable({
                    "parent": parent(),
                    "head": ["head1", "head2", "head3"],
                    "indexKey": 0,
                    //"indexTimestamp":1,
                    "hideKey": true,
                })
                clickTable.addRow(["data01", "data02", "data03"]);
                clickTable.addRow(["data11", "data12", "data13"]);
                func("createButtonTable", "Constructor");
                arg("parent", "");
                arg("head", "array of headers i.e. ['head1','head2']");
                arg("indexKey", "index of the key to identify the rows, usually the ID or likewise, often 0, as it should be your first entry");
                arg("indexTimestamp", "the column that is transformed to a readable date, note that this requires the moment-libary");
                arg("onCLick", "function to be called on click of a row");
                arg("setColor", "has key 'indexColor:int' and color: Dict of {<value>,<color-class>}")
                arg("hideKey", "a boolean usually 'true', if true does not show the key in the table (otherweise must also be provided as col in constructor)");
                arg("valueType", "either text (default) or html (with html a non-breaking space &nbsp; can be used)");
                func("addRow", "")
                arg("aValues", "array of data to build the row, the order is important")
                func("empty", "empties the table");
                func("show");
                func("hide");
                break
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