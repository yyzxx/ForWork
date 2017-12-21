	function type_char(id,x_data,lin_data,bar_data){
		require.config({
	        paths: {
	            echarts: '../../js/echart'
	        }
	   });
		  require(
          [
	          'echarts',
	          'echarts/chart/pie',
	          'echarts/chart/bar',
	          'echarts/chart/line' 
          ],
		function (ec){
	        var food_Chart = ec.init(document.getElementById(id));
	        food_Chart.clear();
	        var  option = {
                tooltip: {
	                        trigger: 'axis',	                        　				
	                        textStyle:{
							        color:'white',
							        align: 'left',
							        fontSize: '10'
							    },
							formatter: function (params) {
								//console.log(params.length)
								//console.log(params[1]);
								var res='<div><p>时间：'+params[0].name+'</p></div>' 						
								res+='<p>'+params[0].seriesName+':'+parseFloat((params[0].data*1-120)/5).toFixed(2)+'</p>';
								res+='<p>'+params[1].seriesName+':'+parseFloat(params[1].data*120).toFixed(2) +'</p>';									
								return res;
							},		             
                },
                  grid:{
	                    x:12,
	                    y:5,
	                    x2:12,
	                    y2:'26%', 
	                    borderWidth:0
              },
                  legend: {
                      data:['周转天数','SKU'],
                       left:'right',
	                   y:'82%',
	                   x:'60%',
	                   width:'100%',
					 textStyle:{fontSize:'10'}	                                         
                  },
                  xAxis: [
                      {
                          type: 'category',
                          show:true,
                          axisLine:{show:false},
             				splitLine:{show: false},//去除网格线
             				axisTick:{
						        show:false
						    },
                          textStyle:{fontWeight:'bold', color:'green',fontSize:'1rem'},
                          data: x_data,
	                        axisLabel: {
	                                show: true,
	                                textStyle: {
		                                color: '#000',
		                                fontSize:'2'
	                                }
                         }
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value',
                          name: '水量/ml',
                          min: 0,
                          max: 250,
                          interval: 50,
                          show:false,
             			  splitLine:{show: false},//去除网格线
                          axisLabel: {
                              formatter: '{value} '
                          }
                      }
                  ],
                  series: [                                              
                      {
                          name:'周转天数',
                          type:'line',
                          smooth:true,
                          symbol:'none',
                          itemStyle : {  /*设置折线颜色*/
                              normal : {
                                  color:'#279AD0'
                              }
                          },
//                        	   markLine:{
//						            itemStyle:{
//						            normal:{lineStyle:{type:'none',color:'#000'},label:{
//						            	show:'false',
//						            	position:'top',
//						            	color:'#000',
//						            	x:20
//						           	 }
//						            }						            
//						            },
//						            large:true,
//							          effect:{
//							            show: true,
//										  loop: true,
//										  period: 20,
//										  scaleSize : 3,
//										  color : 'blue',
//										  shadowColor : null,
//										  shadowBlur : null
//										        },
//									              data:[
//							                 [
//										        {name: '标线2起点',xAxis: 0, yAxis: s_day[0]},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
//										        {name: '标线2终点', xAxis: 0, yAxis: s_day[0]},             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
//										     ],
//							                  [
//										        {name: '标线3起点', xAxis:dot_fresh.length-1, yAxis: s_day[s_day.length-1]-15},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
//										        {name: '标线3终点', xAxis:dot_fresh.length-1, yAxis: s_day[s_day.length-1]-15},             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
//										     ]
//							            ]
//							          },
                          data:lin_data
                     },
                       {
                          name:'SKU',
                          type:'bar',
                          barWidth : 8,                               
                         itemStyle:{
                          normal:{
                          	barBorderRadius:[10, 10, 0, 0],
                              color:'#7ECCCE',
                               lineStyle:{  
                                      color:'#FC6854'  
                                  },  
                              label: {
//                            		data:[39.2%,28.1%,9.5%,23.2%],
//										formatter: ' {c}%',
										show: false,
										position: 'top',
										textStyle: {
										color: '#7ECCCE'
										  },										
										}
                          },
                          //设置柱状图圆角
                          emphasis: {
		                            barBorderRadius: 30
		                        	},
                             },
                         data: bar_data
                      }
                  ]
          };            
         // 使用刚指定的配置项和数据显示图表。
         food_Chart.clear();
         food_Chart.hideLoading();
//       food_Chart.restore()
         food_Chart.setOption(option); 
        window.addEventListener("resize",function(){
                      food_Chart.resize();
               });
       });        
} 
	function allShop_char(id5, id6, id7, arr1, dot_ar, arr5, arr3, arr2, new_ar3, new_ar2, dot_ar, arr9, new_ar8){
		require(
            [
                'echarts',
                'echarts/chart/pie',
                'echarts/chart/bar',
                'echarts/chart/line'
            ],
            function (ec){
            	var myChart = ec.init(document.getElementById(id5));

        // 指定图表的配置项和数据，柱形图
        var option = {
        	 grid:{
	                    x:15,
	                    y:45,
	                    x2:15,
	                    y2:45,
	                    borderWidth:0,
	                    title:{
	                    	left:'50'
	                    }
                },
            title: {
                text: '销售占比',
                x:'25',
                textStyle:{
	            fontSize: 15,
	        	color: '#000'
        }       
            }, 
            tooltip: {
						trigger: 'item',
						formatter: '{b}<br>{c}%',					 
					},
            xAxis: {
                data: ["生鲜","食品","百货","餐饮"],
                show:true,
                axisLabel:{ //调整x轴的lable
//              	  show: true,
	            textStyle:{
	                fontSize:0.2,// 让字体变大
	                color:'#5E5E5E'
		           }		             
		         },
		         axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#DFDFDF',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
//		         axisLabel: {
//                              show: true,
//                              textStyle: {
//                                  color: '#fff'
//                              }
//                          }
		         axisTick:{
				        show:false
				    },
                 splitLine:{show: false}//去除网格线
            },
            yAxis: {
            	show:false,
                 splitLine:{show: false}//去除网格线
            },
            series: [{            	 
                name: '销量',
                type: 'bar',
                barWidth: 20,
                itemStyle:{
                            normal:{
                            	barBorderRadius:[10, 10, 0, 0],
                                color:'#00aaee',
                                 lineStyle:{  
                                        color:'#00aaee'  
                                   },                                   
                                label: {
//                              		data:[39.2%,28.1%,9.5%,23.2%],
										//给显示数据加单位
										formatter: ' {c}%',
										show: true,
										position: 'top',
										textStyle: {
										color: '#615a5a'
											},
//										
										}
                            },
                            emphasis: {
                            barBorderRadius: 30
                        	},
                                },
                data: arr1
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option); 
        
         window.onresize = function () {
		    myChart.resize();
		};
          });
//            折线图和柱形图1
		require(
            [
                'echarts',
                'echarts/chart/pie',
                'echarts/chart/bar',
                'echarts/chart/line'
            ],
			function (ec){
	            var lChart = ec.init(document.getElementById(id6));	   	
	            var  option = {	
	            	//修改提示框
	            	tooltip: {
	                        trigger: 'axis',	                        　				
	                        textStyle:{
							        color:'white',
//							        align: 'right',
							        fontSize: '10'
							    },
							formatter: function (params) {
								//console.log(params[1])
								var res='<div><p>时间：'+params[0].name+'</p></div>'; 
								res+='<p>'+params[0].seriesName+':'+parseFloat(params[0].data/3.8).toFixed(2)+'</p></br>'
								res+='<p>'+params[1].seriesName+':'+parseFloat((params[1].data*1-135)*500).toFixed(2) +'</p></br>'
								res+='<p>'+params[2].seriesName+':'+parseFloat((params[2].data*1-180)*12000).toFixed(2)+'</p>'	
								return res;								
							},		             
	                    },
                    grid:{
	                    x:8,
	                    y:15,
	                    x2:8,
	                    y2:38,
	                    borderWidth:0
                		},               		
                    legend: {
                        data:['销售额','客流','客单'],
                         left:'right',
                         right: '10%',
                         y:'95%',
			             x:'43%',
//	                     width:'10%',
    					 textStyle:{ fontSize:'10'}	                                         
                    },
                    xAxis: [
                        {
                            type: 'category',
                            show:true,
                            //去除横坐标的线
                            axisLine:{show:false},
               				splitLine:{show: false},//去除网格线
               				//去除坐标轴上的刻度
               				axisTick:{
						        show:false
						    },
//                          textStyle:{fontWeight:'bold', color:'green',fontSize:'1rem'},
                              data: dot_ar,
		                        axisLabel: {
		                                show: true,
		                                textStyle: {
		                                color: '#000',
		                                fontSize:'2'
		                                }
                               }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '水量/ml',
                            min: 0,
                            max: 250,
                            interval: 50,
                            show:false,
               				splitLine:{show: false},//去除网格线
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [                         
                        {
                            name:'客单',
                            type:'bar',
                            barWidth : 8,                         
							markLine:{
						            itemStyle:{
						            normal:{lineStyle:{type:'dotted',color:'#E5E5E5'},label:{show:true}}
						            },
						            large:true,
							//          effect:{
							//            show: false,
							  loop: true,
							  period: 0,
							  scaleSize : 2,
							  color : 'red',
							  shadowColor : null,
							  shadowBlur : null,
							              data:[
							                 [
										        {name: '标线1起点',  xAxis: 500, yAxis: 120},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
										        {name: '标线1终点', xAxis: -100, yAxis: 120},             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
										     ]							                
//							                 ,
							            ]
							        },	           									
                            itemStyle:{
                            normal:{
                            	barBorderRadius:[10, 10, 0, 0],
                                color:'#FF9A66',
                                 lineStyle:{  
                                        color:'#FC6854'  
                                    },  
                                label: {
//                              		data:[39.2%,28.1%,9.5%,23.2%],
										formatter: ' {c}*0.25',
//										show: true,
										position: 'top',
										textStyle: {
										color: '#7ECCCE'
											},
//										
										}
                            },
                            //设置柱状图圆角
                            emphasis: {
		                            barBorderRadius: 30
		                        	},
                               },
                           data: arr5
                        },
                        {
                            name:'客流',
                            type:'line',
                            smooth:true,
                            symbol:'none',
                            markLine:{
						            itemStyle:{
						            normal:{lineStyle:{type:'none',color:'white'},label:{show:true}}
						            },
						            large:true,
							//          effect:{
							//            show: false,
							  loop: true,
							  period: 0,
							  scaleSize : 2,
							  color : 'red',
							  shadowColor : null,
							  shadowBlur : null,
							              data:[
							                 [
										        {name: '标线1起点',value:parseFloat(arr3[0]*500).toFixed(2),  xAxis: -20, yAxis: new_ar3[0]*1+20},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
										        {name: '标线1终点', xAxis: -20, yAxis: new_ar3[0]*1+20},             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配
										     ]										     
							            ]
							       },	               	      						
                            itemStyle : {  /*设置折线颜色*/
                                normal : {
//                              	color:'red'
                                    color:'#FFB266'
                                }
                            },
                           data:new_ar3
                        },
                     	   {
                            name:'销售额',
                            type:'line',
                            smooth:true,
                            symbol:'none',
//                     	    markLine:{
//					            itemStyle:{
//						            normal:{lineStyle:{type:'none',color:'#000'},label:{
//						            	show:true
//						           	 }
//						           }						            
//						       },
//				              large:true,
//					          effect:{
//				              show: true,
//							  loop: true,
//							  period: 20,
//							  scaleSize: 3,
//							  color : 'red',
//							  shadowColor : 'blue',
//							  shadowBlur : null
//							        },
//							             data:[							               
//							                 [
//										        {name: '标线2起点', xAxis: 0, yAxis: new_ar2[0]},      
//										        {name: '标线2终点', xAxis: 0, yAxis: new_ar2[0]}            								   
//							                 ],
//							                 [
//										        {name: '标线3起点', xAxis: 23, yAxis: parseFloat(new_ar2[new_ar2.length - 1]).toFixed(2)+120},    
//										        {name: '标线3终点', xAxis: 23, yAxis: parseFloat(new_ar2[new_ar2.length - 1]).toFixed(2)+120} 									     
//							                 ]
//							            ]
//							          },
                            itemStyle : {  /*设置折线颜色*/
                                normal : {
                                    color:'red'
                                }
                            },
                            data:new_ar2
                        },
                         {
                            name:'销售额',
                            type:'line',
                            smooth:true,
                            symbol:'none',
                               	   markLine:{
						            itemStyle:{
						            normal:{lineStyle:{type:'none',color:'#000'},label:{
						            	show:true

						           	 }
						            }						            
						            },
						            large:true,
							          effect:{
							            show: true,
							  loop: true,
							  period: 20,
							  scaleSize: 3,
							  color : 'white',
							  shadowColor : 'blue',
							  shadowBlur : null
							        },
							              data:[							               
							                 [
										        {name: '标线2起点',value:parseFloat(arr2[0]*12000).toFixed(2), xAxis: -20, yAxis: new_ar2[0]*1+20},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
										        {name: '标线2终点', xAxis: -20, yAxis: new_ar2[0]*1+20}             // 当xAxis为类目轴时，字符串'周三'会被理解为与类目轴的文本进行匹配									     
							                 ]
							            ]
							          },
                            itemStyle : {  /*设置折线颜色*/
                                normal : {
                                    color:'red'
                                }
                            },
                            data:new_ar2
                         }
                    ]
            };
            
            // 使用刚指定的配置项和数据显示图表。             
			lChart.setOption(option);
			 window.addEventListener("resize",function(){
                      lChart.resize();
               });
           })
//			折线图和柱形图
		require(
		            [
		                'echarts',
		                'echarts/chart/pie',
		                'echarts/chart/bar',
		                'echarts/chart/line'
		            ],
					function (ec){
			            var hChart = ec.init(document.getElementById(id7));
			            var  option = {
			                    tooltip: {
			                        trigger: 'axis',	                        　				
			                        textStyle:{
									        color:'white',
									        align: 'left',
									        fontSize: '10'
									    },
									formatter: function (params) {
										//console.log(params.length)
										//console.log(params[1]);
										var res='<div><p>时间：'+params[0].name+'</p></div>' 						
										res+='<p>'+params[1].seriesName+':'+parseFloat((params[1].data*1-120)/4.5).toFixed(2)+'</p>';
										res+='<p>'+params[0].seriesName+':'+parseFloat(params[0].data*260).toFixed(2) +'</p>';									
										return res;
									},		             
	                    },
			                   //整个图表的位置和大小设置
		                    grid: 
		                    {
			                    x:12,
			                    y:15,
			                    x2:12,
			                    y2:50,
			                    borderWidth:0
		                },
		                //图例设置
		                    legend: {
		                        data:['周转天数','SKU'],
		                         left:'right',
		                         right:'10%',
			                     y:'90%',
			                     x:'55%',
			                     width:100,
		    					 textStyle:{ fontSize:'10'}	                                         
		                    },
		                    //横坐标设置
		                    xAxis: [
		                        {
		                            type: 'category',
		                            show:true,
		                            axisLine:{show:false},
		               				splitLine:{show: false},//去除网格线
		               				axisTick:{
								        show:false
								    },
		//                          textStyle:{fontWeight:'bold', color:'green',fontSize:'1rem'},
		                            data:dot_ar,
			                        axisLabel: {
			                                show: true,
			                                textStyle: {
				                                color: '#000',
				                                fontSize:'2'
			                                }
		                           }
		                        }
		                    ],
		                    //纵坐标设置
		                    yAxis: [
		                        {
		                            type: 'value',
		                            name: '水量/ml',
		                            min: 0,
		                            max: 250,
		                            interval: 50,
		                            show:false,
		               				splitLine:{show: false},//去除网格线
		                            axisLabel: {
		                                formatter: '{value} '
		                            }
		                        }
		                    ],
		                    series: [                         
		                        {
		                            name:'SKU',
		                            type:'bar',
		                            barWidth : 8,                           
		                           itemStyle:{
		                            normal:{
		                            	barBorderRadius:[10, 10, 0, 0],
		                                color:'#7ECCCE',
		                                 lineStyle:{  
		                                        color:'#FC6854'  
		                                    },  
		                                label: {
		//                              		data:[39.2%,28.1%,9.5%,23.2%],
		//										formatter: ' {c}%',
		//										show: true,
												position: 'top',
												textStyle: {
												color: '#7ECCCE'
												  },										
												}
		                            },
		                            //设置柱状图圆角
		                            emphasis: {
				                            barBorderRadius: 30
				                        	},
		                               },
		                           data: arr9
		                        },
		                        {
		                            name:'周转天数',
		                            type:'line',
		                            smooth:true,
		                            symbol:'none',
		                            itemStyle : {  /*设置折线颜色*/
		                                normal : {
		                                    color:'#00aaee'
		                                }
		                            },
		                            data:new_ar8
		                        }
		                    ]
		            };            
		            // 使用刚指定的配置项和数据显示图表。
		             hChart.setOption(option);
		             window.addEventListener("resize",function(){
                     hChart.resize();

               });
		          })
	}
