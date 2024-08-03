function togglePopup(id) {
  let popup = document.getElementById(id);

  if (popup.style.display == "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
}

const addElementButton = document.getElementById("addElement");
addElementButton.addEventListener("click", function () {
  togglePopup("addPopup");
});

const elementList = document.getElementById("elementList");
Sortable.create(elementList, {
  handle: ".fa-grip-vertical",
  animation: 150,
});
