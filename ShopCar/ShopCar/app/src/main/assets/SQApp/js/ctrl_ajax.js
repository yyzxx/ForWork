function checkAjax(){
	var storage=window.localStorage;
	//console.log(storage.getItem("wifi"))
	//console.log(storage.getItem("4g"))
		//无WiFi
		if(storage.getItem("wifi")==0){
			$('#crash2 label').addClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			$('#dont_crash2 label').removeClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
//			alert(storage.getItem("wifi"));
			return true;
		}
		//有WiFi
		else if(storage.getItem("wifi")==1){
			$('#dont_crash2 label').addClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			$('#crash2 label').removeClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			return false;
		}
		else if(storage.getItem("4g")==0){
			$('#crash1 label').addClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			$('#dont_crash1 label').removeClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			return true;
		}
		else if(storage.getItem("4g")==1){
			$('#dont_crash1 label').addClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			$('#crash1 label').removeClass('mui-icon mui-icon-checkmarkempty').css({fontSize:'1.5rem',color:'orange'});
			return false;
		}else{
			return true;
		}		
}
   checkAjax();   