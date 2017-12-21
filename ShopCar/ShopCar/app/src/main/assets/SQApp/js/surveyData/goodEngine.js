// 选项卡UI业务逻辑

// 全局变量
var gBaseUrl = 'http://jaaint.f3322.net:28080';
var gType = '';
var gDateStr = '';
var gStoreId = '';
var gUserId = '';
var gScW = '';
//全店页面的选项卡的div
var tab = $('#branch .branch_detail div');
var gSwidth = localStorage.getItem('s_width'); 
//页面刚加载的时候要加载的内容
window.onload = function(){ 			
	var timeNow = new Date();		
	var lastDate = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + (timeNow.getDate() - 1);	
	if((localStorage.getItem('storeName')) || (localStorage.getItem('dateStr')) || (localStorage.getItem('storeId'))){
		gDateStr = localStorage.getItem('dateStr');
		gStoreId = localStorage.getItem('storeId');
	}else{  
		gDateStr=lastDate;
		gStoreId = '';
		//localStorage.setItem('dateStr');
	};
	mui.plusReady(function(){
		var gUserId = plus.storage.getItem('userId');
		localStorage.setItem('userId',gUserId)
	});
	//点击各个分店保存的值
	var kip;
	//获取屏幕宽度
	gScW = (gSwidth).toString();
	//获取userId
	gUserId = localStorage.getItem('userId');	
	gType = localStorage.getItem('type');	
	var kip = localStorage.getItem('kip');
	//刷新页面
	window.addEventListener('clash', function(e){//执行刷新
		switch(kip){
		case 0:
			all_shop();
		  	break;
		case 1:
			fresh();
		  	break;
		case 2:
			food();
		  	break;
		case 3:
			goods();
		  	break;
		case 4:
			drink();
		  	break;
		}
	});	
	//概况商品分析的分店切换
	tab.eq(1).click(function(){
		kip = 1;
		fresh();
		localStorage.setItem('kip',kip);
	});
	tab.eq(2).click(function(){
		food();
		kip = 2;
		localStorage.setItem('kip',kip);
	});
	tab.eq(3).click(function(){
		goods();
		kip = 3;
		localStorage.setItem('kip',kip);		
	});
	tab.eq(4).click(function(){
		drink();
		kip = 4;
		localStorage.setItem('kip',kip);
	});
	tab.eq(0).click(function(){
		all_shop();
		kip = 0;
		localStorage.setItem('kip',kip);
	});	
	//echarts图表
	require.config({
        paths: {
            echarts: '../js/echart'
        }
    });
 	//全店的类型   
	gType =''; 
	//跳到降幅页面
	$('.more_a').on('tap',function(){
		mui.openWindow({
			id: "increate",
			url: "increate.html",
			extras: {
				type: gType,
				dateStr:gDateStr
			}					
		})
	});
	//跳到降幅页面
	$('.more_b').on('tap',function(){
		mui.openWindow({
			id: "decreate",
			url: "decreate.html",
			extras: {
				type: gType,
				dateStr:gDateStr
			}					
		})
	});
	//获取全店最上面图表的宽度		
	var w = (gSwidth*0.55).toString();
	var s_w = (gSwidth).toString();
	//全店最上面图表的样式
	$('#sales_ratio').css({
		display:'block',
		height: '8rem',	
		width: w + 'px'
	});
	//全店的第二个图表的样式
	$('#three_sale').css({
		display: 'block',
		height: '12rem',
		width: s_w + 'px'
	});
	//全店第三个图表的样式
	$('#echart4').css({
		display:'block',
		height: '10rem',
		width: s_w + 'px'
	});
	//请求全店的概况、图表和类别的数据
	if(checkAjax()){
		setTimeout(function(){					
			gGoodSurveyAnalysis.getWholeStoreData(allShop_success,gUserId,gType,gStoreId,gDateStr,sales_ratio,three_sale,echart4);
		},1000);
	};
	//请求全店的增降幅的数据
	if(checkAjax()){ 
		setTimeout(function(){
			gGoodSurveyAnalysis.getIncAndDecApp(increace_decreaceSuccess,gUserId,gType,gStoreId,gDateStr);
		},1000);
	};
}

