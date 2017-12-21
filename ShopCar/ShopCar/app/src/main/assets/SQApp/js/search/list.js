var gBaseUrl = 'http://jaaint.f3322.net:28080';
var userId;
mui.plusReady(function(){
 	userId = plus.storage.getItem('userId');
 	localStorage.setItem('userId',userId);
});
var userId = localStorage.getItem('userId');
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	data = self.data;
});	
mui.init({		
	pullRefresh: {
		container: '#pullrefresh',			
		contentrefresh: '正在刷新...',
		down: {
			//auto: true,
			callback: pulldownRefresh
		},
		up: {				
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
function pulldownRefresh(){
	gGoodSearch.pulldownList(pullListSuccess, userId ,data);
	function pullListSuccess(res) {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 5; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right" >' + res.body.data[i].GoodsName + '</a>';
			//下拉刷新，新纪录插到最前面；
			table.appendChild(li, table.firstChild);
		};
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		$('.mui-navigate-right').on('tap',function(){
			var goodsName = $(this).text();
			var k = $(this).index();					
			var goodsId = res.body.data[k].GoodsID;
			mui.openWindow({
				id: "product",
				url: "../product.html",
				extras: {
					goodsName: goodsName,
					goodsCode: goodsId
				}
			});
		})
	}
};
var count = 0;
/**
 * 上拉加载具体业务实现
 */ 
function pullupRefresh() {
	gGoodSearch.pulldownList(pullupSuccess, userId ,data);
	function pullupSuccess(res){
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var data = self.data;				
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for(var i = cells.length, len = i + 5; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right" goodsId="'+res.body.data[i].GoodsID+'">' + res.body.data[i].GoodsName + '</a>';
				table.appendChild(li);
			}
			$('.mui-table-view-cell').on('tap',function(){
				var goodsName = $(this).text();
				var goodsId=$(this).find('a').attr('goodsId');
				mui.openWindow({
					id: "product.html",
					url: "../product.html",
					extras: {
						goodsName: goodsName,
						goodsCode:goodsId
					}
				});
			})
		})
	}
};
if(mui.os.plus) {
    mui.plusReady(function() {
      setTimeout(function() {
        mui('#pullrefresh').pullRefresh().pullupLoading();
      }, 1000);

    });
}else{ 
    mui.ready(function() {
      mui('#pullrefresh').pullRefresh().pullupLoading();
    });
}
$('.mui-table-view-cell').on('tap',function(){
  	var goodsName = $(this).text();
});