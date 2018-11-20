<!-- init.php -->
<?php  
	include 'database/connection.php';
	include 'classes/base.php';
	include 'classes/user.php';
	
	global $pdo;

	session_start();
	$getFromU = new User($pdo);
	define("BASE_URL", "http://localhost/options/");
?>
