function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu for manual triggering
  ui.createMenu("Push-Up Tracker")
    .addItem("Run Tracker", "runTrackerManually")
    .addToUi();

  // Run the tracker automatically
  runTrackerManually();
}

function runTrackerManually() {
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActiveSheet();
  var today = new Date(); // Use the actual current date
  Logger.log("Today is: " + today); // Debug log
  Logger.log("Formatted today: " + Utilities.formatDate(today, "America/Denver", "MM-dd-yyyy")); // Debug log
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues(); // Limit range to relevant columns
  
  // Find the most recent training day on or before today
  var lastTrainingRow = -1;
  for (var i = 0; i < data.length; i++) {
    var trainingDate = new Date(data[i][0]);
    // Include dates on or before today
    if (trainingDate <= today) {
      lastTrainingRow = i;
    } else {
      break; // Stop once we pass today
    }
  }

  if (lastTrainingRow === -1) {
    ui.alert("No training data found on or before today.");
    return;
  }

  // Adjust row index for sheet (data array is 0-based, sheet is 1-based, +2 for header)
  lastTrainingRow += 2;

  var lastDate = new Date(data[lastTrainingRow - 2][0]);
  var phase = data[lastTrainingRow - 2][9]; // Column J (PHASE)
  var targetSets = data[lastTrainingRow - 2][2]; // Column C
  var targetReps = data[lastTrainingRow - 2][3]; // Column D
  var totalTarget = data[lastTrainingRow - 2][4]; // Column E
  var completed = data[lastTrainingRow - 2][5]; // Column F

  // First prompt: Did you complete the push-up goal? (Custom Yes/No dialog)
  var message = `Today is ${Utilities.formatDate(today, "America/Denver", "MM-dd-yyyy")}.\n\n` +
                `Your most recent scheduled training was on ${Utilities.formatDate(lastDate, "America/Denver", "MM-dd-yyyy")}:\n` +
                `${targetSets} sets of ${targetReps} reps (${totalTarget} total push-ups).\n` +
                (completed ? `Status: ${completed}\n` : `Status: Not yet marked\n`) +
                `Did you complete the push-up goal, ${targetSets} sets of ${targetReps} reps (${totalTarget} total push-ups)?`;
  
  var html = HtmlService.createHtmlOutputFromFile("YesNoPrompt")
      .setWidth(400)
      .setHeight(200);
  ui.showModalDialog(html.append(`<script>document.getElementById("message").innerText = ${JSON.stringify(message)};</script>`), "Push-Up Tracker");
}

function handleYesNoResponse(response) {
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActiveSheet();
  var today = new Date();
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  var lastTrainingRow = -1;
  for (var i = 0; i < data.length; i++) {
    var trainingDate = new Date(data[i][0]);
    if (trainingDate <= today) {
      lastTrainingRow = i;
    } else {
      break;
    }
  }
  lastTrainingRow += 2;

  var lastDate = new Date(data[lastTrainingRow - 2][0]);
  var phase = data[lastTrainingRow - 2][9];
  var targetSets = data[lastTrainingRow - 2][2];
  var targetReps = data[lastTrainingRow - 2][3];
  var totalTarget = data[lastTrainingRow - 2][4];

  if (response === "Yes") {
    // Second prompt: When did it occur? (Custom dialog for Scheduled/Different)
    var message = `Did this occur on your most recent scheduled training day (${Utilities.formatDate(lastDate, "America/Denver", "MM-dd-yyyy")}) or a different date?`;
    var html = HtmlService.createHtmlOutputFromFile("DateChoicePrompt")
        .setWidth(400)
        .setHeight(200);
    ui.showModalDialog(html.append(`<script>document.getElementById("message").innerText = ${JSON.stringify(message)};</script>`), "Push-Up Tracker");
  } else {
    // Mark as not completed
    sheet.getRange(lastTrainingRow, 6).setValue("N"); // Column F (COMPLETED)
    ui.alert("Okay, marked as not completed.");
  }
}

