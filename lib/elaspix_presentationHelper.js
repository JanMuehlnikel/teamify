/**
 * This class is suppossed to help you display/present content
 * it is introduced to fight code-duplication
 *
 * it is still a closure to insure scopes
 *
 */

    function createPresentationHelper(){

        function text(aText, aTitle, aContent){
            if (aTitle) aContent.append($("<h5/>").text(aTitle));
            aContent.append($("<p/>").text(aText));
        }

	//adds an entry into the function-Table
    function func(aFunctionName, aDescription,aFunctionTableBody,aContent) {
        if (aFunctionTableBody === undefined) {
            let functionTable = $("<table/>").addClass("table-sm table mt-4 mb-5");
            aContent.append(functionTable);

            let thead = $("<thead/>");
            functionTable.append(thead);

            let tr = $("<tr/>");
            thead.append(tr);
            tr.append($("<th/>").text("Function").attr("scope", "col"));
            tr.append($("<th/>").text("Argument").attr("scope", "col"));
            tr.append($("<th/>").text("Description").attr("scope", "col"));

            aFunctionTableBody = $("<tbody/>");
            functionTable.append(aFunctionTableBody);

        }

        var tr = $("<tr/>");
        aFunctionTableBody.append(tr);
        tr.append($("<th/>").text(aFunctionName));
        tr.append($("<td/>").text(""));
        tr.append($("<td/>").text(aDescription));

        return aFunctionTableBody
    }

	//adds an parameter Entry into the function-Table
    function arg(aArgumentName, aDescription,aFunctionTableBody) {
        if (aFunctionTableBody) {
            var tr = $("<tr/>");
            aFunctionTableBody.append(tr);
            tr.append($("<th/>").text(""));
            tr.append($("<td/>").text(aArgumentName));
            tr.append($("<td/>").text(aDescription));
        }
    }

        return{
            "text":text,
            "func":func,
            "arg":arg,
        }

}