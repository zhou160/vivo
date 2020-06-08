define(["jquery","jquery-cookie"],function ($){
	
	// 给加减号添加事件
	function operation(){
		// 读取cookie内容
		var cookieArr = JSON.parse($.cookie("goods"))
		// 加号事件
		$(".tab tbody").on("click",".add",function (){
			var item = $(this).closest("td").find("span").eq(1)
			var num = $(this).closest("td").find("span").eq(1).html()
			num++
			if(num >=5){
				num = 5
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
			sum()
		})
		
		// 减号事件
		$(".tab tbody").on("click",".reduce",function (){
			var item = $(this).closest("td").find("span").eq(1)
			var num = $(this).closest("td").find("span").eq(1).html()
			num--
			if(num<=1){
				$(this).css("cursor","no-drop")
				num = 1
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
			sum()
		})
	
		// 给删除按钮添加事件
		$(".tab tbody").on("click",".del",function (){
			// console.log("删除成功")
			var id = $(this).closest("tr").remove().attr("data_id")
			// console.log(id)
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
			sum()
		})
		
		
		//给全选按钮添加点击事件
		$(".checkAll").on("click",function (){
			if($(this).find("i").hasClass("active")){
				$(".checkAll").add("tbody .checks").find("i").removeClass("active")
			}else{
				$(".checkAll").add("tbody .checks").find("i").addClass("active")
			}
			sum()
		})
		//给每个单选按钮添加点击事件
		$("tbody").on("click",".checks",function (){
			var num = 0
			
			//如果已经被选中
			if($(this).find("i").hasClass("active")){
				$(this).find("i").removeClass("active")
			}else{
				//如果未被选中
				$(this).find("i").addClass("active")
			}
			sum()
			// 计算有多少被选中
			for(var i=0;i<cookieArr.length;i++){
				console.log($("tbody tr").eq(i))
				if($("tbody tr").eq(i).find("i").hasClass("active")){
					num++
				}
			}
			if(num == cookieArr.length){
				$(".checkAll").find("i").addClass("active")
			}else{
				$(".checkAll").find("i").removeClass("active")
			}
		})
	}
	//计算选中商品件数以及商品总价
	function sum(){
		var cookieArr = JSON.parse($.cookie("goods"))
		var num = 0;//用于计算商品件数
		var sale = 0//用于计算商品总价格
		var discount = 0//用于计算优惠价格
		for(var i=0;i<cookieArr.length;i++){
			if($("tbody tr").eq(i).find("i").hasClass("active")){
				num += parseInt($("tbody tr").eq(i).find(".num").html())
				sale += parseInt($("tbody tr").eq(i).find(".sale").html())
				discount += parseInt($("tbody tr").eq(i).find(".discount").html())
			}
		}
		$("tfoot td").eq(3).find("p").eq(0).find("i").html(num)
		$("tfoot td").eq(3).find("p").eq(0).find("b").html(sale)
		$("tfoot td").eq(3).find("p").eq(1).find("i").html(sale-discount)
		$("tfoot td").eq(3).find("p").eq(1).find("b").html(discount)
	}

	
	return {
		operation:operation,
		sum:sum
		// checkall:checkall
	}
})