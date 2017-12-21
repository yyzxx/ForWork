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

//(function(global){
//    function remChange(){
//        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px';
//    }
//    remChange();
//    global.addEventListener('resize',remChange,false);
//})(window);

//options are optional ;)

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
            ev.dataTransfer.effectAllowed = "move";
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
        ev.dataTransfer.dropEffect = "move";
    };
//   document.ondrop = function(ev){
//       ev.preventDefault();
//   }
}

//折线图
function echartLine(id){
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
//              title : {
//                 text: '未来一周气温变化',
//                 subtext: '纯属虚构'
//              },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上周','本周']
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
//                  y:0,
//                  y2:0,
//                  top: '0%',
//                  left: '0%',
//                  right: '10%',
//                  bottom:'0%',
//                  containLabel: true,
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
//                      boundaryGap : false,
//						show:false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
//                      splitArea: {
//							show: true
//						}
//						show:false,
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
//                      markPoint : {
//                          data : [
//                              {type : 'max', name: '最大值'},
//                              {type : 'min', name: '最小值'}
//                          ]
//                      },
//                      markLine : {
//                          data : [
//                              {type : 'average', name: '平均值'}
//                          ]
//                      }
                    },
                    {
                        name:'本周',
                        type:'line',
                        data:[1, 6, 2, 5, 3, 2, 0],
//                      markPoint : {
//                          data : [
//                              {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
//                          ]
//                      },
//                      markLine : {
//                          data : [
//                              {type : 'average', name : '平均值'}
//                          ]
//                      }
                    }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
//          window.onresize = function(){
//              charLine.resize();
//          }
        }
    )
}

//折线图2
function echartLine2(id){
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
//              title : {
//                 text: '未来一周气温变化',
//                 subtext: '纯属虚构'
//              },
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
//                  y:0,
//                  y2:0,
//                  top: '0%',
//                  left: '0%',
//                  right: '10%',
//                  bottom:'0%',
//                  containLabel: true,
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
//                      boundaryGap : false,
//						show:false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
//                      splitArea: {
//							show: true
//						}
//						show:false,
                        axisLabel : {
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    	{
                            name:'售价',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
//                          markPoint : {
//                              data : [
//                                  {type : 'max', name: '最大值'},
//                                  {type : 'min', name: '最小值'}
//                              ]
//                          },
//                          markLine : {
//                              data : [
//                                  {type : 'average', name: '平均值'}
//                              ]
//                          }
                        },
                        {
                            name:'客流',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
//                          markPoint : {
//                              data : [
//                                  {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
//                              ]
//                          },
//                          markLine : {
//                              data : [
//                                  {type : 'average', name : '平均值'}
//                              ]
//                          }
                        },
                        {
                            name:'进价',
                            type:'line',
                            data:[3, -2, 7, 8, 9, 2, 10],
//                          markPoint : {
//                              data : [
//                                  {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
//                              ]
//                          },
//                          markLine : {
//                              data : [
//                                  {type : 'average', name : '平均值'}
//                              ]
//                          }
                        }
                ]
           };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
//          window.onresize = function(){
//              charLine.resize();
//          }
        }
    )
}


//饼图
function echartPie(id){
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
//              title : {
//                  text: '某站点用户访问来源',
//                  subtext: '纯属虚构',
//                  x:'center'
//              },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
//            	legend: {
//                	orient : 'vertical',
//                	x : 'left',
//                	data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//            	},
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
                            {value:335, name:'促销'},
                            {value:310, name:'折价'},
                            {value:234, name:'正价'}
                        ]
                    }
                ]
            };
            var charPie = ec.init(document.getElementById(id));
            charPie.setOption(options);
//          window.onresize = function(){
//              charPie.resize();
//          }
        }
    )
}


