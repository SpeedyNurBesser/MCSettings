const PACK_FORMAT = 48;

let SANITIZED_CHARS = { '"': '\\"' };

function sanitizeString(str) {
  keys = Object.keys(SANITIZED_CHARS);
  for (let i = 0; i < keys.length; i++) {
    str = str.replace(new RegExp(keys[i], "g"), SANITIZED_CHARS[keys[i]]);
  }
  return str;
}

function generateFunctionZip() {
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
  // display
  //  -> $id.mcfunction (element_1.mcfunction, ...)
  //
  // validate
  //  -> $id.mcfunction (only for input)

  let namespace = "";
  if (document.getElementById("namespace").value != "") {
    namespace = document.getElementById("namespace").value;
  } else {
    namespace = "settings";
  }

  let numberOfLineBreak = 0;
  if (document.getElementById("lineBreaks").value != "") {
    numberOfLineBreak = document.getElementById("lineBreaks").value;
    if (!isInt(numberOfLineBreak)) {
      sendError("The number of line breaks must be an integer.");
      return false;
    }
  }

  let zip = new JSZip();
  let namespaceFolder = zip.folder(namespace);
  let pack = namespaceFolder.folder("function");

  let displayFolder = pack.folder("display");
  let changeFolder = pack.folder("change");
  let resetFolder = pack.folder("reset");
  let validationFolder = pack.folder("validate");

  let elements = document.getElementById("elementList").childNodes;

  let settings = "";
  if (numberOfLineBreak !== 0) {
    settings += 'tellraw @s {"text":"';
    for (let i = 0; i < numberOfLineBreak; i++) {
      settings += "\\n";
    }
    settings += '"}\n';
  }

  let setup = `scoreboard objectives add ${namespace}_validation dummy\nscoreboard players add $onlyOnce ${namespace}_validation 1\nfunction ${namespace}:reset`;
  let resetAll = "";

  for (let i = 0; i < elements.length; i++) {
    let callDisplayCommand = "";
    let resetCommand = "";

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
    if (type !== "TEXT" && type !== "LINEBREAK") {
      let pathInput = element.querySelectorAll(".path")[0];
      if (pathInput.value == "") {
        pathInput.value = id;
      }
    }

    // Error Checks
    // Throw error, if default option is not in options
    if (type === "SELECT" || type === "MULTI") {
      let defaultOptions = commaSeperatedStringToArray(inputs[19].value);
      let options = commaSeperatedStringToArray(inputs[20].value);

      for (let i = 0; i < defaultOptions.length; i++) {
        if (options.indexOf(defaultOptions[i]) === -1) {
          sendError(
            `${id} - You can't specify an option as default that isn't specified.`
          );
          return false;
        }
      }
    }

    // Throw error, if default value is not an integer
    // Throw error, if number range is not specified correctly
    // Throw error, if min is bigger than max
    // Throw error, if default value is not in accepted range
    if (type === "INT") {
      let defaultValue = inputs[7].value;
      if (!isInt(defaultValue)) {
        sendError(
          `${id} - The default value for an integer input must be an integer.`
        );
        return false;
      } else {
        defaultValue = Number(defaultValue);
      }

      let acceptedRange = inputs[14].value.split("..");
      if (acceptedRange.length !== 2) {
        sendError(
          `${id} - The accepted range must be formatted correctly: "Min..Max"`
        );
        return false;
      }

      if (!isInt(acceptedRange[0]) || !isInt(acceptedRange[1])) {
        sendError(
          `${id} - The accepted range must be "made" of integers, i.e. 5..25, not 5.5..42.0 or e..f`
        );
        return false;
      } else {
        acceptedRange[0] = Number(acceptedRange[0]);
        acceptedRange[1] = Number(acceptedRange[1]);
      }

      if (acceptedRange[0] >= acceptedRange[1]) {
        sendError(
          `${id} - The accepted range must be formatted correctly: "Min..Max" <br>Min must not be bigger than Max`
        );
        return false;
      }

      if (
        !(acceptedRange[0] <= defaultValue) ||
        !(defaultValue <= acceptedRange[1])
      ) {
        sendError(`${id} - Default value must be inside the accepted range.`);
        return false;
      }
    }

    // Throw error, if default value is not a float
    if (type === "FLOAT") {
      let defaultValue = inputs[7].value;
      if (!isFloat(defaultValue)) {
        sendError(
          `${id} - The default value for a float input must be a float.`
        );
        return false;
      }
    }

    commands = getCommands(
      type,
      inputs,
      id,
      namespace + ":settings",
      namespace,
      [displayFolder, changeFolder, validationFolder]
    );
    // take Folders as inputs
    displayFolder = commands["display"];
    callDisplayCommand = commands["callDisplay"];
    resetCommand = commands["reset"];
    changeFolder = commands["change"];
    validationFolder = commands["validation"];

    if (callDisplayCommand !== "") {
      settings += callDisplayCommand;
    }
    if (resetCommand !== "") {
      resetFolder.file(`${id}.mcfunction`, resetCommand);
      resetAll += `function ${namespace}:reset/${id}\n`;
    }
  }

  pack.file("settings.mcfunction", settings);
  pack.file("setup.mcfunction", setup);
  pack.file("reset.mcfunction", resetAll);
  pack.file("restore.txt", generateRestoreFile());

  return zip;
}

