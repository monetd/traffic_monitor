<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String id = (String) session.getAttribute("authID");
	String rootURL = (String) request.getContextPath(); 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=10,chrome=1">

<link rel="stylesheet" href="../resource/css/common/ext-all-gray.css">
<link rel="stylesheet" href="../resource/css/dnsmonitor/style_wb.css">

<script type="text/javascript" src="../resource/js/common/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="../resource/js/dnsmonitor/highcharts.js"></script>
<script type="text/javascript" src="../resource/js/dnsmonitor/modules/boost.js"></script>
<script type="text/javascript" src="../resource/js/dnsmonitor/modules/exporting.js"></script>
<script type="text/javascript" src="../resource/js/common/ext-all.js"></script>
<script type="text/javascript" src="../resource/js/common/common_wb.js"></script>
<script type="text/javascript" src="../resource/js/dnsmonitor/dnsmonitor_ws.js" charset='UTF-8'></script>

<title>전국 DNS 트래픽- Cyber Security팀</title>
</head>
<body>
	<div class="login_sec">
		<span id="linkBtn"><a href="<%= rootURL %>/sinkhole">[싱크홀 트래픽]</a></span>
		<span id="loginStatus"><b><%= id %></b> 님께서 로그인 하셨습니다.</span>
		<span id="logoutBtn"><a href="<%= rootURL %>/Logout.do">[로그아웃]</a></span>
	</div>
	<div class="title_sec"></div>
	<div class="toggle_sec"></div>
	<%
		for(int i=0;i<24;i++) {
	%>
	<div id="graph<%= i %>" class="graph_sec"></div>
	<% } %>
</body>
</html>
