let CURRENT_ID = 0;

// dictionary; pairs a given element type with its corresponding innerHTML
let HTMLOfElementTypes = {
  TEXT: '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i> <button class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button> <button class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `TEXT`)"><i class="fa-solid fa-clone"></i></button> <button class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button> <input placeholder="Text" type="text" /> <div class="collapsedElement"><p>Dieser Content wird erst später sichtbar.</p></div></div>',
};

function toggleCollapsible(id) {
  let collapsedElement = document.getElementById(id).lastChild;

  if (collapsedElement.style.maxHeight) {
    collapsedElement.style.maxHeight = null;
  } else {
    collapsedElement.style.maxHeight = collapsedElement.scrollHeight + "px";
  }
}

function duplicateElement(id, elementType) {
  let baseElement = document.getElementById(id);

  baseElement.insertAdjacentHTML(
    "afterend",
    giveElementHTML(HTMLOfElementTypes[elementType])
  );

  let duplicatedElement = document.getElementById("element_" + CURRENT_ID);

  let baseInputs = baseElement.querySelectorAll("input");
  let duplicatedInputs = duplicatedElement.querySelectorAll("input");

  for (let i = 0; i < baseInputs.length; i++) {
    duplicatedInputs[i].value = baseInputs[i].value;
  }
}

function deleteElement(id) {
  let element = document.getElementById(id);

  if (confirm("Are you sure you want to remove this element?") == true) {
    element.remove();
  }
}

function giveElementHTML(HTML) {
  CURRENT_ID++;
  id = "element_" + CURRENT_ID;
  return HTML.replace(/!id/g, id);
}

const addText = document.querySelector("#addText");
const addToggle = document.querySelector("#addToggle");
const addInputInt = document.querySelector("#addInputInt");
const addInputFloat = document.querySelector("#addInputFloat");
const addInputString = document.querySelector("#addInputString");
const addSingleSelect = document.querySelector("#addSingleSelect");
const addMultiSelect = document.querySelector("#addMultiSelect");
const addLineBreak = document.querySelector("#addLineBreak");

const deleteAllElements = document.querySelector("#deleteAllElements");

addText.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["TEXT"])
  );

  togglePopup("addPopup");
});

addToggle.addEventListener("click", function () {
  togglePopup("addPopup");
});

addInputInt.addEventListener("click", function () {
  togglePopup("addPopup");
});

addInputFloat.addEventListener("click", function () {
  togglePopup("addPopup");
});

addInputString.addEventListener("click", function () {
  togglePopup("addPopup");
});

addSingleSelect.addEventListener("click", function () {
  togglePopup("addPopup");
});

addMultiSelect.addEventListener("click", function () {
  togglePopup("addPopup");
});

addLineBreak.addEventListener("click", function () {
  togglePopup("addPopup");
});

deleteAllElements.addEventListener("click", function () {
  if (confirm("Are you sure you want to remove ALL elements?") == true) {
    elementList.innerHTML = "";
  }
});
