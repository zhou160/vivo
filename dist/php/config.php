<?php 
	$link = mysqli_connect('127.0.0.1','root','root');
	mysqli_select_db($link,'nz204');//数据库名称
	mysqli_query($link,"set charset 'utf-8'");
	mysqli_query($link,"set charset set 'utf-8'");
?>