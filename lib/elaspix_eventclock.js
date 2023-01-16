
//Closure EventClock


/**
 *settings contains of
 *event: the event that is fired in case of the timer runs out,
 *cycle: the time in ms to check the clock
 **/
var createEventclock=function(settings){
	
	
	//private variables	
	var mTimeout;	
	
	function timeUp()
	{
		settings.event();
	}
	
	function start()
	{
		if (mTimeout!=undefined)
		{
			clearTimeout(mTimeout);
		}
		mTimeout=setTimeout(timeUp,settings.cycle);
	}
	
	function stop()
	{
		if (mTimeout!=undefined)
		{
			clearTimeout(mTimeout);
		}
	}
	
	
	
	
	//public return
	return {
		"start":start,
		"stop":stop
		
		
	};
}