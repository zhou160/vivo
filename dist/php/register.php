<?php
	include('config.php');
	$tel = $_GET['tel'];
	$psw = $_GET['psw'];
	
	//可以在这里添加一项关于手机号唯一性的判断
	$unique = mysqli_query($link,"select * from vivo where tel = '$tel'");
	$arr = array();
	while($row = mysqli_fetch_assoc($unique)) {
	  array_push($arr, $row);
	}
	if(empty($arr)){
		$sql = "insert into vivo (id,tel,psw) values ('','$tel','$psw')";
		$res = mysqli_query($link,$sql);
		
		if ($res) {
		    echo json_encode(array(
		        "code" => 200,
		        "msg" => "注册成功",
				"tel" =>$tel,
				"psw" =>$psw
		    ));
		} else {
		    echo json_encode(array(
		        "code" => 500,
		        "msg" => "网络错误，请重试",
				"tel" =>$tel,
				"psw" =>$psw
		    ));
			}
	}else{
		echo json_encode(array(
		    "code" => 100,
		    "msg" => "手机号已存在，请直接登录",
			"resp" => $arr,
			"tel" =>$tel,
			"psw" =>$psw
		));
	}
?>