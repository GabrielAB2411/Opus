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

$CheckSQL = "select 
NOME_USUARIO, 
FONE_USUARIO, 
CIDADE_USUARIO,
RUA_USUARIO,
NUM_USUARIO,
BAIRRO_USUARIO,
COMPL_USUARIO,
CEP_USUARIO,
UF_USUARIO, 
EMAIL_USUARIO, 
FOTO_USUARIO FROM usuario WHERE ID_USUARIO = '$id_usu'";
 
// Executing SQL Query.
$check = mysqli_query($con,$CheckSQL);
$dados=array();

while($r = mysqli_fetch_array($check))
{
    $dados[]=array("nome" => $r[0], "fone" => $r[1], "cidade" => $r[2], "rua" => $r[3], 
    "num" => $r[4], "bairro" => $r[5], "complemento" => $r[6], "cep" => $r[7], "uf" => $r[8], "email" => $r[9], "foto" => $r[10]);
   
}





$Array = json_encode($dados);
echo $Array; 
mysqli_close($con);

 ?>