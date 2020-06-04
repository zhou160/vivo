define(["jquery"],function ($){
	//控制列表左边是否显示
	function bannerList(){
		// 鼠标移入显示
		$(".bannerList nav li").mouseenter(function (){
			$(".bannerList aside").css("display","block")	
			show($(this))
		})
		// 鼠标移出隐藏
		$(".bannerList").mouseleave(function (){
			$(".bannerList aside").css("display","none")
		})
	}
	//控制左边蒙层是否显示
	function asideHover(){
		$(".banner .bannerList aside .classList1 li").mouseenter(function (){
			$(".banner .bannerList aside .classList1 li").find("span").eq($(this).index()).css("display","block")
			console.log($(this).index())
		}).mouseleave(function (){
			$(".banner .bannerList aside .classList1 li").find("span").eq($(this).index()).css("display","none")
		})
	}
	
	//获取菜单上数据信息
	function menu(){
		return new Promise(function (resolve,reject){
			$.ajax({
				type:"get",
				url:"../data/menuList.json",
				success:function (body){
					resolve(body)
				},
				error:function (){
					reject(err)
				}
			})
		})
	}
	//将获取到的信息动态显示在右侧信息框中
	function show(_this){
		var index = _this.attr("data_id")
		// console.log(index)
		menu().then(function (data){
			$(".bannerList header span").eq(0).html(data[index].name)
			$(".bannerList header i").html(data[index].name)
			var Html = ''
			data[index].secondNav.forEach(function (item,index){
					Html += `<li style="background:url(${item.image.pcBigPic}) no-repeat;background-size:160px 50px;"><a href="localhost:1017/html/details.html">${item.name}<span></span></a></li>`
			})
			$(".classList1").html(Html)
			var str = ''
			data[index].dataList.forEach(function (item,i){
				str += `<li><a href="html/details.html?type=${index}&&num=${i}"><img src="${item.images[0].smallPic}">${item.skuName}</a></li>`
			})
			$(".classList2").html(str)
			// console.log(str)
			// console.log(data[index].dataList[0].images[0].smallPic)
		})
	}
	
	return {
		bannerList:bannerList,
		asideHover:asideHover
	}
})