require.config({
	paths:{
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",
		"SCartReco":"SCartReco",
		"SCartEvent":"SCartEvent",
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
require(["SCartReco","SCartEvent","detailEvent"],function(SCartReco,SCartEvent,detailEvent){
	SCartReco.SCartContent()
	SCartReco.shopCart()
	setTimeout(function (){
		SCartEvent.operation()
		SCartEvent.sum()
	},1000)
	// SCartEvent.checkall()
	detailEvent.sum()
})