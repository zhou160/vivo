define(["jquery","jquery-cookie"],function ($){
	// 猜你喜欢内容
	function SCartContent(){
		Data().then(function (data){
			// console.log(data)
			var src = ''
			// console.log(data.three.dataList)
			var recoData = data.three.dataList
			recoData.forEach(function (item){
				src += `<li>
							<img src="${item.images[0].smallPic}">
							<p>${item.skuName}</p>
							<span>${item.brief}</span>
							<h1><i>￥</i><b>${item.salePrice}</b></h1>
						</li>`
			})
			$(".reco").html(src)
		})
	}
	
	// 购物车内容加载
	function shopCart(){
		// console.log($.cookie("goods"))
		var cookieArr = JSON.parse($.cookie("goods"))
		var newArr = []
		Data().then(function (data){
			// console.log(data)
			for(item in data){
				data[item].dataList.forEach(function (item){
					// console.log(item.id)
					// console.log(item)
					for(var i=0;i<cookieArr.length;i++){
						if(cookieArr[i].id == item.id){
							// console.log(cookieArr[0].num)
							item.num = cookieArr[i].num
							newArr.push(item)
						}
					}
				})
			}
			// console.log(newArr)
			var src = ''
			newArr.forEach(function (item){
				src += `
					<tr data_id="${item.id}">
						<td><input type="checkbox"/></td>
						<td>
							<dl>
								<dt><img src="${item.images[0].smallPic}"></dt>
								<dd>
								<span>${item.skuName}</span>
								<span>颜色： 黑色</span></dd>
							</dl>
						</td>
						<td>${item.salePrice}元</td>
						<td>
							<span class="reduce">-</span>
							<span class="num">${item.num}</span>
							<span class="add">+</span>
						</td>
						<td>0.00</td>
						<td>${item.salePrice}</td>
						<td>${item.salePrice*item.num}</td>
						<td>
							<span>加入收藏夹</span>
							<span class=>删除</span>
						</td>
					</tr>
				`
			})
			$("tbody").html(src)
		})
		
	}
	
	
	//获取资源
	function Data(){
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
	return {
		SCartContent:SCartContent,
		shopCart:shopCart
	}
})