function handleDateChoice(response) {
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActiveSheet();
  var today = new Date();
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  var lastTrainingRow = -1;
  for (var i = 0; i < data.length; i++) {
    var trainingDate = new Date(data[i][0]);
    if (trainingDate <= today) {
      lastTrainingRow = i;
    } else {
      break;
    }
  }
  lastTrainingRow += 2;

  var lastDate = new Date(data[lastTrainingRow - 2][0]);
  var totalTarget = data[lastTrainingRow - 2][4];
  var phase = data[lastTrainingRow - 2][9];

  var selectedDate;
  if (response === "Scheduled") {
    // Use the scheduled date
    selectedDate = lastDate;
    sheet.getRange(lastTrainingRow, 6).setValue("Y"); // Column F (COMPLETED)

    // Ask how many push-ups were completed
    var pushUpsDone = ui.prompt(
      "Push-Up Tracker",
      `How many push-ups out of ${totalTarget} did you complete on ${Utilities.formatDate(selectedDate, "America/Denver", "MM-dd-yyyy")}?`,
      ui.ButtonSet.OK_CANCEL
    ).getResponseText();

    var actualPushUps = parseInt(pushUpsDone) || totalTarget;

    // Update phase progress
    var phaseData = getPhaseProgress(sheet, phase);
    updatePhaseSummary(sheet, phase, phaseData);

    // Show current phase progress
    ui.alert(
      "Progress Update",
      `In Phase ${phase}:\n` +
      `Completed so far: ${phaseData.completedThusFar} push-ups\n` +
      `Total Goal: ${phaseData.totalGoal} push-ups\n` +
      `Left Remaining: ${phaseData.leftRemaining} push-ups`,
      ui.ButtonSet.OK
    );

    // Show final summary with percentages
    var phasePercentage = (phaseData.completedThusFar / phaseData.totalGoal * 100).toFixed(2);
    var overallData = getOverallProgress(sheet);
    var overallPercentage = (overallData.totalCompleted / overallData.totalGoal * 100).toFixed(2);

    ui.alert(
      "Final Summary",
      `Current Phase: ${phase}\n` +
      `Phase Completion: ${phasePercentage}%\n` +
      `Overall Completion: ${overallPercentage}% (${overallData.totalCompleted} out of ${overallData.totalGoal} push-ups)`,
      ui.ButtonSet.OK
    );
  } else if (response === "Different") {
    // Show date picker dialog for a different date
    var html = HtmlService.createHtmlOutputFromFile("DatePicker")
        .setWidth(300)
        .setHeight(200);
    ui.showModalDialog(html, "Push-Up Tracker");
  }
}

