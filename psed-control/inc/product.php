<?php
//include('restric_access.php');
defined('correctaccess') or die();
$imgdest="image/products/";
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
	global $price;
	global $phone;
	global $location;
	global $detail;
	$detail="";
	if(isset($_POST['name'])
	&&isset($_POST['price'])
	&&isset($_POST['phone'])
	&&isset($_POST['location'])
	&&isset($_POST['detail'])
	){
		$detail=mysql_real_escape_string($_POST['detail']);
		if(!empty($_POST['name'])
		&&!empty($_POST['price'])
		&&!empty($_POST['phone'])
		&&!empty($_POST['location'])
		){
			if(isset($_POST['detail']))
				if(!empty($_POST['detail']))
					mysql_real_escape_string($detail=$_POST['detail']);
			$name=mysql_real_escape_string($_POST['name']);
			$price=mysql_real_escape_string($_POST['price']);
			$phone=mysql_real_escape_string($_POST['phone']);
			$location=mysql_real_escape_string($_POST['location']);
			if(is_numeric($price)&&$price<1000000&&preg_match("/^([+, 0-9]){4,500}$/",$phone)&&strlen($_POST['detail'])<=1000&&strlen($_POST['name']<=30)){
				return true;
			}
		}
	}
}

function addProduct(){
	global $name;
	global $price;
	global $phone;
	global $location;
	global $filename_to_db;
	global $imgdest;
	global $detail;
	if(validateUserInput()&&validateImage('file')){
		//echo $name.$price,$phone.$location.$file;
		include('../conf/conf.php');
		
		if(upload_file("../".$imgdest,'file')){
			
			$file=$filename_to_db;
			make_thumb("../".$imgdest.$file,"../".$imgdest."thumb/".$file);
		}
				
		$sql="INSERT INTO products (name, price, phone, location, detail, path, image, date) VALUES ('$name', $price, '$phone', '$location', '$detail', '$imgdest', '$file', NOW());";
		if(mysql_query($sql)){
			return true;
		}
		else
			return false;
	}
}

function getProductList(){
	include('../conf/conf.php');
	$token=session_id();
	$sql="SELECT * FROM products;";
	$result=mysql_query($sql);
	$i=0;
	echo "<table cellspacing='0' class='item_list'><tr><th class='id'>id</th><th class='image'>Image</th><th class='name'>Product Name</th><th class='price'>Price</th><th class='phone'>Phone Number</th><th class='loc'>Location</th><th class='mode'>Mode</th></tr>";
	while($row=mysql_fetch_array($result)){
		$i+=1;
		echo "<tr>";
		echo "<td>{$i}</td>
		<td><img src='../{$row['path']}thumb/{$row['image']}'/></td>
		<td>{$row['name']}</td>
		<td>{$row['price']}</td>
		<td>{$row['phone']}</td>
		<td>{$row['location']}</td>
		<td><a class='mode' href='editproduct.php?id={$row['id']}&token=$token'>Edit</a><a class='mode' href='deleteproduct.php?id={$row['id']}&token=$token'>Delete</a></td>
		";
		echo "</tr>";
		
	}
	echo "</table>";
}

function updateProduct(){
	global $name;
	global $price;
	global $phone;
	global $location;
	global $detail;
	global $filename_to_db;
	global $imgdest;
	global $image_to_delete;
	global $path_to_delete;
	if(isset($_GET['token'])){
		if($_GET['token']!=session_id()){
			die('ERROR TOKEN GIVEN');
			
		}
	}
	if(productExist($_GET['id'])&&validateUserInput()&&validateImage('file')){
		//echo $name.$price,$phone.$location.$file;
		include('../conf/conf.php');
		if(upload_file("../".$imgdest,'file')){
			if(file_exists("../".$path_to_delete.$image_to_delete)) unlink("../".$path_to_delete.$image_to_delete);
			if(file_exists("../".$path_to_delete."thumb/".$image_to_delete)) unlink("../".$path_to_delete."thumb/".$image_to_delete);
			$file=$filename_to_db;
			make_thumb("../".$imgdest.$file,"../".$imgdest."thumb/".$file);
		}
			
		$sql="UPDATE products SET name='$name', price=$price, phone='$phone', location='$location', detail='$detail', path='$imgdest', image='$file', date=NOW() WHERE id=".$_GET['id'].";";
		if(mysql_query($sql)){
			return true;
		}
		else
			return false;
	}
}


function productExist($id){
	include('../conf/conf.php');
	global $image_to_delete;
	global $path_to_delete;
	$sql="SELECT * FROM products WHERE id={$id};";
	$result=mysql_query($sql);
	while($row=mysql_fetch_array($result)){
		$path_to_delete=$row['path'];
		$image_to_delete=$row['image'];
		return true;
	}
}

function validDelete($id){
	if(productExist($id)) return true;
}


function deleteProduct(){
	include('../conf/conf.php');
	global $image_to_delete;
	global $path_to_delete;
	$id=$_GET['id'];
	if(validDelete($id)){
		if(file_exists("../".$path_to_delete.$image_to_delete)) unlink("../".$path_to_delete.$image_to_delete);
		if(file_exists("../".$path_to_delete."thumb/".$image_to_delete)) unlink("../".$path_to_delete."thumb/".$image_to_delete);
		$sql="DELETE FROM products WHERE id={$id}";
		if(mysql_query($sql)){
			return true;
		}
	}
}
/********************************** EDIT PRODUCT DETAIL *****************************************************/
?>