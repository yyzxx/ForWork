 function increace_decreaceSuccess(data){
 	//console.log(data)
 	var extend1 = data.body.data.increaseList;
 	//console.log(data);
				//console.log(data);
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
				 for(var i = 0;i<extend1.length;i++){
				 	extend_ar1.push(extend1[i].GoodsName);
				 	extend_ar2.push(parseFloat(extend1[i].SaleQty).toFixed(2));
				 	extend_ar3.push(parseFloat(extend1[i].SaleValue).toFixed(2));
				 	extend_ar4.push(parseFloat(extend1[i].GrowthRate).toFixed(2));
				 	extend_ar5.push(parseFloat(extend1[i].ProfitRate).toFixed(2));
				 	extend_ar6.push(parseFloat(extend1[i].StockDay).toFixed(2));				 					 				 	
				 }
				 var good_tml = '<tr class="th"><td>品  名</td><td>销售量</td><td>销售额</td><td>增幅</td><td>毛利率</td><td>库存天数</td>';
				    for(var i = 0;i<10;i++){
				   		var flag = extend1[i].IndexFlag;				   		
				    	if(flag){
				    		var flar = flag.split('-');
				    		var str = flag.replace(/\b1\b/i,"A").replace(/\b2\b/i,"B").replace(/\b3\b/i,"C").replace(/\b4\b/i,"平").replace(/\b5\b/i,"重").replace(/\b6\b/i,"促");
				    		var nr = str.split('-');
//				    		console.log(nr); 
				    		if(flar[1]*1>3&&flar[2]*1<3){
				    			good_tml+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
						     	good_tml+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1<3&&flar[2]*1>3){
				    			good_tml+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
						     	good_tml+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1>3&&flar[2]*1>3){
				    			good_tml+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
						     	good_tml+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1<3&&flar[2]*1<3){
				    			good_tml+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
						     	good_tml+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	good_tml+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
				    		} 						     	
				    	}else{
				    		good_tml+= '<tr><td class="turn"><em>'+extend1[i].GoodsName;				    				   		
					     	good_tml+= '</em></td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
					     	good_tml+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
					     	good_tml+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
				    	}			     						
			   	}			 			
				 $('.fixed-padding1 #sales_growth .amplitude_table #increaseList').html(good_tml);				
				 $('tr:gt(0)').on('tap',function(){
					var goodsName = $(this).find('td').eq(0).text();
					var k = $(this).index();
					var goodsId = extend1[k].GoodsID;
					mui.openWindow({
							id: "product.html",
							url: "../product.html",
							extras: {
								goodsName: goodsName,
								goodsCode:goodsId
							}
						});
				})
				 var reduce_1 = data.body.data.decreaseList;
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
				 var reduce_ml1 = '<tr class="th"><td>品  名</td><td>销售量</td><td>销售额</td><td>增幅</td><td>毛利率</td><td>库存天数</td>';
				    for(var i = 0;i<10;i++){
				   		var flag = reduce_1[i].IndexFlag;				   		
				    	if(flag){
				    		var flar = flag.split('-');
				    		var str = flag.replace(/\b1\b/i,"A").replace(/\b2\b/i,"B").replace(/\b3\b/i,"C").replace(/\b4\b/i,"平").replace(/\b5\b/i,"重").replace(/\b6\b/i,"促");
				    		var nr = str.split('-');
//				    		console.log(nr); 
				    		if(flar[1]*1>3&&flar[2]*1<3){
				    			reduce_ml1+= '<tr><td class="turn"><em>'+reduce_1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
						     	reduce_ml1+= '</td><td>'+parseFloat(reduce_1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].SaleValue).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1<3&&flar[2]*1>3){
				    			reduce_ml1+= '<tr><td class="turn"><em>'+reduce_1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
						     	reduce_ml1+= '</td><td>'+parseFloat(reduce_1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].SaleValue).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1>3&&flar[2]*1>3){
				    			reduce_ml1+= '<tr><td class="turn"><em>'+reduce_1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
						     	reduce_ml1+= '</td><td>'+parseFloat(reduce_1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].SaleValue).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].StockDay).toFixed(2)+'</td></tr>';
				    		}else if(flar[1]*1<3&&flar[2]*1<3){
				    			reduce_ml1+= '<tr><td class="turn"><em>'+reduce_1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
						     	reduce_ml1+= '</td><td>'+parseFloat(reduce_1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].SaleValue).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].ProfitRate).toFixed(2)+'</td><td>';
						     	reduce_ml1+= parseFloat(reduce_1[i].StockDay).toFixed(2)+'</td></tr>';
				    		} 						     	
				    	}else{
				    		reduce_ml1+= '<tr><td class="turn"><em>'+reduce_1[i].GoodsName;				    				   		
					     	reduce_ml1+= '</em></td><td>'+parseFloat(reduce_1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].SaleValue).toFixed(2)+'</td><td>';
					     	reduce_ml1+= parseFloat(reduce_1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(reduce_1[i].ProfitRate).toFixed(2)+'</td><td>';
					     	reduce_ml1+= parseFloat(reduce_1[i].StockDay).toFixed(2)+'</td></tr>';
				    	}			     						
			   	}
				   $('.fixed-padding1 #sales_growth .amplitude_table #reduce').html(reduce_ml1); 
				   $('tr:gt(0)').on('tap',function(){
					var goodsName = $(this).find('td').eq(0).text();
					var k = $(this).index();
					var goodsId = reduce_1[k].GoodsID;
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
				});
 }