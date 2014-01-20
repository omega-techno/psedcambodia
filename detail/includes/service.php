<?php
	if(isset($_GET['id'])){
		if(!empty($_GET['id'])){
			$id=$_GET['id'];
			include('../../conf/conf.php');
			mysql_select_db($database_config);
			$sql="SELECT * FROM services WHERE id={$id};";
			$result=mysql_query($sql);
			while($row=mysql_fetch_array($result)){
				echo htmlspecialchars_decode($row['content']);
			}
		}
	}
							
?>


