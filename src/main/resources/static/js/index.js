"use strict";

console.log('index.js');

var indexJspObj = document.getElementById("index-jsp");
const rootContextPath = indexJspObj["rootContextPath"];
console.log("rootContextPath = ", rootContextPath);

/* 這邊只考慮抓 id 為 1 的一筆資料出來，所以寫死 */
const tragetId = 1;

let showDataObj = document.getElementById("show-data");
let addRowObj = document.getElementById("add-row");
let saveDataObj = document.getElementById("save-data");
let countRow = 0; /* 計算有幾列 */
let editList = []; /* 儲存編輯清單的陣列 */

console.log("aaaa index.js window.location.href -> ", window.location.href);

function dragStartHandler(e) {
	/* 當目標物被滑鼠左鍵點住拖移時 */
	/* 儲存要拖放的資料 */
	console.log("dragStartHandler");

	console.log("e");
	console.log(e);

	console.log("e.dataTransfer");
	console.log(e.dataTransfer);

	let text = e.target.childNodes[1].childNodes[0].value; /* 文字內容 */
	let id = e.target.childNodes[0].childNodes[0].nodeValue; /* id編號 */

	let dataObj = {
		"text": text,
		"id": id
	};

	e.dataTransfer.setData("text", JSON.stringify(dataObj));
}

function cancelDefaultHandler(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}

function renameTdNo() {
	let tdNoArray = document.getElementsByClassName("no");
	let length = tdNoArray.length;
	let n = 1;
	for (let i = 0; i < length; i++) {
		tdNoArray[i].innerText = String(n);
		tdNoArray[i].setAttribute("text", String(n).toString());
		n = n + 1;
	}
}

function dropHandler(e) {
	/* 放開滑鼠左鍵，把拖移物件放下狀態 */
	console.log("dropHandler");
	/* 取消預設動作 */
	// e.preventDefault();
	// e.stopPropagation();
	/* 取出拖放資料 */
	let dataObj = e.dataTransfer.getData("text"); /* 欄位資料 */
	dataObj = JSON.parse(dataObj);
	let textData = dataObj.text; /* 欄位資料 */
	let idData = dataObj.id; /* 欄位編號 */

	console.log("textData = ", textData);
	console.log("idData = ", idData);

	let oldNo = Number.parseInt(idData);
	let newNo = Number.parseInt(e.currentTarget.childNodes[0].childNodes[0].nodeValue);
	console.log("舊 oldNo = " + oldNo);
	console.log("新 newNo = " + newNo);

	console.log("source");
	console.log(document.querySelector(".no[text='" + String(oldNo).toString() + "']"));
	console.log("source.parentElement");
	if (!document.querySelector(".no[text='" + String(oldNo).toString() + "']")) {
		console.log("parentElement is null");
		return;
	}
	console.log(document.querySelector(".no[text='" + String(oldNo).toString() + "']").parentElement);
	let oldTrObj = document.querySelector(".no[text='" + String(oldNo).toString() + "']").parentElement;
	console.log("oldTrObj");
	console.log(oldTrObj);

	if (oldNo !== newNo) {
		oldNo = oldNo - 1;
		showDataObj.deleteRow(oldNo); /* 刪除舊列 */

		let newTrObj = createTableRow(idData, textData);

		e.currentTarget.insertAdjacentElement("afterend", newTrObj); /* 新增新列 */
	}

	renameTdNo(); /* 重新排序 no值 */
}

