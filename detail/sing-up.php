<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PSED Cambodia</title>
<link rel="stylesheet" href="css/market_place1.css" />
<link rel="stylesheet" href="css/market_place2.css" />
<link rel="stylesheet" href="norma/fonts.css" />
<link rel="stylesheet" href="css/menu.css" />

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
td{
	vertical-align:middle;
	width:324px;
	}
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
	width:238px;
	margin-top:4px;
	margin-left:5px;
	max-width:none;
}
.menu_slide_outer {
	background-color: #fff;
	width: 1024px;
}
.our_dest_dynamic{padding:20px;
	}
#header{
	width:1024px;
	height:143px;
	margin:auto;
	}
#menuvisit{
	width:100%;
	height:80px;
	margin:auto;
	background-color:#E5E5E5;
	}
#menuvisitin{
	width:1024px;
	height:80px;
	margin:auto;
	background-color:#E5E5E5;
	}
#sub_menu_visit{
	position:absolute;
	width:900px;
	height:50px;
	margin-left:-30px;
	margin-top:18px;
	}
#visit_by_category{
	border:1px solid #74B632;
	background-color:#74B632;
	width:160px;
	height:40px;
	margin-left:-10px;
	}
#visit_by_category:hover{
	background-color:#390;	
	}
.visit{
	font-size:16px;
	color:#fff;
	}
#text{
	width:650px;
	height:33px;
	background-color:#fff;
	}
.text{
	font-size:18px;
	}


.middles{
	margin-top:10px;
	width:100%;
	height:900px;
	background:#FFF;
	}
.formsingup{
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
	margin-top:200px;
	margin:auto;
	width:550px;
	}
.creates{
	font-size:30px;
	text-align:left;
	}
.textform{
	font-size:18px;
	text-align:left;
	padding-top:10px;
	width:0px;
	}
</style>

<body>

<div style="background-color:#414141; height:200px;">
	<?php
       	include($_SERVER['DOCUMENT_ROOT'].'/psed/include_file/header2.html');
	?>
</div>
<div class="middles">
	<div class="formsingup">
    	<form>
        	<table class="create">
            	<tr>
                	<td height="30px;" class="noma creates">
                    	Create an account
                    </td>
                </tr>
            </table>
            <table class="tblform">
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
            </table>
            <table>
                <tr>
                	<td class="noma textform">
                    	Birthdate :
                    </td>
                    <td>
                    	<select>
                        	<option>Jaunary</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </td>
                	<td>
                    	<select>
                        	<option>1</option>
                            <option>2</option>
                            <option>3</option>
                        	<option>4</option>
                            <option>5</option>
                            <option>6</option>
                        	<option>7</option>
                            <option>8</option>
                            <option>9</option>
                        	<option>10</option>
                            <option>11</option>
                            <option>12</option>
                        	<option>13</option>
                            <option>14</option>
                            <option>15</option>
                        	<option>16</option>
                            <option>17</option>
                            <option>18</option>
                        	<option>19</option>
                            <option>20</option>
                            <option>21</option>
                        	<option>22</option>
                            <option>23</option>
                            <option>24</option>
                        	<option>25</option>
                            <option>26</option>
                            <option>27</option>
                        	<option>28</option>
                            <option>29</option>
                            <option>30</option>
                        	<option>31</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
             	</table>
                <table>
                <tr>
                	<td class="noma textform">
                    	Gender :
                    </td>
                	<td>
                    	<select>
                        	<option>Select one</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </td>
                </tr>
                </table>
            </table>
        </form>
    </div>
</div>

</body>

</html>