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
$categoria = $obj['categoria'];
$dinheiro = $obj['dinheiro'];
$metodoPag = $obj['metodoPag'];
$descricao = $obj['descricao'];

$id_usu = $_SESSION['id']; 

 if($categoria == '' || $dinheiro == '' || $metodoPag == '' || $descricao == '' || $descricao == null || $descricao == '|' || strlen($descricao) <= 1 || substr($descricao, 0) == '' ||  substr($descricao, 1) == '' ||  substr($descricao, 0) == null || substr($descricao, 1) == null)
   {
       
        // If the record inserted successfully then show the message.
         $MSG = 'Preencha todos os campos !';
 
    // Converting the message into JSON format. 
        $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
   }
 
   

else
{
    
    if ($dinheiro == 'R$0,00')
    {
         // If the record inserted successfully then show the message.
         $MSG = 'Declare o valor do serviço';
 
        // Converting the message into JSON format. 
        $json = json_encode($MSG);
 
         // Echo the message.
         echo $json ;
    }
    
    else
    {

        $Matriz=$conexao->prepare("SELECT ID_CATEGORIA FROM categoria WHERE NOME_CATEGORIA=?");
        $Matriz->bindParam(1, $categoria);

        $Matriz->execute();

        if($Matriz->rowCount() > 0)
        {
        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
        {
        	 $id_cat = $Linha->ID_CATEGORIA;
        }
        
   
   //Checking Email is already exist or not using SQL query.
 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "INSERT INTO servico ( ID_CATEGORIA, ID_USUARIO, PRECO_SERVICO, PAG_SERVICO, DESC_SERVICO) values ('$id_cat', '$id_usu', '$dinheiro', '$metodoPag', '$descricao')";
 
 
 if(mysqli_query($con,$Sql_Query))
 {
 
        $Matriz=$conexao->prepare("SELECT SERVICOS_USUARIO FROM usuario WHERE ID_USUARIO=?");
        $Matriz->bindParam(1, $id_usu);

        $Matriz->execute();
        
        if($Matriz->rowCount() > 0)
        {
        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
        {
        	 $servicos_usu = $Linha->SERVICOS_USUARIO;
        	 
        	 if ($servicos_usu == null)
        	 
            {
                $servicos_usu = 0;
            }
        	 
        	 $serv = $servicos_usu + 1;
        	 
        }
        
 	        $AtualizarNovo=$conexao->prepare("UPDATE usuario SET SERVICOS_USUARIO=? WHERE ID_USUARIO=?");
            $AtualizarNovo->bindParam(1, $serv);
            $AtualizarNovo->bindParam(2, $id_usu);
            
            	   $AtualizarNovo->execute();
      				if ($AtualizarNovo->rowCount() >0) 
      				{
      				     // If the record inserted successfully then show the message.
                        $MSG = 'Cadastro realizado com êxito !';
 
                        // Converting the message into JSON format.
                        $json = json_encode($MSG);
 
                        // Echo the message.
                         echo $json ;
      				    
      				}
      					else
                    {  
 
                        $MSG = 'Não conseguimos efetuar o seu cadastro, tente novamente.';
 
                        // Converting the message into JSON format.
                        $json = json_encode($MSG);
 
                        // Echo the message.
                        echo $json ;
                    }
        	 
    				
    				
        }
 

 
 }
 
 
}
}
}



 mysqli_close($con);
?>