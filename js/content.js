define(["jquery"],function ($){
	// 倒计时功能
	function time(h,m,s){
		setInterval(function (){
			var date = new Date()
			var nowTime = date.getTime()
			date.setHours(h,m,s)
			var endTime = date.getTime()
			var time = parseInt((endTime - nowTime)/1000)
				//不考虑毫秒，精确到秒即可
				var seconds = time%60//秒数
				var minutes = (time - seconds)/60%60
				var hour = (time-seconds-minutes*60)/3600
				var i = $(".content2 .head").find("i")
				i.eq(0).html(hour)
				i.eq(1).html(minutes)
				i.eq(2).html(seconds)
		},1000)
	}
	
	// 产品左右滑动功能,v抢购处的商品轮播
	function rotation(){
		var gopro = $(".content2Left")
		var goNext = $(".content2Right")
		var ul = $(".content2List")
		var index = 0
		goNext.click(function (){
			index++
			left = -300*index
			if(index > 5) left = -300*5
			ul.css("left",left)
		})
		gopro.click(function (){
			index--
			left = -300*index
			if(index <= 0) left = 0
			ul.css("left",left)
			
		})
	}
	return {
		time:time,
		rotation:rotation
	}
})