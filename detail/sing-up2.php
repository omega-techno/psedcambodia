<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<link rel="stylesheet" href="css/market_place1.css" />
<link rel="stylesheet" href="css/market_place2.css" />
<link rel="stylesheet" href="norma/fonts.css" />

<script src="sliderenginew/jquery.js"></script>
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
.middles{
	margin-top:10px;
	width:100%;
	height:900px;
	background:#FFF;
	}
.form{
	margin:auto;
	width:1024px;
	height:900px;
	background-color:#EEEEEE;
	}
.tblform{
	margin:auto;
	width:550px;
	}
.create{
	font-size:30px;
	text-align:left;
	}
.textform{
	font-size:18px;
	text-align:left;
	padding-top:10px;
	width:50px;
	}
</style>

<body>

<div style="background-color:#414141; height:200px;">
	<?php
     	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header2.html');
	?>
</div>
<div class="middles">
	<div class="form">
    	<form>
        	<table class="tblform">
            	<tr>
                	<td height="30px;" class="noma create">
                    	Create an account
                    </td>
                </tr>
            	<tr>
                	<td class="noma textform">
                    	Full Name :
                    </td>
                	<td>
                    	<input type="text" name="fullname" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	Email :
                    </td>
                	<td>
                    	<input type="text" name="email" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	Password :
                    </td>
                	<td>
                    	<input type="text" name="password" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	Country/region :
                    </td>
                	<td>
                    	<input type="text" name="country" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	ZIP code :
                    </td>
                	<td>
                    	<input type="text" name="zipcode" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	Birthdate :
                    </td>
                	<td>
                    	<input type="text" name="birthdate" />
                    </td>
                </tr>
                <tr>
                	<td class="noma textform">
                    	Gender :
                    </td>
                	<td>
                    	<input type="text" name="gunder" />
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

</body>

</html>