var feedbackElement = document.getElementById("feedback");
function processFormData() {
alert("謝謝你的留言");
}
function addMsg() {
let table = document.getElementById("Feedback_table");
let newRow = table.insertRow();
newRow.insertCell().innerHTML = new Date().toLocaleString();
newRow.insertCell().innerHTML = feedbackElement.value;
newRow.insertCell().innerHTML = '<input type="button" value="Delete" onclick="delRow(this)"></input>'
}
function delRow(r) {
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("Feedback_table").deleteRow(i);
alert("謝謝您的留言，我們已將留言刪除!");
}