# MCSettings

![logo](https://github.com/user-attachments/assets/96cfc7c7-f743-4414-9123-8bcb848a4c72)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Elements](#elements)
  - [Text](#text)
  - [Toggle](#toggle)
  - [Input Int](#int)
  - [Input Float](#float)
  - [Input String](#string)
  - [Select](#select)
  - [Multi Select](#multi)
- [In-game Usage](#usage)
- [Save & Restore](#save_and_restore)

## About <a name = "about"></a>

[_MCSettings_](https://speedynurbesser.github.io/MCSettings/) is an online tool for generating a settings menu for use in Minecraft Datapacks utilizing the `/tellraw` command and data storages. It's inspired by the [Tellraw Generator for Minecraft](https://www.minecraftjson.com/) and was originially created as a submission for the [IMAGEination Datapack Jam 2](https://www.planetminecraft.com/jam/imageination-2/) hosted by [Datapack Hub](https://www.planetminecraft.com/group/datapack_hub/) in one week (18th - 25th August 2024).

## Getting Started <a name = "getting_started"></a>

### Namespace

At the top of the page you can set the namespace. The namespace will be used both as a namespace for functions as well as as the name of the data storage (_namespace_:settings). Keep the Minecraft naming conventions in mind.

### Prepend Line Breaks

Right beneath the namespace field, is the prepend line breaks field. Depending on the number x written here, x line breaks will be prepended before the display of the settings. That can be useful, to prevent the user from seeing old messages in chat.

### Adding Elements and using the UI

Add elements by clicking the _+ Element_ button and selecting an element type (see [Elements](#elements)).

You will now see an element appear in the space above.

Delete an element by clicking the red trash can button at the left side of the element. Confirm, that you want to delete the element.

Duplicate an element by clicking the duplication button at the left side of the element. A duplicated element will appear beneath the old element.

Edit an element further by clicking the edit button at the left side of the element. Further settings will appear. Clicking the edit button again will cause the other settings to collapse again.

Change the order of elements by dragging the element with the handle on the left.

To delete all elements click the red _Delete All_ button at the bottom, or reload the page.

### Implementing into your Datapack

If you don't have a datapack already, press the _Download Datapack_ button which will generate a functioning datapack you can built upon.

If you already have a datapack, press the _Download Functions_ button which will only generate the functions you can put into your own datapack. Keep in mind, that you will need to implement logic to run the _namespace_:setup function once and only once (multiple calls of the setup function will reset all settings). See [How to run a function once](https://www.reddit.com/r/technicalminecraft/comments/erckb7/comment/ffqtz2p/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button).

If you now want to execute commands depending on the settings, write a command that usually looks something like the following:

`/execute if data storage <NAMESPACE>:settings {<NBTPath>:true} run <YOUR COMMAND>`

Depending on the elements the way you write this command, will be a little different. See [Elements](#elements)

## Elements <a name = "elements"></a>

MCSettings offers 8 different types of elements for generating your settings menu. Each type has different functionality and should be used for controlling different things. Elements can be added by clicking the blue _+ Element_ button. These 8 types are...

### 1. Text <a name = "text"></a>

Text Elements result in regular Text to be displayed, when the settings are called.

Input the text you want to display in the text field. Change the style of the element, i.e. color, italic, bold, ..., by clicking the edit button at the left of text field.

![Text](https://github.com/user-attachments/assets/f75ed42b-6ebc-4773-b084-8468d5c6176e)

### 2. Toggle <a name = "toggle"></a>

Toggle elements are settings that can be toggled either on or off.

Their default state can be set, by checking or unchecking the box at the top.

They have a different displays for their on and off state. In the text field at the top you can write text that will always be displayed, but changes its style depending on the state of the setting. By clicking the edit button you can edit the prefixes that will be displayed before the regular text depending on the state, and the style of the text (both prefix and text) depending on the state.

Further down you can add children elements (by giving their ids seperated by commas (only commas, no spaces)) that will only be visible, if the toggle is true.

At the bottom, you can also specify a NBTPath. It defaults to the element_id, if omitted.

`/execute if data storage <NAMESPACE>:settings {<NBTPath>:true} run <YOUR COMMAND>`

![Toggle](https://github.com/user-attachments/assets/3d587524-b927-462e-b5b2-d5711bec8c67)

### 3. Input Integer <a name = "int"></a>

Input Integer elements allow the user to input an integer (whole number) within a specified range.

At the top you can set a text and style for the text that will be displayed in front of the current value of the element.

By clicking the _Edit button_ you can set a default value, and a style for the current value. Beneath you can set an accepted range for the integer to be in. (Default: -2147483648..2147483647 (the integer range) Minecraft won't accept values outside this range anyway)

At the bottom, you can also specify a NBTPath. It defaults to the element_id, if omitted.

To retrieve this number for use in your datapack, use [function macros](<https://minecraft.wiki/w/Function_(Java_Edition)#Macros>). A function call with macros may look like this: `/function <YOUR_FUNCTION> with storage <NAMESPACE>:settings <NBTPath>`

In-game, users can change the value by clicking on it, which will result in a command being copied into the their chat window, in which they will have to set the value.

![Integer](https://github.com/user-attachments/assets/81620648-fa45-4908-8f0b-ee6496fb8d29)

### 4. Input Float <a name = "float"></a>

Input Float elements allow the user to input a floating point value (decimal number) for use in your datapack.

At the top, you can set a text and style for the text that will be displayed in front of the current value of the element.

By clicking the _Edit button_ you can set a default value, and a style for the current value.

At the bottom, you can also specify a NBTPath. It defaults to the element_id, if omitted.

To retrieve this number for use in your datapack, use [function macros](<https://minecraft.wiki/w/Function_(Java_Edition)#Macros>). A function call with macros may look like this: `/function <YOUR_FUNCTION> with storage <NAMESPACE>:settings <NBTPath>`

In-game, users can change the value by clicking on it, which will result in a command being copied into the their chat window, in which they will have to set the value.

![Float](https://github.com/user-attachments/assets/b65c163e-3151-469d-a199-1537891c71c3)

### 5. Input String <a name = "string"></a>

Input String elements allow the user to input a string value (text) for use in your datapack.

At the top, you can set a text and style for the text that will be displayed in front of the current value of the element.

By clicking the _Edit button_ you can set a default value, and a style for the current value.

At the bottom, you can also specify a NBTPath. It defaults to the element_id, if omitted.

To retrieve this number for use in your datapack, use [function macros](<https://minecraft.wiki/w/Function_(Java_Edition)#Macros>). A function call with macros may look like this: `/function <YOUR_FUNCTION> with storage <NAMESPACE>:settings <NBTPath>`

In-game, users can change the value by clicking on it, which will result in a command being copied into the their chat window, in which they will have to set the value.

![String](https://github.com/user-attachments/assets/acab0297-18c4-47c5-b035-6ccbdfc00ebd)

### 6. Select <a name = "select"></a>

A Select element allows the user to select one option from a list of given options.

At the top, you can specify a text (and style) that will appear in front of the options.

By clicking the _Edit_ button, you can beneath set the style of unselected options and selected options.

Beneath that, you can specify the option that is activated by default.

Beneath that, you can specify all options, seperated by commas.

To check, if a specific option is activated use the following command: `/execute if data storage <NAMESPACE>:settings {<NBT_PATH>:[{<OPTION_NAME>:true}]} run <YOUR COMMAND>`.

![select_element](https://github.com/user-attachments/assets/c69277d1-cf09-466e-8a14-a3248d2167f8)

### 7. Multi-Select <a name = "multi"></a>

A Multi-Select element works similiar to a select element in that it allows the user to select and unselect options. There is, however, one important distinction between Select and Multi-Select: With Multi-Select multiple options can be selected at a time.

The input fields and data retrieval options are the same as for Select elements. Just note that there can be multiple default values.

### 8. Line Break

Line Break Elements are arguably the most simple element type, as they don't need input for generation. Inserting a line break element results in an empty line to appear in the settings menu.

### WIP: 9. Pages

Once added Pages elements will allow the user to create multiple pages of settings in chat, as to prevent having more settings than the chat can display at once.

## Ingame Usage <a name = "usage"></a>

Display the settings by running the command `/function *namespace*:settings`, where _namespace_ is the _namespace_ value set at the top of the page. (defaults to settings).

To manually reset settings use `/function *namespace*:reset`, for all settings, or `/function *namespace*:reset/element_x` to reset a specific element.

## Save & Restore <a name = "save_and_restore"></a>

If you already generated settings, but need to change some stuff. Click the restore button at the bottom and insert the text of the _MCSettings_restore.txt_ file found inside the function file of your generated zip.

If you began creating settings, but haven't finished yet, click the save button, which will automatically generate and download a _MCSettings_restore.txt_ file for you.
