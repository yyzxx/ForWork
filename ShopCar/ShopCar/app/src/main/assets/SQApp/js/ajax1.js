//查询组合
var activeIndex='';
function getData1(dataParam,apiUrl,selectDate){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		async:false,
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	
		beforeSend: function() { //发送之前，可以打一下看看提交的参数（如果是变量）
	        plus.nativeUI.showWaiting(); //关闭转圈 
	        //jQuery('body').append('<img src="imgs/loading.gif" class="loading">')
	    },
		success:function(data){
			if(apiUrl=='/SQBusiness/goodsController/selectUserGoodsGroupListApp'){
				//console.log(data);
				var dLen=data.body.data.length;
				for(var i=0;i<data.body.data.length;i++){
					if(data.body.data[i].isDefault==1){
						var html=data.body.data[i].groupName
						var groupId=data.body.data[i].groupId;
						jQuery("#subTitle").html(html);
						activeIndex=i;
						//console.log(userId)
						var gzParam1={
						    body:{
						        userId:userId,
						        selectDate:selectDate,
						        groupId:groupId
						    }
						}
						getDetail(gzParam1,'/SQBusiness/goodsController/selectIndexApp',i,true,groupId);
						jQuery('#setItem').on('tap',function(){
							mui.openWindow({
								url:'setting.html', //需要打开页面的url地址 
								id:'setting.html',  //需要打开页面的url页面id
								show:{
									duration:'300'
								},
								extras:{
							        groupId:groupId
							    }
							})
							//openUrl('edit.html');
							jQuery(".tip-alert").hide();
						})
						jQuery('#editItem').on('tap',function(){							
							mui.openWindow({
								url:'edit.html', //需要打开页面的url地址 
								id:'edit.html',  //需要打开页面的url页面id
								show:{
									duration:'300'
								},
								extras:{
							        groupId:groupId
							    },
							})							
							jQuery(".tip-alert").hide();
						})
					}else{
						if(i==0){
							var html=data.body.data[i].groupName
							var groupId=data.body.data[i].groupId;
							jQuery("#subTitle").html(html);
							activeIndex=i;
							var gzParam1={
							    body:{
							        userId:userId,
							        selectDate:selectDate,
							        groupId:groupId
							    }
							}
							getDetail(gzParam1,'/SQBusiness/goodsController/selectIndexApp',i,true,groupId);
							jQuery('#setItem').on('tap',function(){
								mui.openWindow({
									url:'setting.html', //需要打开页面的url地址 
									id:'setting.html',  //需要打开页面的url页面id
									show:{
										duration:'300'
									},
									extras:{
								        groupId:groupId
								    },
								})
								//openUrl('edit.html');
								jQuery(".tip-alert").hide();
							})
							
							jQuery('#editItem').on('tap',function(){
								//openUrl('edit.html');
								mui.openWindow({
									url:'edit.html', //需要打开页面的url地址 
									id:'edit.html',  //需要打开页面的url页面id
									show:{
										duration:'300'
									},
									extras:{
								        groupId:groupId
								    },
								})	
								jQuery(".tip-alert").hide();
							})
						}else{
							var gzParam1={
							    body:{
							        userId:userId,
							        selectDate:selectDate,
							        groupId:data.body.data[i].groupId
							    }
							}
							getDetail(gzParam1,'/SQBusiness/goodsController/selectIndexApp',i,false,data.body.data[i].groupId);
						}
					}
					
				}
				//切换
				var k=0;
				var sildered = mui('.mui-slider').slider();
				sildered.refresh();
				//jQuery("#slideGroup").css('transform',"translate3d(0px, 0px, 0px) translateZ(0px)")
				//jQuery("#slideGroup").css('transition',"all 0.5s ease");
				//console.log(gallery);
				document.querySelector('.mui-slider').addEventListener('slide',function(event){
					var mIndex=event.detail.slideNumber;
					var html=data.body.data[mIndex]==undefined?'':data.body.data[mIndex].groupName;
					jQuery("#subTitle").html(html);
					jQuery('#setItem').off('tap').on('tap',function(){
						mui.openWindow({
							url:'setting.html', //需要打开页面的url地址 
							id:'setting.html',  //需要打开页面的url页面id
							show:{
								duration:'300'
							},
							extras:{
						        groupId:data.body.data[mIndex].groupId
						    },
						})
						//openUrl('edit.html');
						jQuery(".tip-alert").hide();
					})
					
					jQuery('#editItem').off('tap').on('tap',function(){
						mui.openWindow({
							url:'edit.html', //需要打开页面的url地址 
							id:'edit.html',  //需要打开页面的url页面id
							show:{
								duration:'300'
							},
							extras:{
						        groupId:data.body.data[mIndex].groupId
						    },
						})	
						jQuery(".tip-alert").hide();
					})
					k=event.detail.slideNumber;
					if(k==0){
						jQuery("#leftA").hide();
					}else{
						jQuery("#leftA").show();
					}
					if(k==dLen-1){
						jQuery("#rightA").hide();
					}else{
						jQuery("#rightA").show();
					}
				})
				
				//var width=parseInt(jQuery(window).width());
				jQuery("#leftA").off('tap').on('tap',function(){
					//gallery.slider().gotoItem(0);
					if(k>0){
						k--;					
						sildered.gotoItem(k);
						
					}
					if(k==0){
						jQuery("#leftA").hide();
					}
					if(k!=dLen-1){
						jQuery("#rightA").show();
					}
				})
				jQuery("#rightA").off('tap').on('tap',function(){
					if(k<dLen-1){
						k++;					
						sildered.gotoItem(k);						
					}
					if(k!=0){
						jQuery("#leftA").show();
					}
					if(k==dLen-1){
						jQuery("#rightA").hide();
					}
				})
				
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
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  
function getDetail(dataParam,apiUrl,index,bool,groupId){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		async:bool,
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(apiUrl=='/SQBusiness/goodsController/selectIndexApp'){
				//console.log(index);
				//console.log(isEmptyObject(data.body.data.cruIndexMap));
				if(index==activeIndex){
					var html='';
					html+='<div class="section-item"><ul class="list-total">'
					if(data.body.data.cruIndexMap==undefined||isEmptyObject(data.body.data.cruIndexMap)){
						html+='<li><p><span>销量</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="green">'+''+'</i></p></li>'
				    	html+='<li><p><span>销售额</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="green">'+''+'</i></p></li>'    
				    	html+='<li><p><span>库存量</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="red">'+''+'</i></p></li>'  
					}else{
						html+='<li><p><span>销量</span></p><h4>'+(data.body.data.cruIndexMap.SaleQty).toFixed(0)+'</h4><p><em>'+((data.body.data.cruIndexMap.SaleQtyRate==undefined?0:data.body.data.cruIndexMap.SaleQtyRate)*100).toFixed(0)+'%</em>'+((data.body.data.cruIndexMap.SaleQGrRate==undefined?0:(((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>';
				    	html+='<li><p><span>销售额</span></p><h4>'+(data.body.data.cruIndexMap.SaleValue).toFixed(0)+'</h4><p><em>'+((data.body.data.cruIndexMap.SaleValueRate==undefined?0:data.body.data.cruIndexMap.SaleValueRate)*100).toFixed(0)+'%</em>'+((data.body.data.cruIndexMap.SaleVGrRate==undefined?0:(((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>';    
				    	html+='<li><p><span>库存量</span></p><h4>'+(data.body.data.cruIndexMap.StockQty).toFixed(0)+'</h4><p><em>'+(data.body.data.cruIndexMap.StockDay==undefined?0:data.body.data.cruIndexMap.StockDay).toFixed(1)+'天</em>'+((data.body.data.cruIndexMap.StockDayGrRate==undefined?0:(((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>';
					}
				    html+='</ul></div>';
				    html+='<div class="section-item"><div class="normal-table"><table class="base-table"><tr><th>商品名</th><th>'+(data.body.data.keyValueMap.code0).split(',')[1]+'</th><th>'+(data.body.data.keyValueMap.code1).split(',')[1]+'</th><th>'+(data.body.data.keyValueMap.code2).split(',')[1]+'</th></tr>';
				   	for(var i=0;i<data.body.data.foucsCruIndexList.length;i++){
				   		var params0=(data.body.data.keyValueMap.code0).split(',')[0];
				   		var params1=(data.body.data.keyValueMap.code1).split(',')[0];
				   		var params2=(data.body.data.keyValueMap.code2).split(',')[0];
					   	html+='<tr class="toProduct">';
					   	if(data.body.data.foucsCruIndexList[i].IndexFlag){
					   		html+='<td><a href="javascript:void(0)" class="pro" goodsCode="'+data.body.data.foucsCruIndexList[i].GoodsID+'"><em class="p-detail" title="'+data.body.data.foucsCruIndexList[i].GoodsName+'">'+data.body.data.foucsCruIndexList[i].GoodsName+"</em>";
					   		var nArr=data.body.data.foucsCruIndexList[i].IndexFlag.split('-');
					   		nArr.splice(0,1);
					   		for(var j=0;j<nArr.length;j++){
					   			//console.log(nArr);
					   			if(nArr[j]==1){
					   				html+='<em class="tip d-red">A</em>';
					   			}
					   			if(nArr[j]==2){
					   				html+='<em class="tip orange">B</em>';
					   			}
					   			if(nArr[j]==3){
					   				html+='<em class="tip d-red">C</em>';
					   			}
					   			if(nArr[j]==4){
					   				html+='<em class="tip orange">平</em>';
					   			}
					   			if(nArr[j]==5){
					   				html+='<em class="tip d-red">重</em>';
					   			}
					   			if(nArr[j]==6){
					   				html+='<em class="tip orange">促</em>';
					   			}
					   		}					   		
					   	}else{
					   		html+='<td><a href="javascript:void(0)" class="pro" goodsCode="'+data.body.data.foucsCruIndexList[i].GoodsID+'"><em title="'+data.body.data.foucsCruIndexList[i].GoodsName+'">'+data.body.data.foucsCruIndexList[i].GoodsName+"</em>";
					   	}
					   	html+='</a></td><td>'+(data.body.data.foucsCruIndexList[i][params0]==undefined?'--':(params0=='GrowthRate'?(parseFloat(data.body.data.foucsCruIndexList[i][params0]*100).toFixed(2)+'%'):parseFloat(data.body.data.foucsCruIndexList[i][params0]).toFixed(1)))+'</td>';
					   	html+='<td>'+(data.body.data.foucsCruIndexList[i][params1]==undefined?'--':(params1=='GrowthRate'?(parseFloat(data.body.data.foucsCruIndexList[i][params1]*100).toFixed(2)+'%'):parseFloat(data.body.data.foucsCruIndexList[i][params1]).toFixed(1)))+'</td>';
					   	html+='<td>'+(data.body.data.foucsCruIndexList[i][params2]==undefined?'--':(params2=='GrowthRate'?((parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))>0?('<i class="red">+'+(parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))+'%</i>'):('<i class="green">-'+(parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))+'%</i>')):(data.body.data.foucsCruIndexList[i][params2]).toFixed(1)))+'</td></tr>';
				   	}
				    html+='</table></div></div>';			    
					jQuery(".mui-slider-item[index='0']").html(html);
				}else{
					var html='<div class="mui-slider-item">';
					html+='<div class="section-item"><ul class="list-total">'
					if(data.body.data.cruIndexMap==undefined||isEmptyObject(data.body.data.cruIndexMap)){
						html+='<li><p><span>销量</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="green">'+''+'</i></p></li>'
				    	html+='<li><p><span>销售额</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="green">'+''+'</i></p></li>'    
				    	html+='<li><p><span>库存量</span></p><h4>'+''+'</h4><p><em>'+''+'</em><i class="red">'+''+'</i></p></li>'  
					}else{
						//console.log(data.body.data.cruIndexMap);
						html+='<li><p><span>销量</span></p><h4>'+(data.body.data.cruIndexMap.SaleQty).toFixed(0)+'</h4><p><em>'+((data.body.data.cruIndexMap.SaleQtyRate==undefined?0:data.body.data.cruIndexMap.SaleQtyRate)*100).toFixed(0)+'%</em>'+((data.body.data.cruIndexMap.SaleQGrRate==undefined?0:(((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.SaleQGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>';
				    	html+='<li><p><span>销售额</span></p><h4>'+(data.body.data.cruIndexMap.SaleValue).toFixed(0)+'</h4><p><em>'+((data.body.data.cruIndexMap.SaleValueRate==undefined?0:data.body.data.cruIndexMap.SaleValueRate)*100).toFixed(0)+'%</em>'+((data.body.data.cruIndexMap.SaleVGrRate==undefined?0:(((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.SaleVGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>';    
				    	html+='<li><p><span>库存量</span></p><h4>'+(data.body.data.cruIndexMap.StockQty).toFixed(0)+'</h4><p><em>'+(data.body.data.cruIndexMap.StockDay==undefined?0:data.body.data.cruIndexMap.StockDay).toFixed(1)+'天</em>'+((data.body.data.cruIndexMap.StockDayGrRate==undefined?0:(((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))>=0?('<i class="red">(+'+((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))+"%)</i>"):('<i class="green">('+((data.body.data.cruIndexMap.StockDayGrRate*100).toFixed(0))+"%)</i>"))))+'</p></li>'; 
					}					     
				    html+='</ul></div>';
				    html+='<div class="section-item"><div class="normal-table"><table class="base-table"><tr><th>商品名</th><th>'+(data.body.data.keyValueMap.code0).split(',')[1]+'</th><th>'+(data.body.data.keyValueMap.code1).split(',')[1]+'</th><th>'+(data.body.data.keyValueMap.code2).split(',')[1]+'</th></tr>';
				   	for(var i=0;i<data.body.data.foucsCruIndexList.length;i++){
				   		//console.log(data.body.data.foucsCruIndexList[i].SaleQty);
				   		var params0=(data.body.data.keyValueMap.code0).split(',')[0];
				   		var params1=(data.body.data.keyValueMap.code1).split(',')[0];
				   		var params2=(data.body.data.keyValueMap.code2).split(',')[0];
					   	html+='<tr class="toProduct">';
					   	if(data.body.data.foucsCruIndexList[i].IndexFlag){
					   		html+='<td><a href="javascript:void(0)" class="pro" goodsCode="'+data.body.data.foucsCruIndexList[i].GoodsID+'"><em class="p-detail" title="'+data.body.data.foucsCruIndexList[i].GoodsName+'">'+data.body.data.foucsCruIndexList[i].GoodsName+"</em>";
					   		var nArr=data.body.data.foucsCruIndexList[i].IndexFlag.split('-');
					   		nArr.splice(0,1);
					   		for(var j=0;j<nArr.length;j++){
					   			//console.log(nArr);
					   			if(nArr[j]==1){
					   				html+='<em class="tip d-red">A</em>';
					   			}
					   			if(nArr[j]==2){
					   				html+='<em class="tip orange">B</em>';
					   			}
					   			if(nArr[j]==3){
					   				html+='<em class="tip d-red">C</em>';
					   			}
					   			if(nArr[j]==4){
					   				html+='<em class="tip orange">平</em>';
					   			}
					   			if(nArr[j]==5){
					   				html+='<em class="tip d-red">重</em>';
					   			}
					   			if(nArr[j]==6){
					   				html+='<em class="tip orange">促</em>';
					   			}
					   		}					   		
					   	}else{
					   		html+='<td><a href="javascript:void(0)" class="pro" goodsCode="'+data.body.data.foucsCruIndexList[i].GoodsID+'"><em title="'+data.body.data.foucsCruIndexList[i].GoodsName+'">'+data.body.data.foucsCruIndexList[i].GoodsName+"</em>";
					   	}
					   	html+='</a></td><td>'+(data.body.data.foucsCruIndexList[i][params0]==undefined?'--':(params0=='GrowthRate'?(parseFloat(data.body.data.foucsCruIndexList[i][params0]*100).toFixed(2)+'%'):parseFloat(data.body.data.foucsCruIndexList[i][params0]).toFixed(1)))+'</td>';
					   	html+='<td>'+(data.body.data.foucsCruIndexList[i][params1]==undefined?'--':(params1=='GrowthRate'?(parseFloat(data.body.data.foucsCruIndexList[i][params1]*100).toFixed(2)+'%'):parseFloat(data.body.data.foucsCruIndexList[i][params1]).toFixed(1)))+'</td>';
					   	html+='<td>'+(data.body.data.foucsCruIndexList[i][params2]==undefined?'--':(params2=='GrowthRate'?((parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))>0?('<i class="red">+'+(parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))+'%</i>'):('<i class="green">-'+(parseFloat(data.body.data.foucsCruIndexList[i][params2]*100).toFixed(2))+'%</i>')):(data.body.data.foucsCruIndexList[i][params2]).toFixed(1)))+'</td></tr>';
				   	}
				    html+='</table></div></div></div>';			    
					jQuery("#slideGroup").append(html);				
				}
				jQuery('.toProduct').bind('tap',function(){
					var goodsCode=jQuery(this).find('.pro').attr('goodsCode');
					var goodsName=jQuery(this).find('.pro').html();
					var date=jQuery("#dayTime").html();
					mui.openWindow({
						url:'product.html',
						id:'product.html',
						show:{
							duration:'300'
						},
						extras:{
					        goodsCode:goodsCode,
					        goodsName:goodsName,
					        date:date,
					        groupId:groupId
					    },
						
					})
					//openUrl('product.html');
				})
				
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(errorThrown);
		}
	});
}

//设置组合
function getData2(dataParam,apiUrl,index){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//查询组合
			if(apiUrl=='/SQBusiness/goodsController/selectGoodsGroupByIdApp'){
				//console.log(data);	
				if(index==0){
					jQuery("#checkbox3").prop('checked',parseInt(data.body.data.isDefault));
					jQuery(".sub-title em").html(data.body.data.name);	
					jQuery("#description").html(data.body.data.description);
					//alert(data.body.data.isDefault);
				}
				if(index==1){
					var str=data.body.data.name.substr(0,6);
					jQuery("#sTitle").val(str);
					var len=data.body.data.name.length>=6?6:data.body.data.name.length;
					jQuery("#fontNum").html(len);
				}
				if(index==2){
					var str=data.body.data.description==undefined?'':data.body.data.description.substr(0,300);
					jQuery("#inputTexa").val(str);
					if(data.body.data.description!=undefined){
						var len=data.body.data.description.length>=300?300:data.body.data.description.length;
						jQuery("#fontNum").html(len);
					}					
				}
			}
			//删除组合
			if(apiUrl=="/SQBusiness/goodsController/deleteGoodsGroupByIdApp"){
				if(data.body.code==0){
					mui.toast('删除成功');
					setTimeout(function(){
						//mui.back();
						var prev=plus.webview.getWebviewById('gz1.html');
			   		    mui.fire(prev,'refresh',{
			   			   dateStr:'refresh'
			   		    });
					},300)
				}
			}
			//新增组合
			if(apiUrl=="/SQBusiness/goodsController/insertGoodsGroupApp"){
				//console.log(JSON.stringify(data));	
				if(data.body.code==0){
					mui.toast('新增成功');
					setTimeout(function(){
						//mui.back();
						var prev=plus.webview.getWebviewById('gz1.html');
			   		    mui.fire(prev,'refresh',{
			   			   dateStr:'refresh'
			   		    });
					},300)
					
				}
			}
			//修改组合
			if(apiUrl=="/SQBusiness/goodsController/updateGoodsGroupApp"){
				if(index=='isDefault'){
					if(data.body.code==0){
						mui.toast('修改成功');
						var prev=plus.webview.getWebviewById('gz1.html');
			   		    mui.fire(prev,'refresh',{
			   			   dateStr:'refresh'
			   		    });					
					}
				}
				if(index=='name'){
					if(data.body.code==0){
						//console.log(JSON.stringify(data));
						mui.toast('修改组合成功');
						var prev=plus.webview.getWebviewById('setting.html');
			   		    mui.fire(prev,'refresh',{
//			   			   dateStr:'refresh'
			   		    });	
			   		    var parent=plus.webview.getWebviewById('gz1.html');
			   		    mui.fire(parent,'refresh',{
			   			   dateStr:'refresh'
			   		    });					
					}
				}
				if(index=='description'){
					if(data.body.code==0){
						mui.toast('修改成功');
						var prev=plus.webview.getWebviewById('setting.html');
			   		    mui.fire(prev,'refresh',{
			   			   //dateStr:'refresh'
			   		    });	
			   		    var parent=plus.webview.getWebviewById('gz1.html');
			   		    mui.fire(parent,'refresh',{
			   			   dateStr:'refresh'
			   		    });						
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

//查询指标
function getPoint(dataParam,apiUrl,index){
	mui.ajax(baseUrl+apiUrl,{
		data: JSON.stringify(dataParam),
		dataType:'json',//服务器返回json格式数据
		//crossDomain:true,
		type:'post',//HTTP请求类型
		contentType: "application/json; charset=utf-8",
		timeout:10000,//超时时间设置为10秒；
		//headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//查询关键指标
			if(apiUrl=='/SQBusiness/normController/selectCruxNormList'){
				//console.log(JSON.stringify(data));
				var html='';
				var idArr=[];
				for(var i=0;i<data.body.data.length;i++){
					html+='<li><a href="javascript:void(0)" class="selectItem" normId="'+data.body.data[i].id+'">'+data.body.data[i].name+'</a></li>'
					idArr.push(data.body.data[i].id);
				}
				jQuery("#listSet").html(html);
				jQuery(".selectItem").on('tap',function(){		
					var self=this;
					mui.openWindow({
						url:'setting-item.html',
						id:'setting-item.html',
						extras:{
					        normId:jQuery(self).attr('normId'),
					        groupId:index,
					        idArr:idArr
					    },
					    show:{
							duration:'300'
						}
					})
				})
			}
			//查询所有指标
			if(apiUrl=='/SQBusiness/normController/selectNormList'){
				var html=''
				var idArr=index.idArr;
				for(var i=0;i<data.body.data.length;i++){
					if(idArr.indexOf(data.body.data[i].id)>=0){
						if(data.body.data[i].id==index.normId){
							html+='<li><label><input checked type="radio" class="set-item" name="set-item" normId="'+data.body.data[i].id+'"><em>'+data.body.data[i].name+'</em></label></li>'
						}else{
							html+='<li><label><input disabled type="radio" class="set-item" name="set-item" normId="'+data.body.data[i].id+'"><em style="color:#aaa;">'+data.body.data[i].name+'</em></label></li>'
						}
					}else{
						html+='<li><label><input type="radio" class="set-item" name="set-item" normId="'+data.body.data[i].id+'"><em>'+data.body.data[i].name+'</em></label></li>'
					}
										
				}
				jQuery("#listSet1").html(html);
				
				jQuery("#done").on('tap',function(){
					var oldNormId=index.normId;
					var newNormId;
					jQuery(".set-item").each(function(i,o){
						if(this.checked){
							newNormId=jQuery(this).attr('normId');
						}
					})
					if(oldNormId==newNormId){
						mui.toast('请先选择指标');
					}else{
						if(newNormId==undefined) return;
						var pointParams={
						    body:{
						        groupId:index.groupId,
						        oldNormId:oldNormId,
						        newNormId:newNormId
						    }
						}
						getPoint(pointParams,'/SQBusiness/normController/updateCruxNorm','update')						
					}
				})
			}
			//更新指标
			if(apiUrl=='/SQBusiness/normController/updateCruxNorm'){
				if(data.body.code==0){
					mui.toast('修改成功');
					var prev=plus.webview.getWebviewById('setting.html');
		   		    mui.fire(prev,'refresh',{
		   			   //dateStr:'refresh'
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
