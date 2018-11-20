<!-- connection.php -->
<?php 

	$dsn  = 'mysql:host=localhost; dbname=options'; // database name
	$user = 'root';
	$pass = 'root';

	try {
		$pdo = new PDO($dsn, $user, $pass);
	} catch(PDOException $e) {
		echo 'Connection error! '. $e->getMessage();
	}
?>

<!--
CREATE DATABASE `options`;
USE `options`;
CREATE TABLE `users` ( `user_id` INT NOT NULL AUTO_INCREMENT , `username` VARCHAR(32) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(32) NOT NULL , `fullname` VARCHAR(32) NOT NULL , PRIMARY KEY (`user_id`));
Navigate to http://localhost/options/
-->
