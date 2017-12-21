var storeId = localStorage.getItem('storeId');
var baseUrl = 'http://jaaint.f3322.net:28080';
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var type = self.type;
	var dateStr = self.dateStr;		
	var userId = plus.storage.getItem('userId');
	gGoodSurveyAnalysis.getIncAndDecApp(increaceSuccess, userId, type, storeId, dateStr)	
	function increaceSuccess(data){
	var extend1 = data.body.data.increaseList;
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
			var fresh_ml1 = '<tr class="th"><td>品  名</td><td>销售量</td><td>销售额</td><td>增幅</td><td>毛利率</td><td>库存天数</td>';
			for(var i = 0;i<extend1.length;i++){
		   		var flag = extend1[i].IndexFlag;				   		
		    	if(flag){
		    		var flar = flag.split('-');
		    		var str = flag.replace(/\b1\b/i,"A").replace(/\b2\b/i,"B").replace(/\b3\b/i,"C").replace(/\b4\b/i,"平").replace(/\b5\b/i,"重").replace(/\b6\b/i,"促");
		    		var nr = str.split('-');
		    		//console.log(nr); 
		    		if(flar[1]*1>3&&flar[2]*1<3){
		    			fresh_ml1+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
				     	fresh_ml1+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
		    		}else if(flar[1]*1<3&&flar[2]*1>3){
		    			fresh_ml1+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
				     	fresh_ml1+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
		    		}else if(flar[1]*1>3&&flar[2]*1>3){
		    			fresh_ml1+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="org">'+nr[1]+'</div><div  class="org">'+nr[2]+'</div>';				    			   		
				     	fresh_ml1+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
		    		}else if(flar[1]*1<3&&flar[2]*1<3){
		    			fresh_ml1+= '<tr><td class="turn"><em>'+extend1[i].GoodsName+'</em><div class="red">'+nr[1]+'</div><div  class="red">'+nr[2]+'</div>';				    			   		
				     	fresh_ml1+= '</td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
				     	fresh_ml1+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
		    		} 						     	
		    	}else{
		    		fresh_ml1+= '<tr><td class="turn"><em>'+extend1[i].GoodsName;				    				   		
			     	fresh_ml1+= '</em></td><td>'+parseFloat(extend1[i].SaleQty).toFixed(2)+'</td><td>'+parseFloat(extend1[i].SaleValue).toFixed(2)+'</td><td>';
			     	fresh_ml1+= parseFloat(extend1[i].GrowthRate).toFixed(2)+'</td><td>'+parseFloat(extend1[i].ProfitRate).toFixed(2)+'</td><td>';
			     	fresh_ml1+= parseFloat(extend1[i].StockDay).toFixed(2)+'</td></tr>';
		    	}				    	
		   	}				 			
			 $('.serch_body .amplitude_table #increaseList').html(fresh_ml1);
			 $('tr:gt(0)').on('tap',function(){
				var goodsName = $(this).find('td').eq(0).text();
				var k = $(this).index();
				var goodsId = extend1[k].GoodsID;
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
	};
});
$('#cbk').on('tap',function(){
	 mui.init({
	    beforeback: function() {
//		　　　　 //获得父页面的webview
	        var sur = plus.webview.currentWebview().opener();
//		　　　　 //触发父页面的自定义事件(refresh),从而进行刷新
	        mui.fire(sur, 'clash');
//		        //返回true,继续页面关闭逻辑
	        return true;
			    }
	});
	mui.back();
})