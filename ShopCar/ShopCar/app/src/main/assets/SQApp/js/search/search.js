// 全局变量
var gBaseUrl = 'http://jaaint.f3322.net:28080';
 mui.plusReady(function(){
 	userId = plus.storage.getItem('userId');
 	localStorage.setItem('userId',userId);
 });
var userId = localStorage.getItem('userId');
	window.onload = function(){
		document.querySelector('form').onsubmit = function(event) {
			var title = document.querySelector('input').value;
			alert(title)
			mui.openWindow({
				id: "list",
				url: "list.html",
				extras: {
					data: title
				}
			});			
			return false;
		};
	};
	$('.hot_table li').click(function(){
		var goodsName = $(this).text();
		gGoodSearch.getSearchList(searchSuccess, userId)
		function searchSuccess(res){
			console.log(res);
			var goodsId =res.body.data[0].GoodsID
			mui.openWindow({
				id: "product.html",
				url: "../product.html",
				extras: {
					goodsName: goodsName,
					goodsCode: goodsId
				}
			});
		}		
	});