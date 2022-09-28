<?php

session_start();
include("bd.php");

$editest = $_POST['editest'];
$item = $_POST['item'];

if(empty($_POST['editest']) ){
    header("Location: editest3.php");
    exit();
}else{
$query = mysqli_query($con,"UPDATE produtos SET estoque='$editest' WHERE nome = '$item'");
if($query){
    header("Location: estoque.php");
}else{
    header("Location: home.php");
}
}

?>