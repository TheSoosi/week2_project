import User from "./user.js";
import "./style.css";

function getForm() {
  return {
    username: document.getElementById("input-username"),
    email: document.getElementById("input-email"),
    address: document.getElementById("input-address"),
    admin: document.getElementById("input-admin"),
  };
}

function getData() {
  const form = getForm();
  const user = new User(
    form.username.value,
    form.email.value,
    form.address.value,
    form.admin.checked
  );
  console.log(user);
  return user;
}

function clearData() {
  const form = getForm();
  form.username.value = "";
  form.email.value = "";
  form.address.value = "";
  form.admin.checked = false;
}

function getTableRow() {
  return document.createElement("tr");
}
function createCell(text) {
  const cell = document.createElement("td");
  cell.innerText = text;
  return cell;
}

function addCells(row, user) {
  row.appendChild(createCell(user.username));
  row.appendChild(createCell(user.email));
  row.appendChild(createCell(user.address));
  const adminText = user.admin ? "X" : "-";
  row.appendChild(createCell(adminText));
  row.appendChild(createCell(""));
}

function upsertUser(user) {
  const row = getTableRow();
  row.innerHTML = "";
  addCells(row, user);
  const tb = document.getElementById("table-body");
  tb.appendChild(row);
}

const submitButton = document.getElementById("submit-data");
submitButton.onclick = (event) => {
  const user = getData();
  clearData();
  upsertUser(user);
  event.preventDefault();
};

const clearTableButton = document.getElementById("empty-table");
clearTableButton.onclick = (event) => {
  const tb = document.getElementById("table-body");
  tb.innerHTML = "";
};
