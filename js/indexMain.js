// console.log("加载成功")
//配置引入的js模块路径
require.config({
	paths:{
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"banner":"banner",
		"indexHover":"indexHover",
		"content":"content",
		"detailEvent":"detailEvent"
	},
    shim: {
        //jquery.cookie 是依赖于 jquery开发
        //设置依赖关系
        "jquery-cookie": ["jquery"],
        //某一个模块，不遵从AMD   声明define
        "parabola": {
            exports: "_" //和普通的函数一样去使用
        }
	}
})

//调用函数实现对应的功能
require(["banner","detailEvent","indexHover","content"],function(banner,detailEvent,indexHover,content,ajaxData){
	banner.banner()
	detailEvent.sum()
	indexHover.bannerList()
	indexHover.asideHover()//用来控制aside中的蒙层
	// 在这里设置倒计时时间
	content.time(20,0,0)
	//v抢购处的商品左右滑动
	content.rotation()
	//vshow资源展示
	content.vshow()
	content.contentshow()
	// ajaxData.menuData()
})