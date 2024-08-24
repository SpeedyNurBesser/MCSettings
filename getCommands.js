let currentParentPath = "";
let currentChildren = [];

function isChildren(id) {
  for (let i = 0; i < currentChildren.length; i++) {
    if (currentChildren[i] === id) {
      return true;
    }
  }

  return false;
}

function getCommands(elementtype, inputs, id, target, namespace, folder) {
  let displayFolder = folder[0];
  let changeFolder = folder[1];
  let validationFolder = folder[2];

  let displayCommand = "";
  let callDisplayCommand = "";
  let resetCommand = "";
  let changeCommand = "";
  // data merge storage settings:settings {temp:$value}
  // execute store result storage settings:settings float float 1 run data get storage settings:settings temp 1
  let validationCommand = "";

  if (isChildren(id)) {
    callDisplayCommand += `execute if data storage ${target} {${currentParentPath}:true} run `;
  }
  callDisplayCommand += `function ${namespace}:display/${id}\n`;

  if (elementtype === "TEXT") {
    displayCommand = getTextTellrawCommand(inputs[0].value, [
      inputs[1].value,
      inputs[2].checked,
      inputs[3].checked,
      inputs[4].checked,
      inputs[5].checked,
      inputs[6].checked,
    ]);
  } else if (elementtype === "TOGGLE") {
    // set this element to new parent, if it specifies children
    if (inputs[16].value != "") {
      currentParentPath = inputs[17].value;
      currentChildren = commaSeperatedStringToArray(inputs[16].value);
    }

    displayCommand = getToggleTellrawCommand(
      inputs[0].value,
      inputs[2].value,
      [
        inputs[3].value,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
        inputs[7].checked,
        inputs[8].checked,
      ],
      inputs[9].value,
      [
        inputs[10].value,
        inputs[11].checked,
        inputs[12].checked,
        inputs[13].checked,
        inputs[14].checked,
        inputs[15].checked,
      ],
      target,
      inputs[17].value,
      namespace,
      id
    );

    resetCommand = getDefaultResetCommand(
      inputs[1].checked,
      target,
      inputs[17].value
    );

    let changeFiles = getToggleChangeCommand(
      id,
      target,
      inputs[17].value,
      namespace
    );
    changeFolder.file(changeFiles[0][0], changeFiles[0][1]);
    changeFolder.file(changeFiles[1][0], changeFiles[1][1]);
  } else if (elementtype === "INT") {
    displayCommand = getIntTellrawCommand(
      inputs[0].value,
      [
        inputs[1].value,
        inputs[2].checked,
        inputs[3].checked,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
      ],
      [
        inputs[8].value,
        inputs[9].checked,
        inputs[10].checked,
        inputs[11].checked,
        inputs[12].checked,
        inputs[13].checked,
      ],
      target,
      inputs[15].value,
      inputs[7].value,
      namespace,
      id
    );

    resetCommand = getDefaultResetCommand(
      inputs[7].value,
      target,
      inputs[15].value
    );

    changeCommand = getIntChangeCommand(
      target,
      inputs[15].value,
      namespace,
      inputs[14].value
    );
  } else if (elementtype === "FLOAT") {
    displayCommand = getFloatTellrawCommand(
      inputs[0].value,
      [
        inputs[1].value,
        inputs[2].checked,
        inputs[3].checked,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
      ],
      [
        inputs[8].value,
        inputs[9].checked,
        inputs[10].checked,
        inputs[11].checked,
        inputs[12].checked,
        inputs[13].checked,
      ],
      target,
      inputs[14].value,
      inputs[7].value,
      namespace,
      id
    );

    resetCommand = getDefaultResetCommand(
      inputs[7].value,
      target,
      inputs[14].value
    );

    changeCommand = getFloatChangeCommand(target, inputs[14].value, namespace);
  } else if (elementtype === "STRING") {
    displayCommand = getStringTellrawCommand(
      inputs[0].value,
      [
        inputs[1].value,
        inputs[2].checked,
        inputs[3].checked,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
      ],
      [
        inputs[8].value,
        inputs[9].checked,
        inputs[10].checked,
        inputs[11].checked,
        inputs[12].checked,
        inputs[13].checked,
      ],
      target,
      inputs[14].value,
      inputs[7].value,
      namespace,
      id
    );

    resetCommand = getStringResetCommand(
      inputs[7].value,
      target,
      inputs[14].value
    );

    changeCommand = getStringChangeCommand(target, inputs[14].value, namespace);
  } else if (elementtype === "SELECT") {
    let options = commaSeperatedStringToArray(inputs[20].value);
    displayCommand = getSelectTellrawCommand(
      inputs[0].value,
      [
        inputs[1].value,
        inputs[2].checked,
        inputs[3].checked,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
      ],
      [
        inputs[7].value,
        inputs[8].checked,
        inputs[9].checked,
        inputs[10].checked,
        inputs[11].checked,
        inputs[12].checked,
      ],
      [
        inputs[13].value,
        inputs[14].checked,
        inputs[15].checked,
        inputs[16].checked,
        inputs[17].checked,
        inputs[18].checked,
      ],
      options,
      target,
      inputs[21].value,
      namespace,
      id
    );

    resetCommand = getSelectResetCommand(
      [inputs[19].value],
      target,
      inputs[21].value,
      options
    );

    let changeFunctions = getSelectChangeCommand(
      id,
      target,
      inputs[21].value,
      options,
      namespace
    );
    for (let i = 0; i < changeFunctions.length; i++) {
      changeFolder.file(changeFunctions[i][0], changeFunctions[i][1]);
    }
  } else if (elementtype === "MULTI") {
    let options = commaSeperatedStringToArray(inputs[20].value);
    let multiTellrawCommand = getMultiTellrawCommand(
      inputs[0].value,
      [
        inputs[1].value,
        inputs[2].checked,
        inputs[3].checked,
        inputs[4].checked,
        inputs[5].checked,
        inputs[6].checked,
      ],
      [
        inputs[7].value,
        inputs[8].checked,
        inputs[9].checked,
        inputs[10].checked,
        inputs[11].checked,
        inputs[12].checked,
      ],
      [
        inputs[13].value,
        inputs[14].checked,
        inputs[15].checked,
        inputs[16].checked,
        inputs[17].checked,
        inputs[18].checked,
      ],
      options,
      target,
      inputs[21].value,
      namespace,
      id
    );

    displayCommand = multiTellrawCommand[0];
    let dedicatedDisplayFolder = displayFolder.folder(id);
    for (let i = 1; i < multiTellrawCommand.length; i++) {
      dedicatedDisplayFolder.file(
        multiTellrawCommand[i][0],
        multiTellrawCommand[i][1]
      );
    }

    resetCommand = getSelectResetCommand(
      commaSeperatedStringToArray(inputs[19].value),
      target,
      inputs[21].value,
      options
    );

    let changeFunctions = getMultiChangeCommand(
      id,
      target,
      inputs[21].value,
      options,
      namespace
    );
    for (let i = 0; i < changeFunctions.length; i++) {
      changeFolder.file(changeFunctions[i][0], changeFunctions[i][1]);
    }
  } else {
    displayCommand += getLineBreakTellrawCommand();
  }

  if (displayCommand !== "") {
    displayFolder.file(`${id}.mcfunction`, displayCommand);
  }

  if (changeCommand !== "") {
    changeFolder.file(`${id}.mcfunction`, changeCommand);
  }
  if (validationCommand !== "") {
    validationFolder.file(`${id}.mcfunction`, validationCommand);
  }

  return {
    display: displayFolder,
    callDisplay: callDisplayCommand,
    reset: resetCommand,
    change: changeFolder,
    validation: validationFolder,
  };
}

