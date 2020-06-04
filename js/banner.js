define(["jquery"],function ($){
	function banner(){
		var oli = $(".banner ol").find("li")
		var timer = null
		var nowIndex = 0
		//鼠标点击的时候是没有进度条的效果
		//只有自动轮播的时候有进度条的效果
		oli.on("click",function (){
			nowIndex = $(this).index()
			//每次点击的时候将之前所有span的效果复原
			tab(oli,nowIndex)
		})
		
		// 自动轮播
		timer = setInterval(function (){
			nowIndex ++
			if(nowIndex == 5) nowIndex = 0
			tab(oli,nowIndex)
			oli.find("span").removeClass("anima1")
			oli.eq(nowIndex).find("span").addClass("anima1")
			// console.log(timer)
		},5000)
		// 鼠标移入停止轮播
		var Enter = false//记录第一次鼠标移出继续自动轮播
		$(".bannerImage").mouseenter(function (){
			console.log("进入了")
			
			oli.eq(nowIndex).find("span").css("animation-play-state","paused")
			Enter = true
			console.log(Enter)
			clearInterval(timer)
		}).mouseleave(function (){
			console.log('鼠标离开')
			// if(Enter){
			// 	console.log("第二次"+timer)
			// 	var width = oli.eq(nowIndex).find("span").css("width")
			// 	oli.eq(nowIndex).find("span").removeClass("anima1").css({
			// 		"display":"inline-block",
			// 		"width":width
			// 	})
			// 	// console.log()
			// 	console.log("进入if分支")
				
			// 	console.log(width)
			// 	oli.eq(nowIndex).find("span").animate({height:100},1000)
			// 	Enter = false
			// 	console.log(Enter)
			// 	console.log("if下标"+nowIndex)
			// 	oli.eq(nowIndex).find("span").css({
			// 		"display":"none",
			// 		"width":0
			// 	})
			// }
			timer = setInterval(function (){
				nowIndex ++
				// console.log("轮播下标"+nowIndex)
				if(nowIndex == 5) nowIndex = 0
				tab(oli,nowIndex)
				oli.find("span").removeClass("anima1")
				oli.eq(nowIndex).find("span").addClass("anima1")
			},5000)
		})
	}
	function tab(oli,nowIndex){
		$(".banner ul li").find("img").removeClass("active")
		$(".banner ul li").eq(nowIndex).find("img").addClass("active")
		oli.removeClass("active").eq(nowIndex).addClass("active")
	}
	
	// function autoBtn(oli,index){
	// 	oli.find("span").css({
	// 		"display":"none",
	// 		"width":"1px"
	// 	})
	// 	oli.eq(index).find("span").css("display","inline-block")
	// 		oli.eq(index).find("span").animate({
	// 			width:40,
	// 		},5000)
	// }
	
	return {
		banner:banner
	}
})