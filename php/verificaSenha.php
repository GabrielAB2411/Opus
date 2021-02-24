<?php
session_start();
 include 'conexao.php';

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.
$id_usu = $_SESSION['id'];
 
// Populate Password from JSON $obj array and store into $password.

$senha = $obj['senha'];
 
//Checking Email is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM usuario WHERE SENHA_USUARIO = ('$senha') AND ID_USUARIO = ('$id_usu')";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
 
if(isset($check))
{
    $MSG = 'True';
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
}
else
{
    $MSG = 'False';
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
}




mysqli_close($con);
 ?>