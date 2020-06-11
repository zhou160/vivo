<?php
	include('config.php');
	$tel = $_GET['tel'];
	$psw = $_GET['psw'];
	$res = mysqli_query($link,"select * from vivo where tel = $tel");
	if(mysqli_num_rows($res) >0){
		echo json_encode(array(
				"code" => 200,
				"msg" => "登录成功,即将跳转首页"
			));
		}else{
			echo json_encode(array(
				"code" => 500,
				"msg" => "网络错误，请重试",
				"res" =>$res
			));
		}
?>