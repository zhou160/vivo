define(["jquery"],function ($){
	
	function detailScroll(){
		console.log("成功进入")
		$(window).scroll(function (){
			console.log($(this).scrollTop())//200不动 1000动
			if($(this).scrollTop() <200){
				$(".detaileLeft").css("top",0)
			}
			else if($(this).scrollTop() >= 200 && $(this).scrollTop() <= 1000){
				console.log("进入固定区域")
				$(".detaileLeft").css("top",$(window).scrollTop() - 200)
			}
		})
	}
	return {
		detailScroll:detailScroll
	}
})