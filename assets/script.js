// Save reference to important DOM elements
var currentDay = $("#currentDay");
var now = new Date().getHours();

// Save data
var storedData = localStorage.getItem("activityInput");

// handle displaying the time
function displayTime() {
  var rightNow = dayjs().format("DD MMMM YYYY [at] HH:mm:ss");
  currentDay.text(rightNow);
}

// jQuery code to generate and append the table
$(document).ready(function () {
  // Create column headers
  var tableHeader = $(
    "<thead><tr><th>Time</th><th>Activity</th><th>Add/Save</th><th>Delete</th></tr></thead>"
  );

  // Create table body
  var tableBody = $("<tbody></tbody>");

  // Generate rows for each hour from 0:00 to 23:00
  for (var i = 0; i <= 23; i++) {
    var time = i + ":00";

    // Create row with input and buttons

    var row = $(
      "<tr>" +
        "<td>" +
        time +
        "</td>" +
        "<td><input type='text' class='activityInput' data-hour='" +
        i +
        "'></td>" +
        "<td><button class='styledButton addSaveButton'>Add/Save</button></td>" +
        "<td><button class='styledButton deleteButton'>Delete</button></td>" +
        "</tr>"
    );

    // Set the input value if there is stored data for this hour
    if (storedData) {
      var storedHourData = JSON.parse(storedData);
      if (storedHourData[i]) {
        row.find(".activityInput").val(storedHourData[i]);
      }
    }

    // Add the row to the table body
    tableBody.append(row);
  }

  // Create the table and append it to the container
  var timeTable = $("<table></table>").append(tableHeader).append(tableBody);
  $("#tableContainer").append(timeTable);

  // Save data when the "Add/Save" button is clicked
  $(".addSaveButton").on("click", function () {
    var inputField = $(this).closest("tr").find(".activityInput");
    var hour = inputField.data("hour");
    var inputValue = inputField.val();

    // Retrieve existing stored data or create an empty object
    var existingData = JSON.parse(localStorage.getItem("activityInput")) || {};

    // Update the data for the current hour
    existingData[hour] = inputValue;

    // Save the updated data back to local storage
    localStorage.setItem("activityInput", JSON.stringify(existingData));

    alert("Data saved successfully!");
  });

  // Delete data when the "Delete" button is clicked
  $(".deleteButton").on("click", function () {
    var inputField = $(this).closest("tr").find(".activityInput");
    var hour = inputField.data("hour");

    // Retrieve existing stored data
    var existingData = JSON.parse(localStorage.getItem("activityInput"));

    // Remove the data for the current hour
    if (existingData && existingData.hasOwnProperty(hour)) {
      delete existingData[hour];
      // Save the updated data back to local storage
      localStorage.setItem("activityInput", JSON.stringify(existingData));

      // Clear the input field value
      inputField.val("");

      alert("Data deleted successfully!");
    } else {
      alert("No data found to delete.");
    }
  });
});

setInterval(displayTime, 1000);
