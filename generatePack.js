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

  let zip = new JSZip();
  let pack = zip.folder(namespace);

  let displayFolder = pack.folder("display");
  let changeFolder = pack.folder("change");
  let resetFolder = pack.folder("reset");
  let validationFolder = pack.folder("validate");

  let elements = document.getElementById("elementList").childNodes;

  let settings = "";
  let setup = `scoreboard objectives add ${namespace}_validation dummy\nfunction ${namespace}:reset`;
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
        if (options.indexOf(defaultOptions[i] === -1)) {
          sendError(
            `${id} - You can't specify option as default that isn't specified.`
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

      if (!isInt(acceptedRange)[0] || !isInt(acceptedRange)[1]) {
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
          `${id} - The accepted range must be formatted correctly: "Min..Max" <br>Min can not be bigger than Max`
        );
        return false;
      }

      if (!(acceptedRange[0] >= defaultValue <= acceptedRange[1])) {
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

  return zip;
}

const packButton = document.getElementById("packButton");

packButton.addEventListener("click", function () {
  let pack = generateDatapackZip();

  if (pack) {
    downloadZip(pack, "MCSettings_Pack.zip");
    sendError("");
  }
});
