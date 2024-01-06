// save reference to important DOM elements
var currentDay = $("#currentDay");

// handle displaying the time
function displayTime() {
  var rightNow = dayjs().format("DD MMMM YYYY [at] HH:mm:ss");
  currentDay.text(rightNow);
}

// jQuery code to generate and append the table
$(document).ready(function () {
  // Create column headers
  var tableHeader = $(
    "<thead><tr><th>Time</th><th>Activity</th><th>Add/Save</th></tr></thead>"
  );

  // Create table body
  var tableBody = $("<tbody></tbody>");

  // Generate rows for each hour from 1:00 to 23:00
  for (var i = 0; i <= 23; i++) {
    var time = i + ":00";
    var row = $(
      "<tr>" +
        "<td>" +
        time +
        "</td>" +
        "<td><input type='text' class='activityInput'></td>" +
        "<td><button class='styledButton'>Add/Save</button></td>" +
        "</tr>"
    );
    tableBody.append(row);
  }

  // Create the table and append it to the container
  var timeTable = $("<table></table>").append(tableHeader).append(tableBody);
  $("#tableContainer").append(timeTable);
});

setInterval(displayTime, 1000);
