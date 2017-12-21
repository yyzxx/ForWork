/**
 * 商品概况分析后台交互接口
 */
var gGoodSearch = {
	/**
	 * 获取列别列表（全店 除外）
	 * @param {Object} successBack：接口调用成功回调函数
	 * @param {Object} errorCallBack：接口调用失败回调函数
	 * @param {Object} userId：用户ID(默认为空)
	 * @param {Object} type：'1'搜索，'2'添加
	 * @param {Object} page：页数
	 * @param {Object} counts：条数
	 */
	getSearchList:function(successBack, userId){
		var body = new Object();
			body.type = '1';
			body.userId = userId;
			body.page = "1";
			body.counts = "20";
		//请求参数
		var paramData = new Object();
			paramData.body = body;
		//请求接口地址
		var url = gBaseUrl+'/SQBusiness/goodsController/selectGoodsByIdOrNameApp';
		//console.log(ajaxFun);
		//请求失败回调函数
		var errorCallBack = function(xhr, textStatus, errorThrown){
				console.log("错误",xhr, textStatus, errorThrown);
		};
		//发送ajax请求
		ajaxFun.ajaxPostFunBodyParam(successBack, errorCallBack, paramData, url);
	},
	
	/**
	 * 获取增降幅数据
	 * @param {Object} successBack：接口调用成功回调函数
	 * @param {Object} errorCallBack：接口调用失败回调函数
	 * @param {Object} userId：用户ID(默认为空)
	 * @param {Object} type：类型：'91'生鲜、'92'食品、'93'百货、'916'餐饮等
	 * @param {Object} storeId：门店ID(默认为空)
	 * @param {Object} dateStr： 选择要查询的日期
	 */
	getIncAndDecApp:function(successBack, gUserId, gType, gStoreId, gDateStr){	
		var body = new Object();
			body.deptId = gType;
			body.userId = gUserId;
			body.selectDate = gDateStr;
			body.shopId = gStoreId;
		//请求参数
		var paramData = new Object();
			paramData.body = body;
		//请求地址
		var url = gBaseUrl+'/SQBusiness/goodsController/selectIncAndDecApp';
		//请求失败回调函数
		var errorCallBack = function(xhr, textStatus, errorThrown){
				console.log("错误",xhr, textStatus, errorThrown);
		}
		//发送ajax请求
		ajaxFun.ajaxPostFunBodyParam(successBack, errorCallBack, paramData, url);
	},
	
	/**
	 * 获取门店数据
	 * @param {Object} successBack：接口调用成功回调函数
	 * @param {Object} errorCallBack：接口调用失败回调函数
	 * @param {Object} userId：用户ID(默认为空)
	 * @param {Object} type：类型：'91'生鲜、'92'食品、'93'百货、'916'餐饮等
	 * @param {Object} storeId：门店ID(默认为空)
	 * @param {Object} dateStr： 选择要查询的日期
	 */
	getWholeStoreData:function(successBack, gUserId, gType, gStoreId, gDateStr, sales_ratio, three_sale, echart4){
		var body = new Object();
			body.userId = gUserId;
			body.storeId = gStoreId;
			body.selectDate = gDateStr;
		//请求参数	
		var paramData = new Object();
			paramData.body = body;
		//接口地址	
		var url = gBaseUrl+'/SQBusiness/goodsController/selectGoodsAnalysisAll';
		//请求失败回调函数
		var errorCallBack = function(xhr, textStatus, errorThrown){
				console.log("错误",xhr, textStatus, errorThrown);
		}
		//发送ajax请求
		ajaxFun.ajaxPostFunBodyParam(successBack, errorCallBack, paramData, url);
	}
};
