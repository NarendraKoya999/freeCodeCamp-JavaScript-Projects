document.getElementById("check-btn").addEventListener("click", function () {
  var inputText = document
    .getElementById("text-input")
    .value.trim()
    .toLowerCase();
  var resultElement = document.getElementById("result");

  if (inputText === "") {
    alert("Please input a value");
    return;
  }

  // Remove non-alphanumeric characters and spaces from inputText
  var cleanedInput = inputText.replace(/[^a-z0-9]/g, "");

  // Check if the cleaned input is a palindrome
  var reversedText = cleanedInput.split("").reverse().join("");

  if (cleanedInput === reversedText) {
    resultElement.textContent = inputText + " is a palindrome";
  } else {
    resultElement.textContent = inputText + " is not a palindrome";
  }
});
