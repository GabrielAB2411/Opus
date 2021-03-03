<?php
session_start();


 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.

 $J = $_SESSION['J'];
 
// Populate Password from JSON $obj array and store into $password
 
 			// Converting the message into JSON format.
			$Array = json_encode($J);
			// Echo the message.
 			echo $Array; 

?>