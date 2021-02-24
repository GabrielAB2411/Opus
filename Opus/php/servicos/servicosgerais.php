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

$CheckSQL = "select NOME_USUARIO, EMAIL_USUARIO, FONE_USUARIO, PRECO_SERVICO, PAG_SERVICO, DESC_SERVICO, NOME_CATEGORIA, ID_SERVICO, FOTO_USUARIO from usuario t1 inner join servico t2 on t1.ID_USUARIO=t2.ID_USUARIO inner join categoria t3 on t2.ID_CATEGORIA=t3.ID_CATEGORIA WHERE t3.ID_CATEGORIA LIKE 5";
 
// Executing SQL Query.
$check = mysqli_query($con,$CheckSQL);
$dados=array();

while($r = mysqli_fetch_array($check))
{
    $dados[]=array("nome" => $r[0], "email" => $r[1], "fone" => $r[2], "preco" => $r[3], 
    "pag" => $r[4], "desc" => $r[5], "cat" => $r[6], "id" => $r[7], 'foto' => $r[8]);
   
}



$Array = json_encode($dados);
echo $Array; 
mysqli_close($con);

 ?>