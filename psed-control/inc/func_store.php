<?php
//include('restric_access.php');
defined('correctaccess') or die();
$imgdest="image/stores/";
function make_thumb($src,$dest){
		include("resize-class.php");
		// *** 1) Initialise / load image
		$resizeObj = new resize($src);
		// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
		$resizeObj -> resizeImage(200, 250, 'crop');
		// *** 3) Save image
		$resizeObj -> saveImage($dest, 100);
		
}

function generateFileName(){
	$date=new DateTime(); //this returns the current date time
	$result = $date->format('Y-m-d-H-i-s');
	$dpart = explode('-',$result);
	return implode("",$dpart);
}

function upload_file($dest, $elementname){
	global $ext;
	global $cuser;
	global $filename_to_db;
	global $imgdest;
	$filename_to_db=generateFileName();
	$tmp_dest=$filename_to_db;
	$i=0;
	$oldpath = $_FILES[$elementname]['tmp_name'];
	$newpath = $dest.$filename_to_db.".".$ext;
	while(file_exists($newpath)){
		$tmp_dest=$filename_to_db.$i;
		$newpath = $dest.$tmp_dest.".".$ext;
		$i+=1;
	}	
	$filename_to_db=$tmp_dest.".".$ext;
	if(move_uploaded_file($oldpath, $newpath)>=1){
		return true;
	}
}

function validateImage($elementname){
	global $ext;
	if(isset($_FILES[$elementname]['name']) && !empty($_FILES[$elementname]['name'])){
	$allowedExts = array("gif", "jpeg", "jpg", "png");
	$temp = explode(".", $_FILES[$elementname]["name"]);
	$extension = end($temp);
	$ext=$extension;
		if ((($_FILES[$elementname]["type"] == "image/gif")
		|| ($_FILES[$elementname]["type"] == "image/jpeg")
		|| ($_FILES[$elementname]["type"] == "image/jpg")
		|| ($_FILES[$elementname]["type"] == "image/pjpeg")
		|| ($_FILES[$elementname]["type"] == "image/x-png")
		|| ($_FILES[$elementname]["type"] == "image/png"))
		&& ($_FILES[$elementname]["size"] < 5000000)
		&& in_array($extension, $allowedExts)){
			if ($_FILES[$elementname]["error"] <= 0){
				return true;
			}
		}
	}
}




function validateUserInput(){
	global $name;
	global $store_name;
	global $tel;
	global $location;
	global $business_profile;
	global $business_service;
	
	if(isset($_POST['store_name'])
	&&isset($_POST['tel'])
	&&isset($_POST['location'])
	&&isset($_POST['business_profile'])
	&&isset($_POST['business_service'])
	){
		if(!empty($_POST['store_name'])
		&&!empty($_POST['tel'])
		&&!empty($_POST['location'])
		&&!empty($_POST['business_profile'])
		&&!empty($_POST['business_service'])
		){
			$name=mysql_real_escape_string($_POST['name']);
			$store_name=mysql_real_escape_string($_POST['store_name']);
			$location=mysql_real_escape_string($_POST['location']);
			$business_profile=mysql_real_escape_string($_POST['business_profile']);
			$business_service=mysql_real_escape_string($_POST['business_service']);
			if(preg_match("/^([+, 0-9]){4,50}$/",$_POST['tel'])){
				$tel=$_POST['tel'];
				return true;
			}
			else{
				echo "invalid tel";
			}
		}
	}
}

function addStore(){
	global $name;
	global $imgdest;
	global $store_name;
	global $location;
	global $business_profile;
	global $business_service;
	global $tel;
	global $filename_to_db;
	if(validateUserInput()&&validateImage('file')){
		//echo $storename.$price,$tel.$location.$file;
		include('../conf/conf.php');
		
		if(upload_file("../".$imgdest,'file')){
			
			$file=$filename_to_db;
			make_thumb("../".$imgdest.$file,"../".$imgdest."thumb/".$file);
		}
		
		$sql="INSERT INTO stores (name, store_name, tel, location, business_profile, business_service, image_path, store_image, date) VALUES ('$name','$store_name', '$tel', '$location', '$business_profile', '$business_service', '$imgdest', '$file', NOW());";
		
		if(mysql_query($sql)){
			
			return true;
		}
		else{
			
			return false;
			
		}
	}
	
}

