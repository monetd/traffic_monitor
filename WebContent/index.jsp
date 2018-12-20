<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	String id = (String)session.getAttribute("authID");
	boolean isLogin = id == null?false:true;
	
	if (isLogin) {
		// Login
		// out.println(id);
		request.getRequestDispatcher("/sinkhole").forward( request, response ); 
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="X-UA-Compatible" content="IE=10,chrome=1">

<script type="text/javascript" src="resource/js/common/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="resource/js/main/index.js"></script>

<link rel="stylesheet" href="resource/css/main/style.css">

<title>DNS/싱크홀 실시간 감시 시스템 - Cyber Security팀</title>
</head>
<body>
<div class="logo">
	<h2>DNS/싱크홀 실시간 감시 시스템</h2>
</div>
<div class="login-page">
	<div class="form">
		<form class="login-form" action="Login.do" method="POST">
			<input type="text" name="username" placeholder="ID" /> <input
				type="password" name="password" placeholder="Password" />
			<button id="btn">login</button>
			<p class="message">Chrome 브라우저에 최적화 되어 있습니다.</p>
		</form>
	</div>
</div>
</body>
</html>