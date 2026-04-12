const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const noteInput = document.getElementById("noteInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("customerList");
const searchInput = document.getElementById("searchInput");

let customers = [];

button.addEventListener("click", function () {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const note = noteInput.value;

  if (name === "") {
  alert("名前を入力してください");
  return;
}

const customer = {
  id: Date.now(),
  name: name,
  phone: phone,
  note: note
};

  customers.push(customer);
  saveCustomers();
  renderCustomer(customer);

  nameInput.value = "";
  phoneInput.value = "";
  noteInput.value = "";
});

function renderCustomer(customer) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = `名前: ${customer.name} / 電話: ${customer.phone} / メモ: ${customer.note}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";

deleteBtn.addEventListener("click", function () {
  customers = customers.filter(c => c.id !== customer.id);
  saveCustomers();
  li.remove();
});

  li.appendChild(span);
  li.appendChild(deleteBtn);

  list.appendChild(li);
}

function saveCustomers() {
  localStorage.setItem("customers", JSON.stringify(customers));
}

window.addEventListener("load", function () {
  const saved = localStorage.getItem("customers");

  if (saved) {
    customers = JSON.parse(saved);
    customers.forEach(customer => renderCustomer(customer));
  }
});

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();

  list.innerHTML = "";

  const filtered = customers.filter(customer =>
    customer.name.toLowerCase().includes(keyword)
  );

  filtered.forEach(customer => renderCustomer(customer));
});