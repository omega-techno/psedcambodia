<?php
include('../conf/conf.php');
define('correctaccess', TRUE);
include('inc/func_store.php');
$page_title="Store Manager";
$status="";

if(!isset($_SESSION)) {
     session_start();
}

if(isset($_POST['submit'])){
	if(saveProduct()){
		$status="<font style='float:right;padding-right:20px;' color='green'>Product saved! </font><img style='float:right' src='img/tick.png'>";	
	}
}



?>

<?php include('layers/header.php');?>

<div class='top_mode'><a class='mode' id='addnew' href="editstore.php">Add New</a></div>
<?php 
getStoreList();
echo $pagination;
?>

<?php include('layers/footer.php');?>
		
	