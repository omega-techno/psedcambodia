<?php
	include('../conf/conf.php');
	define('correctaccess', TRUE);
	include('inc/func_store.php');
	if(isset($_GET['id']))
		if(!empty($_GET['id'])){
			if(deleteStore())
				header("Location: liststore.php");
		}
?>
		
	