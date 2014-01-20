<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<link rel="stylesheet" href="norma/fonts.css" />

<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
<script type="text/javascript">
	$(document).ready(function(e) {
        $('#piseth').hover(function(e) {
            $('#dropdown').css('visibility','visible');
			$('.service').css('visibility','hidden');
			$('.psed').css('visibility','visible');
        });
		$('#service').hover(function(e) {
            $('#dropdown').css('visibility','visible');
			$('.service').css('visibility','visible');
			$('.psed').css('visibility','hidden');
        });
		$('#dropdown').mouseleave(function(e) {
            $('#dropdown').css('visibility','hidden');
			$('.service').css('visibility','hidden');
			$('.psed').css('visibility','hidden');
        });
		
		 
    });

</script>

</head>
<style>
.btn-left, .btn-right {
	visibility:hidden;
	cursor: pointer;
	
	text-decoration: none;
	font-weight: bold;
}
.nav_slide_button {
	width: 540px;
}
.menu_slide_outer a {
	text-decoration: none;
}
.nav_slide_button a {
	float: right;
	margin-left: 10px;
}
.slider-horizontal .item {
    background:#fff;
	margin-left: 0;
	margin-top: 0px;
	margin-right: 0;
	padding: 10px;
}
.slider-horizontal img {
	width:200px;
	margin-top:4px;
	margin-left:5px;
	max-width:none;
}
.menu_slide_outer {
	background-color: #fff;
	width: 945px;
}
.our_dest_dynamic{padding:20px;
	}
#header{
	width:1024px;
	height:143px;
	margin:auto;
	}
.www_FlowSlider_com-branding{display:none;visibility:hidden;}

</style>
<link rel="stylesheet" href="css/signup2.css" />
<link rel="stylesheet" href="css/signup1.css" />
<body>
	<div style="background-color:#414141; height:156px; min-width:1164px;">
	<?php
       	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header2.html');
	?>
	</div>
    <div id="formplace">
        <div id="formsignup">
        	<div id="signuptext">
            	<p class="noma signtext">
                	Sign up
                </p>
                <?php 
					echo "<p style='color:#4285F4; font-size:28px; padding-left:93px; width:1000px;'>Successfully signed up!</p>";
				?>
            </div>
        </div>
    </div>
</body>
</html>
