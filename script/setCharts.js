//根域名
var domain = 'http://192.168.1.149:8080/qa.startup/';

//ECharts风力图样式设置
var flOption = {
	title : {
	    text: '未来24小时风力风向变化',
	},
	tooltip : {
	    trigger: 'axis',
		formatter: "风力: <br/>{b}时 : {c}级"
	},
	legend: {
	    data:['风力风向']
	}, 
	calculable : false,
	xAxis : [
	    {
	        type : 'category',
	        boundaryGap : false,
	        data : []
	    }
	],
	yAxis : [
		{
			type : 'value',
			scale : true,
			axisLabel : {
				formatter: '{value}级'
			}
		}
	],
	series : [
		{
			name:'风力风向',
			type:'line',
			smooth:true,
			symbol: 'arrow',
			symbolSize: 6,
			data:[],			
			markPoint : {
				symbol: 'emptypin',
				symbolSize:8,
				data : [
					{type : 'max', name : '最高风力'},
					{type : 'min', name : '最低风力'}
				],
			}
		}
	]
};
//ECharts降水图样式设置
var jsOption = {
	title : {
	    text: '未来24小时降水变化',
	},
	tooltip : {
	    trigger: 'axis',
		formatter: "降水: <br/>{b}时 : {c}mm"
	},
	legend: {
	    data:['降水']
	}, 
	calculable : false,
	xAxis : [
	    {
	        type : 'category',
	        boundaryGap : false,
	        data : []
	    }
	],
	yAxis : [
		{
			type : 'value',
			scale : true,
			axisLabel : {
				formatter: '{value}'
			}
		}
	],
	series : [
		{
			name:'降水',
			type:'bar',
			smooth:true,
			data:[],			
			markPoint : {
				data : [
					{type : 'max', name : '最高降水'},
					{type : 'min', name : '最低降水'}
				]
			},
			markLine : {
				data : [
					{type : 'average', name : '平均值'}
				]
			}
		}
	]
};
//ECharts湿度图样式设置
var sdOption = {
	title : {
        text: '未来24小时湿度变化',
    },
	tooltip : {
        trigger: 'axis',
		formatter: "湿度: <br/>{b}时 : {c}%"
    },
	legend: {
        data:['湿度']
    },
	calculable : false,
	xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : []
        }
    ],
	yAxis : [
		{
			type : 'value',
			scale : true,
			axisLabel : {
                formatter: '{value} %'
            }
		}
	],
	series : [
		{
			name:'湿度',
			type:'line',
			smooth:true,
			data:[],
			markPoint : {
				data : [
					{type : 'max', name : '最高湿度'},
					{type : 'min', name : '最低湿度'}
				],
			},
			markLine : {
				data : [
					{type : 'average', name : '平均值'}
				]
			}
		}
	]
};
//ECharts温度图样式设置
var wdOption = {
	title : {
        text: '未来24小时温度变化',
    },
	tooltip : {
        trigger: 'axis',
		formatter: "温度: <br/>{b}时 : {c}°C"
    },
	legend: {
        data:['气温']
    },
	calculable : false,
	toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
			restore : {show: true},
			saveAsImage : {show: true}
		}
	},
	xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : []
		}
    ],
	yAxis : [
		{
			type : 'value',
			scale : true,
			axisLabel : {
                formatter: '{value} °C'
            }
		}
	],
	series : [
		{
			name:'气温',
			type:'line',
			smooth:true,
			data:[],
			markPoint : {
				data : [
					{type : 'max', name : '最高温度'},
					{type : 'min', name : '最低温度'}
				],
			},
			markLine : {
				data : [
					{type : 'average', name : '平均值'}
				]
			}
		}
	]
};
//获取时间轴
function getTimeAxis(data)
{
	var timeAxis = new Array();
	var datas = data.result.datas;
	for(var i=0;i<data.result.total;i++)
	{
		timeAxis.push(datas[i].h);
	}
	return timeAxis;
}
//获取风力数据
function getFlData(data)
{
	var qxData = new Array();
	var temp = new Object();
	var datas = data.result.datas;
	for(var i=0;i<data.result.total;i++)
	{
		var temp = new Object();
		temp.value = datas[i].fl;
		temp.symbolRotate = datas[i].fx;
		qxData.push(temp);
	}
	return qxData;
}
//获取降水数据
function getJsData(data)
{
	var qxData = new Object();
	qxData.jsData = new Array();
	qxData.isEmpty = true;
			
	var datas = data.result.datas;
	for(var i=0;i<data.result.total;i++)
	{
		if(datas[i].js!=0)
			qxData.isEmpty = false;
		qxData.jsData.push(datas[i].js);
	}
	return qxData;
}
//获取湿度数据
function getSdData(data)
{
	var qxData = new Array();
	var datas = data.result.datas;
	for(var i=0;i<data.result.total;i++)
	{
		qxData.push(datas[i].sd);
	}
	return qxData;
}

function getWdData(data)
{
	var qxData = new Array();
	var datas = data.result.datas;
	for(var i=0;i<data.result.total;i++)
	{
		qxData.push(datas[i].wd);
	}
	return qxData;
}

$('#wd').on(
	'click',
	function(){
		document.getElementById("mainFrame").src="chuzhou/wd.html";
	}
);
$('#sd').on(
	'click',
	function(){
		document.getElementById("mainFrame").src="chuzhou/sd.html";
	}
);
$('#js').on(
	'click',
	function(){
		document.getElementById("mainFrame").src="chuzhou/js.html";
	}
);
$('#flfx').on(
	'click',
	function(){
		document.getElementById("mainFrame").src="chuzhou/fl.html";
	}
);
$('#wsyt').on(
	'click',
	function(){
		$.ajax({
			type: 'GET',
			url: domain+'rest/v100/qxyt/statis',
			// data to be added to query string:
			data: { token: 'token' },
			// type of data we are expecting in return:
			dataType: 'json',
			success: function(data){
				document.getElementById("mainFrame").src= data.result;
			},
			error: function(xhr, type){
				alert('Ajax error!')
			}
		});
	}
);
$('#nyxb').on(
	'click',
	function(){
		document.getElementById("mainFrame").src=domain+"rest/v100/nyqx/statis?index=0";
	}
);
