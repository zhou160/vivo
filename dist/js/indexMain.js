// console.log("加载成功")
//配置引入的js模块路径
require.config({
	paths:{
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"banner":"banner",
		"indexHover":"indexHover"
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
require(["banner","indexHover"],function(banner,indexHover){
	// banner.banner()
	indexHover.bannerList(),
	indexHover.asideHover()
})