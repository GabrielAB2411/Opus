<?php
 include 'conexao.php';
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.
$email = $obj['email'];
 
// Populate Password from JSON $obj array and store into $password.
$senha = $obj['senha'];
$nome = $obj['nome'];
$cpf = $obj['cpf'];
$fone = $obj['fone'];
$cidade = $obj['cidade'];
$rua = $obj['rua'];
$numero = $obj['numero'];
$bairro = $obj['bairro'];
$complemento = $obj['complemento'];
$cep = $obj['cep'];
$estado = $obj['estado'];
$sexo = $obj['sexo'];
$nascimento = implode("-",array_reverse(explode("/",$obj['nascimento'])));
$sexo_conf = '';


if($sexo == 'Feminino')
{
	$sexo_conf = 'F';
}

if($sexo == 'Masculino')
{
	$sexo_conf = 'M';
}
 
 if($sexo == 'Outros')
{
	$sexo_conf = 'O';
}

if($sexo == 'Prefiro não informar')
{
	$sexo_conf = 'P';
}

if($email == '' || $senha == '' || $cpf == '' || $fone == '' || $cidade == '' || $rua == '' || $numero == null || 
$bairro == '' || $cep == '' || $estado == '' || $sexo == '' || $nascimento == '')
{
    $MSG = 'Não conseguimos efetuar o seu cadastro, tente novamente.';
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
    
}

else
{
 
 
//Checking Email is already exist or not using SQL query.
$CheckSQL = "SELECT * FROM usuario WHERE EMAIL_USUARIO ='$email'";
 
// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
 
if(isset($check)){
 
 $EmailExistMSG = 'O email informado já existe ! ';
 
 // Converting the message into JSON format.
$EmailExistJson = json_encode($EmailExistMSG);
 
// Echo the message.
 echo $EmailExistJson; 
 
 }
 else{
 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "INSERT INTO usuario (NOME_USUARIO, EMAIL_USUARIO, SENHA_USUARIO, CPF_USUARIO, FONE_USUARIO, CIDADE_USUARIO, RUA_USUARIO, NUM_USUARIO, BAIRRO_USUARIO, COMPL_USUARIO, CEP_USUARIO, UF_USUARIO, NASC_USUARIO, SEXO_USUARIO) values ('$nome','$email', '$senha', '$cpf', '$fone', '$cidade', '$rua', '$numero', '$bairro', '$complemento', '$cep', '$estado','$nascimento', '$sexo_conf')";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'Cadastro realizado com êxito !';
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 $MSG = 'Não conseguimos efetuar o seu cadastro, tente novamente.';
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 
 }
 }
}
 mysqli_close($con);
?>