//业绩分析
function getData2(dataParam,apiUrl,bool){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//console.log(data);
			//业绩分析
			if(apiUrl=='/SQBusiness/goodsController/selectAchievementApp'){
				//console.log(data)
				var currentWeekSale=[];
				var lastWeekSale=[];
				var currentSheetQty=[];
				var lastSheetQty=[];
				var currentAvsValue=[];
				var lastAvsValue=[];
				var currentProfit=[];
				var lastProfit=[];
				for(var i=0;i<data.body.data.yejiTrendMap.length;i++){
					if(i<=6){
						lastWeekSale.push(data.body.data.yejiTrendMap[i].SaleValue);
						lastSheetQty.push(data.body.data.yejiTrendMap[i].SheetQty);
						lastAvsValue.push(data.body.data.yejiTrendMap[i].AvsValue);
						lastProfit.push(data.body.data.yejiTrendMap[i].Profit);
					}else{
						currentWeekSale.push(data.body.data.yejiTrendMap[i].SaleValue);
						currentSheetQty.push(data.body.data.yejiTrendMap[i].SheetQty);
						currentAvsValue.push(data.body.data.yejiTrendMap[i].AvsValue);
						currentProfit.push(data.body.data.yejiTrendMap[i].Profit);
					}
				}
				echartLine('tCanvas1',lastWeekSale,currentWeekSale);
				jQuery("#yeji li a").bind('click',function(){
					jQuery("#yeji li a").removeClass('active');
					jQuery(this).addClass('active');
					if(jQuery(this).attr('tabindex')==0){
						echartLine('tCanvas1',lastWeekSale,currentWeekSale);
					}
					if(jQuery(this).attr('tabindex')==1){
						echartLine('tCanvas1',lastSheetQty,currentSheetQty);
					}
					if(jQuery(this).attr('tabindex')==2){
						echartLine('tCanvas1',lastAvsValue,currentAvsValue);
					}
					if(jQuery(this).attr('tabindex')==3){
						echartLine('tCanvas1',lastProfit,currentProfit);
					}
				})
				var len=data.body.data.yejiDetailData.length;
				var html=''
				html+='<p><em>当日：'+((data.body.data.yejiDetailData[len-1].SaleValue)/10000).toFixed(1)+'(万元)</em><em>同比：'+(data.body.data.yejiDetailData[len-1].GroRate).toFixed(2)+'%<i class="icon-at"></i></em></p>';
				html+='<table class="base-table"><tr><th>大区-门店</th><th>当日</th><th>去年同期</th><th>VS去年同期</th></tr>';
				for(var i=0;i<len-1;i++){
					if(data.body.data.yejiDetailData[i].ShopID==undefined){
						html+='<tr groupid="'+data.body.data.yejiDetailData[i].GroupID+'" shopid="total">'
						html+='<td class="total-data"><a href="javascript:void(0);"><i class="icon-arrow"></i>'+data.body.data.yejiDetailData[i].GroupName+'</a></td>';
						html+='<td>'+((data.body.data.yejiDetailData[i].SaleValue)/10000).toFixed(2)+'</td>';
						html+='<td>'+((data.body.data.yejiDetailData[i].LYSaleValue)/10000).toFixed(1)+'</td>';
						html+='<td>'+(data.body.data.yejiDetailData[i].GroRate).toFixed(2)+'%</td></tr>';
					}else{
						html+='<tr groupid="'+data.body.data.yejiDetailData[i].GroupID+'" shopid="'+data.body.data.yejiDetailData[i].ShopID+'" style="display:none;" class="sub-data">'
						html+='<td><a href="javascript:void(0);">'+data.body.data.yejiDetailData[i].GroupName+'</a></td>';
						html+='<td>'+((data.body.data.yejiDetailData[i].SaleValue)/10000).toFixed(2)+'</td>';
						html+='<td>'+((data.body.data.yejiDetailData[i].LYSaleValue)/10000).toFixed(1)+'</td>';
						html+='<td>'+(data.body.data.yejiDetailData[i].GroRate).toFixed(2)+'%</td></tr>';
					}
					
				}
				html+='</table>';
				if(bool){
					jQuery("#yejiDetail").html(html)
					jQuery(".total-data").on('tap',function(){
						var groupid=jQuery(this).closest('tr').attr('groupid');
						if(jQuery("tr[groupid='"+groupid+"']").not("tr[shopid='total']").css('display')=='table-row'){
							jQuery("tr[groupid='"+groupid+"']").not("tr[shopid='total']").css('display','none');
						}else{
							jQuery("tr[groupid*='9']").not("tr[shopid='total']").hide();
							jQuery("tr[groupid='"+groupid+"']").not("tr[shopid='total']").css('display','table-row');
						}
					})
					jQuery(".sub-data").on('tap',function(){
						var groupid=jQuery(this).attr('groupid');
						var shopid=jQuery(this).attr('shopid');
						getCommonDataYJ("",shopid,groupid,"2017-07-01","2017-07-14",false)
					})
				}
				
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}

//商品异常分析
function getData3(dataParam,apiUrl,index){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(index==0){
				//商品异常分析
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					//index 0
//					var total=[];
//					var sParam=[];
//					var num=[];
//					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
//						if(sParam.indexOf(data.body.data.exceptionTrendMap[i].sdate)<0){
//							sParam.push(data.body.data.exceptionTrendMap[i].sdate)
//						}
//						
//					}
//					for(var i=0;i<sParam.length;i++){
//						num[i]=[];
//						for(var j=0;j<data.body.data.exceptionTrendMap.length;j++){
//							if(data.body.data.exceptionTrendMap[j].sdate==sParam[i]){
//								num[i].push(data.body.data.exceptionTrendMap[j].total);
//							}						
//						}
//					}
//					for(var i=0;i<num.length;i++){
//						total.push(eval(num[i].join('+')));
//					}
					var total=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						total.push(data.body.data.exceptionTrendMap[i].total);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate)
					}
					echartLine3('tCanvas1',total,sParam);
					var html1=''
					var len=data.body.data.exceptionDetailData.length;
					html1+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">库存准确率</p>';
					html1+='<table class="base-table"><tr><th>区域</th><th>总项 合计</th><th>负毛利</th><th>负库存</th><th>高库存</th><th>缺货</th><th>无销售</th><th>异常</th></tr>';					                	
					for(var i=0;i<len;i++){
						html1+='<tr><td><a href="###">'+data.body.data.exceptionDetailData[i].GroupName+'</a></td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].TotalSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].NegProfitSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].NegStockSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].MoreStockSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].LessStockSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].NoSaleDaysSKU+'</td>';
						html1+='<td>'+data.body.data.exceptionDetailData[i].QADaysStockSKU+'</td></tr>';						
					}
					html1+='</table>';		
					jQuery("#itemTable1").html(html1)
				}
			}
			
			if(index==1){
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					var sku=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						sku.push(data.body.data.exceptionTrendMap[i].SKU);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate)
					}
					echartLine3('tCanvas2',sku,sParam);
					var html2="";
					html2+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">各门店店品项数</p>';
					html2+='<table class="base-table"><tr><th>区域-门店</th><th>品项数</th><th>销售额</th><th>负毛利额</th><th>负毛利率</th><th>促销负毛利品项数</th><th>连续3天负毛利品项数</th></tr>';
					for(var i=0;i<data.body.data.exceptionDetailData.length;i++){
						html2+='<tr><td>'+data.body.data.exceptionDetailData[i].GroupName+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NegProfitSKU+'</td>';
						html2+='<td>'+((data.body.data.exceptionDetailData[i].NegProfitSaleV)/10000).toFixed(2)+'</td>';
						html2+='<td>'+(parseFloat(data.body.data.exceptionDetailData[i].NegProfitV)).toFixed(0)+'</td>';
						html2+='<td>'+(parseFloat(data.body.data.exceptionDetailData[i].NegProfitRate)).toFixed(2)+'</td>';
						html2+='<td>'+(data.body.data.exceptionDetailData[i].PromotionSKU)+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].ThreeDaySKU+'</td></tr>';
					}
					html2+='</table>';		
					jQuery("#itemTable2").html(html2);			
					
				}	
			}
			if(index==2){
				//商品异常分析
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					var sku1=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						sku1.push(data.body.data.exceptionTrendMap[i].SKU);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate);
					}
					echartLine3('tCanvas3',sku1,sParam);
					var html2="";
					html2+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">各门店品项数</p>';
					html2+='<table class="base-table"><tr><th>区域-门店</th><th>品项数</th><th>库存量</th><th>库存额</th><th style="width: 22%;">高频次负库品项数</th></tr>';
					for(var i=0;i<data.body.data.exceptionDetailData.length;i++){
						html2+='<tr><td>'+data.body.data.exceptionDetailData[i].ShopName+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NegStockSKU+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseQty/10000).toFixed(2)+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseCostV/10000).toFixed(2)+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].HighLessStockSKU+'</td></tr>';
					}
					html2+='</table>';		
					jQuery("#itemTable3").html(html2);
					
				}	
			}
			
			if(index==3){
				//商品异常分析
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					var sku1=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						sku1.push(data.body.data.exceptionTrendMap[i].SKU);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate)
					}
					echartLine3('tCanvas4',sku1,sParam);
					var html2="";
					html2+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">各门店品相数</p>';
					html2+='<table class="base-table"><tr><th>区域-门店</th><th>品项数</th><th>库存量</th><th>库存额</th><th>低销高库存品项数</th><th>高库存可退品相数</th></tr>';
					for(var i=0;i<data.body.data.exceptionDetailData.length;i++){
						html2+='<tr><td>'+data.body.data.exceptionDetailData[i].ShopName+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].MoreStockSKU+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseQty/10000).toFixed(2)+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseCostV/10000).toFixed(2)+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].LowSaleSKU+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].RefSKU+'</td></tr>';
					}
					html2+='</table>';		
					jQuery("#itemTable4").html(html2)
					
				}	
			}
			if(index==4){
				//商品异常分析
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					var sku2=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						sku2.push(data.body.data.exceptionTrendMap[i].SKU);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate)
					}
					echartLine3('tCanvas5',sku2,sParam);
					var html2="";
					html2+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">各门店品相数</p>';
					html2+='<table class="base-table"><tr><th>区域-门店</th><th>品项数</th><th>库存量</th><th>库存额</th><th>高库存无销售品相数</th><th>疑似虚库存品相数</th></tr>';
					for(var i=0;i<data.body.data.exceptionDetailData.length;i++){
						html2+='<tr><td>'+data.body.data.exceptionDetailData[i].ShopName+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NoSaleDaysSKU+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseQty/10000).toFixed(2)+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].CloseCostV/10000).toFixed(2)+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].MSNoSaleSKU+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].VirStockSKU+'</td></tr>';
					}
					html2+='</table>';		
					jQuery("#itemTable5").html(html2)
					
				}	
			}
			if(index==5){
				//商品异常分析
				//console.log(data);
				if(apiUrl=='/SQBusiness/goodsController/selectExceptionApp'){
					var sku1=[];
					var sParam=[];
					for(var i=0;i<data.body.data.exceptionTrendMap.length;i++){
						sku1.push(data.body.data.exceptionTrendMap[i].SKU);
						sParam.push(data.body.data.exceptionTrendMap[i].sdate)
					}
					echartLine3('tCanvas6',sku1,sParam);
					var html2="";
					html2+='<p class="fix-p"><em>当日：5989.1(万元)</em><em>同比：5.7%<i class="icon-at"></i></em></p><p class="table-title">各门店品相数</p>';
					html2+='<table class="base-table"><tr><th>区域-门店</th><th>有效品相</th><th>缺货品相</th><th>缺货率</th><th>无在途缺货品项数</th><th>未到货缺货品项数</th><th>新品缺货品项</th></tr>';
					for(var i=0;i<data.body.data.exceptionDetailData.length;i++){
						html2+='<tr><td>'+data.body.data.exceptionDetailData[i].ShopName+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].EffSKU+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].LessStockSKU+'</td>';
						html2+='<td>'+parseFloat(data.body.data.exceptionDetailData[i].LessStockRate*100).toFixed(1)+'%</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NoLessStockSKU+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NoArrSKU+'</td>';
						html2+='<td>'+data.body.data.exceptionDetailData[i].NewLessStockSKU+'</td></tr>';
					}
					html2+='</table>';		
					jQuery("#itemTable6").html(html2)
					
				}	
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}

