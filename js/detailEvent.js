define(["jquery","jquery-cookie"],function ($){
	
	
	// 放大图片
	function magnifier(){
		// 鼠标移入放大区域显示
		// console.log("放大镜")
		$(".imgList").mouseenter(function (e){
			// console.log(123)
			
			$(".magnifier").css("display","block")
			$(".imgList").mousemove(function (e){
				console.log(e.pageX)
			})
		}).mouseleave(function (){
			$(".magnifier").css("display","none")
		})
	}
	
	//鼠标滚动控制左侧大图停留以及评论区头部停留及显示和隐藏
	function detailScroll(){
		console.log("成功进入")
		$(window).scroll(function (){
			if($(this).scrollTop() <200){
				$(".detaileLeft").css("top",0)
			}
			else if($(this).scrollTop() >= 200 && $(this).scrollTop() <= 800){
				// console.log("进入固定区域")
				$(".detaileLeft").css("top",$(window).scrollTop() - 200)
			}
			
			if($(this).scrollTop() >=2100){
				console.log("显示")
				$(".foot .head").css({
					"top":$(this).scrollTop() - 2020,
					"box-shadow":" 0px 5px 27px #ccc"
				})
				$(".footRight").css("display","block")
			}else{
				$(".foot .head").css({
					"top":0,
					"box-shadow":" 0px 0px 0px #ccc"
				})
				$(".footRight").css("display","none")
			}
		})
	}
	
	//鼠标移入换图
	function switchImg(){
		$(".productList").on("mouseenter","li",function (){
			console.log($(this).index())
			$(".imgList li").removeClass("active").eq($(this).index()).addClass("active")
			// $(".magnifier").html(`<img src = "">`)
		})
	}
	
	// 推荐区图片滑动
	function recommend(){
		var goNext = $(".reco").find("span").eq(1)
		var goPro = $(".reco").find("span").eq(0)
		var left = 0
		var index = 0
		console.log()
		goNext.click(function (){
			index ++
			// console.log(index)
			if(index >= 8) index = 8
			left = -255 * index
			$(".recoList").animate({left:left},1000)
		})
		goPro.click(function (){
			index --
			if(index <= 0) index = 0
			left = -255 * index
			$(".recoList").animate({left:left},1000)
		})
		console.log("recommend")
	}
	
	// 数量添加
	function num(){
		var span = $(".number dd").find("span")
		var redu = span.eq(0)
		var add = span.eq(2)
		var index = 1
		var Price = 0
		add.click(function (){
			($(".price dt b").html())
			var price = $(".price dt b").html()
			index ++
			if(index >= 5){
				index = 5
			}
			$(".footRight dd").find("b").html(index)
			$(".number dd").find("span").eq(1).html(index)
			Price = index * price
			$(".malePrice dt i").html(Price)
			var num = Price/3
			$(".stages dd").find("li").eq(0).find("i").html(num.toFixed(2))
			num = Price/6
			$(".stages dd").find("li").eq(1).find("i").html(num.toFixed(2))
			num = Price/12
			$(".stages dd").find("li").eq(2).find("i").html(num.toFixed(2))
			num = Price/24
			$(".stages dd").find("li").eq(3).find("i").html(num.toFixed(2))
		})
		redu.click(function (){
			index --
			if(index <= 1){
				index = 1
			}
			num.html(index)
			$(".number dd").find("span").eq(1).html(index)
			Price = index * price
			$(".malePrice dt i").html(Price)
			var num = Price/3
			$(".stages dd").find("li").eq(0).find("i").html(num.toFixed(2))
			num = Price/6
			$(".stages dd").find("li").eq(1).find("i").html(num.toFixed(2))
			num = Price/12
			$(".stages dd").find("li").eq(2).find("i").html(num.toFixed(2))
			num = Price/24
			$(".stages dd").find("li").eq(3).find("i").html(num.toFixed(2))
		})
		
	}
	
	function addCart(){
		$(".btn dt").click(function (){
			add()
		})
	}
	//产品添加
	function add(){
		var first = $.cookie("goods")==null ? true : false
		var id = $(".detaileRight h1").attr("data_id")
		var num = $(".number dd").find("span").eq(1).html()
		var same = false//用于标记当前加入购物车商品之前是否添加过,默认没有添加过
		// console.log(`数量${num}`)
		if(first){
			//cookie第一次添加
			var arr = [{id:id,num:num}]
			$.cookie("goods",JSON.stringify(arr),{
				expires:7,
				path:'/'
			})
		}else{
			//cookie已经存在
			var cookieArr = JSON.parse($.cookie("goods"))
			for(var i=0;i<cookieArr.length;i++){
				//如果该商品已经存在这里就进入分支
				// console.log(cookieArr[i])
				// console.log(cookieArr[0].id)
				if(cookieArr[i].id == id){
					console.log("商品已经存在")
					same = true
					cookieArr[i].num = parseInt(cookieArr[i].num)
					cookieArr[i].num += parseInt(num)
					break
				}
			}
			if(!same){
				console.log("进入第一次添加商品")
				var obj = {id:id,num:num}
				cookieArr.push(obj)
			}
			$.cookie("goods",JSON.stringify(cookieArr),{
				expires:7,
				path:'/'
			})
		}
		sum()
		// if(sum == 0){
		// 	$(".right b").css("display","none")
		// }else{
			
		// }
	}
	
	//计算购物车总数
	function sum(){
		var cookieArr = JSON.parse($.cookie("goods"))
		console.log(cookieArr)
		var sum = 0
		if(cookieArr != null){
			for( var i=0;i<cookieArr.length;i++){
				sum += parseInt(cookieArr[i].num)
			}
			$(".right b").css("display","block")
			$(".right b").html(sum)
			$(".headTop .list2").find("i").html(`(${sum})`)
		}
		return sum
	}
	return {
		magnifier:magnifier,
		detailScroll:detailScroll,
		switchImg:switchImg,
		recommend:recommend,
		num:num,
		addCart:addCart,
		sum:sum
	}
})