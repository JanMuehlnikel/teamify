/** Closure to inflate charts,
 * this inflator exposes the closure-call into function inflateClosure
 *	which can be called from the closureLibrary to show a preview
 * settings contain
 *  parent
 *
 *  requires:
 */

function createInflatorCharts(settings) {

    let mContent = settings.parent;
    let mFunctionTableBody = undefined;
    let mPresentationHelper = createPresentationHelper();
	var values=[20,40,70,130,200,220,190,160,130,130,80,40];
	var values2=[10,10,10,30,180,250,130,150,100,90,80,85];
	var indexInsertBarChart=0;
	var indexInsertLineChart=0;
	var mBarChart;
	var mLineChart;

    function inflate(aName) {
        console.log("inflatorCharts: inflate closure", aName);
        mContent.empty();
        mFunctionTableBody = undefined;
        switch (aName) {
            case "barChart":
                text("Provides a Bar-Chart using the google-Charts-API", aName);
                

				inflateClosure(aName,mContent);
				 


				func("createBarChart", "Constructor");
                arg("parent", "");
                arg("header", "list of JSONObjects with fields {\"type\",\"name\"}"),		
                arg("title", "");
                arg("subtitle", "");
                arg("[orientation]", "");
                arg("[width]", "");
                arg("[height]", "");
                arg("[omitCheckID]", "if provided the data-source can request whether duplicated shall be shown or not ");
                arg("[onOmitCheck]", "");
                arg("[legend]", "if false the legend is not shown");
                func("addRow", "adds a new row");
                arg("row:list", "an array, that must have same number of slots as the header has number of fields");
				func("clear", "");
				func("show", "");
				func("hide", "");
				func("getDisableMostFrequent", "returns boolean whether duplicates shall be shown or not");
                

				break;

            case "lineChart":
				
                text("Provides a Line-Chart using the google-Charts-API", aName);
                

				inflateClosure(aName,mContent);
				 


				func("createLineChart", "Constructor");
                arg("parent", "");
                arg("header", "list of JSONObjects with fields {\"type\",\"name\"}"),		
                arg("title", "");
                arg("subtitle", "");                
                arg("[width]", "");
                arg("[height]", "");                
                func("addRow", "adds a new row");
                arg("row:list", "an array, that must have same number of slots as the header has number of fields");
				
                
                
                break;


        }
    }
	
	
	
	function inflateClosure(aName,aParent)
	{
		
		switch (aName)
		{
			case "barChart":
				indexInsertBarChart=0;				
				mBarChart = createBarChart({
					"parent": aParent,
					"header":[{"type":"number","name":"Monat"},{"type":"number","name":"Anzahl"}],
					"title":"Eisverkauf pro Monat",
					"subtitle":"Anzahl von Speiseeis in Litern nach Monaten eines Jahres"			
				});	
				insertIntoBarChart();
			break;
			
			case "lineChart":
				indexInsertLineChart=0;
				mLineChart = createLineChart({
					"parent": aParent,
					"header":[{"type":"number","name":"Monat"},{"type":"number","name":"Anzahl"},{"type":"number","name":"Häufigkeit"}],
					"title":"Eisverkauf pro Monat",
					"subtitle":"Anzahl von Speiseeis in Litern nach Monaten eines Jahres"			
				});	
				insertIntoLineChart();
			break;
			
		}
		
		
		   
	}
	
	function insertIntoBarChart()
	{
		if (indexInsertBarChart<values.length)
		{
			
			mBarChart.addRow([indexInsertBarChart+1,values[indexInsertBarChart]]);
			setTimeout(insertIntoBarChart,100);
			indexInsertBarChart++;
		}
	}     
	
	function insertIntoLineChart()
	{
		if (indexInsertLineChart<values.length)
		{
			
			mLineChart.addRow([indexInsertLineChart+1,values[indexInsertLineChart],values2[indexInsertLineChart]]);
			setTimeout(insertIntoLineChart,100);
			indexInsertLineChart++;
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
		"inflateClosure":inflateClosure
    }
}
