	function survey_data(data){
		var html = '<li><p>销售额</p><p>'+parseFloat(data.body.data.goodAttriByType.SaleValue).toFixed(2)+'<em class="grey">万</em></p><p class="grey">';
					html+=	parseFloat(data.body.data.goodAttriByType.SaleValueRate).toFixed(2);
					if(parseFloat(data.body.data.goodAttriByType.SaleGroRate).toFixed(2)<0){
						html+=  '%&nbsp;&nbsp;<span class="gree">('+parseFloat(data.body.data.goodAttriByType.SaleGroRate).toFixed(2);	
					}else{
						html+=  '%&nbsp;&nbsp;<span class="redd">(+'+parseFloat(data.body.data.goodAttriByType.SaleGroRate).toFixed(2);
					}
					html+=	'%)</span></p></li><li><p>客流</p><p class="black">'+parseFloat(data.body.data.goodAttriByType.SheetQty).toFixed(2)+'<em class="grey">人次</em></p><p>';
					html+=	parseFloat(data.body.data.goodAttriByType.SheetQtyRate).toFixed(2);
					if(parseFloat(data.body.data.goodAttriByType.SheetQtyGroRate).toFixed(2)<0){
						html+=  '%&nbsp;&nbsp;<span class="gree">('+parseFloat(data.body.data.goodAttriByType.SheetQtyGroRate).toFixed(2);
					}else{
						html+=  '%&nbsp;&nbsp;<span class="redd">(+'+parseFloat(data.body.data.goodAttriByType.SheetQtyGroRate).toFixed(2);
					}					
						html+=	'%)</span></p></li><li class="right"><p>库存</p><p class="black">'+parseFloat(data.body.data.goodAttriByType.StockQty).toFixed(2)+'<em class="grey">万</em></p><p class="grey">';
						html+=	parseFloat(data.body.data.goodAttriByType.StockDay).toFixed(2);
					if(parseFloat(data.body.data.goodAttriByType.StockQtyGroRate).toFixed(2)<0){
						html+=	'天<span class="gree">('+parseFloat(data.body.data.goodAttriByType.StockQtyGroRate).toFixed(2)+'%)</span></p></li>';
					}else{
						html+=	'天<span class="redd">(+'+parseFloat(data.body.data.goodAttriByType.StockQtyGroRate).toFixed(2)+'%)</span></p></li>';
					}		
					$('.fixed-padding1 #branch .salse_amount').html(html);
	}
