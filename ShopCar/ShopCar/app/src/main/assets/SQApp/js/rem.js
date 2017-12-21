//rem js
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '46.875px';
            }else{
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//全局url;
//var baseUrl='http://192.168.1.159:8088';
//var baseUrl='http://192.168.1.11:8080';
//alert(localStorage.getItem('wifi'));
var baseUrl='http://jaaint.f3322.net:28080';
//if(localStorage.getItem('wifi')==1){
//	baseUrl='';
//}else{
//	baseUrl='http://jaaint.f3322.net:28080';
//}


function openUrl(url){
	mui.openWindow({
		url:url, //需要打开页面的url地址 
		id:url,  //需要打开页面的url页面id
		show:{
			duration:'300'
		}
	})
}
//判断是否登录
function isLogin(){
	var userId=plus.storage.getItem('userId');
	console.log(userId==undefined);
	if(userId!=undefined){
		openUrl('index.html');
	}else{
		openUrl('login.html');
	}
}

//拖放
function dropEffect(){
    MobileDragDrop.polyfill({
        // use this to make use of the scroll behaviour
        dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
    });
    var dragTr = $("#dragTable tr");
    var len = dragTr.length;
    var dragElement = null;
    var direc = 0;
    for (var i = 1; i < len; i++) {
        dragTr.eq(i).get(0).addEventListener('dragstart', function (ev) {
            dragElement = this;
            //ev.dataTransfer.effectAllowed = "move";
        }, false);
        dragTr.eq(i).get(0).addEventListener('dragenter', function (ev) {
            ev.preventDefault();
        }, false);
        dragTr.eq(i).get(0).addEventListener('drop', function (ev) {
            if (dragElement !== this) {
                if ($(this).index() > $(dragElement).index()) {
                    $(this).after($(dragElement));
                } else {
                    $(this).before($(dragElement));
                }
            }
        }, false)
    }
    document.ondragover = function (ev) {
        ev.preventDefault();
        //ev.dataTransfer.dropEffect = "move";
    };
//   document.ondrop = function(ev){
//       ev.preventDefault();
//   }
}

//折线图
function echartLine(id,lastData,currentData){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上周','本周']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'17%',
                    x2:'17%',
                    y:'23%',
                    y2:'23%',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'上周',
                        type:'line',
                        data:lastData
                    },
                    {
                        name:'本周',
                        type:'line',
                        data:currentData
                    }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}
//折线图
function echartLine3(id,currentData,sdate){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'axis'
                },
//              legend: {
//                  data:['上周','本周']
//              },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'17%',
                    x2:'17%',
                    y:'18%',
                    y2:'23%',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : sdate,
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'本周',
                        type:'line',
                        data:currentData
                    }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}
//折线图2
function echartLine2(id,xData,sData1,sData2,sData3){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['售价','客流','进价']
//                  itemGap: 5
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'12%',
                    x2:'18%',				
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        show:false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        }
//                      show:false
                    }
                ],
                series : [
                    	{
                            name:'售价',
                            type:'line',
                            data:sData1
                        },
                        {
                            name:'客流',
                            type:'line',
                            data:sData2
                        },
                        {
                            name:'进价',
                            type:'line',
                            data:sData3
                        }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}

//折线图echartLineNew
function echartLineNew(xData,sData1,sData2,sData3,sData4){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/line'
        ],
        function(ec){
        	//售价
            var options1 = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'0px',
                    x2:'5px',
                    y:'20px',
                    y2:'20px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        show:false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        show:false
                    }
                ],
                series : [
                    	{
                            name:'售价',
                            type:'line',
                            symbol:'none',
                            data:sData1,
                            itemStyle : {    
			                    normal : {    
			                        lineStyle:{    
			                            color:"#fa3419"    
			                        }   
			                    }    
			                }  
                       }
                ]
           };
            var charLine1 = ec.init(document.getElementById("tCanvasNew1"));
            charLine1.setOption(options1);
            
            //销售额
            var options2 = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'0px',
                    x2:'5px',
                    y:'5px',
                    y2:'5px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        show:false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        show:false
                    }
                ],
                series : [
                    	{
                            name:"销售额",
                            type:'line',
                            symbol:'none',
                            data:sData2,
                            itemStyle : {    
			                    normal : {    
			                        lineStyle:{    
			                            color:"#ff9966"    
			                        }   
			                    }    
			                },
			                markLine : {
				                data : [
				                    {type : 'average', name: '平均值'}
				                ],
				                symbol:'none',
				                itemStyle : {    
				                    normal : {    
				                        lineStyle:{    
				                            color:'#ccc'    
				                        },
				                        label:{
				                        	show: true,
    										position:'top',
    										textStyle:{
    											color:'#000'
    										}
				                        }
				                    }    
				                }
				            }
                       }
                ]
           };
            var charLine2 = ec.init(document.getElementById("tCanvasNew2"));
            charLine2.setOption(options2);
            
            //售价
            var options3 = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'0px',
                    x2:'5px',
                    y:'15px',
                    y2:'20px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        show:false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        show:false
                    }
                ],
                series : [
                    	{
                            name:"售价",
                            type:'line',
                            symbol:'none',
                            data:sData3,
                            itemStyle : {    
			                    normal : {    
			                        lineStyle:{    
			                            color:"#7de875"    
			                        }   
			                    }    
			                }  
                       }
                ]
           };
            var charLine3 = ec.init(document.getElementById("tCanvasNew3"));
            charLine3.setOption(options3);
            
            //客流
            var options4 = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'0px',
                    x2:'20px',
                    y:'15px',
                    y2:'15px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        show:false
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        },
                        show:false
                    }
                ],
                series : [
                    	{
                            name:"客流",
                            type:'line',
                            symbol:'none',
                            data:sData4,
                            itemStyle : {    
			                    normal : {    
			                        lineStyle:{    
			                            color:"#ff9966"    
			                        }   
			                    }    
			                }
                       }
                ]
           };
            var charLine4 = ec.init(document.getElementById("tCanvasNew4"));
            charLine4.setOption(options4);
        }
    )
}

