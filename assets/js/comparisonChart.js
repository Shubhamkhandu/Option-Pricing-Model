var put_premium,call_premium,put_array,call_array;

function selective_chart(put_black_premium,call_black_premium,call_payoff_array,put_payoff_array){
	put_premium = put_black_premium;
	call_premium = call_black_premium;
	put_array = put_payoff_array;
	call_array = call_payoff_array;
	document.getElementById('2').style.backgroundColor = "white";
	document.getElementById('2').style.boxShadow ="0 10px 6px -6px #777";
     	document.getElementById('2').style.padding ="0 0 20px 20px";
     	document.getElementById('chart').innerHTML = '<div id="chartdiv" style="width: 100%;height: 500px;font-size: 11px;"></div>';
     	document.getElementById('chart').innerHTML +='<button class="btn btn-info btn-bar" onclick="display(1)"> Call Option </button>  ';
     	document.getElementById('chart').innerHTML +='<button class="btn btn-info btn-bar" onclick="display(2)"> Put Option </button> ';
     	display(1);    	
}

function linechart(title,data,blackschole){
	var chart = AmCharts.makeChart("chartdiv", {
	    "type": "serial",
	    "theme": "light",
	    "hideCredits":true,
	    "marginTop":0,
	    "marginRight": 80,
	    "titles": [{
		"text": title
	    }],
	    "legend": {
		"useGraphSettings": true,
		"valueText": ""
	    },
	    "dataProvider": generateChartData(data,blackschole),
	    "graphs": [{
		"id":"g1",
		"balloonText": "Monte Carlo<br><b><span style='font-size:14px;'>[[value]]</span></b>",
		"bullet": "round",
		"bulletSize": 2,
		"lineColor": "#FFC200",
		"lineThickness": 2,
		"negativeLineColor": "#637bb6",
		"type": "smoothedLine",
		"title": "MonteCarlo",
		"fillAlphas": 0,
		"valueField": "value"
	    },{
		"id":"g2",
		"balloonText": "BlackScholes<br><b><span style='font-size:14px;'>[[value]]</span></b>",
		"lineColor": "#228B22",
		"lineThickness": 2,
		"negativeLineColor": "#637bb6",
		"type": "smoothedLine",
		"title": "BlackScholes",
		"fillAlphas": 0,
		"valueField": "black"
	    }],
	    "chartScrollbar": {
		"graph":"g1",
		"gridAlpha":0,
		"color":"#888888",
		"scrollbarHeight":55,
		"backgroundAlpha":0,
		"selectedBackgroundAlpha":0.1,
		"selectedBackgroundColor":"#888888",
		"graphFillAlpha":0,
		"selectedGraphFillAlpha":0,
		"graphLineAlpha":0.2,
		"graphLineColor":"#c2c2c2",
		"selectedGraphLineColor":"#888888",
		"selectedGraphLineAlpha":1
	    },
	    "chartCursor": {
		"cursorAlpha": 0,
		"valueLineEnabled":true,
		"valueLineBalloonEnabled":true,
		"valueLineAlpha":0.5,
		"fullWidth":true
	    },
	    "categoryField": "simulation",
	    "categoryAxis": {
		"minorGridEnabled": false,
		"labelsEnabled": false
	    },
	    "export": {
		"enabled": true
	    }
	});
}
