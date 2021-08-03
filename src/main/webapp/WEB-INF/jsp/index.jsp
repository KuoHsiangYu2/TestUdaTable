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
	<button id="add-row" class="add-row" type="button">新增一列</button>
	<button id="save-data" class="save-data" type="button">儲存</button>
	<br />
	<br />
	<div class="outer-wrapper">
		<div class="wrapper">
			<table id="show-data" border="1"></table>
			<br />
		</div>
	</div>

	<input id="index-jsp" type="hidden" />

	<script type="text/javascript">
		"use strict";

		var indexJspObj = document.getElementById("index-jsp");
		indexJspObj["rootContextPath"] = String("${pageContext.request.contextPath}").toString();
	</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js"></script>
</body>
</html>