// Tellraw/Display Command
function getTextTellrawCommand(str, style) {
  return `tellraw @s {"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}}\n`;
}
function getToggleTellrawCommand(
  str,
  falsePrefix,
  falseStyle,
  truePrefix,
  trueStyle,
  target,
  nbtPath,
  namespace,
  id
) {
  return `execute if data storage ${target} {${nbtPath}: false} run tellraw @s [{"text":"${falsePrefix}", "color":"${falseStyle[0]}", "italic":${falseStyle[1]}, "bold":${falseStyle[2]}, "underlined":${falseStyle[3]},"strikethrough":${falseStyle[4]},"obfuscated":${falseStyle[5]}, "clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_activate"}}, {"text":"${str}", "color":"${falseStyle[0]}", "italic":${falseStyle[1]}, "bold":${falseStyle[2]}, "underlined":${falseStyle[3]},"strikethrough":${falseStyle[4]},"obfuscated":${falseStyle[5]}}]\nexecute if data storage ${target} {${nbtPath}: true} run tellraw @s [{"text":"${truePrefix}", "color":"${trueStyle[0]}", "italic":${trueStyle[1]}, "bold":${trueStyle[2]}, "underlined":${trueStyle[3]},"strikethrough":${trueStyle[4]},"obfuscated":${trueStyle[5]}}, {"text":"${str}", "color":"${trueStyle[0]}", "italic":${trueStyle[1]}, "bold":${trueStyle[2]}, "underlined":${trueStyle[3]},"strikethrough":${trueStyle[4]},"obfuscated":${trueStyle[5]}, "clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_deactivate"}}]\n`;
}
function getIntTellrawCommand(
  str,
  style,
  valueStyle,
  target,
  nbtPath,
  defaultValue,
  namespace,
  id
) {
  return `tellraw @s [{"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}},{"nbt":"${nbtPath}","storage":"${target}", "color":"${valueStyle[0]}", "italic":${valueStyle[1]}, "bold":${valueStyle[2]}, "underlined":${valueStyle[3]},"strikethrough":${valueStyle[4]},"obfuscated":${valueStyle[5]},"clickEvent":{"action":"suggest_command","value":"/function ${namespace}:change/${id} {value:${defaultValue}}"}}]\n`;
}
function getFloatTellrawCommand(
  str,
  style,
  valueStyle,
  target,
  nbtPath,
  defaultValue,
  namespace,
  id
) {
  return `tellraw @s [{"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}},{"nbt":"${nbtPath}","storage":"${target}", "color":"${valueStyle[0]}", "italic":${valueStyle[1]}, "bold":${valueStyle[2]}, "underlined":${valueStyle[3]},"strikethrough":${valueStyle[4]},"obfuscated":${valueStyle[5]},"clickEvent":{"action":"suggest_command","value":"/function ${namespace}:change/${id} {value:${defaultValue}}"}}]\n`;
}
function getStringTellrawCommand(
  str,
  style,
  valueStyle,
  target,
  nbtPath,
  defaultValue,
  namespace,
  id
) {
  return `tellraw @s [{"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}},{"text":"\\"", "color":"${valueStyle[0]}", "italic":${valueStyle[1]}, "bold":${valueStyle[2]}, "underlined":${valueStyle[3]},"strikethrough":${valueStyle[4]},"obfuscated":${valueStyle[5]},"clickEvent":{"action":"suggest_command","value":"/function ${namespace}:change/${id} {value:\\"${defaultValue}\\"}"}},{"nbt":"${nbtPath}","storage":"${target}", "color":"${valueStyle[0]}", "italic":${valueStyle[1]}, "bold":${valueStyle[2]}, "underlined":${valueStyle[3]},"strikethrough":${valueStyle[4]},"obfuscated":${valueStyle[5]},"clickEvent":{"action":"suggest_command","value":"/function ${namespace}:change/${id} {value:\\"${defaultValue}\\"}"}}, {"text":"\\"", "color":"${valueStyle[0]}", "italic":${valueStyle[1]}, "bold":${valueStyle[2]}, "underlined":${valueStyle[3]},"strikethrough":${valueStyle[4]},"obfuscated":${valueStyle[5]},"clickEvent":{"action":"suggest_command","value":"/function ${namespace}:change/${id} {value:\\"${defaultValue}\\"}"}}]\n`;
}
function getSelectTellrawCommand(
  str,
  style,
  unselectedStyle,
  selectedStyle,
  options,
  target,
  nbtPath,
  namespace,
  id
) {
  command = "";

  for (let i = 0; i < options.length; i++) {
    // generates a command for every possible state (active option)
    command += `execute if data storage ${target} {${nbtPath}:[{"${options[i]}":true}]} run tellraw @s [{"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}}`;
    for (let j = 0; j < options.length; j++) {
      // generates the different option clickables
      // TODO: add run command /function namespace:change/id_option_j
      if (i === j) {
        command += `,{"text":"[${options[j]}]", "color":"${selectedStyle[0]}", "italic":${selectedStyle[1]}, "bold":${selectedStyle[2]}, "underlined":${selectedStyle[3]},"strikethrough":${selectedStyle[4]},"obfuscated":${selectedStyle[5]},"clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_option_${j}_deactivate"}}, {"text":" "}`;
      } else {
        command += `,{"text":"[${options[j]}]", "color":"${unselectedStyle[0]}", "italic":${unselectedStyle[1]}, "bold":${unselectedStyle[2]}, "underlined":${unselectedStyle[3]},"strikethrough":${unselectedStyle[4]},"obfuscated":${unselectedStyle[5]},"clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_option_${j}_activate"}}, {"text":" "}`;
      }
    }
    command += "]\n";
  }
  return command;
}
function getMultiTellrawCommand(
  str,
  style,
  unselectedStyle,
  selectedStyle,
  options,
  target,
  nbtPath,
  namespace,
  id
) {
  let output = [];
  let rootCommand = `execute if data storage ${target} {${nbtPath}:[{"${options[0]}":true}]} run function ${namespace}:display/${id}/1\nexecute if data storage ${target} {${nbtPath}:[{"${options[0]}":false}]} run function ${namespace}:display/${id}/0\n`;
  output.push(rootCommand);

  let possibleStates = generateAllPossibleStates(options.length);

  for (let i = 0; i < possibleStates[0].length; i++) {
    if (possibleStates[0][i].length < options.length) {
      // check function
      output.push([
        `${possibleStates[0][i]}.mcfunction`,
        `execute if data storage ${target} {${nbtPath}:[{"${
          options[possibleStates[0][i].length]
        }":true}]} run function ${namespace}:display/${id}/1${
          possibleStates[0][i]
        }\nexecute if data storage ${target} {${nbtPath}:[{"${
          options[possibleStates[0][i].length]
        }":false}]} run function ${namespace}:display/${id}/0${
          possibleStates[0][i]
        }\n`,
      ]);
    } else {
      // tellraw function
      let tempCommand = `tellraw @s [{"text": "${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}}`;

      for (let j = 0; j < options.length; j++) {
        // generates the different option clickables
        if (possibleStates[1][i][j] == true) {
          // for selected options
          tempCommand += `,{"text":"[${options[j]}]", "color":"${selectedStyle[0]}", "italic":${selectedStyle[1]}, "bold":${selectedStyle[2]}, "underlined":${selectedStyle[3]},"strikethrough":${selectedStyle[4]},"obfuscated":${selectedStyle[5]},"clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_option_${j}_deactivate"}}, {"text":" "}`;
        } else {
          //for unselected options
          tempCommand += `,{"text":"[${options[j]}]", "color":"${unselectedStyle[0]}", "italic":${unselectedStyle[1]}, "bold":${unselectedStyle[2]}, "underlined":${unselectedStyle[3]},"strikethrough":${unselectedStyle[4]},"obfuscated":${unselectedStyle[5]},"clickEvent":{"action":"run_command","value":"/function ${namespace}:change/${id}_option_${j}_activate"}}, {"text":" "}`;
        }
      }
      tempCommand += "]\n";
      output.push([`${possibleStates[0][i]}.mcfunction`, tempCommand]);
    }
  }

  return output;
}
function getLineBreakTellrawCommand() {
  return 'tellraw @s ""\n';
}

