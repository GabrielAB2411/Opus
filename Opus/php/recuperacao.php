<?php

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

 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);


$email = $obj['email'];

$sql_verifica = "SELECT * FROM usuario WHERE EMAIL_USUARIO = ('$email')";

$check = mysqli_fetch_array(mysqli_query($con,$sql_verifica));
      
      if(isset($check))
      { 

        $Matriz=$conexao->prepare("SELECT SENHA_USUARIO, NOME_USUARIO FROM usuario WHERE EMAIL_USUARIO=?");
        $Matriz->bindParam(1, $email);

        $Matriz->execute();

        if($Matriz->rowCount() > 0)
        {
        while ($Linha = $Matriz->fetch(PDO::FETCH_OBJ))
        {
        $senha = $Linha->SENHA_USUARIO;
        $nome = $Linha->NOME_USUARIO;
        

        }
    

        require("PHPMailer-master/src/PHPMailer.php");
        require("PHPMailer-master/src/SMTP.php");
        require("PHPMailer-master/src/Exception.php");

          $email = mysqli_real_escape_string($con, $obj['email']);
    
          $mail = new PHPMailer\PHPMailer\PHPMailer();
          $mail->IsSMTP(); // enable SMTP
              
          $date = new DateTime( 'now', new DateTimeZone( 'America/Sao_Paulo')); 
          $data = $date->format('Y-m-d H:i:s');


            //configuração do gmail
            $mail->Port = '465'; //porta usada pelo gmail.
            $mail->Host = 'smtp.gmail.com'; 
            $mail->IsHTML(true); 
            $mail->Mailer = 'smtp'; 
            $mail->SMTPSecure = 'ssl';

            //configuração do usuário do gmail
            $mail->SMTPAuth = true; 
            $mail->Username = 'opusappoficial@gmail.com'; // usuario gmail.   
            $mail->Password = 'fegaguimarpe'; // senha do email.

            $mail->SingleTo = true; 

            // configuração do email a ver enviado.
            $mail->From = "opusappoficial@gmail.com"; 
            $mail->FromName = "Opus"; 

            $mail->addAddress($email); // email do destinatario.

            $mail->CharSet = 'UTF-8';
            $mail->Subject = "Recuperação de senha Opus"; 
            $mail->Body = "Olá" . " " . $nome . "!" . "<br> Notamos que você esqueceu sua senha !<br>" . 
            "<br> Aqui está:" . " " . $senha . "<br>" . "<br> Se você não solicitou a recuperação do código, por favor desconsidere este e-mail. <br>". "<br> Atenciosamente; <br>" . "Equipe Opus.";

            
             if(!$mail->Send())
              {
                 $InvalidMSG = 'Erro' ;
 
				// Converting the message into JSON format.
				$InvalidMSGJSon = json_encode($InvalidMSG);
 
				// Echo the message.
 				echo $InvalidMSGJSon ;
              }
              else 
              {
                   $SuccessLoginMsg = 'O e-mail com sua senha foi enviado com sucesso !';
 
 				// Converting the message into JSON format.
				$SuccessLoginJson = json_encode($SuccessLoginMsg);
				// Echo the message.
 				echo $SuccessLoginJson ;
               
              }
          }
      }
      else 
      {
         $InvalidMSG = 'Digite um e-mail válido !' ;
 
		// Converting the message into JSON format.
		$InvalidMSGJSon = json_encode($InvalidMSG);
 
		// Echo the message.
 		echo $InvalidMSGJSon ;
      }
      
      $conexao = null;
      mysqli_close($con);
?>