//生鲜页面
	function fresh(){
		$('.tbb').removeClass('b_sails');
		tab.eq(1).find('p').addClass('b_sails');
		var index = $(this).index();
		$('#branch ul').eq(index).addClass('salse_amount').siblings().removeClass('salse_amount');		
		var content = tab.eq(1).children().text();
		if('生鲜' == content){
			gType='91';
			localStorage.setItem('type',gType);
			$('.shop_data').hide();
			$('#echart6').hide();
			$('#echart7').hide();
			$('#echart8').hide();
			$('.food').hide();
			$('.drink').hide();
			$('.fresh').show();
			//生鲜土表样式
			$('#echart5').css({
				display:'block',
				width: gScW +'px'
			});				
			$('#sales_growth').css('margin-top','-2rem');
			//跳到增幅页面
			$('.more_a').on('tap',function(){
				mui.openWindow({
					id: "increate",
					url: "increate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//跳到降幅页面
			$('.more_b').on('tap',function(){
				mui.openWindow({
					id: "decreate",
					url: "decreate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//生鲜的概况、图表和类别数据
			if(checkAjax()){			
				gGoodSurveyAnalysis.getCategoryList(fresh_chartSuccess,gUserId,gType,gStoreId,gDateStr)		 
			};
			//生鲜的增降幅数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getIncAndDecApp(increace_decreaceSuccess,gUserId,gType,gStoreId,gDateStr);
			};
		};
	};
	
//食品页面
	function food(){
		$('.tbb').removeClass('b_sails');
		tab.eq(2).find('p').addClass('b_sails');
		var index = $(this).index();
		$('#branch ul').eq(index).addClass('salse_amount').siblings().removeClass('salse_amount');		
		var content = tab.eq(2).children().text();
		if('食品' == content){
			gType='92';
			localStorage.setItem('type',gType);
		//跳到增幅页面
			$('.more_a').on('tap',function(){
				mui.openWindow({
					id: "increate",
					url: "increate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//跳到降幅页面
			$('.more_b').on('tap',function(){
				mui.openWindow({
					id: "decreate",
					url: "decreate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			})
			$('.shop_data').hide();
			$('.fresh').hide();
			$('#echart5').hide();
			$('#echart7').hide();
			$('#echart8').hide();
			$('.goods').hide();
			$('.drink').hide();
			$('.food').show();
			//食品图表样式
			$('#echart6').css({
				display:'block',
				width:gScW +'px'}
			);
			//增降幅样式
			$('#sales_growth').css('margin-top','-1rem');
			//食品的概况、图表和类别的数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getCategoryList(food_chartSuccess,gUserId,gType,gStoreId,gDateStr);		
			};
			//增降幅数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getIncAndDecApp(increace_decreaceSuccess,gUserId,gType,gStoreId,gDateStr);
			};
		};
	};
	
//百货页面
	function goods(){
		$('.tbb').removeClass('b_sails');
		tab.eq(3).find('p').addClass('b_sails');
		var index = $(this).index();
		$('#branch ul').eq(index).addClass('salse_amount').siblings().removeClass('salse_amount');		
		var content = tab.eq(3).children().text();
		if('百货' == content){
			gType='93';
			localStorage.setItem('type',gType);
			//增长率上升页面
			$('.more_a').on('tap',function(){
				mui.openWindow({
					id: "increate",
					url: "increate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//增长率下降页面
			$('.more_b').on('tap',function(){
				mui.openWindow({
					id: "decreate",
					url: "decreate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			$('.shop_data').hide();
			$('.fresh').hide();
			$('#echart5').hide();
			$('#echart6').hide();
			$('#echart7').show();
			$('.food').hide();
			$('.drink').hide();
			$('.goods').show();
			$('#echart8').hide();
			//百货图表样式
			$('#echart7').css({				
				display:'block',
				width:gScW + 'px'				
			});
			//增降幅数据
			$('#sales_growth').css('margin-top','0');
			//百货的概况、图表和类别的数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getCategoryList(good_success,gUserId,gType,gStoreId,gDateStr,echart5);			
			};	
			//增降幅数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getIncAndDecApp(increace_decreaceSuccess,gUserId,gType,gStoreId,gDateStr);
			} 
		};
	};
	
//餐饮页面
	function drink(){
		$('.tbb').removeClass('b_sails');
		tab.eq(4).find('p').addClass('b_sails');
		var index = $(this).index();
		$('#branch ul').eq(index).addClass('salse_amount').siblings().removeClass('salse_amount');		
		var content = tab.eq(4).children().text();
		if('餐饮' == content){
			gType='916';
			localStorage.setItem('type',gType);
			//跳到增幅页面
			$('.more_a').on('tap',function(){
				mui.openWindow({
					id: "increate",
					url: "increate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//跳转的降幅页面
			$('.more_b').on('tap',function(){
				mui.openWindow({
					id: "decreate",
					url: "decreate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			})
			
			$('.shop_data').hide();
			$('.fresh').hide();
			$('#echart5').hide();
			$('#echart6').hide();
			$('#echart7').hide();
			$('.food').hide();
			$('.goods').hide();
			$('.drink').show();
			$('#echart8').css({
				display:'block',
				width:gScW + 'px'}
			);			
			$('#sales_growth').css('margin-top','1rem');
			//餐饮增降幅的样式
			$('.them').css('margin-top','2rem');			
			//餐饮的概况、图表数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getCategoryList(drink_success,gUserId,gType,gStoreId,gDateStr);		
			};
			//餐饮的类别的数据
			var dataParam_food3={
				body:{
						"userId":gUserId,
				        "shopId":gStoreId,
				        "deptId":"916",
				        "selectDate":gDateStr
				    }
			};
			if(checkAjax()){
				$.ajax(baseUrl+'/SQBusiness/goodsController/selectIncAndDecApp',{
					data: JSON.stringify(dataParam_food3),
					dataType:'json',//服务器返回json格式数据
					crossDomain:true,
					type:'post',//HTTP请求类型
					contentType: "application/json; charset=utf-8",
					timeout:10000,//超时时间设置为10秒；
					headers:{'Content-Type':'application/json'},	              
					success:function(data){
						var extend_f1 = data.body.data.increaseList;
						//console.log(extend_f1);
						//增幅商品名
						var extend_ar1 = [];
						//增幅销售量
						 var extend_ar2 = [];
						 //增幅销售额
						 var extend_ar3 = [];
						 //增幅增幅
						 var extend_ar4 = [];
						 //增幅毛利率
						 var extend_ar5 = [];
						 //增幅库存天数
						 var extend_ar6 = [];
						 for(var i = 0;i<extend_f1.length;i++){
						 	extend_ar1.push(extend_f1[i].GoodsName);
						 	extend_ar2.push(parseFloat(extend_f1[i].SaleQty).toFixed(2));
						 	extend_ar3.push(parseFloat(extend_f1[i].SaleValue).toFixed(2));
						 	extend_ar4.push(parseFloat(extend_f1[i].GrowthRate).toFixed(2));
						 	extend_ar5.push(parseFloat(extend_f1[i].ProfitRate).toFixed(2));
						 	extend_ar6.push(parseFloat(extend_f1[i].StockDay).toFixed(2));				 					 				 	
						 }
						 var drink_add = '<tr class="th"><td>品  名</td><td>销售量</td><td>销售额</td><td>增幅</td><td>毛利率</td><td>库存天数</td>';
						 $('.fixed-padding1 #sales_growth .amplitude_table #increaseList').html(drink_add);
						 $('tr:gt(0)').on('tap',function(){
							var goodsName = $(this).find('td').eq(0).text();
							var k = $(this).index();
							var goodsId = extend_f1[k].GoodsID;
							//跳到详情页
							mui.openWindow({
									id: "product.html",
									url: "../product.html",
									extras: {
										goodsName: goodsName,
										goodsCode:goodsId
									}
								});
						})
						 var food_reduce = data.body.data.decreaseList;
						 //增幅商品名
						 var reduce_ar1 = [];
						 //增幅销售量
						 var reduce_ar2 = [];
						 //增幅销售额
						 var reduce_ar3 = [];
						 //增幅增幅
						 var reduce_ar4 = [];
						 //增幅毛利率
						 var reduce_ar5 = [];
						 //增幅库存天数
						 var reduce_ar6 = [];		 
						 var food_ml2 = '<tr class="th"><td>品  名</td><td>销售量</td><td>销售额</td><td>增幅</td><td>毛利率</td><td>库存天数</td>';
		
						   $('.fixed-padding1 #sales_growth .amplitude_table #reduce').html(food_ml2); 
						   $('tr:gt(0)').on('tap',function(){
							var goodsName = $(this).find('td').eq(0).text();
							var k = $(this).index();
							var goodsId = food_reduce[k].GoodsID;
		//					var goodsId=$(this).find('a').attr('goodsId');
							//alert(goodsId)
							mui.openWindow({ 
									id: "product.html",
									url: "../product.html",
									extras: {
										goodsName: goodsName,
										goodsCode:goodsId
									}
								});
						})
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						console.log(errorThrown);
					}			
				});
			};
		};
	};
//全店页面	
	function all_shop(){
		$('.tbb').removeClass('b_sails');
		tab.eq(0).find('p').addClass('b_sails');
		var index = $(this).index();
		$('#branch ul').eq(index).addClass('salse_amount').siblings().removeClass('salse_amount');		
		var content = tab.eq(0).children().text()
		if(content=='全店'){
			gType = '';
			localStorage.setItem('type',gType);
			$('.shop_data').fadeIn("slow");
			$('.fresh').fadeOut("slow");
			$('.food').fadeOut("slow");
			$('.goods').fadeOut("slow");
			$('.drink').fadeOut("slow");
			$('#echart5').fadeOut("slow");
			$('#echart6').fadeOut("slow");
			$('#echart7').fadeOut("slow");
			$('#echart8').fadeOut("slow");
			//全店第一个图表的宽度
			var w = (gSwidth*0.55).toString();
			//全店第二个图表的宽度
			var s_w = (gSwidth).toString();
			//全店第一个图表的样式
			$('#sales_ratio').css({				
//				display:'block',
				height: '8rem',				
				width: w +'px'
			});
			//全店第二个图表的样式
			$('#three_sale').css({
//				display:'block',
				height: '12rem',
				width: s_w + 'px'
			});
			//全店第三个图表的样式
			$('#echart4').css({
//				display:'block',
				height: '10rem',
				width: s_w + 'px'
			});
			//跳到增幅页面
			$('.more_a').on('tap',function(){
				mui.openWindow({ 
					id: "increate",
					url: "increate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			});
			//增降幅的样式
			$('#sales_growth').css('margin-top','-3rem');
			//跳到详情页
			$('.more_b').on('tap',function(){
				mui.openWindow({
					id: "decreate",
					url: "decreate.html",
					extras: {
						type: gType,
						dateStr:gDateStr
					}					
				})
			})
			//全店增的概况、图表数据
			if(checkAjax()){
				gGoodSurveyAnalysis.getWholeStoreData(allShop_success,gUserId,gType,gStoreId,gDateStr,sales_ratio,three_sale,echart4);
			};
			//增降幅
			if(checkAjax()){
				gGoodSurveyAnalysis.getIncAndDecApp(increace_decreaceSuccess,gUserId,gType,gStoreId,gDateStr);		
		 	};
		}
	};
