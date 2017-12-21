function getData(dataParam,apiUrl){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsDetailApp'){
				//console.log(JSON.stringify(data));
				if(data.body.data.goodsDetaiOne==undefined){return}
				var html='<div class="item-top"><ul class="list-top"><li><p><span>'+parseFloat(data.body.data.goodsDetaiOne.SaleValue).toFixed(0)+'</span> 万</p><p class="percent"><em>'+parseFloat(data.body.data.goodsDetaiOne.SaleValueRate).toFixed(2)*100+'%</em><em class="green">('+parseFloat(data.body.data.goodsDetaiOne.SaleGroRate).toFixed(2)*100+'%)</em></p></li>';				
				html+='<li class="clearfix"><ul class="list-data"><li><p>昨售</p><p><span>'+parseFloat(data.body.data.goodsDetaiOne.LDSaleValue).toFixed(2)+'</span><i>万</i></p></li><li><p>日均</p><p><span>'+parseFloat(data.body.data.goodsDetaiOne.AvgSaleValue).toFixed(2)+'</span><i>万</i></p></li><li><p>新进价</p><p><span>'+parseFloat(data.body.data.goodsDetaiOne.NewCost).toFixed(2)+'</span></p></li><li><p>新售价</p><p><span>'+parseFloat(data.body.data.goodsDetaiOne.NewPrice).toFixed(2)+'</span></p></li></ul></li></ul></div>';
		        html+='<div class="item-bottom no-border"><table class="base-table"><tr><td><em>销量</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.SaleQty).toFixed(1)+'<i>万</i></td><td><em>客流</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.SheetQty).toFixed(2)+'<i>万</i></td><td><em>客单量</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.AvsQty).toFixed(2)+'</td></tr>';                    
		        html+='<tr><td><em>进价</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.Cost).toFixed(2)+'</td><td><em>最高进</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.MaxCost).toFixed(2)+'</td><td><em>最低进</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.MinCost).toFixed(2)+'</td></tr><tr><td><em>售价</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.Price).toFixed(2)+'</td><td><em>最高售</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.MaxPrice).toFixed(2)+'</td><td><em>最低售</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.MinPrice).toFixed(2)+'</td></tr>'    
		        html+='<tr><td><em>在售店</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.SaleNum).toFixed(2)+'</td><td><em>铺市率</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.ShopRate).toFixed(2)*100+'%</td><td><em>动销店</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.ActiveNum).toFixed(2)+'</td></tr><tr><td><em>缺货</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.LackGood).toFixed(2)+'</td><td><em>滞销</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.UnSalable).toFixed(2)+'</td><td><em>负毛利</em></td><td>'+parseFloat(data.body.data.goodsDetaiTwo.NegProfit).toFixed(2)+'</td></tr><tr><td><em>七日进量</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.WeekInQty).toFixed(1)+'</td><td><em>七日销量</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.TotalCloseQty).toFixed(1)+'</td><td><em>库存总量</em></td><td>'+parseFloat(data.body.data.goodsDetaiOne.TotalCloseQty).toFixed(1)+'</td></tr></table></div>'    
		     	jQuery("#sectionItem1").html(html);
			}
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsDetailByTimeApp'){
				//console.log(data);
				var xData=[],sData1=[],sData2=[],sData3=[],sData4=[],sData5=[];
				for(var i=0;i<data.body.data.length;i++){
					xData.push(data.body.data[i].Sdate);
					sData1.push(data.body.data[i].Price);
					sData2.push(parseInt(data.body.data[i].SaleValue));
					sData3.push(data.body.data[i].Cost);
					sData4.push(parseInt(data.body.data[i].SheetQty));
					if(data.body.data[i].Color==0){
						sData5.push({value:parseInt(data.body.data[i].SaleQty),itemStyle: {normal: {color: '#7de875'}}});
					}else{
						sData5.push({value:parseInt(data.body.data[i].SaleQty),itemStyle: {normal: {color: '#fa3419'}}});
					}
				}
				echartLineNew(xData,sData1,sData2,sData3,sData4);		
				echartBar2('tCanvas2',sData5);
			}
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsBranchsSaleDetailApp'){
				var xData=[],sData1=[],sData2=[];
				var html1='<tr><th>分店</th><th>销量</th><th>销售额</th><th>均价</th><th>毛利率</th><th>客数</th><th>客单量</th></tr>';
				for(var i=0;i<data.body.data.length;i++){
					xData.push(data.body.data[i].Sdate);
					sData1.push(data.body.data[i].SaleQty);
					sData2.push(data.body.data[i].SaleValue);
					html1+='<tr><td>'+data.body.data[i].ShopName+'</td><td>'+data.body.data[i].SaleQty*10000+'</td><td>'+(data.body.data[i].SaleValue*10000).toFixed(0)+'</td><td>'+data.body.data[i].AvgPrice+'</td><td>'+parseFloat(data.body.data[i].ProfitRate).toFixed(2)*100+'%</td><td>'+data.body.data[i].SheetQty+'</td><td>'+((parseFloat(data.body.data[i].AvsQty))*100).toFixed(0)+'%</td></tr>'
				}
				//echartBar2('tCanvas2',sData1);
				jQuery("#saleTable").html(html1);       
			}
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsBranchsPurchaseDetailApp'){
				var html2='<tr><th>时间</th><th style="width:13%">分店</th><th style="width:10%">进价</th><th>进货数量</th><th>日销数量</th><th>库存量</th><th>库存天数</th></tr>';
				for(var i=0;i<data.body.data.length;i++){
					html2+='<tr><td>'+data.body.data[i].Sdate+'</td><td>'+data.body.data[i].ShopName+'</td><td>'+data.body.data[i].Cost+'</td><td>'+(data.body.data[i].InQty*10000).toFixed(0)+'</td><td>'+(data.body.data[i].AvgSaleQty*10000).toFixed(0)+'</td><td>'+(data.body.data[i].StockQty*10000).toFixed(0)+'</td><td>'+parseFloat(data.body.data[i].StockDay).toFixed(0)+'</td></tr>'
				}
				jQuery("#saleTable2").html(html2);   
			}
			if(apiUrl=='/SQBusiness/goodsController/selectSaleAnalysisApp'){
				var xData=[],sData1=[],sData2=[];
				var html3='';
				for(var i=0;i<data.body.data.sevenDayCXB.length;i++){
					xData.push(data.body.data.sevenDayCXB[i].Sdate);
					sData1.push(data.body.data.sevenDayCXB[i].StockQty);
					sData2.push(data.body.data.sevenDayCXB[i].SaleQty);
					html3+='<li><em>'+(new Date(data.body.data.sevenDayCXB[i].Sdate).getMonth()+1)+'.'+new Date(data.body.data.sevenDayCXB[i].Sdate).getDate()+'</em><em>'+(data.body.data.sevenDayCXB[i].ProfitRate*100).toFixed(1)+'%</em></li>'
				}
				echartPie('tCanvas3',data.body.data.sevenDayMLL[0].Promotion,data.body.data.sevenDayMLL[0].Discount,data.body.data.sevenDayMLL[0].NormalSale);
				echartBar('tCanvas4',xData,sData1,sData2);
				jQuery("#ProfitRate").html(html3);
			}
			if(apiUrl=='/SQBusiness/goodsController/selectEasySituationApp'){
				var html4='<p><em>所属类别</em><span>'+data.body.data.CategoryName+'</span><i class="green">('+(data.body.data.GrowthRate*100).toFixed(1)+'%)</i></p>'
	                html4+='<p><em>供应商与采购：</em></p>'
	                html4+='<ul class="list-bu">'
	                html4+='<li><i>1</i><span>'+data.body.data.VenderName+'</span><em>'+data.body.data.purchaser+'</em></li>'
	                html4+='<li><i>2</i><span>'+data.body.data.VenderName1+'</span><em>'+data.body.data.purchaser1+'</em></li>'
	                html4+='</ul>'
	                html4+='<ul class="list-param">'
	                html4+='<li><em>引入时间</em><span>'+data.body.data.InDate+'</span></li>'
	                html4+='<li><em>首销时间</em><span>'+data.body.data.FirstSaleDate+'</span></li>'
	                html4+='<li><em>末次进货时间</em><span>'+data.body.data.LastInDate+'</span></li>'
	                html4+='<li><em>末次销售时间</em><span>'+data.body.data.LastSaleDate+'</span></li>'
	                html4+='</ul>'
	                html4+='<p><em>购物篮关联商品：</em></p>'
	                html4+='<ul class="list-product">'
	                html4+='<li>'+data.body.data.GoodsName+'<em class="red">('+(data.body.data.SaleRate*100).toFixed(1)+'%)</em></li>'
	                html4+='<li>'+data.body.data.GoodsName1+'<em class="green">('+(data.body.data.SaleRate1*100).toFixed(1)+'%)</em></li>'
	                html4+='<li>'+data.body.data.GoodsName2+'<em class="red">('+(data.body.data.SaleRate2*100).toFixed(1)+'%)</em></li>'
	                html4+='</ul>';
	                jQuery("#productInfo").html(html4);
			}
			if(apiUrl=='/SQBusiness/goodsController/selectDynamicApp'){
				var html5='';
				var len=data.body.data.length>10?10:data.body.data.length;
				for(var i=0;i<len;i++){
					html5+='<tr><td><i>'+data.body.data[i].Sdate+'</i><i class="shopname">'+data.body.data[i].ShopName+'</i><span>'+data.body.data[i].Content+'</span><i>'+data.body.data[i].Implementer+'</i></td></tr>'
				}
				jQuery("#productInfo2").html(html5);     
			}
			if(apiUrl=='/SQBusiness/goodsController/selectAnalysisApp'){
				var html6='';
				for(var i=0;i<data.body.data.length;i++){
					html6+='<tr><td><i>['+data.body.data[i].SheetName+']</i><span>'+data.body.data[i].Content+'</span></td></tr>';                    
				}
				jQuery("#productInfo3").html(html6);     
			}
