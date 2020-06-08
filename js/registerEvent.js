define(["jquery"],function ($){
	
	function agree(){
		$(".info li").eq(3).find("span").click(function (){
			console.log(123)
			if($(this).hasClass("active")){
				$(this).removeClass("active")
			}else{
				$(this).addClass("active")
			}
		})
	}
	
	//下一步按钮,判断是否同意
	function Next(){
		$(".info li").eq(4).click(function (){
			if($(".info li").eq(3).find("span").hasClass("active")){
				$(".info li").eq(3).find("p").html("请您先勾选接受《vivo服务协议》").css("color","red")
			}else{
				$(".info li").eq(3).find("p").html('')
			}
			console.log("下一步")
			var tel = $(".info li").eq(2).find("input").val()
			$(".setPass li").eq(0).find("span").html(tel)
			$(".content div").eq(0).addClass("active")
		})
	}

	// 验证码功能
	function verification(){
		
	}
	
	return {
		agree:agree,
		Next:Next
	}
})