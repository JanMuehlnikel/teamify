/*closure to show barCharts that update iteratively
supports groupped (multiple columns on the same Y-Achses grouped together for one nominal or ordinal value) columns, using the "new" google.charts.Bar (Material Design)
settings contain
	parent
	header:list of JSONObjects with structure {"type":...,"name":...}
		with type of string,date,datetime,number,boolean
	title
	subtitle
	[orientation] "horizontal" or "vertical" (default)
	[width] in px or % 
	[height] in px	
	requires
		Google-charts_loader-script
		check
	[omitCheckID] if present a checkbox is added to promote omission of the most frequent value, is requested by getDisableMostFrequent
	[onOmitCheck] event that is called when the checkbox is changed
	[legend] boolean to show or hide a legend
*/
function createBarChart(settings)
{
	var mContainer;
	var mChartContainer;
	var mDataTable;
	var mChart
	var mRows2Add=[];
	var mLoadingComplete=false;
	var mOptions;
	var mOmitCheck;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("barchart-container");
		settings.parent.append(mContainer);
		
		mChartContainer=$("<div/>").addClass("barchart-chart-container");
		mContainer.append(mChartContainer);
		
		if (settings.omitCheckID)
		{
			var checkContainer=$("<div/>").css("position","absolute").css("right","10px").css("top","10px");
			mContainer.append(checkContainer);
			mOmitCheck=createCheck({
			"parent":checkContainer,
			"id":settings.omitCheckID,
			"onChange":settings.onOmitCheck,
			"isclicked":"ein",
			"notclicked":"aus",
			"label":"disable most frequent"
			})
		
			
		}
		
	}
	
	function setup()
	{
		console.log("setup barChart");
		google.charts.load('current', {'packages':['bar']});
		google.charts.setOnLoadCallback(onLibLoaded);
		mContainer.css("position","relative");
	}
	
	function setupCSS()
	{
		if (settings.width)mChartContainer.css("width",settings.width);
		if (settings.height)mChartContainer.css("height",settings.height);
		
	}
	
	function onLibLoaded()
	{
		 mDataTable=new google.visualization.DataTable();
		 $.each(settings.header,function(index,headerJSON){
			mDataTable.addColumn(headerJSON.type,headerJSON.name) 
		 });
		 
		 // var data = google.visualization.arrayToDataTable([
          // ['Year', 'Sales', 'Expenses', 'Profit'],
          // ['2014', 1000, 400, 200],
          // ['2015', 1170, 460, 250],
          // ['2016', 660, 1120, 300],
          // ['2017', 1030, 540, 350]
        // ]);
		
		var orientation="vertical";
		if (settings.orientation)orientation=settings.orientation;

        mOptions = {
          chart: {
            title: settings.title,
            subtitle: settings.subtitle,
          },
          bars: orientation // Required for Material Bar Charts.
		  
        };
		if ((settings.legend!=undefined)&& (settings.legend==false))
		{
			mOptions["legend"]={"position":"none"};
		}
		
		 mChart = new google.charts.Bar(mChartContainer[0]);		 
		updateAndDraw();        
		mLoadingComplete=true;
	}
	
	function updateAndDraw()
	{
		mDataTable.addRows(mRows2Add);//eventually elements are already ready to be shown
		mRows2Add=[];//clear all elements		
		//console.log("mOptions",mOptions);
		mChart.draw(mDataTable, google.charts.Bar.convertOptions(mOptions));
		//console.log("draw barChart");
	}
	
	
	//aRow must have the same structure as given by settings.header
	function addRow(aRow){		
		
		mRows2Add.push(aRow);		
		
		if (mLoadingComplete)
		{
			updateAndDraw();
			if (mDataTable.getNumberOfRows()>60)
				{
					console.log("remove rows",aRow.length);
					mDataTable.removeRows(0,aRow.length);//removes as many as rows as new are inserted
				}			
		}
	}
	
	function clear()
	{
		//console.log("barChart is CLEARED");
		if (mDataTable)
		{
			mDataTable.removeRows(0,mDataTable.getNumberOfRows())
			updateAndDraw();
		}
		
	}
	
	function show()
	{
		mContainer.show();
	}
	
	function hide()
	{
		mContainer.hide();
	}
	 
	
	function getDisableMostFrequent()
	{
		if ((mOmitCheck!=undefined) && (mOmitCheck.getValue()=="ein"))return true;
		return false;
	}
	
	return {
		"addRow":addRow,
		"clear":clear,
		"show":show,
		"hide":hide,
		"getDisableMostFrequent":getDisableMostFrequent
	}
}