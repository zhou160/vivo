define(["jquery"],function ($){
	// 导入详情页信息
	function detailsList(clas,index){
		var width = 90//用于设置productList的宽度,图片是挨着的无需间隙
		product("../data/menuList.json").then(function (data){
			var imgs = data[clas].dataList[index].images
			var li = data[clas].dataList[index]
			$(".productList").css("width",width*imgs.length)
			var bigImg = ''
			var smallImg = ''
			var bigImage = ''//用于存放放大图片
			//content处大图和小图
			// console.log(li.corner)
			if(li.corner){
				$(".img2").attr("src",`${li.corner.thumbnailPic}`)
			}
			imgs.forEach(function (item,index){
				// console.log(item)
				if(index == 0){
					bigImg += `<li class="active"><img src="${item.hdPic}" class="img1"></li>`
					bigImage += `<li class="active"><img src="${item.hdPic}"></li>`
				}else{
					bigImg += `<li><img src="${item.hdPic}" class="img1"></li>`
					bigImage += `<li><img src="${item.hdPic}"></li>`
				}
				smallImg += `
				<li>
					<img src="${item.smallPic}">
				</li>
				`
			})
			
			//固定位置内容
			// console.log($(".number dd").find("span").eq(1).html())
			var foot = `
				<dt>
					<img src="${imgs[0].smallPic}">
				</dt>
				<dd>
					<span> ${data[clas].dataList[index].skuName}<i>￥${data[clas].dataList[index].salePrice}</i></span>
					<span>已选：<i>深灰色</i><b>1</b>件</span>
				</dd>
			`
			// console.log()
			$(".footRight").find("dl").html(foot)
			//其他地方数据
			$(".bigImg").html(bigImage)
			$(".imgList").html(bigImg)
			$(".productList").html(smallImg)
			$(".detaileRight h1").attr("data_id",`${li.id}`).html(li.skuName)
			$(".detaileRight h2 i").html(li.brief)
			$(".detaileRight h2 span i").html(li.promotion)
			var salePrice = li.salePrice
			$(".price dt span b").html(salePrice)
			$(".price dd b").html(salePrice)
			$(".malePrice dt i").html(salePrice)
			var num = salePrice/3
			$(".stages dd").find("li").eq(0).find("i").html(num.toFixed(2))
			$(".stages dd").find("li").eq(0).find("b").html("3")
			num = salePrice/6
			$(".stages dd").find("li").eq(1).find("i").html(num.toFixed(2))
			$(".stages dd").find("li").eq(1).find("b").html("6")
			num = salePrice/12
			$(".stages dd").find("li").eq(2).find("i").html(num.toFixed(2))
			$(".stages dd").find("li").eq(2).find("b").html("12")
			num = salePrice/24
			$(".stages dd").find("li").eq(3).find("i").html(num.toFixed(2))
			$(".stages dd").find("li").eq(3).find("b").html("24")
			console.log(data.three)
			//手机配件处推荐
			var str1 = ''
			var width1 = 245
			var cont = data.three.dataList
			var len = cont.length
			console.log(len)
			$(".recoList").css("width",width1*len +(len-1)*10 )
			cont.forEach(function (item,index){
				str1 += `
					<li>
						<img src="${item.images[0].smallPic}">
						<p>${item.skuName}</p>
						<i>￥${item.salePrice}</i>
					</li>
				`
			})
			$(".recoList").html(str1)
		})
	}
	
	//获取信息
	function product(url){
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
	return{
		detailsList:detailsList
	}
})