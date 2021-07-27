<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/index.css">
<!-- <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/publicFunction.js"></script>
<title>index</title>
</head>
<body>
	<button id="add-row" class="add-row" type="button">新增一列</button>
	<br />
	<br />
	<div class="outer-wrapper">
		<div class="wrapper">
			<table id="show-data" border="1"></table>
			<br />
		</div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js"></script>
</body>
</html>