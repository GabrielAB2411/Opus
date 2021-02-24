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
 $id_usu = $_SESSION['id'];
 
 $id_servico = $obj['id_servico'];

 
 if($id_servico == null)
 {
    
            $MSG = 'Serviço inexistente!';
 
            // Converting the message into JSON format.
            $json = json_encode($MSG);
 
            // Echo the message.
            echo $json ;
 }
 
 else 
 {
            $Deletar=$conexao->prepare("DELETE FROM servico WHERE ID_SERVICO =?");
            $Deletar->bindParam(1, $id_servico);
            
            	   $Deletar->execute();
            	   
      				if ($Deletar->rowCount() >0) 
      				{
      				    $Matriz=$conexao->prepare("SELECT SERVICOS_USUARIO FROM usuario WHERE ID_USUARIO=?");
                         $Matriz->bindParam(1, $id_usu);

                        $Matriz->execute();
        
                        if($Matriz->rowCount() > 0)
                        {
                        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
                        {
        	            $servicos_usu = $Linha->SERVICOS_USUARIO;
        	            
        	            $serv = $servicos_usu - 1;
        	 
                        }
        
 	                    $AtualizarNovo=$conexao->prepare("UPDATE usuario SET SERVICOS_USUARIO=? WHERE ID_USUARIO=?");
                        $AtualizarNovo->bindParam(1, $serv);
                        $AtualizarNovo->bindParam(2, $id_usu);
                        
                        $AtualizarNovo->execute();
                        if ($AtualizarNovo->rowCount() >0) 
      				    {
            
                        $MSG = 'Serviço excluído com sucesso !';
 
                        // Converting the message into JSON format.
                        $json = json_encode($MSG);
 
                        // Echo the message.
                         echo $json ;
      				    }
      				    
      				    
      				     else
      				     {  
 
                        $MSG = 'Não conseguimos excluir o serviço, tente novamente.';
 
                        // Converting the message into JSON format.
                        $json = json_encode($MSG);
 
                        // Echo the message.
                        echo $json ;
                        }
      				    
                }
                   
 }
 }
 
 
 mysqli_close($con);
 
 
 
 
 
 ?>