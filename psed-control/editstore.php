<?php
include('../conf/conf.php');
define('correctaccess', TRUE);
include('inc/func_store.php');
$page_title="Store Editor";
$status="";

if(!isset($_SESSION)) {
     session_start();
}

if(isset($_POST['submit'])){
	if(!isset($_GET['id'])){
		if(addStore()){
			$status="<font style='float:right;padding-right:20px;' color='green'>Store added! </font><img style='float:right' src='img/tick.png'>";	
		}
		else{
			$satus="fail to save";
		}
	}else{
		if(!empty($_GET['id'])){
			if(updateStore()){
				$status="<font style='float:right;padding-right:20px;' color='green'>Product updated! </font><img style='float:right' src='img/tick.png'>";	
			}
		}
	}
}

$formaction="";
if(isset($_GET['id'])){
	if(!empty($_GET['id'])){
		$formaction="?id=".$_GET['id'];
		getAllFields($_GET['id']);
	}
	
}
else{
		$field=array("","","","","","");
	}
function getAllFields($id){
	include('../conf/conf.php');
	global $field;
	$sql="SELECT * FROM stores WHERE id={$id};";
	$result=mysql_query($sql);
	while($row=mysql_fetch_array($result)){
		$field=array(
			htmlspecialchars($row['name']),
			htmlspecialchars($row['store_name']),
			htmlspecialchars($row['tel']),
			htmlspecialchars($row['location']),
			htmlspecialchars($row['business_profile']),
			htmlspecialchars($row['business_service']));
	}
	
}
	
	
	
	
?>
<?php include('layers/header.php');?>
<form action="editstore.php<?php echo $formaction;?>" method="post" enctype="multipart/form-data">
<table class="table_input">
	<tr>
    	<td>Name:</td><td><input type="text" required name="name" value="<?php  echo $field[0]?>"></td>
    </tr>
    <tr>
		<td class="label">Store Image: </td><td><input type="file" name="file" id="file"/></td>
	</tr><tr>
		<td class="label">Store Name: </td><td><input type="text" value="<?php echo $field[1];?>" required name="store_name" /></td>
	</tr><tr>
		<td>Phone Number: </td><td><input type="text" value="<?php echo $field[2];?>" required name="tel" /></td>
	</tr><tr>
		<td>Location: </td><td><input type="text" value="<?php echo $field[3];?>" required  name="location" /></td>
	</tr><tr>
		<td>Business Profile: </td><td><textarea name="business_profile"><?php echo $field[4];?></textarea></td>
	</tr><tr>
		<td>Business Service: </td><td><textarea name="business_service"><?php echo $field[5];?></textarea></td>
	</tr><tr>
		<td></td><td><input type="submit" id="submit" name="submit" value="Save"/> <?php echo $status;?></td>
	</tr>
</table>
</form>
<?php include('layers/footer.php');?>
		
	