//折线图
function echartLine4(id,sdata1,sdata2){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上周','本周']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'12%',
                    x2:'18%',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'上周',
                        type:'line',
                        data:sdata1
                    },
                    {
                        name:'本周',
                        type:'line',
                        data:sdata2
                    }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}
//生鲜盈亏折线图

//饼图
function echartPie(id,sData1,sData2,sData3){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
              	toolbox: {
                  	show : false,
                  	feature : {
                      	mark : {show: true},
                      	dataView : {show: true, readOnly: false},
                      	magicType : {
                          	show: true,
                          	type: ['pie', 'funnel'],
                          	option: {
                              	funnel: {
                                  	x: '25%',
                                  	width: '50%',
                                  	funnelAlign: 'left',
                                  	max: 1548
                              	}
                              }
                          },
                          restore : {show: true},
                          saveAsImage : {show: true}
                      }
              	},
              	calculable : false,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '45%'],
                        data:[
                            {value:sData1, name:'促销'},
                            {value:sData2, name:'折价'},
                            {value:sData3, name:'正价'}
                        ]
                    }
                ]
            };
            var charPie = ec.init(document.getElementById(id));
            charPie.setOption(options);
        }
    )
}


//柱形图1
function echartBar(id,xData,sData1,sData2){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
	            	tooltip : {
	                    trigger: 'item',
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
                    legend: {
                        data:['库存','销量']
                    },
                    calculable : false,
                    grid: {
	                    x:'20px',
	                    x2:'40px',
	                    y:'40px',
	                    y2:'40px',
	                    borderWidth :'0px'
	                },
                    xAxis : [
                        {
                            type : 'category',
                            data : xData,
                            splitLine:{
				            	show:false
				         	},
				         	axisTick: {
						        show: false
						    }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            show:false
                        }
                    ],
                    series : [
                        {
                            name:'库存',
                            type:'bar',
                            data:sData1,
                            itemStyle: {normal: {color: '#ff9d74'}}
                        },
                        {
                            name:'销量',
                            type:'bar',
                            data:sData2,
                            itemStyle: {normal: {color: '#ffe569'}}
                        }
                    ]
                }
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
        }
    )
}

//柱形图2
function echartBar2(id,sData1,sData2){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                    calculable : true,
                    grid: {
                        x:0,
                        y:0,
                        x2:0,
                        y2:0,
                        top: '0%',
                        left: '0%',
                        right: '10%',
                        bottom:'0%',
                        containLabel: true,
                        borderWidth :'0px'
                    },
                    xAxis: [
                        {
                            show:false,
                            splitLine:{show: false},//去除网格线
                            type : 'category',
                            data :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                        }
                    ],
                    yAxis: [
                        {
                            show:false,
                            splitLine:{show: false},//去除网格线
                            type : 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series : [
                        {
                            name: '销量',
                            type: 'bar',
                            data:sData1
                        }
                    ]
                };
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
        }
    )
}



//柱形图3
function echartBar3(id){
    require.config({
        paths: {
            echarts: './js/echart'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],
        function(ec){
            var options = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上周','本周']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
                    }
                },
                calculable : false,
                grid: {
                    x:'12%',
                    x2:'18%',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:'上周',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                    },
                    {
                        name:'本周',
                        type:'line',
                        data:[1, 6, 2, 5, 3, 2, 0],
                    }
                ]
           };
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
        }
    )
}