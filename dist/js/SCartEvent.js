define(["jquery","jquery-cookie"],function ($){
	
	// 给加减号添加事件
	function operation(){
		// 加号
		$(".tab tbody").on("click",".add",function (){
			var item = $(this).closest("td").find("span").eq(1)
			var num = $(this).closest("td").find("span").eq(1).html()
			num++
			if(num >=5){
				num = 5
				// alert("本产品限购五件")
				$(this).css("cursor","no-drop")
			}
			item.html(num)
			$(this).closest("tr").find("td").eq(6).html(num*$(this).closest("tr").find("td").eq(5).html())
			var cookieArr = JSON.parse($.cookie("goods"))
			for(var i=0;i<cookieArr.length;i++){
				if(cookieArr[i].id == $(this).closest("tr").attr("data_id") ){
					cookieArr[i].num = num
				}
			}
			$.cookie("goods",JSON.stringify(cookieArr),{
				expires:7,
				path:'/'
			})
		})
		
		// 减号
		$(".tab tbody").on("click",".reduce",function (){
			var item = $(this).closest("td").find("span").eq(1)
			var num = $(this).closest("td").find("span").eq(1).html()
			num--
			if(num<=1){
				// alert("不可以再减了")
				$(this).css("cursor","no-drop")
				num = 1
			}
			item.html(num)
			var cookieArr = JSON.parse($.cookie("goods"))
			for(var i=0;i<cookieArr.length;i++){
				if(cookieArr[i].id == $(this).closest("tr").attr("data_id") ){
					cookieArr[i].num = num
				}
			}
			$.cookie("goods",JSON.stringify(cookieArr),{
				expires:7,
				path:'/'
			})
		})
	}
	
	// 给删除按钮添加事件
	$(".tab tbody").on("click",".del",function (){
		console.log("删除成功")
		var id = $(this).closest("tr").remove().attr("data_id")
		console.log(id)
		var cookieArr = JSON.parse($.cookie("goods"))
		for(var i=0;i<cookieArr.length;i++){
			if(cookieArr[i].id == id){
				cookieArr.splice(i,1)
				break
			}
		}
		$.cookie("goods",JSON.stringify(cookieArr),{
			expires:7,
			path:'/'
		})
	})
	
	return {
		operation:operation
	}
})