async function generateDatapackZip() {
  let functions = generateFunctionZip();
  if (!functions) {
    return false;
  }

  let namespace = "";
  if (document.getElementById("namespace").value != "") {
    namespace = document.getElementById("namespace").value;
  } else {
    namespace = "settings";
  }

  let datapack = new JSZip();

  datapack.file(
    "pack.mcmeta",
    `{"pack": {"description": "A datapack with settings\ngenerated with MCSettings","pack_format": ${PACK_FORMAT}}}`
  );
  let dataFolder = datapack.folder("data");
  dataFolder.file(
    "minecraft/tags/function/load.json",
    `{"values": ["${namespace}:start"]}`
  );

  // merge functions into dataFolder
  dataFolder = await dataFolder.loadAsync(
    await functions.generateAsync({ type: "blob" }),
    {
      createFolders: true,
    }
  );

  dataFolder.file(
    `${namespace}/function/start.mcfunction`,
    `execute if score $onlyOnce ${namespace}_validation matches ..0 run function ${namespace}:setup`
  );
  downloadZip(datapack, "MCSettings_Pack.zip");
}

const functionButton = document.getElementById("functionButton");
functionButton.addEventListener("click", function () {
  let functions = generateFunctionZip();

  if (functions) {
    downloadZip(functions, "MCSettings_Functions.zip");
    sendError("");
  }
});

const packButton = document.getElementById("packButton");
packButton.addEventListener("click", function () {
  let pack = generateDatapackZip();
  if (pack) {
    downloadZip(pack, "MCSettings_Pack.zip");
  }
});

function generateRestoreFile() {
  // just takes the HTML of all elements and puts it into a single string
  // as the values of HTML elements aren't saved, when getting its HTML (using element.innerHTML), we must artificially set it
  // we just set the input's "value" attribute (or "checked" attribute for checkboxes) to the input's value attribute (sounds weird I know)
  let elements = document.getElementById("elementList").childNodes;
  let output = "";

  for (let element of elements) {
    let inputs = element.querySelectorAll("input");

    for (let input of inputs) {
      if (input.type === "checkbox" && input.checked === true) {
        input.setAttribute("checked", true);
      } else {
        input.setAttribute("value", input.value);
      }
    }

    output += element.outerHTML;
  }
  return output;
}

const restoreButton = document.getElementById("restoreButton");
restoreButton.addEventListener("click", function () {
  document.getElementById("elementList").innerHTML = prompt(
    "Paste text of restore.txt"
  );
});

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function () {
  let restoreFile = generateRestoreFile();
  if (restoreFile !== "") {
    let blob = new Blob([restoreFile], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "restore.txt");
  }
});
