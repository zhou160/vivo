const gulp = require("gulp")

//拷贝首页
gulp.task("copy-index",function (){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist/"))
	.pipe(connect.reload())
})

//拷贝所有html文件
gulp.task("copy-html",function (){
	return gulp.src(["html/*.html","!index.html"])
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload())
})

//拷贝json文件
gulp.task("data",function(){
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})


const uglify = require("gulp-uglify")
//拷贝所有js文件
gulp.task("script",function (){
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload())
})

const minifyCss = require("gulp-clean-css")//压缩css文件
const rename = require("gulp-rename")
const scss = require("gulp-sass")
//拷贝css文件
gulp.task("scss",function (){
	return gulp.src('stylesheet/*.scss')
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())//这里是用于后面监听和服务器的时候自动刷新
})

//拷贝minix文件
gulp.task("mixin",function (){
	return gulp.src("stylesheet/_mixin.scss")
	.pipe(gulp.dest("dist/css"))
})

//拷贝图片
gulp.task("images",function (){
	return gulp.src("images/*.{jpg,png}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload())
})

//执行所有任务
gulp.task("build",["copy-index","copy-html","data","script","images","scss"],function (){
	console.log("编译成功")
})

//监听
gulp.task("watch",function (){
	gulp.watch("index.html",["copy-index"])
	gulp.watch(["html/*.html","!index.html"],["copy-html"])
	gulp.watch("data/*.json",["data"])
	gulp.watch("js/*.js",["script"])
	gulp.watch("stylesheet/*.scss",["scss"])
	gulp.watch("images/*.{jpg,png}",["images"])
})

//启动临时服务器,实时刷新
const connect = require("gulp-connect")
gulp.task("server",function (){
	connect.server({
		root:"dist",//指定服务器根目录
		port:1017,//设置端口号,这个端口号只要不跟其他的端口号重复即可
		livereload:true
	})
})

//同时启动服务和监听
gulp.task("default",["watch",'server'])