//生鲜盈亏分析
function getData4(dataParam,apiUrl,index,goodsCode){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){	
			//盈亏分析
			if(apiUrl=='/SQBusiness/goodsController/selectProfitLostApp'){
				var ProfitRate=[];
				var LYGrowthRate=[];
				var LWGrowthRate=[];
				var sParam=[];
				for(var i=0;i<data.body.data.profitLostTrendMapList.length;i++){
					ProfitRate.push(data.body.data.profitLostTrendMapList[i].ProfitRate);
					LYGrowthRate.push(data.body.data.profitLostTrendMapList[i].LYGrowthRate);
					LWGrowthRate.push(data.body.data.profitLostTrendMapList[i].LWGrowthRate);
					sParam.push(data.body.data.profitLostTrendMapList[i].YYYYMM);
				}
				if(index==0){
					echartLine3('tCanvas1',ProfitRate,sParam);
					if(goodsCode==1){
						//console.log(data);
						var html1=''
						html1+='<tr><th>柜组名称</th><th>货商名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html1+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].GroupName==undefined?'':data.body.data.profitLostDetaiDataList[i].GroupName)+'</em></td>';            	
						    html1+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(2))+'</td>';   
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html1+='</tr>';           
						}
						jQuery("#baseTable1").html(html1);
					}
					if(goodsCode==2){
						var html2='';
						html2+='<tr><th>门店</th><th>经营天数</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html2+='<tr><td>'+(data.body.data.profitLostDetaiDataList[i].ShopID==undefined?'':data.body.data.profitLostDetaiDataList[i].ShopID)+'</td>';            	
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].DayNum==undefined?'':data.body.data.profitLostDetaiDataList[i].DayNum)+'</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%</td>';            	
						    html2+='</tr>';           
						}
						jQuery("#baseTable1").html(html2);
					}
					if(goodsCode==3){
						var html3=''
						html3+='<tr><th>货商名称</th><th>商品名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html3+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';            	
						    html3+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].GoodsName==undefined?'':data.body.data.profitLostDetaiDataList[i].GoodsName)+'</em></td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html3+='</tr>';           
						}
						jQuery("#baseTable1").html(html3);
					}
					
				}
				if(index==1){
					echartLine3('tCanvas1',LYGrowthRate,sParam);
					//var html3=''
					if(goodsCode==1){
						var html1=''
						html1+='<tr><th>柜组名称</th><th>货商名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html1+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].GroupName==undefined?'':data.body.data.profitLostDetaiDataList[i].GroupName)+'</em></td>';            	
						    html1+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html1+='</tr>';           
						}
						jQuery("#baseTable1").html(html1);
					}
					if(goodsCode==2){
						var html2='';
						html2+='<tr><th>门店</th><th>经营天数</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html2+='<tr><td>'+(data.body.data.profitLostDetaiDataList[i].ShopID==undefined?'':data.body.data.profitLostDetaiDataList[i].ShopID)+'</td>';            	
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].DayNum==undefined?'':data.body.data.profitLostDetaiDataList[i].DayNum)+'</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%</td>';            	
						    html2+='</tr>';           
						}
						jQuery("#baseTable1").html(html2);
					}
					if(goodsCode==3){
						var html3=''
						html3+='<tr><th>货商名称</th><th>商品名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html3+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';            	
						    html3+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].GoodsName==undefined?'':data.body.data.profitLostDetaiDataList[i].GoodsName)+'</em></td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html3+='</tr>';           
						}
						jQuery("#baseTable1").html(html3);
					}
				}
				if(index==2){
					//console.log(data);
					echartLine3('tCanvas1',LWGrowthRate,sParam);
					if(goodsCode==1){
						var html1=''
						html1+='<tr><th>柜组名称</th><th>货商名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html1+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].GroupName==undefined?'':data.body.data.profitLostDetaiDataList[i].GroupName)+'</em></td>';            	
						    html1+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html1+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html1+='</tr>';           
						}
						jQuery("#baseTable1").html(html1);
					}
					if(goodsCode==2){
						var html2='';
						html2+='<tr><th>门店</th><th>经营天数</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html2+='<tr><td>'+(data.body.data.profitLostDetaiDataList[i].ShopID==undefined?'':data.body.data.profitLostDetaiDataList[i].ShopID)+'</td>';            	
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].DayNum==undefined?'':data.body.data.profitLostDetaiDataList[i].DayNum)+'</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%</td>';
						    html2+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':(data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%</td>';            	
						    html2+='</tr>';           
						}
						jQuery("#baseTable1").html(html2);
					}
					if(goodsCode==3){
						var html3=''
						html3+='<tr><th>货商名称</th><th>商品名称</th><th>总销售额</th><th>同比销售额增长</th><th>同比毛利率增长</th><th>环比销售额增长</th><th>环比比毛利率增长</th></tr>';
						for(var i=0;i<data.body.data.profitLostDetaiDataList.length;i++){						
						    html3+='<tr><td><em>'+(data.body.data.profitLostDetaiDataList[i].VenderName==undefined?'':data.body.data.profitLostDetaiDataList[i].VenderName)+'</em></td>';            	
						    html3+='<td><em>'+(data.body.data.profitLostDetaiDataList[i].GoodsName==undefined?'':data.body.data.profitLostDetaiDataList[i].GoodsName)+'</em></td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].SaleValue==undefined?'':parseFloat(data.body.data.profitLostDetaiDataList[i].SaleValue/10000).toFixed(0))+'</td>';   
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LYDifProRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LYDifProRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMSaleGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMSaleGroRate*100).toFixed(0))+'%')+'</td>';
						    html3+='<td>'+(data.body.data.profitLostDetaiDataList[i].LMProGroRate==undefined?'':((data.body.data.profitLostDetaiDataList[i].LMProGroRate*100).toFixed(0))+'%')+'</td>';            	
						    html3+='</tr>';           
						}
						jQuery("#baseTable1").html(html3);
					}
					
				}
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}

