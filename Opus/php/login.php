<?php
session_start();
 include 'conexao.php';
 $Bco ='u284875638_opusdata';
$Usuario  ='u284875638_opusadm';
$Senha = 'Opusapp1234_';

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
 
// Populate User email from JSON $obj array and store into $email.

 
// Populate Password from JSON $obj array and store into $password.
$email = $obj['email'];
$senha = $obj['senha'];
 
//Checking Email is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM usuario WHERE EMAIL_USUARIO = ('$email') AND SENHA_USUARIO = ('$senha')";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
 
if(isset($check))
{
 

  $Matriz=$conexao->prepare("SELECT ID_USUARIO, NOME_USUARIO, EMAIL_USUARIO, STATUS_USUARIO, FOTO_USUARIO FROM usuario WHERE EMAIL_USUARIO=?");
        $Matriz->bindParam(1, $email);

        $Matriz->execute();

        if($Matriz->rowCount() > 0)
        {
        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
        {
        $id_usu = $Linha->ID_USUARIO;
        $status_usu = $Linha->STATUS_USUARIO;
        $nome_usu = $Linha->NOME_USUARIO;
        $email_usu = $Linha->EMAIL_USUARIO;
        $foto_usu = $Linha->FOTO_USUARIO;
  		
  		$_SESSION['id'] = $id_usu;
  		
  		 $J=[];
         $I=0;
         $J[$I]=[
                "email"=>$email_usu,
                "nome"=>$nome_usu,
                "foto"=>$foto_usu
            ];
            $I++;
  		
  		$_SESSION['J'] = $J;


  			if ($status_usu == 'Desativado')

    		{

    		$InvalidMSG = 'Usuário desativado por questões de política e privacidade!';
 
			// Converting the message into JSON format.
			$InvalidMSGJSon = json_encode($InvalidMSG);
 
			// Echo the message.
 			echo $InvalidMSGJSon ;
    		}

    		else
    		{
    		$SuccessLoginMsg = 'Data Matched';
 
 			// Converting the message into JSON format.
			$SuccessLoginJson = json_encode($SuccessLoginMsg);
			// Echo the message.
 			echo $SuccessLoginJson ; 
    		}  

        }


    }


    

 }

 else
 {
 
 // If the record inserted successfully then show the message.
$InvalidMSG = 'Email ou senha inválidos !' ;
 
// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }

$conexao = null;
 mysqli_close($con);
?>