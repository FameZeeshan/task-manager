"use strict";

const formEl = document.getElementById("form-item");
const itemEl = document.getElementById("item");
const itemContainerEl = document.getElementById("items-container");

const btnSubmit = document.getElementById("btn-Submit");
// global variables
let items = [];
let isEditing = false;
let editId = 0;

// functions
const displayUI = function () {
  itemContainerEl.innerHTML = null;
  if (items.length > 0) {
    items.forEach((item) => {
      const listEl = document.createElement("li");

      listEl.classList.add("list-item");
      listEl.innerHTML = `${item.value} <button onClick = 'deleteItem(${item.id})'>Delete</button> <button onClick = 'editItem(${item.id})'>Edit</button>`;
      itemContainerEl.appendChild(listEl);
    });
  }
};

const deleteItem = function (id) {
  items = items.filter((item) => item.id !== id);
  displayUI();
};

const editItem = function (id) {
  // first get the item
  const itemToEdit = items.find((item) => item.id === id);
  itemEl.value = itemToEdit.value;
  // to classify the state of add or edit button
  editId = id;
  isEditing = true;
  // update the values
};
// event listeners

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //   Truthy value and falsy value concept
  // null, "", 0 - false
  if (isEditing) {
    items = items.map((item) => {
      if (item.id === editId) {
        return { ...item, value: itemEl.value };
      } else {
        return item;
      }
    });
    // re display on the screen
    displayUI();
    isEditing = false;
    editId = null;
    itemEl.value = null;
  } else {
    if (itemEl.value) {
      const item = {
        id: new Date().valueOf(),
        value: itemEl.value,
      };

      items.push(item);
      itemEl.value = null;
      console.log(items);
      // Display the items on the screen
      displayUI();
    } else {
      alert("Enter a valid input");
    }
  }
});