//共性商品分析
function getData5(dataParam,apiUrl){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//业绩分析
			if(apiUrl=='/SQBusiness/goodsController/selectSameGoodsDetailDataPC'){
				//console.log(data);
				var html1="";
				var html2="";
				var len=data.body.data.length>10?10:data.body.data.length;
				html1+='<tr><th style="width:12%;">序号</th><th style="width:16%;">货号</th><th>商品名称</th><th style="width:12%;">状态</th><th>货商</th><th style="width:13%;">期末金额</th><th style="width:13%;">总销售额</th></tr>'
		        for(var i=0;i<len;i++){
		        	html1+='<tr><td>'+(i+1)+'</td>';
		        	html1+='<td><em>'+data.body.data[i].GoodsID+'</em></td>';
		        	html1+='<td><em>'+data.body.data[i].GoodsName+'</em></td>';
		        	html1+='<td>'+parseInt(data.body.data[i].GoodsStatus_CN)+'</td>';
		        	html1+='<td><em>'+data.body.data[i].VenderName+'</em></td>';
		        	html1+='<td>'+data.body.data[i].StkEV+'</td>';
		        	html1+='<td>'+data.body.data[i].SaleValue+'</td>';
		        	html1+='</tr>'
		        }
		        jQuery("#talbeGx1").html(html1);
		        html2+='<tr><th style="width:12%;">序号</th><th>货号</th><th>商品名称</th><th>4周销售额</th><th>4周毛利率</th><th>90天销售额</th><th>90天毛利率</th></tr>'
		        for(var i=0;i<len;i++){
		        	html2+='<tr><td>'+(i+1)+'</td>';
		        	html2+='<td><em>'+data.body.data[i].GoodsID+'</em></td>';
		        	html2+='<td><em>'+data.body.data[i].GoodsName+'</em></td>';
		        	html2+='<td>'+data.body.data[i].SaleValue_30+'</td>';
		        	html2+='<td>'+(data.body.data[i].ProfitRate_30*100).toFixed(0)+'%</td>';
		        	html2+='<td>'+data.body.data[i].SaleValue_90+'</td>';
		        	html2+='<td>'+(data.body.data[i].ProfitRate_90*100).toFixed(0)+'%</td>';
		        	html2+='</tr>';
		        }
		        jQuery("#talbeGx2").html(html2);        		            		        
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}

//实时业绩
function getData6(dataParam,apiUrl,timeType){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
//		headers:{'Access-Control-Allow-Methods:POST'},	
		beforeSend: function() { //发送之前，可以打一下看看提交的参数（如果是变量）
	        plus.nativeUI.showWaiting(); //关闭转圈 
	        //jQuery('body').append('<img src="imgs/loading.gif" class="loading">')
	    },
		success:function(data){
			//console.log(data);
			if(apiUrl=='/SQBusiness/goodsController/selectRealTimeAchieve'){
				var normMap = data.body.data.normMap;
				var detailDataList = data.body.data.detailDataList;
				var trendMapList = data.body.data.trendMapList;
				//修改今日销售额
				document.getElementById("saleValue").innerText = normMap.SaleValue;
				//昨日同期，上周同期，月日均售额
				middleBlock("#blockMiddleOne",normMap.YDSVGroRate,normMap.YDSaleValue);
				middleBlock("#blockMiddleTwo",normMap.LWSVGroRate,normMap.LWSaleValue);
				middleBlock("#blockMiddleThree",normMap.MASVGroRate,normMap.MASaleValue);
				/****************************************************************/
				//修改昨日主要指标
				if(timeType==0){
					var yList='';
					    yList+='<li><a href="javascript:void(0);">';
	                    yList+='<p class="p-head"><i class="now-2"></i><em>客流</em><span style="color: #fe5722">'+normMap.SheetQty+'+</span></p>';
		                yList+='<p class="tip-item">'+checkValue(normMap.YDSheetQty)+'<em>昨日客流</em></p>';
	                    yList+='<p class="tip-item">'+checkRate(normMap.YDSQGroRate)+'<em>昨日同比</em></p>';
		                yList+='</a></li><li><a href="javascript:void(0);">';
	                    yList+='<p class="p-head"><i class="now-3"></i><em>客单</em><span style="color: #63e063">'+(normMap.AvsValue).toFixed(1)+'+</span></p>';
	                    yList+='<p class="tip-item">'+checkValue(normMap.YDAvsValue)+'<em>昨日客单</em></p>';
	                    yList+='<p class="tip-item">'+checkRate(normMap.YDAvsGroRate)+'<em>昨日同比</em></p>';
		                yList+='</a></li><li><a href="javascript:void(0);">';
	                    yList+='<p class="p-head"><i class="now-4"></i><em>毛利率</em><span style="color: #feb15b">'+(normMap.ProfitRate).toFixed(1)+'+</span></p>';
	                    yList+='<p class="tip-item">'+checkRate(normMap.YDProfitRate)+'<em>昨日毛利率</em></p>';
	                    yList+='<p class="tip-item">'+checkRate(normMap.YDPRGroRate)+'</span><em>昨日同比</em></p>';
		                yList+='</a></li>';
		               jQuery("#yList").html(yList);
					//昨日趋势图
					//x轴
					var xData=[];
					//昨日销售额
					var YDSaleValue=[];				
					var LWSaleValue=[];
					//昨日客流
					var YDSheetQty=[];
					var LWSheetQty=[];				 
					for(var i=0;i<data.body.data.trendMapList.length;i++){
						YDSaleValue.push(data.body.data.trendMapList[i].YDSaleValue);
						YDSheetQty.push(data.body.data.trendMapList[i].YDSheetQty);
						LWSaleValue.push(data.body.data.trendMapList[i].LWSaleValue);
						LWSheetQty.push(data.body.data.trendMapList[i].LWSheetQty);
						xData.push(data.body.data.trendMapList[i].SDate);
					}
					//昨日销售额累计
					var YDSaleValueTotal=arrTotal(YDSaleValue);
					var LWSaleValueTotal=arrTotal(LWSaleValue);
					//单选事件
					jQuery(".yd-radio .radio-item").each(function(i,o){
						if(this.checked){
							//alert(jQuery(this).attr('type'));
							if(jQuery(this).attr('index')==1){
								analyseCharLine("tCanvas3",xData,YDSaleValue,LWSaleValue);
							}else{
								analyseCharLine("tCanvas3",xData,YDSaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					jQuery(".yd-radio .radio-item").change(function(){
						if(this.checked){
							if(jQuery(this).attr('index')==1){
								analyseCharLine("tCanvas3",xData,YDSaleValue,LWSaleValue);
							}else{
								analyseCharLine("tCanvas3",xData,YDSaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					analyseCharLine1("tCanvas4",xData,YDSheetQty,LWSheetQty);
					
					//昨日表格详情
					var ydHtml='';
					ydHtml+='<tr><th>类别</th><th>销售额</th><th>昨日</th><th>增长率</th></tr>';
					var ydsqHtml='';
					ydsqHtml+='<tr><th>类别</th><th>客流</th><th>昨日</th><th>增长率</th></tr>';
					var ydprHtml='';
					ydprHtml+='<tr><th>类别</th><th>毛利</th><th>昨日</th><th>增长率</th></tr>';
					for(var i=0;i<data.body.data.detailDataList.length;i++){		                	
				        ydHtml+='<tr>';
				        ydHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        ydHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SaleValue)+'</td>';
				        ydHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDSaleValue)+'</td>';
				        ydHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDSVGroRate)+'</td>';
				        ydHtml+='</tr>'; 
				        
				        ydsqHtml+='<tr>';
				        ydsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        ydsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SheetQty)+'</td>';
				        ydsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDSheetQty)+'</td>';
				        ydsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDSQGroRate)+'</td>';
				        ydsqHtml+='</tr>';
				        
				        ydprHtml+='<tr>';
				        ydprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        ydprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].ProfitRate)+'</td>';
				        ydprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDProfitRate)+'</td>';
				        ydprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].YDPRGroRate)+'</td>';
				        ydprHtml+='</tr>';
					}
					jQuery("#YDsaleValue").html(ydHtml);
					jQuery("#YDSheetQty").html(ydsqHtml);
					jQuery("#YDProfitRate").html(ydprHtml);
				}
				/***********************************************************************/
				//修改上周主要指标
				if(timeType==1){
					var LWList='';
					    LWList+='<li><a href="javascript:void(0);">';
	                    LWList+='<p class="p-head"><i class="now-2"></i><em>客流</em><span style="color: #fe5722">'+normMap.SheetQty+'+</span></p>';
		                LWList+='<p class="tip-item">'+checkValue(normMap.LWSheetQty)+'<em>上周客流</em></p>';
	                    LWList+='<p class="tip-item">'+checkRate(normMap.LWSQGroRate)+'<em>上周同比</em></p>';
		                LWList+='</a></li><li><a href="javascript:void(0);">';
	                    LWList+='<p class="p-head"><i class="now-3"></i><em>客单</em><span style="color: #63e063">'+(normMap.AvsValue).toFixed(1)+'+</span></p>';
	                    LWList+='<p class="tip-item">'+checkValue(normMap.LWAvsValue)+'<em>上周客单</em></p>';
	                    LWList+='<p class="tip-item">'+checkRate(normMap.LWAvsGroRate)+'<em>上周同比</em></p>';
		                LWList+='</a></li><li><a href="javascript:void(0);">';
	                    LWList+='<p class="p-head"><i class="now-4"></i><em>毛利率</em><span style="color: #feb15b">'+(normMap.ProfitRate).toFixed(1)+'+</span></p>';
	                    LWList+='<p class="tip-item">'+checkRate(normMap.LWProfitRate)+'<em>上周毛利率</em></p>';
	                    LWList+='<p class="tip-item">'+checkRate(normMap.LWPRGroRate)+'</span><em>上周同比</em></p>';
		                LWList+='</a></li>';
		               jQuery("#LWList").html(LWList);
					//上周趋势图
					//x轴
					var xData=[];
					//上周销售额
					var SaleValue=[];				
					var LWSaleValue=[];
					//上周客流
					var SheetQty=[];
					var LWSheetQty=[];				 
					for(var i=0;i<data.body.data.trendMapList.length;i++){
						SaleValue.push(data.body.data.trendMapList[i].SaleValue);
						SheetQty.push(data.body.data.trendMapList[i].SheetQty);
						LWSaleValue.push(data.body.data.trendMapList[i].LWSaleValue);
						LWSheetQty.push(data.body.data.trendMapList[i].LWSheetQty);
						xData.push(data.body.data.trendMapList[i].SDate);
					}
					//上周销售额累计
					var SaleValueTotal=arrTotal(SaleValue);
					var LWSaleValueTotal=arrTotal(LWSaleValue);
					//单选事件
					jQuery(".lw-radio .radio-item").each(function(i,o){
						if(this.checked){
							//alert(jQuery(this).attr('type'));
							if(jQuery(this).attr('index')==1){
								analyseCharLine("LWtCanvas3",xData,SaleValue,LWSaleValue);
							}else{
								analyseCharLine("LWtCanvas3",xData,SaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					jQuery(".lw-radio .radio-item").change(function(){
						if(this.checked){
							if(jQuery(this).attr('index')==1){
								analyseCharLine("LWtCanvas3",xData,SaleValue,LWSaleValue);
							}else{
								analyseCharLine("LWtCanvas3",xData,SaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					analyseCharLine1("LWtCanvas4",xData,SheetQty,LWSheetQty);
					
					//上周表格详情
					var lwHtml='';
					lwHtml+='<tr><th>类别</th><th>销售额</th><th>上周</th><th>增长率</th></tr>';
					var lwsqHtml='';
					ydsqHtml+='<tr><th>类别</th><th>客流</th><th>上周</th><th>增长率</th></tr>';
					var lwprHtml='';
					lwprHtml+='<tr><th>类别</th><th>毛利</th><th>上周</th><th>增长率</th></tr>';
					for(var i=0;i<data.body.data.detailDataList.length;i++){		                	
				        lwHtml+='<tr>';
				        lwHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        lwHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SaleValue)+'</td>';
				        lwHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWSaleValue)+'</td>';
				        lwHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWSVGroRate)+'</td>';
				        lwHtml+='</tr>'; 
				        
				        lwsqHtml+='<tr>';
				        lwsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        lwsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SheetQty)+'</td>';
				        lwsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWSheetQty)+'</td>';
				        lwsqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWSQGroRate)+'</td>';
				        lwsqHtml+='</tr>';
				        
				        lwprHtml+='<tr>';
				        lwprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        lwprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].ProfitRate)+'</td>';
				        lwprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWProfitRate)+'</td>';
				        lwprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].LWPRGroRate)+'</td>';
				        lwprHtml+='</tr>';
					}
					jQuery("#LWsaleValue").html(lwHtml);
					jQuery("#LWSheetQty").html(lwsqHtml);
					jQuery("#LWProfitRate").html(lwprHtml);
				}
				/***********************************************************************/
				//修改月日均主要指标
				if(timeType==2){
					var MAList='';
					    MAList+='<li><a href="javascript:void(0);">';
	                    MAList+='<p class="p-head"><i class="now-2"></i><em>客流</em><span style="color: #fe5722">'+normMap.SheetQty+'+</span></p>';
		                MAList+='<p class="tip-item">'+checkValue(normMap.MASheetQty)+'<em>月日均客流</em></p>';
	                    MAList+='<p class="tip-item">'+checkRate(normMap.MASQGroRate)+'<em>月日均同比</em></p>';
		                MAList+='</a></li><li><a href="javascript:void(0);">';
	                    MAList+='<p class="p-head"><i class="now-3"></i><em>客单</em><span style="color: #63e063">'+(normMap.AvsValue).toFixed(1)+'+</span></p>';
	                    MAList+='<p class="tip-item">'+checkValue(normMap.MAAvsValue)+'<em>月日均客单</em></p>';
	                    MAList+='<p class="tip-item">'+checkRate(normMap.MAAvsGroRate)+'<em>月日均同比</em></p>';
		                MAList+='</a></li><li><a href="javascript:void(0);">';
	                    MAList+='<p class="p-head"><i class="now-4"></i><em>毛利率</em><span style="color: #feb15b">'+(normMap.ProfitRate).toFixed(1)+'+</span></p>';
	                    MAList+='<p class="tip-item">'+checkRate(normMap.MAProfitRate)+'<em>月日均毛利率</em></p>';
	                    MAList+='<p class="tip-item">'+checkRate(normMap.MAPRGroRate)+'</span><em>月日均同比</em></p>';
		                MAList+='</a></li>';
		               jQuery("#MAList").html(MAList);
					//月日均趋势图
					//x轴
					var xData=[];
					//月日均销售额
					var MASaleValue=[];				
					var LWSaleValue=[];
					//月日均客流
					var MASheetQty=[];
					var LWSheetQty=[];				 
					for(var i=0;i<data.body.data.trendMapList.length;i++){
						MASaleValue.push(data.body.data.trendMapList[i].MASaleValue);
						MASheetQty.push(data.body.data.trendMapList[i].MASheetQty);
						LWSaleValue.push(data.body.data.trendMapList[i].LWLWSaleValue);
						LWSheetQty.push(data.body.data.trendMapList[i].LWSheetQty);
						xData.push(data.body.data.trendMapList[i].SDate);
					}
					//月日均销售额累计
					var MASaleValueTotal=arrTotal(MASaleValue);
					var LWSaleValueTotal=arrTotal(LWSaleValue);
					//单选事件
					jQuery(".ma-radio .radio-item").each(function(i,o){
						if(this.checked){
							//alert(jQuery(this).attr('type'));
							if(jQuery(this).attr('index')==1){
								analyseCharLine("MAtCanvas3",xData,MASaleValue,LWSaleValue);
							}else{
								analyseCharLine("MAtCanvas3",xData,MASaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					jQuery(".ma-radio .radio-item").change(function(){
						if(this.checked){
							if(jQuery(this).attr('index')==1){
								analyseCharLine("MAtCanvas3",xData,MASaleValue,LWSaleValue);
							}else{
								analyseCharLine("MAtCanvas3",xData,MASaleValueTotal,LWSaleValueTotal);
							}
						}
					})
					analyseCharLine1("MAtCanvas4",xData,MASheetQty,LWSheetQty);
					
					//月日均表格详情
					var maHtml='';
					maHtml+='<tr><th>类别</th><th>销售额</th><th>月日均</th><th>增长率</th></tr>';
					var masqHtml='';
					masqHtml+='<tr><th>类别</th><th>客流</th><th>月日均</th><th>增长率</th></tr>';
					var maprHtml='';
					maprHtml+='<tr><th>类别</th><th>毛利</th><th>月日均</th><th>增长率</th></tr>';
					for(var i=0;i<data.body.data.detailDataList.length;i++){		                	
				        maHtml+='<tr>';
				        maHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        maHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SaleValue)+'</td>';
				        maHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MASaleValue)+'</td>';
				        maHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MASVGroRate)+'</td>';
				        maHtml+='</tr>'; 
				        
				        masqHtml+='<tr>';
				        masqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        masqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].SheetQty)+'</td>';
				        masqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MASheetQty)+'</td>';
				        masqHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MASQGroRate)+'</td>';
				        masqHtml+='</tr>';
				        
				        maprHtml+='<tr>';
				        maprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].CategoryName)+'</td>';
				        maprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].ProfitRate)+'</td>';
				        maprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MAProfitRate)+'</td>';
				        maprHtml+='<td>'+checkUndefined(data.body.data.detailDataList[i].MAPRGroRate)+'</td>';
				        maprHtml+='</tr>';
					}
					jQuery("#MAsaleValue").html(maHtml);
					jQuery("#MASheetQty").html(masqHtml);
					jQuery("#MAProfitRate").html(maprHtml);
				}
				/***********************************************************************/
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(errorThrown);
		},
		complete: function() {
	        plus.nativeUI.closeWaiting(); //关闭转圈 
	        //jQuery('.loading').remove();
	    }
	});
}

