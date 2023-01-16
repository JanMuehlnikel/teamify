/*
 *
 *closure to provide sorting of colors
 *settings contain
 *	RALCodes: JSONOBject with RAL-Colors as keys
 *
 */
function createColorsorting(settings)
{

	var mColors=[];//will store all RAL Colors as Array
	
	fill();
	setup();
	function fill()
	{
		var numbKeys=Object.keys(settings.RALCodes).length;
		for (var i=0;i<numbKeys;i++)
		{
			var keyName=Object.keys(settings.RALCodes)[i];
			var RALCode=settings.RALCodes[keyName];
			
			var rgbLine=RALCode.rgb;
			var r=Number(rgbLine.substring(0,3));
			var g=Number(rgbLine.substring(4,7));
			var b=Number(rgbLine.substring(8,11));
			
			RALCode.r=r;
			RALCode.g=g;
			RALCode.b=b;
			RALCode.code=Number(RALCode.code);
			RALCode.index=i;
			
						
			mColors.push(RALCode);
		}
		
	}
	
	function setup()
	{
		mColors.sort(sortFunctionCode);
		mColors.reverse();
	}
	
	function gam_sRGB(v)
	{
		if (v<0.04045)
		{
			v=v*12.92;
		}else
		{
			v=1.055*Math.pow( v+0.055/1.055,2.4);
		}
		return v*255;
	}
	
	
	//compares brightness and returns -1,0,1 
	function sortBrightness(code1,code2)
	{
		//var brightness1=code1.
	}
	
	//compares to number
	function sortFunctionCode(code1,code2)
	{
		if (code1<code2)return -1;
		if (code1>code2)return 1;
		return 0;
	}
	
	function getColors()
	{
		return mColors;
	}
	
	return {
		"getColors":getColors
	};
}