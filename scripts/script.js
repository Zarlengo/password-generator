document.addEventListener("DOMContentLoaded", function(event) { 
  // Assignment Code
  var generateBtn = document.querySelector("#generate");

  // Write password to the #password input
  function writePassword() {
    let input_options = [];
    input_options.passLength = document.querySelector("#passwordLength").value;
    input_options.upper = document.querySelector("#uppercase").checked;
    input_options.lower = document.querySelector("#lowercase").checked;
    input_options.numbers = document.querySelector("#numbers").checked;
    input_options.special = document.querySelector("#symbols").checked;

    document.querySelector("#password").value = generatePassword(input_options);
  }

  function generatePassword(input_options) {
    let char_options = [];
    let array_count = 0;
    // If the Uppercase checkbox is selected
    if (input_options.upper) {
      let char_array = [];
      for (let i = 65; i <= 89; i++) {
        char_array.push(i);
      }
      char_options.push(char_array);
      array_count++;
    }

    // If the Lowercase checkbox is selected
    if (input_options.lower) {
      char_options.lower = [];
      let char_array = [];
      for (let i = 97; i <= 122; i++) {
        char_array.push(i);
      }
      char_options.push(char_array);
      array_count++;
    }

    // If the Numbers checkbox is selected
    if (input_options.numbers) {
      char_options.numbers = [];
      let char_array = [];
      for (let i = 48; i <= 57; i++) {
        char_array.push(i);
      }
      char_options.push(char_array);
      array_count++;
    }

    // If the Special Characters checkbox is selected
    if (input_options.special) {
      char_options.special = [];
      let char_array = [];
      for (let i = 32; i <= 47; i++) {
        char_array.push(i);
      }
      for (let i = 58; i <= 64; i++) {
        char_array.push(i);
      }
      for (let i = 91; i <= 96; i++) {
        char_array.push(i);
      }
      for (let i = 123; i <= 126; i++) {
        char_array.push(i);
      }
      char_options.push(char_array);
      array_count++;
    }

    // If no checkbox is selected
    if (array_count == 0) {
      return "Not enough options selected"
    }

    // Picks a random array index, and then a random character from that array
    let final_string = "";
    let array_choice = [];
    let array_select = 0;
    let char_select = "";
    for (let i = 0; i < input_options.passLength; i++) {
      array_select = Math.floor(Math.random() * array_count);
      array_choice = char_options[array_select];
      char_select = Math.floor(Math.random() * array_choice.length);
      final_string = final_string.concat(String.fromCharCode(array_choice[char_select]));
    }

    // Returns the string back to the calling function
    return final_string;
  }

  // Function to update the slider when the left or right button is pressed
  function moveSlider(direction) {
    document.querySelector("#passwordLength").value = parseInt(document.querySelector("#passwordLength").value) + direction;
    document.querySelector("#f").innerText = document.querySelector("#passwordLength").value;
  }

  // Updates the length text if the slider is moved
  function updateSlider() {
    document.querySelector("#f").innerText = document.querySelector("#passwordLength").value;
  }

  // Function to copy the password into the clipboard
  function copyPassword() {
    var passwordText = document.querySelector("#password").value;
    // Checks if the password was generated
    if (passwordText != "" && passwordText != "Not enough options selected") {
      var tempElement = document.createElement("textarea");
      document.body.appendChild(tempElement);
      tempElement.value = passwordText;
      tempElement.select();
      document.execCommand("copy");
      document.body.removeChild(tempElement);
      // Shows an overlay to the user that the password was copied, automatically disappears after 1.5 seconds
      document.querySelector(".modal-container").style.display = "flex";
      setTimeout(function() {document.querySelector(".modal-container").style.display = "none";}, 1500);
    }
  }

  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);
  document.getElementById("leftButton").addEventListener("click", function() {moveSlider(-1)});
  document.getElementById("rightButton").addEventListener("click", function() {moveSlider(1)});
  document.getElementById("passwordLength").addEventListener("change", updateSlider);
  document.getElementById("copy2clipboard").addEventListener("click", copyPassword);
});