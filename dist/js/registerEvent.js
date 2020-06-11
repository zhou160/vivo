define(["jquery"],function ($){
	
	// 给同意按钮添加点击事件
	function agree(){
		$(".info li").eq(3).find("span").click(function (){
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
			var reg = /^1[3-9]\d{9}$/
			if($(".info li").eq(3).find("span").hasClass("active")){
				$(".info li").eq(3).find("p").html("请您先勾选接受《vivo服务协议》").css("color","red")
			}else if($(".info li").eq(2).find("input").val() == ''){
				// console.log("没有填写号码")
				console.log($(".info li").eq(2).find("input").val())
				$(".info li").eq(3).find("p").html("请输入手机号").css("color","red")
			} else if(!reg.test($(".info li").eq(2).find("input").val())){
				$(".info li").eq(3).find("p").html("请输入有效的手机号").css("color","red")
				// console.log("手机号错误")
			} else{
				
				$(".info li").eq(3).find("p").html('')
				var tel = $(".info li").eq(2).find("input").val()
				$(".setPass li").eq(0).find("span").html(tel)
				$(".content div").eq(0).addClass("active")
			}
		})
	}

	// 验证码功能
	function verification(){
		// console.log(123)
		$(".setPass li").eq(1).find("span").click(function (){
			$(this).closest("li").addClass("spa")
			var random = Math.round(Math.random()*100000)
			console.log("您的验证码是"+random)
			var time = 60
			
			new Promise(function (resolve,reject){
				var timer = setInterval(function (){
					$(".setPass li").eq(1).find("span").eq(1).find("i").html(time)
					time --
					if(time < 0){
						clearInterval(timer)
						resolve()
						random = Math.round(Math.random()*100000)
					}
					
				},1000)
			}).then(function (){
				$(".setPass li").eq(1).removeClass("spa")
			})
			$(".setPass li").eq(4).click(function (){
				console.log(random)
				console.log($(".setPass li").eq(2).find("input").val())
				var reg = /[a-z0-1{8,16}]/i
				if($(".setPass li").eq(1).find("input").val() != random){
					$(".setPass li").eq(3).html("验证码错误").css("color","red")
				}else if(!reg.test($(".setPass li").eq(2).find("input").val())){
					console.log($(".setPass li").eq(2).find("input").val())
					console.log("密码格式不正确")
					$(".setPass li").eq(3).html("密码必须为8-16位字母和数字组合").css("color","red")
				}else{
					$(".setPass li").eq(3).html("密码必须为8-16位字母和数字组合").css("color","#959595")
					var url = `../php/register.php?tel=${$(".info li").eq(2).find("input").val()}&psw=${$(".setPass li").eq(2).find("input").val()}`
					// console.log(url)
					
					api(url).then(function (data){
						console.log(data)
						data = JSON.parse(data)
						if(data.code == 200){
							$(".setPass li").eq(3).html("注册成功").css("color","green")
							window.location.href = "login.html"
						}else{
							$(".setPass li").eq(3).html(`${data.msg}`).css("color","red")
							// console.log("网络错误")
						}
					})
				}
			})
		})
	}
	
	function api(url){
	return new Promise(function (resolve,reject){
			$.ajax({
				type:"get",
				url:url,
				success:function (body){
					resolve(body)
				},
				error:function (){
					reject(err)
				}
			})
		})
	}
	
	return {
		agree:agree,
		Next:Next,
		verification:verification
	}
})