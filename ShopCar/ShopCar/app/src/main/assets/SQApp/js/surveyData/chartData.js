	function typeChar_data(data){
		var chart_data = data.body.data.mapDataByType;
			// console.log(chart_data[1].StockDay);
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
				}
				//console.log(date_na)
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
				
	}
