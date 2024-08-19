let currentParent = "";
let currentChildren = [];

function commaSeperatedToArray(str) {
  return str.split(",");
}

function getTellrawCommand(elementtype, inputs, id, target) {
  let command = "";
  if (elementtype == "TEXT") {
    command = getTextTellrawCommand(inputs[0].value, [
      inputs[1].value,
      inputs[2].checked,
      inputs[3].checked,
      inputs[4].checked,
      inputs[5].checked,
      inputs[6].checked,
    ]);
  } else if (elementtype == "TOGGLE") {
    command = getToggleTellrawCommand(
      inputs[0].value,
      inputs[1].checked,
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
      input[16].value,
      target,
      input[17].value
    );
  } else if (elementtype == "INT") {
  } else if (elementtype == "FLOAT") {
  } else if (elementtype == "STRING") {
  } else if (elementtype == "SELECT") {
  } else if (elementtype == "MULTI") {
  } else {
    command = getLineBreakTellrawCommand();
  }

  console.log(command);
  return command;
}

function getTextTellrawCommand(str, style) {
  return `tellraw @s {"text":"${str}", "color":"${style[0]}", "italic":${style[1]}, "bold":${style[2]}, "underlined":${style[3]},"strikethrough":${style[4]},"obfuscated":${style[5]}}\n`;
}
function getToggleTellrawCommand(
  str,
  defaultValue,
  falsePrefix,
  falseStyle,
  truePrefix,
  trueStyle,
  children,
  target,
  nbtPath
) {}
function getIntTellrawCommand(
  str,
  style,
  defaultValue,
  valueRange = "-2147483648..2147483647",
  target,
  nbtPath
) {}
function getFloatTellrawCommand(str, style, defaultValue, target, nbtPath) {}
function getStringTellrawCommand(str, style, defaultValue, target, nbtPath) {}
function getSelectTellrawCommand(
  str,
  style,
  unselectedStyle,
  selectedStyle,
  defaultOption,
  options,
  target,
  nbtPath
) {}
function getMultiTellrawCommand(
  str,
  style,
  unselectedStyle,
  selectedStyle,
  defaultOptions,
  options,
  target,
  nbtPath
) {}
function getLineBreakTellrawCommand() {
  return 'tellraw @s ""\n';
}