//			window.onresize = function(){
//		        if(apiUrl=='/SQBusiness/goodsController/selectGoodsDetailByTimeApp'){
//					var xData=[],sData1=[],sData2=[],sData3=[];
//					for(var i=0;i<data.body.data.length;i++){
//						xData.push(data.body.data[i].Sdate);
//						sData1.push(data.body.data[i].Price);
//						sData2.push(data.body.data[i].SheetQty);
//						sData3.push(data.body.data[i].Cost);
//					}
//					echartLine2('tCanvas1',xData,sData1,sData2,sData3);	
//				}
//		        if(apiUrl=='/SQBusiness/goodsController/selectGoodsBranchsSaleDetailApp'){
//					var xData=[],sData1=[],sData2=[];
//					var html1='<tr><th>分店</th><th>销量</th><th>销售额</th><th>均价</th><th>毛利率</th><th>客数</th><th>客单量</th></tr>';
//					for(var i=0;i<data.body.data.length;i++){
//						xData.push(data.body.data[i].Sdate);
//						sData1.push(data.body.data[i].SaleQty);
//						sData2.push(data.body.data[i].SaleValue);
//						html1+='<tr><td>'+data.body.data[i].ShopName+'</td><td>'+data.body.data[i].SaleQty*10000+'</td><td>'+(data.body.data[i].SaleValue*10000).toFixed(0)+'</td><td>'+data.body.data[i].AvgPrice+'</td><td>'+parseFloat(data.body.data[i].ProfitRate).toFixed(2)*100+'%</td><td>'+data.body.data[i].SheetQty+'</td><td>'+((parseFloat(data.body.data[i].AvsQty))*100).toFixed(0)+'%</td></tr>'
//					}
//					echartBar2('tCanvas2',sData1,sData2);
//					jQuery("#saleTable").html(html1);       
//				}
//		        if(apiUrl=='/SQBusiness/goodsController/selectSaleAnalysisApp'){
//					var xData=[],sData1=[],sData2=[];
//					var html3='';
//					for(var i=0;i<data.body.data.sevenDayCXB.length;i++){
//						xData.push(data.body.data.sevenDayCXB[i].Sdate);
//						sData1.push(data.body.data.sevenDayCXB[i].StockQty);
//						sData2.push(data.body.data.sevenDayCXB[i].SaleQty);
//						html3+='<li><em>'+(new Date(data.body.data.sevenDayCXB[i].Sdate).getMonth()+1)+'.'+new Date(data.body.data.sevenDayCXB[i].Sdate).getDate()+'</em><em>'+(data.body.data.sevenDayCXB[i].ProfitRate*100).toFixed(1)+'%</em></li>'
//					}
//					echartPie('tCanvas3',data.body.data.sevenDayMLL[0].Promotion,data.body.data.sevenDayMLL[0].Discount,data.body.data.sevenDayMLL[0].NormalSale);
//					echartBar('tCanvas4',xData,sData1,sData2);
//					jQuery("#ProfitRate").html(html3);
//				}
//		    }
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}

