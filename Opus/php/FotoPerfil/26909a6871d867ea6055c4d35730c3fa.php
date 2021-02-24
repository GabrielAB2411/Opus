<?php
  include('conexao2.php');
  $con = mysqli_connect("localhost","root", "", "opusapp");

  $fnome = $_GET["fname"];
  $lnome = $_GET["lname"];
  $data = implode("-",array_reverse(explode("/",$_GET["datanas"])));
  $CPF = $_GET["CPF"];
  $email = $_GET["email"];
  $senha = $_GET["senha"];
  $confsenha = $_GET["confsenha"];
  $cep = $_GET["cep"];
  $rua = $_GET["rua"];
  $bairro = $_GET["bairro"];
  $estado = $_GET["uf"];
  $numero = $_GET["num"];
  $complemento= $_GET["comp"];
  $sexoA = $_GET["sexo"];
  $cidade = $_GET["cidade"];


  if($sexoA == "Feminino")
  {
    $sexo = "F";
  }else if($sexoA == "Masculino"){
    $sexo = "M";
  }else if ($sexoA == "Não Especificar"){
    $sexo = "O";
  }

  $nome = $fnome . " " . $lnome;


  $Pos = 0;
	$Veri = "";
  $verificador = 0; 
  $resto = 0; 
  $soma = 0;
  $arrayName = array(11);

  $arrayName[0] = ($Pos = substr($CPF, -14, 1)) * 10; 
  $arrayName[1] = ($Pos = substr($CPF, -13, 1)) * 9; 
  $arrayName[2]  = ($Pos = substr($CPF, -12, 1)) * 8; 
  $arrayName[3]  = ($Pos = substr($CPF, -10, 1)) * 7;  
  $arrayName[4]  = ($Pos = substr($CPF, -9, 1)) * 6; 
  $arrayName[5]  = ($Pos = substr($CPF, -8, 1)) * 5;  
  $arrayName[6]  = ($Pos = substr($CPF, -6, 1)) * 4; 
  $arrayName[7]  = ($Pos = substr($CPF, -5, 1)) * 3; 
  $arrayName[8] = ($Pos = substr($CPF, -4, 1)) * 2; 
  $arrayName[9]  = ($Pos = substr($CPF, -2, 1)); 
 	$arrayName[10]  = ($Pos = substr($CPF, -1, 1)); 

    if ( $CPF == "000.000.000-00" || $CPF == "111.111.111-11" || $CPF == "222.222.222-22" || $CPF == "333.333.333-33" || $CPF == "444.444.444-44" ||
    $CPF == "555.555.555-55" || $CPF == "666.666.666-66" || $CPF == "777.777.777-77" || $CPF == "888.888.888-88" || $CPF == "999.999.999-99"){
      $Veri = "inválido";
    }

    for ($i = 0; $i < 9; $i++)
    {
      $soma = $soma + $arrayName[$i];
    }

    $soma = $soma * 10;

    $resto = $soma % 11;
       

    if ($resto == 10){
      $resto = 0;
    }

	if ($resto != substr($CPF, -2, 1) || $Veri == "inválido")
  {
    echo "<script> alert('CPF inválido')</script>";
    echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                            </SCRIPT>");
  }
  else{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
    {
      echo "<script> alert('E-mail inválido')</script>";
      echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                                </SCRIPT>");
		} 		
		else 
		{
  		
			if ($senha != $confsenha)
			{
				echo "<script> alert('As senhas não conferem!')</script>";
				echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                                </SCRIPT>");
			}

			else
			{	
				if (strlen($senha) < 8) 
				{
					echo "<script> alert('As senha é muito curta!')</script>";
				echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                                </SCRIPT>");
				}

				$sql_verifica = "SELECT * FROM usuario WHERE CPF_USUARIO = ('$CPF')";
				$stmt = mysqli_query($con, $sql_verifica);

				if (mysqli_num_rows($stmt) != 0) 
				{
				echo "<script> alert('Este CPF já está cadastrado!')</script>";
				echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                                </SCRIPT>");
				}

				else 
				{
				$sql_verifica = "SELECT * FROM usuario WHERE EMAIL_USUARIO = ('$email')";
				$stmt = mysqli_query($con, $sql_verifica);

				if (mysqli_num_rows($stmt) != 0) 
				{
				echo "<script> alert('Este e-mail já está cadastrado!')</script>";
				echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='cadastro.html';
                                </SCRIPT>");
				}

					else 
					{
						   $Comando=$conexao->prepare("INSERT INTO usuario (NOME_USUARIO, EMAIL_USUARIO, SENHA_USUARIO, CPF_USUARIO, NASCIMENTO_USUARIO, SEXO_USUARIO, CIDADE_USUARIO, RUA_USUARIO, NUM_USUARIO, BAIRRO_USUARIO, COMPL_USUARIO, CEP_USUARIO) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


         						$Comando->bindParam(1, $nome);
         						$Comando->bindParam(2, $email);
  	    						$Comando->bindParam(3, $senha);
  	    						$Comando->bindParam(4, $CPF);
  	    						$Comando->bindParam(5, $data);  	    						
         						$Comando->bindParam(6, $sexo);
         						$Comando->bindParam(7, $cidade);
  	    						$Comando->bindParam(8, $rua);
  	    						$Comando->bindParam(9, $numero);
  	    						$Comando->bindParam(10, $bairro);
  	    						$Comando->bindParam(11, $complemento);
  	    						$Comando->bindParam(12, $cep);


  	    			 if ($Comando->execute())
    					{
    						if ($Comando->rowCount () >0) 
        					{
        						echo ("<script> alert('Cadastro realizado com sucesso!')</script>");
                   				echo ("<SCRIPT LANGUAGE='JavaScript'> window.location.href='login.html';
                                </SCRIPT>");
        					}

        					else
        					{
        						echo ("<script> alert('Erro no cadastro, tente novamente mais tarde...')</script>");
        					}	

    					}
			
  	    						
					}

				}


			}



		}
    
    }




?>