<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}

// ** Logout the current user. **
$logoutAction = $_SERVER['PHP_SELF']."?doLogout=true";
if ((isset($_SERVER['QUERY_STRING'])) && ($_SERVER['QUERY_STRING'] != "")){
  $logoutAction .="&". htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_GET['doLogout'])) &&($_GET['doLogout']=="true")){
  //to fully log out a visitor we need to clear the session varialbles
  $_SESSION['MM_Username'] = NULL;
  $_SESSION['MM_UserGroup'] = NULL;
  $_SESSION['PrevUrl'] = NULL;
  unset($_SESSION['MM_Username']);
  unset($_SESSION['MM_UserGroup']);
  unset($_SESSION['PrevUrl']);
	
  $logoutGoTo = "../index.php";
  if ($logoutGoTo) {
    header("Location: $logoutGoTo");
    exit;
  }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $page_title;?></title>
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/pagination.css" />
<script src="ckeditor/ckeditor.js" type="text/javascript"></script>
</head>
<body>
<div class="main_outer">
	

	<div class="main content">
		<div><h2 class="page_title"><?php echo $page_title;?></h2></div>
		<div class="top_menu">
			<ul class="menu">
				<li><a href="index.php">Home</a></li>
				<li><a href="liststore.php">Store Manager</a></li>
				<li><a href="listproduct.php">Product Manager</a></li>
                <li><a href="<?php echo $logoutAction ?>">Logout</a></li>
		  </ul>
            
</div>