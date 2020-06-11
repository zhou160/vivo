define(["jquery"],function ($){
	
	function verification(){
		//这里是点击验证码按钮之后的操作
		$(".loginNews li").eq(4).find("span").eq(0).click(function (){
			console.log("当前是验证码登录")
			// 清空当前的提示
			$(".loginNews li").eq(5).find("p").html("")
			$(".loginNews").attr("data_id","1")//用于记录当前有没有点击过发送验证码按钮,如果是0就是没有点击过,如果是1就是点击过
			//手机号验证过后才可以发送验证码
			if(checkTel()){
				$(this).closest("li").addClass("spa")
				var random = Math.round(Math.random()*100000)
				console.log("您的验证码是"+random)
				var time = 60
				new Promise(function (resolve,reject){
					var timer = setInterval(function (){
						$(".loginNews li").eq(4).find("span").eq(1).find("i").html(time)
						time --
						if(time < 0){
							clearInterval(timer)
							resolve()
							random = Math.round(Math.random()*100000)
						}
						
					},1000)
				}).then(function (){
					$(".loginNews li").eq(4).removeClass("spa")
				})
				//点击登录按钮之后判断验证码和手机号有效性
				login(random)
			}
			
		})
		
		//一上来就直接点击登录按钮的流程
		login()
			function login(random){
				$(".loginNews li").eq(6).click(function (){
					console.log($(".loginNews").attr("data_id"))
					if($(".loginNews").attr("data_id") == 0){
						$(".loginNews li").eq(5).find("p").html("请输入手机号")
					}else{
						// 手机号正确之后判断验证码
						if(checkTel()){
							// 验证码判断
							if(checkVerification(random)){
								// console.log("成功登录")
							}
						}
					}
					
				})
			}
	}
	
	
	// 手机号合格性验证
	function checkTel(){
		var reg = /^1[3-9]\d{9}$/
		if($(".loginNews li").eq(3).find("input").val() == ''){//手机号是否为空判断
			$(".loginNews li").eq(5).find("p").html("请输入手机号")
			return false
		}else if(!reg.test($(".loginNews li").eq(3).find("input").val())){//手机号正确性判断
			console.log($(".loginNews li").eq(3).find("input").val())
			// console.log("手机号格式不正确")
			$(".loginNews li").eq(5).find("p").html("请输入有效的手机号")
			return false
		}else{
			return true
		}
	}
	
	//验证码合格性判断
	function checkVerification(random){
		console.log(random)
		if($(".loginNews li").eq(4).find("input").val() == ''){
			$(".loginNews li").eq(5).find("p").html("请输入验证码")
			return false
		}else if($(".loginNews li").eq(4).find("input").val() != random){
			$(".loginNews li").eq(5).find("p").html("验证码错误")
			return false
		}else{
			return true
		}
	}
	
	// 账号登录切换
	function loginPass(){
		// 切换到账号密码登录
		$(".login li").eq(2).find("h1").click(function (){
			$(".login").find("ul").addClass("loginPass")
			// console.log(123)
			
			//登录时验证
			var reg = /^1[3-9]\d{9}$/
			$(".loginPass li").eq(6).click(function (){
				if($(".loginPass li").eq(3).find("input").val() == ''){
					$(".loginPass li").eq(5).find("h2").html("请输入手机号").css("color","red")
				}else if(!reg.test($(".loginPass li").eq(3).find("input").val())){
					
					$(".loginPass li").eq(5).find("h2").html("请输入有效的手机号").css("color","red")
				}else{
					// 手机号没有问题
					// 判断密码是否输入,以及格式是否正确
					if($(".loginPass li").eq(4).find("h2").find("input").val() == ''){
						$(".loginPass li").eq(5).find("h2").html("请输入密码").css("color","red")
					}else{
						console.log("输出数据库查询结果")
					}
				}
			})
			verif()
			// console.log("验证码登录之后")
		})
	}
	//邮箱密码登录
	function loginUName(){
		$(".login li").eq(5).find("h2").click(function (){
			console.log("邮箱登录")
			$(".login").find("ul").removeClass("loginPass")
			$(".login").find("ul").addClass("userName")
		})
	}
	
	//切换回验证码登录
	function verif(){
		$(".login li").eq(2).find("h2").click(function (){
			$(".login").find("ul").removeClass("loginPass")
			console.log("切换到验证码登录")
			verification()
			console.log(123)
		})
	}
	
	
	return{
		verification:verification,
		loginPass:loginPass,
		loginUName:loginUName,
		verif:verif
	}
})