//柱形图1
function echartBar(id){
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
//                    title : {
//                        text: '某地区蒸发量和降水量',
//                        subtext: '纯属虚构'
//                    },
//                    tooltip : {
//                        trigger: 'axis'
//                    },
                    legend: {
                        data:['库存','销量']
                    },
//                    toolbox: {
//                        show : true,
//                        feature : {
//                            mark : {show: true},
//                            dataView : {show: true, readOnly: false},
//                            magicType : {show: true, type: ['line', 'bar']},
//                            restore : {show: true},
//                            saveAsImage : {show: true}
//                        }
//                    },
                    calculable : false,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'库存',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
//                            markPoint : {
//                                data : [
//                                    {type : 'max', name: '最大值'},
//                                    {type : 'min', name: '最小值'}
//                                ]
//                            },
//                            markLine : {
//                                data : [
//                                    {type : 'average', name: '平均值'}
//                                ]
//                            }
                        },
                        {
                            name:'销量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
//                            markPoint : {
//                                data : [
//                                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
//                                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
//                                ]
//                            },
//                            markLine : {
//                                data : [
//                                    {type : 'average', name : '平均值'}
//                                ]
//                            }
                        }
                    ]
                }
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
//          window.onresize = function(){
//              charBar.resize();
//          }
        }
    )
}

//柱形图2
function echartBar2(id){
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
//                    tooltip : {
//                        trigger: 'axis',
//                        axisPointer: {
//                            type: 'shadow',
//                            label: {
//                                show: true
//                            }
//                        }
//                    },
//                    toolbox: {
//                        show : true,
//                        feature : {
//                            mark : {show: true},
//                            dataView : {show: true, readOnly: false},
//                            magicType: {show: true, type: ['line', 'bar']},
//                            restore : {show: true},
//                            saveAsImage : {show: true}
//                        }
//                    },
                    calculable : true,
//                    legend: {
//                        data:['Growth', 'Budget 2011', 'Budget 2012'],
//                        itemGap: 5
//                    },
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
                            data :['1月','2月','3月','4月','5月','6月','7月','1月','2月','3月','4月','5月','6月','7月'],
//                            splitArea : {show : true}//保留网格区域
                        }
                    ],
                    yAxis: [
                        {
                            show:false,
//                            splitArea : {show : true},//保留网格区域
                            splitLine:{show: false},//去除网格线
                            type : 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
//                    dataZoom: [
//                        {
//                            show: true,
//                            start: 94,
//                            end: 100
//                        },
//                        {
//                            type: 'inside',
//                            start: 94,
//                            end: 100
//                        },
//                        {
//                            show: true,
//                            yAxisIndex: 0,
//                            filterMode: 'empty',
//                            width: 30,
//                            height: '80%',
//                            showDataShadow: false,
//                            left: '93%'
//                        }
//                    ],
                    series : [
                        {
                            name: 'Budget 2011',
                            type: 'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
                        },
                        {
                            name: 'Budget 2012',
                            type: 'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
                        }
                    ]
                };
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
//          window.onresize = function(){
//              charBar.resize();
//          }
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
//              title : {
//                 text: '未来一周气温变化',
//                 subtext: '纯属虚构'
//              },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上周','本周']
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
//                  y:0,
//                  y2:0,
//                  top: '0%',
//                  left: '0%',
//                  right: '10%',
//                  bottom:'0%',
//                  containLabel: true,
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
//                      boundaryGap : false,
//						show:false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        splitLine:{show: false},//去除网格线
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
//                      splitArea: {
//							show: true
//						}
//						show:false,
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
//                      markPoint : {
//                          data : [
//                              {type : 'max', name: '最大值'},
//                              {type : 'min', name: '最小值'}
//                          ]
//                      },
//                      markLine : {
//                          data : [
//                              {type : 'average', name: '平均值'}
//                          ]
//                      }
                    },
                    {
                        name:'本周',
                        type:'line',
                        data:[1, 6, 2, 5, 3, 2, 0],
//                      markPoint : {
//                          data : [
//                              {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
//                          ]
//                      },
//                      markLine : {
//                          data : [
//                              {type : 'average', name : '平均值'}
//                          ]
//                      }
                    }
                ]
           };
            var charBar = ec.init(document.getElementById(id));
            charBar.setOption(options);
//          window.onresize = function(){
//              charBar.resize();
//          }
        }
    )
}