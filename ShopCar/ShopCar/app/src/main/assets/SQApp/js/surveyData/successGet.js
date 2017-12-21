	//生鲜请求成功回调的函数
	function fresh_chartSuccess(data, gType, gDateStr, title, btp){
		//生鲜的概况数据
		survey_data(data);
		
		var chart_data = data.body.data.mapDataByType;
		//周转天数
		var stock_day = [];
		//SKU
		var stock_sku = [];
		//日期
		var fresh_date = [];
		for(var i = 0;i<chart_data.length;i++){												
			stock_day.push((chart_data[i].StockDay*8).toFixed(2));
			stock_sku.push((chart_data[i].StockSKU/60).toFixed(2));
			fresh_date.push(chart_data[i].Sdate);
		};
		var date_n = [];
		for(var i = 0;i<fresh_date.length;i++){
			var sub_a7 = fresh_date[i].substring(4);
			date_n.push(sub_a7);
		}
		var date_na=[];	
		String.prototype.splice = function(idx, rem, str) {
		    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		for(var i=0;i<date_n.length;i++){
			date_na.push(date_n[i].splice(2,0,'.'));						
		};

		var newDa = date_na.slice(0,date_na.length-1);
		var str = ' ';var dot_fresh = [];
		for(var i = 0;i<newDa.length;i++){
			dot_fresh.push(str);
		}				
		var k = parseInt((fresh_date.length/7)-1);
		for(var i = 0;i<=k;i++){
			dot_fresh.splice(7*i+i,0,newDa[7*i]);					
		};
		for(var i = 1;i<=k;i++){										
			stock_day.splice(7*i+i-1,0,0);
			stock_sku.splice(7*i+i-1,0,0);					
		};
		var s_day = [];
		for(var i=0;i<stock_day.length;i++){
			s_day.push(parseFloat(stock_day[i]*1+160).toFixed(2));
		}
		//生鲜折线图和柱形图的混合图
		type_char('echart5',dot_fresh,s_day,stock_sku);			    
		//类别
		typeClass(data,'.fresh .leibie','.fresh .leibie li',gType,gDateStr,gStoreId);		
	};
	
	//食品请求成功回调的函数
	function food_chartSuccess(data, gType, dateStr, title, btp){
		//食品的概况
		survey_data(data);
		var food_chart = data.body.data.mapDataByType;
		//周转天数
		var stock_day3 = [];
		//SKU
		var stock_sku3 = [];
		//日期
		var food_date3 = [];
		for(var i = 0;i<food_chart.length;i++){												
			stock_day3.push((food_chart[i].StockDay*5).toFixed(2));
			stock_sku3.push((food_chart[i].StockSKU/120).toFixed(2));
			food_date3.push(food_chart[i].Sdate);
		};
		var date_n = [];
		for(var i = 0;i<food_date3.length;i++){
			var sub_a7 = food_date3[i].substring(4);
			date_n.push(sub_a7);
		};
		var date_na=[];	
		String.prototype.splice = function(idx, rem, str) {
		    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		for(var i=0;i<date_n.length;i++){
			date_na.push(date_n[i].splice(2,0,'.'));						
		};
		var newDa = date_na.slice(0,date_na.length-1);
		var str = ' ';var dot_fresh = [];
		for(var i = 0;i<newDa.length;i++){
			dot_fresh.push(str)
		};				
		var k = parseInt((food_date3.length/7)-1);
		for(var i = 0;i<=k;i++){
			dot_fresh.splice(7*i+i,0,newDa[7*i]);					
		};
		for(var i = 1;i<=k;i++){										
			stock_day3.splice(7*i+i-1,0,0);
			stock_sku3.splice(7*i+i-1,0,0);					
		};
		var s_day = [];
		for(var i=0;i<stock_day3.length;i++){
			s_day.push(parseFloat(stock_day3[i]*1+120).toFixed(2));
		};
		//食品折线图和柱形图的混合图
		type_char('echart6',dot_fresh,s_day,stock_sku3);
		//类别
		typeClass(data,'.food .leibie','.food .leibie li',gType,dateStr,gStoreId);
	};
	
	//百货请求成功的回调函数
	function good_success(data,gType,dateStr,title,btp){
		survey_data(data);				
		var good_chart = data.body.data.mapDataByType;
		//周转天数
		var stock_day3 = [];
		//SKU
		var stock_sku3 = [];
		//日期
		var food_date3 = [];
		for(var i = 0;i<good_chart.length;i++){												
			stock_day3.push((good_chart[i].StockDay*5).toFixed(2));
			stock_sku3.push((good_chart[i].StockSKU/80).toFixed(2));
			food_date3.push(good_chart[i].Sdate);
		};
		var date_n = [];
		for(var i = 0;i<food_date3.length;i++){
			var sub_a7 = food_date3[i].substring(4);
			date_n.push(sub_a7);
		};
		var date_na=[];	
		String.prototype.splice = function(idx, rem, str) {
		    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		for(var i=0;i<date_n.length;i++){
			date_na.push(date_n[i].splice(2,0,'.'));						
		};
		var newDa = date_na.slice(0,date_na.length-1);
		var str = ' ';var dot_fresh = [];
		for(var i = 0;i<newDa.length;i++){
			dot_fresh.push(str)
		};				
		var k = parseInt((food_date3.length/7)-1);
		for(var i = 0;i<=k;i++){
			dot_fresh.splice(7*i+i,0,newDa[7*i]);					
		};
		for(var i = 1;i<=k;i++){										
			stock_day3.splice(7*i+i-1,0,0);
			stock_sku3.splice(7*i+i-1,0,0);					
		};
		var s_day = [];
		for(var i=0;i<stock_day3.length;i++){
			s_day.push(parseFloat(stock_day3[i]*1+120).toFixed(2));
		}	
		//食品折线图和柱形图的混合图
		type_char('echart7', dot_fresh, s_day, stock_sku3);
		//类别
		typeClass(data,'.goods .leibie','.goods .leibie li', gType, gDateStr, gStoreId);
	};
	
	//餐饮请求成功的回调函数
	function drink_success(data,echart8,type,dateStr,title,btp){
		survey_data(data);
		
		var food_chart = data.body.data.mapDataByType;
		//周转天数
		var stock_day3 = [];
		//SKU
		var stock_sku3 = [];
		//日期
		var food_date3 = [];
		for(var i = 0;i<food_chart.length;i++){												
			stock_day3.push((food_chart[i].StockDay*5).toFixed(2));
			stock_sku3.push((food_chart[i].StockSKU/120).toFixed(2));
			food_date3.push(food_chart[i].Sdate);
		};
		var date_n = [];
		for(var i = 0;i<food_date3.length;i++){
			var sub_a7 = food_date3[i].substring(4);
			date_n.push(sub_a7);
		}
		var date_na=[];	
		String.prototype.splice = function(idx, rem, str) {
		    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		for(var i=0;i<date_n.length;i++){
			date_na.push(date_n[i].splice(2,0,'.'));						
		}
		var newDa = date_na.slice(0,date_na.length-1);
		var str = ' ';var dot_fresh = [];
		for(var i = 0;i<newDa.length;i++){
			dot_fresh.push(str)
		}				
		var k = parseInt((food_date3.length/7)-1);
		for(var i = 0;i<=k;i++){
			dot_fresh.splice(7*i+i,0,newDa[7*i]);					
		};
		for(var i = 1;i<=k;i++){										
			stock_day3.splice(7*i+i-1,0,0);
			stock_sku3.splice(7*i+i-1,0,0);					
		};
		var s_day = [];
		for(var i=0;i<stock_day3.length;i++){
			s_day.push(parseFloat(stock_day3[i]*1+120).toFixed(2));
		}	
		//食品折线图和柱形图的混合图 
		 type_char('echart8',dot_fresh,s_day,stock_sku3)
		 //类别
		 typeClass(data,'.drink .leibie','.drink .leibie li',type,dateStr,gStoreId);		 
	};
	
	//全店请求成功回调的函数
	function allShop_success(data, gType, gDateStr, title, btp){
		//全店概况
		var html = '<li><p>销售额</p><p>'+parseFloat(data.body.data.goodAttri.SaleValue).toFixed(2)+'<em class="grey">万</em></p><p class="grey">';
			html+=	parseFloat(data.body.data.goodAttri.SaleValueRate).toFixed(2);
			if(parseFloat(data.body.data.goodAttri.SaleGroRate).toFixed(2)<0){
				html+=  '%&nbsp;&nbsp;<span class="gree">('+parseFloat(data.body.data.goodAttri.SaleGroRate).toFixed(2);	
			}else{
				html+=  '%&nbsp;&nbsp;<span class="redd">(+'+parseFloat(data.body.data.goodAttri.SaleGroRate).toFixed(2);
			}
			html+=	'%)</span></p></li><li><p>客流</p><p class="black">'+parseFloat(data.body.data.goodAttri.SheetQty).toFixed(2)+'<em class="grey">人次</em></p><p>';
			html+=	parseFloat(data.body.data.goodAttri.SheetQtyRate).toFixed(2);
			if(parseFloat(data.body.data.goodAttri.SheetQtyGroRate).toFixed(2)<0){
				html+=  '%&nbsp;&nbsp;<span class="gree">('+parseFloat(data.body.data.goodAttri.SheetQtyGroRate).toFixed(2);
			}else{
				html+=  '%&nbsp;&nbsp;<span class="redd">(+'+parseFloat(data.body.data.goodAttri.SheetQtyGroRate).toFixed(2);
			}					
				html+=	'%)</span></p></li><li class="right"><p>库存</p><p class="black">'+parseFloat(data.body.data.goodAttri.StockQty).toFixed(2)+'<em class="grey">万</em></p><p class="grey">';
				html+=	parseFloat(data.body.data.goodAttri.StockDay).toFixed(2);
			if(parseFloat(data.body.data.goodAttri.StockQtyGroRate).toFixed(2)<0){
				html+=	'天<span class="gree">('+parseFloat(data.body.data.goodAttri.StockQtyGroRate).toFixed(2)+'%)</span></p></li>';
			}else{
				html+=	'天<span class="redd">(+'+parseFloat(data.body.data.goodAttri.StockQtyGroRate).toFixed(2)+'%)</span></p></li>';
			}					
		$('.fixed-padding1 #branch .salse_amount').html(html);
		//全店的各个类型的增长率
		 var m1 = '<p><em class="grey">生鲜</em><em>'+parseInt(data.body.data.goodAttri.FruSaleValue);
			 if(parseFloat(data.body.data.goodAttri.FruGroRate).toFixed(2)<0){
			 	m1+=  '万</em>&nbsp;&nbsp;<em class="gree">('+parseFloat(data.body.data.goodAttri.FruGroRate).toFixed(2);
			 }else{
			 	m1+=  '万</em>&nbsp;&nbsp;<em class="redd">(+'+parseFloat(data.body.data.goodAttri.FruGroRate).toFixed(2);
			 }
			 	m1+= '%)</em></p><p><em class="grey">食品</em><em>'+parseInt(data.body.data.goodAttri.FoodSaleValue);
		 	 if(parseFloat(data.body.data.goodAttri.FoodGroRate).toFixed(2)<0){
		 	 	 m1+= '万</em>&nbsp;&nbsp;<em class="gree">('+parseFloat(data.body.data.goodAttri.FoodGroRate).toFixed(2);
		 	 }else{
		 	 	m1+= '万</em>&nbsp;&nbsp;<em class="redd">(+'+parseFloat(data.body.data.goodAttri.FoodGroRate).toFixed(2);
		 	 }				 	 
			 	 m1+= '%)</em></p><p><em class="grey">百货</em><em>'+parseInt(data.body.data.goodAttri.DeSaleValue);
		 	 if(parseFloat(data.body.data.goodAttri.DeGroRate).toFixed(2)<0){
		 	 	m1+= '万</em>&nbsp;&nbsp;<em class="gree">('+parseFloat(data.body.data.goodAttri.DeGroRate).toFixed(2);
		 	 }else{
		 	 	m1+= '万</em>&nbsp;&nbsp;<em class="redd">(+'+parseFloat(data.body.data.goodAttri.DeGroRate).toFixed(2);
		 	 }				 	 
			 	 m1+= '%)</em></p><p><em class="grey">餐饮</em><em>'+parseInt(data.body.data.goodAttri.ResSaleValue);
		 	 if(parseFloat(data.body.data.goodAttri.ResGroRate).toFixed(2)<0){
		 	 	m1+= '万</em>&nbsp;&nbsp;<em class="gree">('+parseFloat(data.body.data.goodAttri.ResGroRate).toFixed(2)+'%)</em></p>';
		 	 }else{
		 	 	m1+= '万</em>&nbsp;&nbsp;<em class="redd">(+'+parseFloat(data.body.data.goodAttri.ResGroRate).toFixed(2)+'%)</em></p>';
		 	 }		
	 	$('#echart1 .data').html(m1);
		var head = data.body.data.goodAttri;
		var arr1 = [((head.FruSaleRate)*100).toFixed(2),((head.FoodSaleRate)*100).toFixed(2),((head.DeSaleRate)*100).toFixed(2),((head.ResSaleRate)*100).toFixed(2)];
		var second = data.body.data.mapData;
		//销售额
		var arr2 = [];
		//客流
		var arr3 = [];
		//客单
		var arr5 = [];
		//库存商品sku
		var arr6 = [];
		//日期
		var arr7 = [];
		//周转天数
		var arr8 = [];
		//SKU
		var arr9 = [];
		for(var i = 0;i<second.length;i++){
			arr2.push((second[i].SaleValue/12000).toFixed(2));					
			arr3.push((second[i].SheetQty/500).toFixed(2));
			arr5.push((second[i].AvsValues*3.8).toFixed(2));
			arr6.push((second[i].StockSKU).toFixed(2));
			arr7.push(second[i].Sdate);
			arr8.push((second[i].StockDay*4.5).toFixed(2));
			arr9.push((second[i].StockSKU/260).toFixed(3));
		};
		var chang_ar7 = [];				
		for(var i = 0;i<arr7.length;i++){
			var sub_ar7 = arr7[i].substring(4);
			chang_ar7.push(sub_ar7);
		};
		var date_ar=[];	
		String.prototype.splice = function(idx, rem, str) {
		    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		for(var i=0;i<chang_ar7.length;i++){
			date_ar.push(chang_ar7[i].splice(2,0,'.'));						
		}
		var newAr = date_ar.slice(0,date_ar.length-1);
		var stri = ' ';var dot_ar = [];
		for(var i = 0;i<newAr.length;i++){
			dot_ar.push(stri)
		};
		
		var n = parseInt(arr2.length/7);
		for(var i = 1;i<=n;i++){					
			arr2.splice(7*i+i-1,0,'0');
			arr3.splice(7*i+i-1,0,'0');
			arr5.splice(7*i+i-1,0,'0');
			arr8.splice(7*i+i-1,0,'0');
			arr9.splice(7*i+i-1,0,'0');					
		};
		var new_ar2=[];
		for(var i=0;i<arr2.length;i++){
			new_ar2.push(parseFloat(arr2[i]*1+180).toFixed(2));
		}
		var new_ar3=[];
		for(var i=0;i<arr2.length;i++){
			new_ar3.push(parseFloat(arr3[i]*1+135).toFixed(2));
		};		
		var new_ar8 = [];
		for(var i=0;i<arr8.length;i++){
			new_ar8.push(parseFloat(arr8[i]*1+120).toFixed(2));
		};									
		for(var i = 0;i<=n;i++){
			dot_ar.splice(7*i+i,0,newAr[7*i]);					
		};
		console.log(arr9);
		//全店图表
//		allShop_char('sales_ratio', 'three_sale', 'echart4', arr1, dot_ar, arr5, arr3, arr2, new_ar3, new_ar2, dot_ar, arr9,new_ar8);
		allShop_char('sales_ratio', 'three_sale', 'echart4', arr1, dot_ar, arr5, arr3, arr2, new_ar3, new_ar2, dot_ar, arr9, new_ar8);
	};
