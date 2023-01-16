/* closure to manage a table with clickable rows

settings contains
	parent
	head: array of heads
	indexKey: which column is used as key
	[indexTimestamp] the column that is transformed to a readable date
	[onClick] callback function to be called
	[setColor] has key indexColor:int and color: Dict of {<value>,<color-class>}
	[hideKey] if true does not show the key in the table (otherweise must also be provided as col in constructor)
	[valueType] either text (default) or html (with html a non-breaking space &nbsp; can be used)
	requires
		moment-library to convert date from timestamp
*/

function createClickTable(settings)
{
	var mContainer;
	var mTable;
	var mBody;
	
	var mRows={};//access rows using a key
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("button-table-container");
		settings.parent.append(mContainer);
		mTable=$("<table/>");
		mContainer.append(mTable);
		
		var thead=$("<thead/>");
		mTable.append(thead);
		var tr=$("<tr/>");
		thead.append(tr);
		$.each(settings.head,function(index,headname){
			var th=$("<th/>").text(headname);
			tr.append(th);
		});
		//tr.append($("<th/>").text("operation"));
		
		mBody=$("<tbody/>");
		mTable.append(mBody);
		
		console.log("indexTimestamp=",settings.indexTimestamp);
	}
	
	function setupCSS()
	{
		mTable.css("border-collapse","separate");
		mTable.css("border-spacing","1em 0.5em");
		mTable.css("padding",".5em");
		
	}
	
	//adds a row, must have same number of cols as in header
	//if the row has already been added earlies it updates the columns
	function addRow(aValues)
	{
		
		
		var key=aValues[settings.indexKey];
		
		if (mRows.hasOwnProperty(key))
		{
			//console.log("update",key,aValues);
			updateRow(mRows[key],aValues);
		}else
		{
			
			var row=$("<tr/>");
			row.css("cursor","pointer");
			
			if (settings.setColor)
			{
				var colorIndicatingValue=aValues[settings.setColor.indexColor];
				console.log("colorIndicatingValue",colorIndicatingValue);
				if (settings.setColor.classes.hasOwnProperty(colorIndicatingValue))
				{
					row.addClass(settings.setColor.classes[colorIndicatingValue]);
				}
			}
			
			row.hover(function(){row.addClass("bg-light");},function(){row.removeClass("bg-light");});
			
			var cols=[];
			$.each(aValues,function(index,value){
				
				
				if ((settings.hideKey==undefined) || (index!=settings.indexKey))
				{
				
					//console.log("index=",index,"settings.indexTimestamp",settings.indexTimestamp);
					if (settings.indexTimestamp!=undefined && index==settings.indexTimestamp)
					{
						value=convertTimestamp2Date(value);
						//console.log("convert timestamp to date");
					}
					
					var td=$("<td/>").text(value);
					if (settings.valueType=="html")td=$("<td/>").html(value);
					
					//if (index==5)td.css("text-align","right");//Preis rechtsbündig
					row.append(td);
					cols.push(td);
				}
				
			});
			
			
			// var button=$("<button/>").addClass("btn btn-outline-primary");
			// var spinner=$("<span/>").addClass("spinner-border spinner-border-sm").attr("role","status").addClass("ms-1");
			// spinner.hide();
			// var buttonText=$("<span/>").text(aButtonText);
			// button.append(buttonText);
			// button.append(spinner);
			
			if (settings.onClick)
			{
				row.on("click",function(){settings.onClick(key);});
			}
			
			// row.append(button);
			mBody.append(row);			
			mRows[key]={"key":key,"values":aValues,"cols":cols,"row":row};
		}
	}
	
	function updateRow(aRenderAppJSON,aValues)
	{
		if (aValues.length==aRenderAppJSON.cols.length)
		{
			var i=0;
			
			type=aValues[0];
			//change color based on type?
			
			$.each(aValues,function(index,newValue){
				
				
				if (settings.indexTimestamp!=undefined && index==settings.indexTimestamp)newValue=convertTimestamp2Date(newValue);
				
				var old=aRenderAppJSON.cols[i].text();
				aRenderAppJSON.cols[i].text(newValue);
				if (old!=newValue)
				{
					aRenderAppJSON.cols[i].animate({"opacity":"0"},500,function(){$(this).css("opacity","");});
				}
				i++;
			});
		}
	}
	
	function convertTimestamp2Date(aTimestamp)
	{		
		return moment(aTimestamp).format("DD.MM.YY");
	}
	
	function show()
	{
		mContainer.show();
	}
	
	function hide()
	{
		mContainer.hide();
	}

	
	
	function empty()
	{
		mRows={};
		mBody.empty();
	}
	
	
	
	
	
	return {
		"addRow":addRow,				
		"empty":empty,
		"show":show,
		"hide":hide
		
	}
	
}

