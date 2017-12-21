/**
 * Created by VM510LF on 2017/9/30.
 */
//折线图
function analyseCharLine(id,xData,sData1,sData2){
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
                    x:'40px',
                    x2:'30px',
                    y:'10px',
                    y2:'40px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#666'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisTick: {
                            show: true
                        }

                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitLine:{show: true},//去除网格线
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'昨日',
                        type:'line',
                        symbol:'none',
                        data:sData1,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#e813d9'
                                }
                            }
                        }
                    },
                    {
                        name:'报警2',
                        type:'line',
                        symbol:'none',
                        data:sData2,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#19dee6'
                                }
                            }
                        }
                    }
                ]
            };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}

function analyseCharLine1(id,xData,sData1,sData2){
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
                    x:'40px',
                    x2:'30px',
                    y:'10px',
                    y2:'40px',
                    borderWidth :'0px'
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        splitLine:{show: false},//去除网格线
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#666'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisTick: {
                            show: true
                        }

                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitLine:{show: true},//去除网格线
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'昨日',
                        type:'line',
                        symbol:'none',
                        data:sData1,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#5b34c9'
                                }
                            }
                        }
                    },
                    {
                        name:'上周',
                        type:'line',
                        symbol:'none',
                        data:sData2,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#fcc708'
                                }
                            }
                        }
                    }
                ]
            };
            var charLine = ec.init(document.getElementById(id));
            charLine.setOption(options);
        }
    )
}