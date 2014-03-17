<!DOCTYPE html>
<html ng-app="gravitasApp" lang="en">
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Gravitas - The Grails-based Sign-Up Application"/></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
        <asset:stylesheet href="font-awesome/css/font-awesome.css" />
        <asset:stylesheet href="bootstrap-css/css/bootstrap.css" />
        <asset:javascript src="application.js"/>
		<g:layoutHead/>
	</head>
	<body class="show-login">
        <div class="page-header container">
            <div class="row">
                <div class="span6">
                    Welcome to Gravitas - the Grails-based Sign-Up Application
                </div>
                <div class="span6" style="text-align: right;" ng-controller="logoutController" ng-show="isAuthenticated">
                    Welcome, {{currentUser}}.
                    <a href="" ng-click="logOut()">(Log out)</a>
                </div>
            </div>
        </div>

        <div id="login-holder" class="container" style="width: 300px;">
            <div id="login-error" class="alert alert-error">
                <button type="button" class="close" onclick="$('#login-error').hide();">&times;</button>
                Username and/or password incorrect.
            </div>
            <div id="loginbox">
                <div id="login-inner" ng-controller="loginController">
                    <form name="loginForm" role="form" ng-submit="logIn()" autocomplete="off">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input id="username" class="form-control" type="text" ng-model="authData.username"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" class="form-control" type="password" ng-model="authData.password"/>
                        </div>
                        <input type="submit" class="btn btn-primary" value="Login"/>
                    </form>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div id="content" class="container">
		    <g:layoutBody/>
        </div>
	</body>
</html>
