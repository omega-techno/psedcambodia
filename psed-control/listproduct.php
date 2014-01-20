<?php
    include('inc/log_out.php');
    include('../conf/conf.php');
	define('correctaccess', TRUE);
	include('inc/product.php');
	$page_title="Product Manager";
	$status="";
	if(isset($_POST['submit'])){
		if(saveProduct()){
			$status="<font style='float:right;padding-right:20px;' color='green'>Product saved! </font><img style='float:right' src='img/tick.png'>";	
		}
	}
?>

<?php include('layers/header.php');?>

<div class='top_mode'><a class='mode' id='addnew' href="editproduct.php">Add New</a></div>
<?php getProductList();?>

<?php include('layers/footer.php');?>
		
	