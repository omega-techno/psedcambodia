<?php
    include('inc/log_out.php');
	include('../conf/conf.php');
	define('correctaccess', TRUE);
	include('inc/product.php');
	$page_title="Product Editor";
	$status="";
	if(isset($_POST['submit'])){
		if(!isset($_GET['id'])){
			if(addProduct()){
				//echo "not get id";
				$status="<font style='float:right;padding-right:20px;' color='green'>Product added! </font><img style='float:right' src='img/tick.png'>";	
			}
		}else{
			if(!empty($_GET['id'])){
				//echo "get id";
				 
				if(updateProduct()){
					if(isset($_GET['token'])){
		
					if($_GET['token']!=session_id()){
						die('ERROR TOKEN GIVEN');
						
					}
			}
					$status="<font style='float:right;padding-right:20px;' color='green'>Product updated! </font><img style='float:right' src='img/tick.png'>";	
				}
			}
		}
	}
$formaction="";
if(isset($_GET['id'])){
	if(!empty($_GET['id'])){
		$formaction="?id=".$_GET['id']."&token=".session_id();
		getAllFields($_GET['id']);
	}
	
}
else{
		$field=array("","","","","");
	}
function getAllFields($id){
	include('../conf/conf.php');
	global $field;
	$sql="SELECT * FROM products WHERE id={$id};";
	$result=mysql_query($sql);
	while($row=mysql_fetch_array($result)){
		$field=array(
			htmlspecialchars($row['name']),
			htmlspecialchars($row['price']),
			htmlspecialchars($row['phone']),
			htmlspecialchars($row['location']),
			htmlspecialchars($row['detail']));
	}
	
}
	
	
	
	
?>
<?php include('layers/header.php');?>
<form action="editproduct.php<?php echo $formaction;?>" method="post" enctype="multipart/form-data">
<table class="table_input">
	<tr>
		<td class="label">Name: </td><td><input type="text" value="<?php echo $field[0];?>" name="name" /></td>
	</tr><tr>
		<td>Price ($): </td><td><input type="text" value="<?php echo $field[1];?>" name="price" /></td>
	</tr><tr>
		<td>Phone: </td><td><input type="text" value="<?php echo $field[2];?>" name="phone" /></td>
	</tr><tr>
		<td>Location: </td><td><input type="text" value="<?php echo $field[3];?>"  name="location" /></td>
	</tr><tr>
		<td>Detail: </td><td><textarea name="detail"><?php echo $field[4];?></textarea></td>
	</tr><tr>
		<td>Upload Image: </td><td><input type="file" id="file" name="file" /></td>
	</tr><tr>
		<td></td><td><input type="submit" id="submit" name="submit" value="Save"/> <?php echo $status;?></td>
	</tr>
</table>
</form>
<?php include('layers/footer.php');?>
		
	