//判断商品是否已关注
function getGZDate(dataParam,apiUrl,param,groupId,userId){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){		
			//判断商品是否已关注
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsIsFocus'){
				//console.log(JSON.stringify(data));
				if(data.body.data){
					var html='<a href="javascript:void(0)" id="disGZ"><p><i class="menu menu-1"></i></p><p>取消关注</p></a>'           
					jQuery("#gzItem").html(html);
				}else{
					var html='<a href="javascript:void(0)" id="goGZ"><p><i class="menu menu-1"></i></p><p>关注</p></a>'           
					jQuery("#gzItem").html(html);
				}
				jQuery("#disGZ").on('tap',function(){
					var disParam={
						    body:{
						        userId:userId,
						        goodsId:param
						    }
						}
					getGZDate(disParam,'/SQBusiness/goodsController/cancelGoodsFocusApp',param,groupId,userId)

				})
				
				jQuery("#goGZ").on('tap',function(){
					if(groupId==undefined){
						mui.toast('请先设置组合');
					}else{
						var goParam={
						    body:{
						        userId:userId,
						        goodsId:param,
						        groupId:groupId
						    }
						}
						getGZDate(goParam,'/SQBusiness/goodsController/insertGoodsFocusApp',param,groupId,userId)
					}					
				})
			}
			
			if(apiUrl=='/SQBusiness/goodsController/cancelGoodsFocusApp'){
				//console.log(JSON.stringify(data));
				if(data.body.code==0){
					mui.toast('取消关注成功');
					var html='<a href="javascript:void(0)" id="goGZ"><p><i class="menu menu-1"></i></p><p>关注</p></a>'           
					jQuery("#gzItem").html(html);
					jQuery("#goGZ").on('tap',function(){
						//alert(123);
						if(groupId==undefined){
							//alert(789);
							mui.toast('请先设置组合');
						}else{
							var goParam={
							    body:{
							        userId:userId,
							        goodsId:param,
							        groupId:groupId
							    }
							}
							getGZDate(goParam,'/SQBusiness/goodsController/insertGoodsFocusApp',param,groupId,userId)
						}					
					})
					var home=plus.webview.getWebviewById('gz1.html');
		   		    mui.fire(home,'refresh',{
		   			   dateStr:'refresh'
		   		    });
				}
			}
			if(apiUrl=='/SQBusiness/goodsController/insertGoodsFocusApp'){
				//console.log(JSON.stringify(data));
				if(data.body.code==0){
					mui.toast('添加关注成功');
					var html='<a href="javascript:void(0)" id="disGZ"><p><i class="menu menu-1"></i></p><p>取消关注</p></a>'           
					jQuery("#gzItem").html(html);
					jQuery("#disGZ").on('tap',function(){
						//alert(456);
						var disParam={
							    body:{
							        userId:userId,
							        goodsId:param
							    }
							}
						getGZDate(disParam,'/SQBusiness/goodsController/cancelGoodsFocusApp',param,groupId,userId);
	
					})
					var home=plus.webview.getWebviewById('gz1.html');
		   		    mui.fire(home,'refresh',{
		   			   dateStr:'refresh'
		   		    });
				}
			}
			if(apiUrl=='/SQBusiness/goodsController/selectFocusGoodsByGroupId'){
				//console.log(JSON.stringify(data));
				var html="";
				html+='<tr><th></th><th>全部商品</th><th>提醒</th><th>置顶</th><th>拖动</th></tr>'    
				for(var i=0;i<data.body.data.length;i++){
					html+='<tr draggable="true" goodsId="'+data.body.data[i].goodsId+'">';
                    html+='<td><label class="zx-check"><input type="checkbox" class="check-item"><span></span></label></td>';
                    html+='<td>'+data.body.data[i].goodsName+'</td>';
                    html+='<td><i class="eicon-1"></i></td>';
                    html+='<td><i class="eicon-2 top-order"></i></td>';
                    html+='<td><i class="eicon-3"></i></td>';
                	html+='</tr>';
				}
				jQuery("#dragTable").html(html);
				dropEffect();
			    jQuery(".top-order").click(function(){
			   		if(this.className=='eicon-2 top-order'){
			   			this.className='eicon-2a top-order'
			   		}else{
			   			this.className='eicon-2 top-order'
			   		}
			    })
			    jQuery("#selectAll").on('tap',function(){
			    	if(this.className=='active'){
			    		jQuery(".zx-check input").prop('checked',0);
			    		this.className='';
			    		jQuery(this).html('<p>全选</p>');
			    		jQuery("#moveNum").html(0);
			    		jQuery("#deleteNum").html(0);
			    	}else{
			    		jQuery(".zx-check input").prop('checked',1);
			    		jQuery(".list-menu1 li a").removeClass('active');
   						jQuery(this).addClass('active');
   						jQuery(this).html('<p>取消</p>');
   						jQuery("#moveNum").html(jQuery(".zx-check input").length);
   						jQuery("#deleteNum").html(jQuery(".zx-check input").length);
			    	}			    	
			    })
			    jQuery(".zx-check input").change(function(){
			    	jQuery("#moveNum").html(jQuery(".zx-check input:checked").length);
			    	jQuery("#deleteNum").html(jQuery(".zx-check input:checked").length);
			    })
			    jQuery("#moveItem").on('tap',function(){
			    	if(parseInt(jQuery("#moveNum").html())==0){
			    		mui.toast('请先选择产品');
			    		return;
			    	}else{
			    		var arr=[];
			    		jQuery(".zx-check input").each(function(i,o){
			    			if(this.checked){
			    				arr.push(jQuery(this).closest('tr').attr('goodsId'));
			    			}
			    		})
			    		var goodsId=arr.join(',');
			    		mui.openWindow({
			    			url:'select.html',
			    			id:'select.html',
			    			show:{
								duration:'300'
							},
							extras:{
						        groupId:groupId,
						        goodsId:goodsId
						    }
			    		})
			    	}
			    })
			    
			    jQuery("#deleteItem").on('tap',function(){
			    	if(parseInt(jQuery("#deleteNum").html())==0){
			    		mui.toast('请先选择产品');
			    		return;
			    	}else{
			    		var arr=[];
			    		jQuery(".zx-check input").each(function(i,o){
			    			if(this.checked){
			    				arr.push(jQuery(this).closest('tr').attr('goodsId'));
			    			}
			    		})
			    		var goodsId=arr.join(',');
			    		var deleGZParams={
						    body:{
						        groupId:groupId,
						        goodsId:goodsId
						    }
						}
						getGZDate(deleGZParams,"/SQBusiness/goodsController/deleteFocusGoodsFromGroupApp","","")
			    	}
			    })
			}
			if(apiUrl=='/SQBusiness/goodsController/deleteFocusGoodsFromGroupApp'){
				//console.log(data);
				if(data.body.code==0){
					mui.toast('删除成功');
					var prev=plus.webview.getWebviewById('edit.html');
		   		    mui.fire(prev,'refresh',{
		   			  // dateStr:'refresh'
		   		    });
					var home=plus.webview.getWebviewById('gz1.html');
		   		    mui.fire(home,'refresh',{
		   			   dateStr:'refresh'
		   		    });
				}
			}
			
			if(apiUrl=='/SQBusiness/goodsController/moveFocusGoodsApp'){
				//console.log(data);
				if(data.body.code==0){
					mui.toast('移动成功');
					var prev=plus.webview.getWebviewById('edit.html');
		   		    mui.fire(prev,'refresh',{
		   			  // dateStr:'refresh'
		   		    });
					var home=plus.webview.getWebviewById('gz1.html');
		   		    mui.fire(home,'refresh',{
		   			   dateStr:'refresh'
		   		    });
				}
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
				console.log(errorThrown);
			}
	});
}