<?php
    session_start();
    include 'conexao.php';
    $id_usu = $_SESSION['id'];
	// Type your website name or domain name here.
	$domain_name = "http://theopusapp.online/php/" ;
	
	// Image uploading folder.
	$target_dir = "FotoPerfil";
	
	// Generating random image name each time so image name will not be same .
	$target_dir = $target_dir . "/" .rand() . "_" . time() . ".jpeg";
	
	
	// Receiving image sent from Application	
	if(move_uploaded_file($_FILES['image']['tmp_name'],$target_dir)){
		
		// Adding domain name with image random name.
		$target_dir = $domain_name . $target_dir ;
		
		// Inserting data into MySQL database.
		$Sql_Query = "UPDATE usuario SET FOTO_USUARIO = '$target_dir' WHERE ID_USUARIO ='$id_usu'";
	}
	
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'Foto salva com sucesso !';
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 $MSG = 'Sua foto não foi salva :/';
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 
 }
 mysqli_close($con);
 
 
?>