// Reset Commands
function getDefaultResetCommand(defaultValue, target, nbtPath) {
  return `data merge storage ${target} {${nbtPath}:${defaultValue}}\n`;
}

function getStringResetCommand(defaultValue, target, nbtPath) {
  return `data merge storage ${target} {${nbtPath}:"${defaultValue}"}\n`;
}

function getSelectResetCommand(defaultValue, target, nbtPath, options) {
  command = `data merge storage ${target} {${nbtPath}:[`;
  for (let i = 0; i < options.length; i++) {
    if (defaultValue.indexOf(options[i]) != -1) {
      command += `{"${options[i]}":true}`;
    } else {
      command += `{"${options[i]}":false}`;
    }

    if (i + 1 != options.length) {
      command += ",";
    }
  }
  command += "]}\n";
  return command;
}

// Change Commands

function getToggleChangeCommand(id, target, nbtPath, namespace) {
  return [
    [
      `${id}_activate.mcfunction`,
      `data merge storage ${target} {${nbtPath}:true}\nfunction ${namespace}:settings`,
    ],
    [
      `${id}_deactivate.mcfunction`,
      `data merge storage ${target} {${nbtPath}:false}\nfunction ${namespace}:settings`,
    ],
  ];
}

function getMultiChangeCommand(id, target, nbtPath, options, namespace) {
  let functions = [];

  for (let i = 0; i < options.length; i++) {
    let activationOutput = ["", ""];
    let deactivationOutput = ["", ""];
    activationOutput[0] = `${id}_option_${i}_activate.mcfunction`;
    deactivationOutput[0] = `${id}_option_${i}_deactivate.mcfunction`;
    activationOutput[1] = `data modify storage ${target} ${nbtPath}[${i}]."${options[i]}" set value true\nfunction ${namespace}:settings`;
    deactivationOutput[1] = `data modify storage ${target} ${nbtPath}[${i}]."${options[i]}" set value false\nfunction ${namespace}:settings`;

    functions.push(activationOutput);
    functions.push(deactivationOutput);
  }
  return functions;
}

