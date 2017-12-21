	function typeClass(data,id1,id2,type,dateStr,storeId){
		var frut_data = data.body.data.mapDataByTypeExtend;
				//console.log(frut_data) //parseFloat(frut_data.GrowthRate*100).toFixed(2)
				//console.log(frut_data[0].CategoryName);
				var fresh_tml = '';
				for(var i = 0;i<frut_data.length;i++){
					fresh_tml+= '<li><p class="p1">'+ frut_data[i].CategoryName + '</p>';
					//console.log(parseFloat(frut_data[i].GrowthRate*100).toFixed(2));
					if(parseFloat(frut_data[i].GrowthRate*100).toFixed(2)<0){					
						fresh_tml+= '<p class="gree">' + parseFloat(frut_data[i].GrowthRate*100).toFixed(2) + '</p>';
					}
					else{
						fresh_tml+= '<p class="redd">+' + parseFloat(frut_data[i].GrowthRate*100).toFixed(2) + '</p>';
					}					
					fresh_tml+= '<p>SKU <span>' + parseFloat(frut_data[i].StockSKU).toFixed(2) +'</span></p>';
					fresh_tml+= '<p>动销 <span>' + parseFloat(frut_data[i].SaleSKU).toFixed(2) + '</span></p>';
					if(parseFloat(frut_data[i].GoodGrowthRate).toFixed(2)<0){					
						fresh_tml+= '<p><span class="long">'+frut_data[i].SaleTopName+'</span><span class="gree l_sib">('+parseFloat(frut_data[i].GoodGrowthRate).toFixed(2)+')</span></p></li>';
					}
					else{
						fresh_tml+= '<p><span class="long">'+frut_data[i].SaleTopName+'</span><span class="redd l_sib">(+'+parseFloat(frut_data[i].GoodGrowthRate).toFixed(2)+')</span></p></li>';
					}					
				}			
					$(id1).html(fresh_tml);
					var li = $(id2)
					localStorage.setItem('type',type);
					localStorage.setItem('date',dateStr);
					localStorage.setItem('storeId',storeId);					
					$('.img').on('tap',function(){ 
						openUrl('leibie.html')
					});
					var btp;
					var n = $(id2).length;
					$(id2).on('tap',function(){
						var m = $(this).index();
						var title = $(this).find('p:nth-child(1)').text();						
						btp = frut_data[m].BdeptID;
						localStorage.setItem('btp',btp);						
						localStorage.setItem('title',title);
						localStorage.setItem('date',dateStr);
						openUrl('classes.html');
					});		
	}