/************************************************/
//设置中间并行三块的数据
function middleBlock(id,rate,value){
	var value=(parseFloat(value,10)).toFixed(2)
	if(rate> 0){
		rate = "+" + (rate.toFixed(2)*100) + "%";
		$(id+" span").text(rate);
		$(id+" span").attr("class","red");
		$(id+" .middle i").attr("class","now-5");
		$(id+" p .number").text(value);
	}
	else{
		rate = (rate.toFixed(2)*100) + "%";
		$(id+" span").text(rate);
		$(id+" span").attr("class","green");
		$(id+" .middle i").attr("class","now-6");
		$(id+" p .number").text(value);
	}
}
function checkValue(value){
	return (value>0?('<span class="fr">'+(value).toFixed(0)+'<i class="now-7"></i></span>'):('<span class="fr">'+(value).toFixed(0)+'<i class="now-8"></i></span>'));
}
function checkRate(rate){
	return (rate>0?('<span class="fr">'+(rate*100).toFixed(0)+'%<i class="now-7"></i></span>'):('<span class="fr">'+(rate*100).toFixed(0)+'%<i class="now-8"></i></span>'))
}
function checkUndefined(value){
	return (value==undefined?'--':value)
}
//迭代数组项
function arrTotal(oldArr){
	var newtest=[];
	for(var i=0;i<oldArr.length;i++){
		var j=i;
		var total=0;
		for(var k=0;k<j+1;k++){
			total+=oldArr[k]
		}
		newtest.push((total).toFixed(1));
	}
	return newtest;
}