function getStoreList(){
	include('../conf/conf.php');
	global $pagelimit;
	getPageLimit();
	$sql="SELECT * FROM stores {$pagelimit};";
	$result=mysql_query($sql);
	$i=0;
	if(isset($_GET['page'])){
		if(is_numeric($_GET['page'])){
			$i=($_GET['page']-1)*10;
		}
	}
	echo "<div class='item_list_outer'><table cellspacing='0' class='item_list'><tr><th class='id'>id</th><th class='image'>Image</th><th class='name'>Store Name</th><th class='phone'>Phone Number</th><th class='loc'>Location</th><th class='mode'>Mode</th></tr>";
	$rowcount=mysql_num_rows($result);
	while($row=mysql_fetch_array($result)){
		$i+=1;
		
		echo "<tr>";
		echo "<td>{$i}</td>
		<td><img src='../{$row['image_path']}thumb/{$row['store_image']}'/></td>
		<td>{$row['store_name']}</td>
		<td>{$row['tel']}</td>
		<td>{$row['location']}</td>
		<td><a class='mode' href='editstore.php?id={$row['id']}'>Edit</a><a class='mode' href='deletestore.php?id={$row['id']}'>Delete</a></td>
		";
		echo "</tr>";
		
	}
	echo "</table></div>";
}

function updateStore(){
	global $name;
	global $store_name;
	global $location;
	global $business_profile;
	global $business_service;
	global $tel;
	
	global $filename_to_db;
	global $imgdest;
	global $image_to_delete;
	global $path_to_delete;
	
	if(storeExist($_GET['id'])&&validateUserInput()){
		//echo $storename.$price,$tel.$location.$file;
		include('../conf/conf.php');
		$setimage="";
		if(validateImage('file')){
			if(upload_file("../".$imgdest,'file')){
				if(file_exists("../".$path_to_delete.$image_to_delete)) unlink("../".$path_to_delete.$image_to_delete);
				if(file_exists("../".$path_to_delete."thumb/".$image_to_delete)) unlink("../".$path_to_delete."thumb/".$image_to_delete);
				$file=$filename_to_db;
				make_thumb("../".$imgdest.$file,"../".$imgdest."thumb/".$file);
				$setimage=" image_path='$imgdest', store_image='$file',";
			}
		}
		$sql="UPDATE stores SET name='$name', store_name='$store_name', tel='$tel', location='$location', business_profile='$business_profile', business_service='$business_service',$setimage date=NOW() WHERE id=".$_GET['id'].";";
		
		if(mysql_query($sql)){
			return true;
		}
		else 
			return false;
	}
}


function storeExist($id){
	include('../conf/conf.php');
	global $image_to_delete;
	global $path_to_delete;
	$sql="SELECT * FROM stores WHERE id={$id};";
	$result=mysql_query($sql);
	while($row=mysql_fetch_array($result)){
		$path_to_delete=$row['image_path'];
		$image_to_delete=$row['store_image'];
		return true;
	}
}

function validDelete($id){
	if(storeExist($id)) return true;
}


function deleteStore(){
	include('../conf/conf.php');
	global $image_to_delete;
	global $path_to_delete;
	$id=$_GET['id'];
	if(validDelete($id)){
		if(file_exists("../".$path_to_delete.$image_to_delete)) unlink("../".$path_to_delete.$image_to_delete);
		if(file_exists("../".$path_to_delete."thumb/".$image_to_delete)) unlink("../".$path_to_delete."thumb/".$image_to_delete);
		$sql="DELETE FROM stores WHERE id={$id}";
		if(mysql_query($sql)){
			return true;
		}
	}
}
/********************************** EDIT PRODUCT DETAIL *****************************************************/
function getPageLimit(){
	include('inc/pagination/paginator.php');
	global $pagination;
	global $pagelimit;
	$pages = new Paginator('10','page');
	$pages->set_total(storeCount());
	$pagination=$pages->page_links();
	$pagelimit=$pages->get_limit();
}
function storeCount(){
	$sql="SELECT * FROM stores;";
	$result=mysql_query($sql);
	return mysql_num_rows($result);
}
?>