function processDate(date) {
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActiveSheet();
  var today = new Date();
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  var lastTrainingRow = -1;
  for (var i = 0; i < data.length; i++) {
    var trainingDate = new Date(data[i][0]);
    if (trainingDate <= today) {
      lastTrainingRow = i;
    } else {
      break;
    }
  }
  lastTrainingRow += 2;

  var totalTarget = data[lastTrainingRow - 2][4];
  var phase = data[lastTrainingRow - 2][9];

  if (date) {
    // Parse YYYY-MM-DD from date picker and update Column A
    var newDate = new Date(date);
    Logger.log("Selected date from picker: " + date);
    Logger.log("Parsed date: " + newDate.toISOString());
    Logger.log("Writing to row: " + lastTrainingRow + ", column A");

    // Set the date in Column A and ensure the format
    sheet.getRange(lastTrainingRow, 1).setValue(newDate);
    sheet.getRange(lastTrainingRow, 1).setNumberFormat("mm-dd-yyyy");

    // Verify the update
    var updatedDate = sheet.getRange(lastTrainingRow, 1).getValue();
    Logger.log("Updated date in sheet: " + updatedDate);

    sheet.getRange(lastTrainingRow, 6).setValue("Y"); // Column F (COMPLETED)

    // Ask how many push-ups were completed
    var pushUpsDone = ui.prompt(
      "Push-Up Tracker",
      `How many push-ups out of ${totalTarget} did you complete on ${Utilities.formatDate(newDate, "America/Denver", "MM-dd-yyyy")}?`,
      ui.ButtonSet.OK_CANCEL
    ).getResponseText();

    var actualPushUps = parseInt(pushUpsDone) || totalTarget;

    // Update phase progress
    var phaseData = getPhaseProgress(sheet, phase);
    updatePhaseSummary(sheet, phase, phaseData);

    // Show current phase progress
    ui.alert(
      "Progress Update",
      `In Phase ${phase}:\n` +
      `Completed so far: ${phaseData.completedThusFar} push-ups\n` +
      `Total Goal: ${phaseData.totalGoal} push-ups\n` +
      `Left Remaining: ${phaseData.leftRemaining} push-ups`,
      ui.ButtonSet.OK
    );

    // Show final summary with percentages
    var phasePercentage = (phaseData.completedThusFar / phaseData.totalGoal * 100).toFixed(2);
    var overallData = getOverallProgress(sheet);
    var overallPercentage = (overallData.totalCompleted / overallData.totalGoal * 100).toFixed(2);

    ui.alert(
      "Final Summary",
      `Current Phase: ${phase}\n` +
      `Phase Completion: ${phasePercentage}%\n` +
      `Overall Completion: ${overallPercentage}% (${overallData.totalCompleted} out of ${overallData.totalGoal} push-ups)`,
      ui.ButtonSet.OK
    );
  } else {
    // If no date selected, mark as not completed
    sheet.getRange(lastTrainingRow, 6).setValue("N");
    ui.alert("Okay, marked as not completed.");
  }
}

function getPhaseProgress(sheet, phase) {
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  var completedThusFar = 0;
  var totalGoal = 0;

  for (var i = 0; i < data.length; i++) {
    if (data[i][9] == phase) { // Match phase in Column J
      totalGoal += data[i][4]; // Sum Total Target Push-ups (Column E)
      if (data[i][5] == "Y") { // Check COMPLETED (Column F)
        completedThusFar += data[i][4]; // Add to completed if "Y"
      }
    }
  }

  return {
    completedThusFar: completedThusFar,
    totalGoal: totalGoal,
    leftRemaining: totalGoal - completedThusFar
  };
}

function getOverallProgress(sheet) {
  var totalCompleted = sheet.getRange("G114").getValue(); // Subtotal from G114
  var totalGoal = sheet.getRange("H116").getValue(); // Total goal from H116 (24621)

  return {
    totalCompleted: totalCompleted,
    totalGoal: totalGoal
  };
}

function updatePhaseSummary(sheet, phase, phaseData) {
  var data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][9] == phase && data[i][7] !== "" && !isNaN(data[i][7])) { // Check for TOTAL GOAL cell
      sheet.getRange(i + 2, 7).setValue(phaseData.completedThusFar); // Column G
      sheet.getRange(i + 2, 8).setValue(phaseData.totalGoal);       // Column H
      sheet.getRange(i + 2, 9).setValue(phaseData.leftRemaining);   // Column I
      break;
    }
  }
}

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const editedCell = e.range;

  // Check if the edit was in Column A (1) and on or after Row 3
  if (editedCell.getColumn() === 1 && editedCell.getRow() >= 3) {
    const startRow = editedCell.getRow();
    const newStartDate = editedCell.getValue();

    if (!(newStartDate instanceof Date)) {
      SpreadsheetApp.getUi().alert("Please enter a valid date.");
      return;
    }

    const lastRow = sheet.getLastRow();
    let date = new Date(newStartDate);

    for (let row = startRow + 1; row <= lastRow; row++) {
      date.setDate(date.getDate() + 2);  // every other day
      sheet.getRange(row, 1).setValue(new Date(date));
      sheet.getRange(row, 1).setNumberFormat("mm-dd-yyyy");
    }

    SpreadsheetApp.getUi().alert(`Dates updated from row ${startRow + 1} onward.`);
  }
}
