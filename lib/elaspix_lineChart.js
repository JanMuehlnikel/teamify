/*closure to show lineCharts that update iteratively

settings contain
	parent
	header:list of JSONObjects with structure {"type":...,"name":...}
		with type number, the first is the X-Axis-position
		supports multiple lines that are drawn on the same X-Axis
	title
	subtitle	
	[width] in px or % 
	[height] in px
	[autoIncrement] difference to be incremented on the X-Axis
	
	requires
		Google-charts_loader-script


*/
function createLineChart(settings)
{
	var mContainer;
	var mDataTable;
	var mChart
	var mRows2Add=[];
	var mLoadingComplete=false;
	var mOptions;
	var mRowNumber;
	var mAutoIncrementValue;
	
	inflate();
	setup();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("linechart-container");
		settings.parent.append(mContainer);
	}
	
	function setup()
	{
		mRowNumber=0;
		mAutoIncrementValue=1;
		if (settings.autoIncrement)mAutoIncrementValue=settings.autoIncrement;
		google.charts.load('current', {'packages':['line']});
		google.charts.setOnLoadCallback(onLibLoaded);
	}
	
	function setupCSS()
	{
		if (settings.width)mContainer.css("width",settings.width);
		if (settings.height)mContainer.css("height",settings.height);
		
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
		
		

        mOptions = {
          chart: {
            title: settings.title,
            subtitle: settings.subtitle,
          }
         
        };
		
		 mChart = new google.charts.Line(mContainer[0]);
		 
		if (mRows2Add.length>0)updateAndDraw();//does not work with empty mRows2Add
        
		mLoadingComplete=true;
	}
	
	function updateAndDraw()
	{
		//console.log("add rows",mRows2Add);
		mDataTable.addRows(mRows2Add);//eventually elements are already ready to be shown
		mRows2Add=[];//clear all elements
		mChart.draw(mDataTable, google.charts.Line.convertOptions(mOptions));
	}
	
	
	//aRow must have the same structure as given by settings.header
	//the first element is the line-Number and is incremented automatically by 1
	function addRowAutoIncrement(aRowArray){
		//console.log("aRow",aRowArray);
		
		mRowNumber+=mAutoIncrementValue;
		aRowArray.unshift(mRowNumber)
		//console.log("aRow after adding column-nr",aRowArray);
		mRows2Add.push(aRowArray);
		
		if (mLoadingComplete)
		{
			updateAndDraw();
		}
	}
	
	//aRow must have the same structure as given by settings.header
	function addRow(aRowArray){		
		
		mRows2Add.push(aRowArray);		
		if (mLoadingComplete)
		{
			updateAndDraw();
		}
	}
	
	return {
		"addRow":addRow,
		"addRowAutoIncrement":addRowAutoIncrement
	}
}