function getSelectChangeCommand(id, target, nbtPath, options, namespace) {
  let functions = [];
  let noneCommand = `data merge storage ${target} {${nbtPath}:[`;

  for (let i = 0; i < options.length; i++) {
    noneCommand += `{"${options[i]}":false}`;
    if (i + 1 !== options.length) {
      noneCommand += ",";
    }
  }
  noneCommand += `]}`;

  for (let i = 0; i < options.length; i++) {
    let activationOutput = ["", ""];
    let deactivationOutput = ["", ""];
    activationOutput[0] = `${id}_option_${i}_activate.mcfunction`;
    deactivationOutput[0] = `${id}_option_${i}_deactivate.mcfunction`;
    activationOutput[1] = `${noneCommand}\ndata modify storage ${target} ${nbtPath}[${i}]."${options[i]}" set value true\nfunction ${namespace}:settings`;
    deactivationOutput[1] = `${noneCommand}\ndata modify storage ${target} ${nbtPath}[${i}]."${options[i]}" set value false\nfunction ${namespace}:settings`;

    functions.push(activationOutput);
    functions.push(deactivationOutput);
  }
  return functions;
}

function getIntChangeCommand(target, nbtPath, namespace, range) {
  return `# The function won't be executed, if the given value isn't an integer, for the whole function fails, if one command isn't valid.\n# A scoreboard command is only valid, if the number is an integer.\n$scoreboard players set $intValidation ${namespace}_validation $(value)\nexecute unless score $intValidation ${namespace}_validation matches ${range} run return fail\n$data merge storage ${target} {${nbtPath}:$(value)}\nfunction ${namespace}:settings`;
}

function getStringChangeCommand(target, nbtPath, namespace) {
  return `$data merge storage ${target} {${nbtPath}:"$(value)"}\nfunction ${namespace}:settings`;
}

function getFloatChangeCommand(target, nbtPath, namespace) {
  return `# The function won't be executed, if the given value isn't a float, for the whole function fails, if one command isn't valid.\n# A data get command can take a floating point value as a scale factor.\n# It is only valid with an integer or float as input.\n$data get storage ${target} temp $(value)\n$data merge storage ${target} {${nbtPath}:$(value)}\nfunction ${namespace}:settings`;
}
