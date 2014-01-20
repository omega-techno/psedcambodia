<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_config = "localhost";
$database_config = "psedcam_pseddta";
$username_config = "psedcam_rootps";
$password_config = "Oxqp}#8O-{rJ";

$config = mysql_pconnect($hostname_config, $username_config, $password_config) or trigger_error(mysql_error(),E_USER_ERROR);
mysql_select_db($database_config,$config); 
?>