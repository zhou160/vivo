define(["jquery"],function ($){
	function bannerList(){
		$(".bannerList").mouseenter(function (){
			console.log($(this).index())
			$(".bannerList aside").css("display","block")
			
		})
		$(".bannerList").mouseleave(function (){
			$(".bannerList aside").css("display","none")
		})
	}
	
	function asideHover(){
		$(".banner .bannerList aside .classList1 li").mouseenter(function (){
			$(".banner .bannerList aside .classList1 li").find("span").eq($(this).index()).css("display","block")
		}).mouseleave(function (){
			$(".banner .bannerList aside .classList1 li").find("span").eq($(this).index()).css("display","none")
		})
	}
	
	return {
		bannerList:bannerList,
		asideHover:asideHover
	}
})