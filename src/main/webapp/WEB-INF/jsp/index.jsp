<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/index.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/publicFunction.js"></script>
<title>index</title>
</head>
<body>
	<button id="addRow" class="addRow" type="button">新增一列</button>
	<br />
	<br />
	<div class="outerWrapper">
		<div class="wrapper">
			<table id="showData" border="1"></table>
			<br />
		</div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js"></script>
</body>
</html>