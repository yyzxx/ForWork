// JavaScript Document
/**
 * ajax get post 公共函数
 */	
var ajaxFun = {
	/*
	 * 文件表单提交ajax操作
	 */
	ajaxBodyParamForm:function(successCallBack, errorCallBack, data, url){
		$.ajax({
				url : url, 
				type : 'POST', 
				data : data, 
				// 告诉jQuery不要去处理发送的数据
				processData : false, 
				// 告诉jQuery不要去设置Content-Type请求头
				contentType : false,
				success : function(data) { 
					if (null != successCallBack){
						successCallBack(data);
					}
				}, 
				error : function(xhr, textStatus, errorThrown) { 
					if (null != errorCallBack){
						errorCallBack(xhr, textStatus, errorThrown);
					}
				} 
			});
	},
	/**
	 * ajax get请求
	 * @param {Object} successCallBack: 成功回调函数
	 * @param {Object} errorCallBack： 出错回调函数
	 * @param {Object} data：参数（允许未空）
	 * @param {Object} url：请求地址
	 */
	ajaxGetFunBodyParam: function(successCallBack, errorCallBack, data, url){
		if ((null == data) || (undefined == data)){// 没有参数
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (null != successCallBack){
						successCallBack(data);
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					if (null != errorCallBack){
						errorCallBack(xhr, textStatus, errorThrown);
					}
				}
			});	
		}else{// 有参数
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				success: function (data) {
					
					if (null != successCallBack){
						
						successCallBack(data);
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					if (null != errorCallBack){
						errorCallBack(xhr, textStatus, errorThrown);
					}
				}
			});	
		}
	},
	/**
	 * ajax post请求
	 * @param {Object} successCallBack: 成功回调函数
	 * @param {Object} errorCallBack： 出错回调函数
	 * @param {Object} data：参数（允许未空）
	 * @param {Object} url：请求地址
	 */
	ajaxPostFunBodyParam: function(successCallBack, errorCallBack, data, url){
		if ((null == data) || (undefined == data)){// 没有参数
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (null != successCallBack){
						console.log(111)
						successCallBack(data);
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					if (null != errorCallBack){
						console.log(1212)
						errorCallBack(xhr, textStatus, errorThrown);
					}
				}
			});	
		}else{// 有参数
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				success: function (data) {
					if (null != successCallBack){
						successCallBack(data);
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					if (null != errorCallBack){
						errorCallBack(xhr, textStatus, errorThrown);
					}
				}
			});	
		}
	},
	// ajax调用以josn对象
	ajaxGetfun: function(url, getData, paramObj, successCallBack, errorCallBack ){// url ajax的路径，getData传参，callback回调函数， paramObj额外的参数(对象形式)		
		if(paramObj.layer == 1){// 判断是否要加覆盖层
			var index = layer.load(2, {
			  shade: [0.5,'#000'] // 0.1透明度的白色背景
			});
		}
		var param = getData;//传参
		$.ajax({  
		   url: url,
		   type: 'GET',
		   dataType:'json',
		   contentType : "application/json; charset=utf-8",
		   data:JSON.stringify(param),
		   success: function(data) {
		   		if(paramObj.layer == 1){// 取掉覆盖层
		   			layer.closeAll('loading');
		   		}
			 	successCallBack(data, param ,paramObj);// 回调函数
		   },
		   error: function(xhr, textStatus, errorThrown) {
		   }
		});
	},
	
	ajaxPostfun: function(url, getData, paramObj, successCallBack, errorCallBack ){// url ajax的路径，getData传参，callback回调函数， paramObj额外的参数(对象形式)		
		if(paramObj.layer == 1){// 判断是否要加覆盖层
			var index = layer.load(2, {
			  shade: [0.5,'#000'] // 0.1透明度的白色背景
			});
		}
		var param = getData;//传参
		$.ajax({  
		   	url: url,
		   	type: 'POST',
		   	dataType:'json',
		   	contentType : "application/json; charset=utf-8",
		   	data:JSON.stringify(param),
		   	success: function(data) {
		   		if(paramObj.layer == 1){// 取掉覆盖层
		   			layer.closeAll('loading');
		   		}
			 	successCallBack(data, param ,paramObj);// 回调函数
		   	},
		   	error: function(xhr, textStatus, errorThrown){		   	
		   	}
		});
	}
}
