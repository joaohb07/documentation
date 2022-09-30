<?php
 session_start();
 include ("bd.php");

 $nome=$_POST['nome'];
 $descProd=$_POST['descProd'];
 $estoqueMin=$_POST['estoqueMin'];
 $estoque=$_POST['estoque'];
 $locprod=$_POST['locprod'];
 $codprod=$_POST['codprod'];

 
$busca_categoria=mysqli_query($con, "SELECT id FROM categorias WHERE nome ='".$_POST['categoria']."'");
$id_categoria = mysqli_fetch_array($busca_categoria);
$categoria=$id_categoria['id'];

 $sql = "INSERT INTO produtos(nome, estoqueMin, estoque, descProd, categoria, locprod, codprod) VALUES ('$nome','$estoqueMin','$estoque','$descProd','$categoria','$locprod','$codprod')";
 $salvar = mysqli_query($con,$sql);

 if($salvar){
    header("Location: home.php");
    exit();
 }else{
    header("Location: additens.php");
    exit ();
 }
?>