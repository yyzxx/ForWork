var baseUrl = 'http://jaaint.f3322.net:28080';
var storeId = localStorage.getItem('storeId');
$('#back').on('tap',function(){
	mui.init({
	    beforeback: function() {
　　　　	//获得父页面的webview
        var list = plus.webview.currentWebview().opener();
　　　　 	//触发父页面的自定义事件(refresh),从而进行刷新
        mui.fire(list, 'refresh');
        //返回true,继续页面关闭逻辑
        return true;
		}		
	})
	mui.back();
});
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var type = self.type;
	var dateStr = self.dateStr;
	var userId = plus.storage.getItem('userId');
	gGoodSurveyAnalysis.getIncAndDecApp(decreateSuccess, userId, type, storeId, dateStr)
});
//降幅成功回调的函数	
function decreateSuccess(data){
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
		     for(var i = 0;i<reduce_1.length;i++){
		   		var flag = reduce_1[i].IndexFlag;				   		
		    	if(flag){
		    		var flar = flag.split('-');
		    		var str = flag.replace(/\b1\b/i,"A").replace(/\b2\b/i,"B").replace(/\b3\b/i,"C").replace(/\b4\b/i,"平").replace(/\b5\b/i,"重").replace(/\b6\b/i,"促");
		    		var nr = str.split('-');
		    		//console.log(nr); 
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
	    $('.serch_body .amplitude_table #decreaseList').html(reduce_ml1);
	    $('tr:gt(0)').on('tap',function(){
	    var goodsName = $(this).find('td').eq(0).text();
		var k = $(this).index();
		var goodsId = reduce_1[k].GoodsID;
	//	var goodsId=$(this).find('a').attr('goodsId');
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
$('#cbk').on('tap',function(){
	 mui.init({
	    beforeback: function() {
　　　　   //获得父页面的webview
	        var sur = plus.webview.currentWebview().opener();
	　　 //触发父页面的自定义事件(refresh),从而进行刷新
	        mui.fire(sur, 'clash');
        //返回true,继续页面关闭逻辑
	        return true;
	    }
	});
	mui.back();
})