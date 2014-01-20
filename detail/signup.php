<?php 
	error_reporting(E_ALL);
?>
<!---------------------------------------------Send to database-------------------------------------------------------->
<?php include("mysql_transaction.php"); ?>
<?php
 
	$my_database=new Mysql_Transac;
	 
	$my_database->SetTable('users');
	$my_database->connect();
	if(isset($_POST['submit'])){
		if(validateusername ($_POST['username'])){
			$birthday=$_POST['year']."-".$_POST['month']."-".$_POST['day'];
			$_POST['birthday']=$birthday;
			//echo $_POST['birthday'];
			$my_database->Insert('username','password','fname','lname','phone','birthday','sex');
	        $my_database->Execute();
			echo mysql_error();
			//echo $_POST['sex'];
			//header("location: login.php");
		}
	}
?>
<?php

function validateusername($username) 
{
    return preg_match('/^[a-zA-Z0-9_]+$/',$username);
}

?>
<!---------------------------------------------Send to database-------------------------------------------------------->


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
            </div>
            <form action="signup-success.php" method="post" enctype="application/x-www-form-urlencoded">
                <table>
                    <tr>
                        <td height="45px">
                        	<input class="font textbox" type="text" name="username" required placeholder="Username">
                        </td>
                    </tr>
                    <tr>
                        <td height="40px">
                        	<input class="font textbox" type="text" name="password" required placeholder="Password">
                        </td>
                    </tr>
                </table>
                <table>
                	<tr>
                    	<td height="40px">
                        	<input class="font textname" type="text" name="fname" required placeholder="First name">
                        </td>
                        <td height="40px">
                        	<input class="font textname" type="text" name="lname" required placeholder="Last name">
                        </td>
                    </tr>
                </table>
                <table>
                	<tr>
                    	<td height="40px">
                        	<input class="font textbox space" type="text" name="phone" required placeholder="Mobile number">
                        </td>
                    </tr>
                </table>
                <table>
                	<tr>
                    	<td height="40px">
                        	<p class="font birthdatetext">
                            	Birthday
                            </p>
                        </td>
                        <td height="40px">
                        	<select required name="month" class="font birthselect">
                            	<option value="">Month</option>
                                <option value="1">Jnuary</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </td>
                        <td height="40px">
                        	<select required name="day" class="font birthselect">
                            	<option value="">Date</option>
                            	<option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </td>
                        <td height="40px">
                        
                        	<select required name="year" class="font birthselect">
                            	<option value="">Year</option>
								<?php
								for ($x=2014; $x>=1884; $x--)
								  {
								  echo "<option value='{$x}'> $x </option>";
								  }
								?> 
                            </select>
                        </td>
                    </tr>
                </table>
                <table>
                	<tr>
                    	<td height="40px"><input type="radio" required name="sex" value="male"></td>
                        <td height="40px" class="font sextext">Male</td>
                        <td height="40px"><input type="radio" required name="sex" value="female"></td>
                        <td height="40px" class="font sextext">Female</td>
                    </tr>
                </table>
                 <div id="btn" style="margin-left: -784px; margin-top: 40px;">
            	<input class="font create" type="submit" name="submit" value="Create Account" />
            </div>
            </form>
           
        </div>
    </div>
</body>
</html>
