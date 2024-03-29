// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the input, button, and output elements
  var numberInput = document.getElementById("number");
  var convertButton = document.getElementById("convert-btn");
  var outputDiv = document.getElementById("output");

  // Add click event listener to the convert button
  convertButton.addEventListener("click", function () {
    var number = parseInt(numberInput.value);

    // Check if the input is empty or not a number
    if (isNaN(number)) {
      outputDiv.textContent = "Please enter a valid number";
      return;
    }

    // Check if the input is less than 1
    if (number < 1) {
      outputDiv.textContent =
        "Please enter a number greater than or equal to 1";
      return;
    }

    // Check if the input is greater than or equal to 4000
    if (number >= 4000) {
      outputDiv.textContent =
        "Please enter a number less than or equal to 3999";
      return;
    }

    // Function to convert decimal to Roman numeral
    function toRoman(num) {
      var roman = "";
      var romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      };
      for (var key in romanNumerals) {
        while (num >= romanNumerals[key]) {
          roman += key;
          num -= romanNumerals[key];
        }
      }
      return roman;
    }

    // Convert the number to Roman numeral and display the output
    outputDiv.textContent = toRoman(number);
  });
});