/* idData: String */
/* textData: String */
function createTableRow(idData, textData) {
	let newTrObj = document.createElement("tr");
	newTrObj.setAttribute("draggable", "true");

	/* 第1個 td */
	let td1Obj = document.createElement("td");
	td1Obj.setAttribute("align", "center");
	td1Obj.setAttribute("class", "no");
	td1Obj.setAttribute("text", idData);
	td1Obj.appendChild(document.createTextNode(idData));
	newTrObj.appendChild(td1Obj);

	/* 第2個 td */
	let td2Obj = document.createElement("td");
	td2Obj.setAttribute("width", "160px");
	let inputObj = document.createElement("input");
	inputObj.setAttribute("type", "text");
	inputObj.setAttribute("name", "typeList");
	inputObj.setAttribute("value", textData);
	inputObj.setAttribute("maxlength", 30);
	inputObj.setAttribute("size", 30);
	if (Number.parseInt(idData) === 1) {
		/* 第一列自動聚焦 */
		inputObj.setAttribute("autofocus", "autofocus");
	}
	td2Obj.appendChild(inputObj);
	newTrObj.appendChild(td2Obj);

	/* 第3個 td */
	let td3Obj = document.createElement("td");
	let buttonObj = document.createElement("button");
	buttonObj.setAttribute("type", "button");
	buttonObj.setAttribute("onclick", "deleteRow(this)");
	buttonObj.innerText = "刪除";
	td3Obj.appendChild(buttonObj);
	newTrObj.appendChild(td3Obj);

	newTrObj.addEventListener("dragstart", dragStartHandler);
	newTrObj.addEventListener("dragenter", cancelDefaultHandler);
	newTrObj.addEventListener("dragover", cancelDefaultHandler);
	newTrObj.addEventListener("drop", dropHandler);

	return newTrObj;
}

/* 刪除一列 */
function deleteRow(buttonObj) {
	let isDelete = confirm("確定要刪除嗎？");
	if (true === isDelete) {
		let trObj = buttonObj.parentElement.parentElement;
		let tbodyObj = buttonObj.parentElement.parentElement.parentElement;
		tbodyObj.removeChild(trObj);

		renameTdNo();
		countRow = countRow - 1;
		console.log("countRow = ", countRow);
	}
}

/* 新增一列 */
addRowObj.addEventListener("click", function () {
	if (countRow === 0) {
		/* 如果是空空的table，0列資料 則執行這段程式。 */
		countRow = countRow + 1;
		let newTrObj = createTableRow(String(countRow), "");
		showDataObj.appendChild(newTrObj);
		return;
	} else if (countRow === 20) {
		window.alert("列數不可超過20");
		return;
	}

	let lastTrObj = document.querySelector("#show-data tr:last-child");
	countRow = countRow + 1;
	let newTrObj = createTableRow(String(countRow).toString(), "");

	lastTrObj.insertAdjacentElement("afterend", newTrObj);
	console.log("countRow = ", countRow);
});

/* 儲存資料，把前端網頁變動的資料都送去後端程式。 */
saveDataObj.addEventListener("click", function () {
	let hasError = false;
	let editResultList = document.getElementsByName("typeList");

	if (editResultList.length === 0) {
		return;
	}

	for (let i = 0, len = editResultList.length; i < len; i++) {
		if (editResultList[i].value.trim() === "") {
			hasError = true;
			break;
		}
	}

	if (true === hasError) {
		window.alert("輸入資料不可為空");
		return;
	}

	let sendOutList = [];
	for (let i = 0, len = editResultList.length; i < len; i++) {
		sendOutList.push({
			"id": i,
			"udaValue": editResultList[i].value
		});
	}

	/* For support Internet Explorer browser, using XMLHttpRequest object. */
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = function () {
		if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
			console.log("save data result = ", xmlHttpRequest.responseText);
		}
	}
	let postURL = rootContextPath + "/api/saveUdaData/" + tragetId;
	xmlHttpRequest.open("POST", postURL, true);
	xmlHttpRequest.setRequestHeader("If-Modified-Since", "0");
	xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
	xmlHttpRequest.send(JSON.stringify(sendOutList));
});

function initialTable() {
	/* 初始化整個分類清單 */
	let length = editList.length;
	for (countRow = 0; countRow < length; countRow++) {
		let newTrObj = createTableRow(String(countRow + 1).toString(), editList[countRow]);
		showDataObj.appendChild(newTrObj);
		/* 從for迴圈出來後 countRow === length ，所以外面不需要再做 countRow++; 的動作。 */
	}

	console.log("countRow = ", countRow);
}

function fetchEditListData() {
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = function () {
		if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
			let responseData = JSON.parse(xmlHttpRequest.responseText);
			for (let i = 0, len = responseData.length; i < len; i++) {
				editList.push(responseData[i].udaValue);
			}
			/* 開始執行繪製表格的動作 */
			initialTable();
		}
	}
	let getURL = rootContextPath + "/api/getUdaData/" + tragetId;
	xmlHttpRequest.open("GET", getURL, true);
	xmlHttpRequest.setRequestHeader("If-Modified-Since", "0");
	xmlHttpRequest.send();
}

/* 抓取資料 */
fetchEditListData();
