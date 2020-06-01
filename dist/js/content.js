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
			if(index > 10) left = -300*10
			// ul.css("left",left)
			ul.animate({left:left},500)
		})
		gopro.click(function (){
			index--
			left = -300*index
			if(index <= 0) left = 0
			// ul.css("left",left)
			ul.animate({left:left},500)
			
		})
	}
	// vshow展示资源
	function vshow(){
		vshowData("../data/vshow.json").then(function (data){
			// console.log(data)
			var str = ''
			data.forEach(function (item){
				// console.log(item.skuName)
				str += `
				<li><img src="${item.skuImg}" class="img1">
					<img src="${item.cornerImg}" class="img2">
				<div>
					<p>${item.skuName}</p>
					<span>${item.promotion}</span>
					<b>
						<i>￥</i>
						<i>${item.actPrice}</i>
						<i>￥${item.marketPrice}</i>
					</b>
				</div>
				
				</li>
				`
			})
			str += `<li>
				<h3>下一场</h3>
				<h2>20:00</h2>
				<h4>去看看</h4>
			</li>`
			$(".content2List").html(str)
		})
	}
	
	//vshow下边内容展示
	function contentshow(){
		vshowData("../data/content.json").then(function (data){
			// console.log(data)
			// 内容三区域展示
			var cont3str = ''
			data.hot.forEach(function (item){
				console.log(item)
				cont3str += `<li>
						<img src="${item.picSrc}" class="img1">
						<div>
							<p>${item.name}</p>
							<span>${item.spec}</span>
							<b><i>￥</i>${item.salePrice}</b>
						</div>
					</li>`
			})
			$(".content3List").html(cont3str)
			//第四部分内容展示
			var cont4str = ''
			data.phone.forEach(function (item,index){
				if(index == 0){
					cont4str += `<li style="background:${item.picSrc};background-size: auto 380px;width: 590px;"></li>`
				}else{
					cont4str += `
					<li><img src="${item.picSrc}" class="img1">
						<div>
							<p>${item.name}</p>
							<span>${item.spec}</span>
							<b><i>￥</i>${item.salePrice}</b>
						</div></li>
					`
				}
				
			})
			$(".content4List").html(cont4str)
			
			//第五部分内容资源,精品配件
			var cont5str = ''
			data.ps.forEach(function (item){
				cont5str += `
					<li>
						<img src="${item.picSrc}" class="img1">
							<div>
								<p>${item.name}</p>
								<span>${item.spec}</span>
								<b><i>￥</i>${item.salePrice}</b>
							</div>
					</li>
				`
			})
			$(".content5List").html(cont5str)
		})
	
	}
	
	function vshowData(url){
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
		time:time,
		rotation:rotation,
		vshow:vshow,
		contentshow:contentshow
	}
})