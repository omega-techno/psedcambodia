<?php
defined('correctaccess') or die();
$imgdest_gallery="image/stores/gallery/";
$imgdest_slideshow="image/stores/slideshow/";
$imgdest_partner="image/stores/partner/";

function make_thumb($src,$dest,$width,$height){
		include_once("resize-class.php");
		// *** 1) Initialise / load image
		$resizeObj = new resize($src);
		// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
		$resizeObj -> resizeImage($width, $height, 'crop');
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

function addImage(){
	global $imgdest_gallery;
	global $imgdest_slideshow;
	global $imgdest_partner;
	global $filename_to_db;
	$store_id=$_GET['id'];
	$sql="";
	$splitsign="";
	$sql_value="";
	include('../conf/conf.php');
	if(validateImage('file_gallery')){
		//echo "valid";
		$sql="INSERT INTO store_images (store_id, path, image, type, link) VALUES ";
		
		if(upload_file("../".$imgdest_gallery,'file_gallery')){
			$file_gallery=$filename_to_db;
			make_thumb("../".$imgdest_gallery.$file_gallery,"../".$imgdest_gallery."thumb/".$file_gallery, 240, 180);
			$sql_value.="{$splitsign}({$store_id}, '{$imgdest_gallery}', '{$file_gallery}', 'gallery', '')";
			$splitsign=", ";
		}
	}
	if(validateImage('file_slideshow')){
		if(upload_file("../".$imgdest_slideshow,'file_slideshow')){
			$file_slideshow=$filename_to_db;
			make_thumb("../".$imgdest_slideshow.$file_slideshow,"../".$imgdest_slideshow."thumb/".$file_slideshow, 240, 220);
			make_thumb("../".$imgdest_slideshow.$file_slideshow,"../".$imgdest_slideshow."main/".$file_slideshow, 495, 455);
			$sql_value.="{$splitsign}({$store_id}, '{$imgdest_slideshow}', '{$file_slideshow}', 'slideshow', '')";
			$splitsign=", ";
		}
	}
	if(validateImage('file_partner')){
		if(upload_file("../".$imgdest_partner,'file_partner')){
			$file_partner=$filename_to_db;
			make_thumb("../".$imgdest_partner.$file_partner,"../".$imgdest_partner."thumb/".$file_partner, 135, 135);
			$link="";
			if(isset($_POST['link'])){
				$link=$_POST['link'];
			}
			$sql_value.="{$splitsign}({$store_id}, '{$imgdest_partner}', '{$file_partner}', 'partner', '$link')";
			$splitsign=", ";
		}
	}
	$sql_value.=";";
	//echo $sql.$sql_value;
	if($splitsign!=""){
		if(mysql_query($sql.$sql_value)){
			return true;
		}
		else{
			return false;
		}
	}
}
function getArrayList($array_list){
	for($i=0;$i<sizeof($array_list);$i++){
		echo "<img class='thumb_content_image' width='100' src='../{$array_list[$i]['path']}thumb/{$array_list[$i]['image']}'/>";
		//echo "<br/>".$array_list[$i]['store_id'];
//		echo " ".$array_list[$i]['path'];
//		echo " ".$array_list[$i]['image'];
//		echo " ".$array_list[$i]['type'];
//		echo " ".$array_list[$i]['link'];
	}
}
function getContent(){
	include('../conf/conf.php');
	global $gallery_list;
	global $slideshow_list;
	global $partner_list;
	$id=$_GET['id'];
	$sql="SELECT * FROM store_images WHERE store_id={$id};";
	$result=mysql_query($sql);
	while($row=mysql_fetch_array($result)){
		if($row['type']=='gallery'){
			//echo 'ok';
			$gallery_list[]=array('store_id'=>$row['store_id'],'path'=>$row['path'], 'image'=>$row['image'], 'type'=>$row['type'], 'link'=>$row['link']);
		}else if($row['type']=='slideshow'){
			$slideshow_list[]=array('store_id'=>$row['store_id'],'path'=>$row['path'], 'image'=>$row['image'], 'type'=>$row['type'], 'link'=>$row['link']);
		}else if($row['type']=='partner'){
			$partner_list[]=array(
				'store_id'=>$row['store_id'],'path'=>$row['path'], 'image'=>$row['image'], 'type'=>$row['type'], 'link'=>$row['link']);
		}
	}
	
}



function updateStore(){
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
		$sql="UPDATE stores SET store_name='$store_name', tel='$tel', location='$location', business_profile='$business_profile', business_service='$business_service',$setimage date=NOW() WHERE id=".$_GET['id'].";";
		
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