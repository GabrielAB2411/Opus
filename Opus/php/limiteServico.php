<?php
session_start();
include 'conexao.php';
$Bco ='u284875638_opusdata';
$Usuario  ='u284875638_opusadm';
$Senha = 'Opusapp1234_';
$id_usu = $_SESSION['id'];

try 
{
    $conexao = new PDO("mysql:host=localhost; dbname=$Bco", "$Usuario", "$Senha");
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   
    $conexao->exec("set names utf8");    
}
catch (PDOException $erro)
{
    echo "Erro na conexão" . $erro->getMessage();
    
} 

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 

  $Matriz=$conexao->prepare("SELECT SERVICOS_USUARIO FROM usuario WHERE ID_USUARIO=?");
        $Matriz->bindParam(1, $id_usu);

        $Matriz->execute();
        
        if($Matriz->rowCount() > 0)
        {
        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
        {
        	 $servicos_usu = $Linha->SERVICOS_USUARIO;
        	 
        	 if($servicos_usu == 3)
        	 {
        	     $Msg = 'True';
 
 			    // Converting the message into JSON format.
			    $Valid = json_encode($Msg);
			    // Echo the message.
 			    echo $Valid ; 
        	 }
        	 else
        	 {
        	      $Msg = 'False';
 
 			    // Converting the message into JSON format.
			    $Valid = json_encode($Msg);
			    // Echo the message.
 			    echo $Valid ; 
        	 }
        	
        	 
        }
        
            
        }
$conexao = null;
 mysqli_close($con);
?>