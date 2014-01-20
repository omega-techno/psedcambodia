<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_PSED = "localhost";
$database_PSED = "omega_psed";
$username_PSED = "root";
$password_PSED = "";
$PSED = mysql_pconnect($hostname_PSED, $username_PSED, $password_PSED) or trigger_error(mysql_error(),E_USER_ERROR); 
 
?>