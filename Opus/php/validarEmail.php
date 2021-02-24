<?php
// Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);


$email = $obj['email'];

if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
{
    	     $Valid = 'Email Válido';
 
			// Converting the message into JSON format.
			$Valid = json_encode($Valid);
 
			// Echo the message.
 			echo $Valid;
} 
else 
{
           $Invalid = 'Email Inválido';
 
			// Converting the message into JSON format.
			$Invalid = json_encode($Invalid);
 
			// Echo the message.
 			$Invalid = json_encode($Invalid);

 			echo $Invalid;
}

?>