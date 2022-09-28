<html>
<?php

$servername = "mysql_db";
$username = "root";
$password = "root";

// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
?>

</html>