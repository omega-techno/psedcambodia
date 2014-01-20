
<?php 
	include('../../conf/conf.php');
	$sql="SELECT COUNT(*) FROM stores;";
	echo mysql_result(mysql_query($sql),0,0);
	
?>
