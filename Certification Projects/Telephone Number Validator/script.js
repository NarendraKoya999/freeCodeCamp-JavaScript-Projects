document.getElementById("check-btn").addEventListener("click", function () {
  var userInput = document.getElementById("user-input").value.trim();
  var resultsDiv = document.getElementById("results-div");

  // Clear previous results
  resultsDiv.textContent = "";

  if (userInput === "") {
    alert("Please provide a phone number");
  } else if (isValidUSPhoneNumber(userInput)) {
    resultsDiv.textContent = "Valid US number: " + formatPhoneNumber(userInput);
  } else {
    resultsDiv.textContent = "Invalid US number: " + userInput;
  }
});

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("results-div").textContent = "";
});

function isValidUSPhoneNumber(input) {
  // Regular expression to match valid US phone numbers
  var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?[\s]?\d{3}[-\s]?\d{4}$/;
  return regex.test(input);
}

function formatPhoneNumber(input) {
  // Format phone number to match the pattern: 1 555 555 5555
  var formattedNumber = input.replace(
    /(\d{1})(\d{3})(\d{3})(\d{4})/,
    "$1 $2 $3 $4"
  );
  return formattedNumber;
}
