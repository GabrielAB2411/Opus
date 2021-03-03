<?
session_start();
 include 'conexao.php';
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 $id_usu = $_SESSION['id'];
// Populate User email from JSON $obj array and store into $email.
$erros = 0;
// Populate Password from JSON $obj array and store into $password.
$senha = $obj['SenhaNova'];
$fone = $obj['cel'];
$cidade = $obj['localidade'];
$rua = $obj['logradouro'];
$numero = $obj['numero'];
$bairro = $obj['bairro'];
$complemento = $obj['complemento'];
$cep = $obj['cep'];
$estado = $obj['estado'];
$preenche = 0; 

if($senha != null)
{
     $sql = " UPDATE usuario SET SENHA_USUARIO='$senha' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if($fone != null)
{
     $sql = " UPDATE usuario SET FONE_USUARIO='$fone' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if($cidade != null)
{
     $sql = " UPDATE usuario SET CIDADE_USUARIO='$cidade' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if($rua != null)
{
     $sql = " UPDATE usuario SET RUA_USUARIO='$rua' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if($numero != null)
{
     $sql = " UPDATE usuario SET NUM_USUARIO='$numero' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if($bairro != null)
{
     $sql = " UPDATE usuario SET BAIRRO_USUARIO='$bairro' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}
if($complemento != null)
{
     $sql = " UPDATE usuario SET COMPL_USUARIO='$complemento' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}
if($cep != null)
{
     $sql = " UPDATE usuario SET CEP_USUARIO='$cep' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}
if($estado != null)
{
     $sql = " UPDATE usuario SET UF_USUARIO='$estado' WHERE ID_USUARIO='$id_usu'";
      if (mysqli_query($con, $sql))
      {
          $erros = 0;
          
      }
      else
      {
          $erros += 1;
      }
}
else
{
    $preenche += 1; 
}

if ($preenche == 9)
{
     $MSG = 'Preencha ao menos um campo para alterar os dados.';
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
}

else
{
if($erros > 0)
{
     $MSG = 'Não conseguimos alterar os dados, tente novamente.';
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
}
else
{
      $MSG = 'Dados alterados com sucesso!';
 
    // Converting the message into JSON format.
    $json = json_encode($MSG);
 
    // Echo the message.
    echo $json ;
}
}

mysqli_close($con);








?>