/* closure to manage a table with buttons

settings contains
	parent
	head: array of heads, another columns is added for the button
	
	[onClick] callback function to be called
*/

function createButtonTable(settings) {
    var mContainer;
    var mTable;
    var mBody;

    var mRows = {};//the key to this dict is col[1]@col[0] which is appname @ IP:Port

    inflate();
    setupCSS();

    function inflate() {
        mContainer = $("<div/>").addClass("button-table-container");
        settings.parent.append(mContainer);
        mTable = $("<table/>");
        mContainer.append(mTable);

        var thead = $("<thead/>");
        mTable.append(thead);
        var tr = $("<tr/>");
        thead.append(tr);
        $.each(settings.head, function (index, headname) {
            var th = $("<th/>").text(headname);
            tr.append(th);
        });
        //tr.append($("<th/>").text("Änderung"));

        mBody = $("<tbody/>");
        mTable.append(mBody);
    }

    function setupCSS() {
        mTable.css("border-collapse", "separate");
        mTable.css("border-spacing", "1em 0.5em");
        mTable.css("padding", ".5em");
        mBody.css("vertical-align", "top");

    }

    //adds a row, must have same number of cols as in header
    //if the row has already been added earlies it updates the columns
    function addRow(aValues, aButtonText) {

        var state = aValues[1];//used for coloring

        //var key=aValues[1]+"@"+aValues[0];//key must be unique among all rows
        var key = aValues[0];//key must be unique among all rows
        if (mRows.hasOwnProperty(key)) {
            //console.log"update",key,aValues);
            updateRow(mRows[key], aValues, aButtonText);
        } else {
            var row = $("<tr/>");

            if (state == 0) row.css("color", "lightgray");
            var cols = [];
            $.each(aValues, function (index, value) {
                var td = $("<td/>").text(value);
                row.append(td);
                cols.push(td);

            });
            var button = $("<button/>").addClass("btn btn-outline-secondary");
            var spinner = $("<span/>").addClass("spinner-border spinner-border-sm").attr("role", "status").addClass("ms-1");
            spinner.hide();
            var buttonText = $("<span/>").text(aButtonText);
            button.append(buttonText);
            button.append(spinner);

            if (settings.onClick) {
                button.on("click", function(){
                    spinner.show();
                    settings.onClick(key);
                });
            }

            row.append(button);
            mBody.append(row);
            mRows[key] = {
                "key": key,
                "values": aValues,
                "buttonText": buttonText,
                "spinner": spinner,
                "cols": cols,
                "row": row
            };
        }
    }

    function updateRow(aRenderAppJSON, aValues, aButtonText) {
        if (aValues.length == aRenderAppJSON.cols.length) {
            var i = 0;

            var state = aValues[5];

            if (state == false) aRenderAppJSON.row.css("color", "lightgray");
            if (state == true) aRenderAppJSON.row.css("color", "");

            $.each(aValues, function (index, newValue) {

                var old = aRenderAppJSON.cols[i].text();
                aRenderAppJSON.cols[i].text(newValue);

                if (old != newValue) {
                    aRenderAppJSON.cols[i].animate({"opacity": "0"}, 500, function () {
                        $(this).css("opacity", "");
                    });
                }
                i++;
            });
            aRenderAppJSON.buttonText.text(aButtonText);
        }
    }

    function setButtonText(aText) {
        $.each(mRows, function (key, renderAppJSON) {
            renderAppJSON.buttonText.text(aText);
        });
    }

    //hides the busy spinner
    function unBusy(aKey) {
        if (mRows.hasOwnProperty(aKey)) {
            mRows[aKey].spinner.hide("slow");
        }
    }

    function get(aKey) {
        if (mRows.hasOwnProperty(aKey)) {
            return mRows[aKey];
        } else {
            return undefined;
        }
    }

    function removeRow(key) {
        mRows[key]["row"].remove();
        delete mRows[key];
    }

    function getRows() {
        var rowsExtracted = [];
        $.each(mRows, function (key, rowJSON) {
            rowsExtracted.push(rowJSON.values);
        });
        return rowsExtracted;
    }


    return {
        "addRow": addRow,
        "setButtonText": setButtonText,
        "unBusy": unBusy,
        "get": get,
        "removeRow": removeRow,
        "getRows": getRows
    }

}

