<?php
	include('../conf/conf.php');
	define('correctaccess', TRUE);
	include('inc/product.php');
	if(isset($_GET['id']))
		if(!empty($_GET['id'])){
			if(deleteProduct())
				header("Location: listproduct.php");
		}
?>
		
	