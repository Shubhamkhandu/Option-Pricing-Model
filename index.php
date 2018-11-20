<!-- index.php -->
<?php  
	include 'core/init.php';
	if (isset($_SESSION['user_id'])) {
		header('Location: home.html');
	}
?>
<html>
	<head>
		<title>Options</title>
		<meta charset="UTF-8" />
		<link rel="stylesheet" href="assets/css/font/css/font-awesome.css"/>
		<link rel="stylesheet" href="assets/css/style-complete.css"/>
	</head>
<body>
<div class="bg">
<div class="wrapper">
<!---Inner wrapper-->
		<div class="inner-wrapper-index">
			<!-- main container -->
			<div class="main-container">
				<!-- content left-->
				<div class="content-left">
					<h1>Options Pricing Models</h1>
					<br/>
					<p>Calculate the call and put premium using BlackScholes and MonteCarlo models.</p>
				</div><!-- content left ends -->	

				<!-- content right ends -->
				<div class="content-right">
					<!-- Log In Section -->
					<div class="login-wrapper">
					  <?php include 'includes/login.php' ?>
					</div><!-- log in wrapper end -->

					<!-- SignUp Section -->
					<div class="signup-wrapper">
					   <?php include 'includes/signup-form.php' ?>
					</div>
					<!-- SIGN UP wrapper end -->

				</div><!-- content right ends -->

			</div><!-- main container end -->

		</div><!-- inner wrapper ends-->
	</div><!-- ends wrapper -->
</div>	

</body>
</html>
