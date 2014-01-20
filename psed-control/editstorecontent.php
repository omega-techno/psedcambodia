<?php
include('../conf/conf.php');
define('correctaccess', TRUE);
include('inc/func_storecontent.php');
$page_title="Store Content Editor";
$status="";

if(!isset($_SESSION)) {
     session_start();
}

if(isset($_POST['submit'])){
	//if(!isset($_GET['id'])){
//		if(addImage()){
//			$status="<font style='float:right;padding-right:20px;' color='green'>Image added! </font><img style='float:right' src='img/tick.png'>";	
//		}
//		else{
//			$satus="fail to save";
//		}
//	}else{
	if(isset($_GET['id'])){
		if(!empty($_GET['id'])){
			if(addImage()){
				$status="<font style='float:right;padding-right:20px;' color='green'>Image added! </font><img style='float:right' src='img/tick.png'>";	
			}
		}
	}
	//}
}

//$formaction="";
//if(isset($_GET['id'])){
//	if(!empty($_GET['id'])){
//		$formaction="?id=".$_GET['id'];
//		getAllFields($_GET['id']);
//	}
//	
//}
//else{
//		$field=array("","","","","");
//	}
//function getAllFields($id){
//	include('../conf/conf.php');
//	global $field;
//	$sql="SELECT * FROM stores WHERE id={$id};";
//	$result=mysql_query($sql);
//	while($row=mysql_fetch_array($result)){
//		$field=array(
//			htmlspecialchars($row['store_name']),
//			htmlspecialchars($row['tel']),
//			htmlspecialchars($row['location']),
//			htmlspecialchars($row['business_profile']),
//			htmlspecialchars($row['business_service']));
//	}
//	
//}
//	
//	
getContent();
	$formaction="";
if(isset($_GET['id'])){
	$formaction="?id=".$_GET['id'];
}
?>
<?php include('layers/header.php');?>
<form id='main_form' action="editstorecontent.php<?php echo $formaction;?>" method="post" enctype="multipart/form-data">
<script>
	$(document).ready(function(e) {
		$("#btn_file_gallery").click(function(e) {
			
			$("#file_gallery").click();
		});
		$("#btn_file_slideshow").click(function(e) {
			
			$("#file_slideshow").click();
		});
		$("#btn_file_partner").click(function(e) {
			
			$("#file_partner").click();
		});
		
		$("#file_gallery, #file_slideshow, #file_partner").change(function(e) {
			var ext = $(this).val().split('.').pop().toLowerCase();  
			if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1 && this.files[0].size<5000000) {
			  $(this).val("");  
				alert('Invalid image! Please upload file in the format jpeg,gif,png and \nsmaller than or equal to 5MB.');  
				 
			}else{
				$("#submit").click();
			}
		});
		//$("#btnclear").click(function(e) {
//			$("#file_gallery").replaceWith("<input type='file' id='file_gallery' name='file_gallery'/>");
//		});
	});
</script>
<div>
	<div class="inner_content">
		<h4>Product Gallery</h4>
	</div>
	<div class="top_mode"><input type="button" id="btn_file_gallery" class="mode" value="Add New" /></div>
	<?php 
	getArrayList($gallery_list);
	
	
	
	?>
	<div class="inner_content">
		<h4>Store Slideshow</h4>
	</div>
	<div class="top_mode"><input type="button" id="btn_file_slideshow" class="mode" value="Add New" /></div>
	<?php 
	getArrayList($slideshow_list);
	
	?>
	<div class="inner_content">
		<h4>Business Partners</h4>
	</div>
	<div class="top_mode">
		<input placeholder="Partner URL (Optional)" type="text" id="partner_link" name="link" />
		<input type="button" id="btn_file_partner" class="mode" value="Add New" />
	</div>
	<?php 
	getArrayList($partner_list);
	
	
	?>
	
	<input type="file" accept="image/jpeg||image/gif||image/png" id="file_gallery" name="file_gallery"/>
	<input type="file" id="file_slideshow" name="file_slideshow"/>
	<input type="file" id="file_partner" name="file_partner"/>
	<input type="submit" style="display:none;" class="" name="submit" id="submit" value="submit"/>
</div>
</form>
<?php include('layers/footer.php');?>
		
	