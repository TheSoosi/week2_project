import User from "./user.js";
import "./style.css";

function getForm() {
  return {
    username: document.getElementById("input-username"),
    email: document.getElementById("input-email"),
    address: document.getElementById("input-address"),
    admin: document.getElementById("input-admin"),
    image: document.getElementById("selected-image"),
  };
}

function getData() {
  const form = getForm();
  const user = new User(
    form.username.value,
    form.email.value,
    form.address.value,
    form.admin.checked,
    form.image.src
  );

  return user;
}

function clearData() {
  const form = getForm();
  form.username.value = "";
  form.email.value = "";
  form.address.value = "";
  form.admin.checked = false;
  form.image.removeAttribute("src");
  inputFile.value = null;
}

function getTableRow(user) {
  const rows = document.querySelectorAll("#table-body tr");
  for (let i = 0; i < rows.length; i++) {
    const column = rows[i].querySelector("td");
    const text = column.innerText;
    if (text === user.username) {
      return rows[i];
    }
  }
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

  const image = document.createElement("img");
  image.width = "64";
  image.height = "64";
  if (user.imageSrc) {
    image.src = user.imageSrc;
  }

  const imageCell = createCell("");
  imageCell.appendChild(image);
  row.appendChild(imageCell);
}

function upsertUser(user) {
  const row = getTableRow(user);
  row.innerHTML = "";
  addCells(row, user);
  const tb = document.getElementById("table-body");
  tb.appendChild(row);
}

upsertUser(new User("qwer", "asdf@asdf", "zxcv", true, null));
upsertUser(new User("rewq", "fdsas@fdsa", "vczxz", false, null));
upsertUser(new User("uiop", "aslkhjdf@hjkl", "tnhgh", false, null));

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
const image = document.getElementById("selected-image");
const inputFile = document.getElementById("input-image");
inputFile.onchange = () => {
  if (inputFile.files && inputFile.files[0]) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(inputFile.files[0]);
    fileReader.onloadend = (e) => {
      image.src = e.target.result;
    };
  }
};
