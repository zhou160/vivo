define(["jquery"],function ($){
	function menu(){
		console.log("ajax测试")
		$.ajax({
			type:"get",
			url:"../data/menuList.json",
			success:function (body){
				console.log(body)
			},
			error:function (){
				console.log(err)
			}
		})
	}
	return{
		menuData:menu
	}
})