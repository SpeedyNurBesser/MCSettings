let SANITIZED_CHARS = { '"': '\\"' };

function sanitizeString(str) {
  keys = Object.keys(SANITIZED_CHARS);
  for (let i = 0; i < keys.length; i++) {
    str = str.replace(new RegExp(keys[i], "g"), SANITIZED_CHARS[keys[i]]);
  }
  return str;
}

function generateDatapackZip() {
  /// FileStructure
  // settings.mcfunction
  // setup.mcfunction
  // reset.mcfunction
  // change
  //  -> $id.mcfunction
  //
  // reset
  //  -> $id.mcfunction (element_1.mcfunction, ...)
  //
  // check
  //  -> $id.mcfunction (only for input)

  let namespace = "";
  if (document.getElementById("namespace").value != "") {
    namespace = document.getElementById("namespace").value;
  } else {
    namespace = "settings";
  }

  let zip = new JSZip();
  let pack = zip.folder(namespace);

  let changeFolder = pack.folder("change");
  let resetFolder = pack.folder("reset");
  let checkFolder = pack.folder("check");

  let elements = document.getElementById("elementList").childNodes;

  let settings = "";
  let setup = "";
  let resetAll = "";

  for (let i = 0; i < elements.length; i++) {
    let tellrawCommand = "";
    let resetCommand = "";
    let changeCommand = "";

    let element = elements[i];
    let id = element.id;
    let type = element.getAttribute("elementtype");
    let inputs = element.querySelectorAll("input");

    // sanitize inputs (" -> \")
    for (let j = 0; j < inputs.length; j++) {
      let input = inputs[j];
      if (input.type == "text") {
        input.value = sanitizeString(input.value);
      }
    }

    // insert default values for data storage
    if (type != "TEXT" && type != "LINEBREAK") {
      let pathInput = element.querySelectorAll(".path")[0];
      if (pathInput.value == "") {
        pathInput.value = id;
      }
    }

    tellrawCommand = getTellrawCommand(
      type,
      inputs,
      id,
      namespace + ":settings"
    );
    //resetCommand = getResetCommand(element, namespace + ":settings");

    //resetFolder.pack(id + ".mcfunction", resetCommand);
    //reset += "function " + namespace + ":reset/" + id + "\n";

    console.log(tellrawCommand);
    settings += tellrawCommand;
  }

  pack.file("settings.mcfunction", settings);
  pack.file("setup.mcfunction", setup);
  pack.file("reset.mcfunction", resetAll);

  return zip;
}

const packButton = document.getElementById("packButton");

packButton.addEventListener("click", function () {
  let pack = generateDatapackZip();

  if (pack) {
    downloadZip(pack, "MCSettings_Pack.zip");
  } else {
    // send some kind of error code
  }
});
