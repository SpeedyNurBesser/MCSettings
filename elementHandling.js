let CURRENT_ID = 0;

// dictionary; pairs a given element type with its corresponding innerHTML
let HTMLOfElementTypes = {
  TEXT: '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i> <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can" title="Delete"></i></button> <button class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `TEXT`)" title="Duplicate"><i class="fa-solid fa-clone"></i></button> <button class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square" title="Edit"></i></button> <input placeholder="Text" type="text" /> <div class="collapsedElement"><input type="color" value="#408080" title="Choose color"><input class="styleCheckbox italicCheckbox" type="checkbox" title="Italic" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" title="Bold" value="Bold"><input class="styleCheckbox underlinedCheckbox" type="checkbox" title="Underlined" value="Underlined"><input class="styleCheckbox strikethroughCheckbox" type="checkbox" title="Strikethrough" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" type="checkbox" title="Obfuscated" value="Obfuscated"></div></div>',
  TOGGLE:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i> <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button> <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `TOGGLE`)"><i class="fa-solid fa-clone"></i></button> <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button> <input placeholder="Text" type="text" /> <input type="checkbox" class="toggleCheckbox" title="Default State"> <div class="collapsedElement"><input title="Prefix for False State" placeholder="False Prefix: [❌]" type="text" value="[❌]"/> <input type="color" value="#ff0000" title="Choose color for false state (prefix and explanation)"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br> <input title="Prefix for True State" placeholder="True  Prefix: [✔]" type="text" value="[✔]"/> <input type="color" value="#00ff00"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br><br><br> Store in Data Storage <input title="Specify Storage path" placeholder="Path"/><br> Store in a Scoreboard <input title="Specify Selector" placeholder="Selector" type="text"/> <input title="Specify Scoreboard" placeholder="Scoreboard" type="text"/> </div></div>',
  INT: '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i>                                              <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button>                                                                 <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `INT`)"><i class="fa-solid fa-clone"></i></button>                                                                                                                                               <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button>                                                                                                                                                <input placeholder="Text" type="text" /><input type="color" value="#ff0000" title="Choose color for false state (prefix and explanation)">                                            <input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic">                                                          <input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold">                                                          <input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined">                                    <input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough">                                 <input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated">                                                                                                           <div class="collapsedElement">                                                   <input title="Default Value" placeholder="Default Value" type="text"/value="0"><br>                                <input title="Accepted Range" placeholder="Accepted Range" type="text" value="0..10"/>                                <br><br><br>                                                            Store in Data Storage <input title="Specify Storage path" placeholder="Path"/>                                                      <br> Store in a Scoreboard <input title="Specify Selector" placeholder="Selector" type="text"/> <input title="Specify Scoreboard" placeholder="Scoreboard" type="text"/>                                      </div></div>',
  FLOAT:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i>                                              <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button>                                                                 <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `FLOAT`)"><i class="fa-solid fa-clone"></i></button>                                                                                                                                               <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button>                                                                                                                                                <input placeholder="Text" type="text" /><input type="color" value="#ff0000" title="Choose color for false state (prefix and explanation)">                                            <input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic">                                                          <input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold">                                                          <input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined">                                    <input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough">                                 <input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated">                                                                                                           <div class="collapsedElement">                                                   <input title="Default Value" placeholder="Default Value" type="text"/value="0.0">               <br><br><br>                                                            Store in Data Storage <input title="Specify Storage path" placeholder="Path"/>',
  STRING:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i>                                              <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button>                                                                 <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `STRING`)"><i class="fa-solid fa-clone"></i></button>                                                                                                                                               <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button>                                                                                                                                                <input placeholder="Text" type="text" /><input type="color" value="#ff0000" title="Choose color for false state (prefix and explanation)">                                            <input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic">                                                          <input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold">                                                          <input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined">                                    <input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough">                                 <input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated">                                                                                                           <div class="collapsedElement">                                                   <input title="Default Value" placeholder="Default Value" type="text"/value="Lorem ipsum">               <br><br><br>                                                            Store in Data Storage <input title="Specify Storage path" placeholder="Path"/>',
  SELECT:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i>                                              <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button>                                                                 <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `SELECT`)"><i class="fa-solid fa-clone"></i></button>                                                                                                                                              <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button>                                                                                                                                                <input placeholder="Text" type="text" /><input type="color" value="#ff0000" title="Choose color">                                            <input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic">                                                          <input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold">                                                          <input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined">                                    <input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough">                                 <input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated">                                                                                                                                                                                                                                 <div class="collapsedElement">                                                   Unselected: <input type="color" value="#ff0000" title="Choose color"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br>                                                                                                                                 Selected: <input type="color" value="#ff0000" title="Choose color"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br><br>                                                                                                                             <input title="Default Value" placeholder="Default Value" type="text"/value="Lorem ipsum"><br><input style="max-width:400px" title="Options" placeholder="Options" type="text"/value="Lorem ipsum, Hello World, Foo, Bar" style="">               <br><br><br>                                                            Store in Data Storage <input title="Specify Storage path" placeholder="Path"/>',
  MULTI:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i>                                              <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button>                                                                 <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `MULTI`)"><i class="fa-solid fa-clone"></i></button>                                                                                                                                              <button title="Edit "class="buttonColor buttonGrey" onclick="toggleCollapsible([parentNode.id])"><i class="fa-solid fa-pen-to-square"></i></button>                                                                                                                                                <input placeholder="Text" type="text" /><input type="color" value="#ff0000" title="Choose color">                                            <input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic">                                                          <input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold">                                                          <input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined">                                    <input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough">                                 <input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated">                                                                                                                                                                                                                                 <div class="collapsedElement">                                                   Unselected: <input type="color" value="#ff0000" title="Choose color"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br>                                                                                                                                 Selected: <input type="color" value="#ff0000" title="Choose color"><input title="Italic" class="styleCheckbox italicCheckbox" type="checkbox" value="Italic"><input class="styleCheckbox boldCheckbox" type="checkbox" value="Bold" title="Bold"><input title="Underlined" class="styleCheckbox underlinedCheckbox" type="checkbox" value="Underlined"><input title="Strikethrough" class="styleCheckbox strikethroughCheckbox" type="checkbox" value="Strikethrough"><input class="styleCheckbox obfuscatedCheckbox" title="Obfuscated" type="checkbox" value="Obfuscated"><br><br>                                                                                                                             <input title="Default Value" placeholder="Default Value" type="text"/value="Lorem ipsum"><br><input style="max-width:400px" title="Options" placeholder="Options" type="text"/value="Lorem ipsum, Hello World, Foo, Bar" style="">               <br><br><br>                                                            Store in Data Storage <input title="Specify Storage path" placeholder="Path"/>',
  LINEBREAK:
    '<div class="element" id="!id"><i class="fa-solid fa-grip-vertical" style="color: #808080"></i> <button title="Delete" class="buttonColor buttonRed" onclick="deleteElement(parentNode.id)"><i class="fa-solid fa-trash-can"></i></button> <button title="Duplicate" class="buttonColor buttonGrey"  onclick="duplicateElement(parentNode.id, `LINEBREAK`)"><i class="fa-solid fa-clone"></i></button> <span style="font: 15px Arial">Line Break ↲</span></div></div>',
};

function toggleCollapsible(id) {
  console.log(id);
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
    if (baseInputs[i].type != "checkbox") {
      duplicatedInputs[i].value = baseInputs[i].value;
    } else {
      duplicatedInputs[i].checked = baseInputs[i].checked;
    }
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
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["TOGGLE"])
  );

  togglePopup("addPopup");
});

addInputInt.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["INT"])
  );

  togglePopup("addPopup");
});

addInputFloat.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["FLOAT"])
  );

  togglePopup("addPopup");
});

addInputString.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["STRING"])
  );

  togglePopup("addPopup");
});

addSingleSelect.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["SELECT"])
  );

  togglePopup("addPopup");
});

addMultiSelect.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["MULTI"])
  );

  togglePopup("addPopup");
});

addLineBreak.addEventListener("click", function () {
  elementList.insertAdjacentHTML(
    "beforeend",
    giveElementHTML(HTMLOfElementTypes["LINEBREAK"])
  );

  togglePopup("addPopup");
});

deleteAllElements.addEventListener("click", function () {
  if (confirm("Are you sure you want to remove ALL elements?") == true) {
    elementList.innerHTML = "";
  }
});
