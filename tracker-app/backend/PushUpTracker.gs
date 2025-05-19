function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index");
}

function getLatestTrainingData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const today = new Date();
  const data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();

  let lastTrainingRow = -1;
  for (let i = 0; i < data.length; i++) {
    const trainingDate = new Date(data[i][0]);
    if (trainingDate <= today) lastTrainingRow = i;
    else break;
  }

  if (lastTrainingRow === -1) return { status: "no_data" };

  const row = data[lastTrainingRow];
  return {
    date: Utilities.formatDate(new Date(row[0]), "America/Denver", "MM-dd-yyyy"),
    sets: row[2],
    reps: row[3],
    total: row[4],
    completed: row[5] || "Not yet marked",
    phase: row[9],
    rowIndex: lastTrainingRow + 2
  };
}

function recordCompletion(rowIndex, pushups, date, completed) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dateObj = new Date(date);
  sheet.getRange(rowIndex, 1).setValue(dateObj);
  sheet.getRange(rowIndex, 1).setNumberFormat("mm-dd-yyyy");
  sheet.getRange(rowIndex, 6).setValue(completed ? "Y" : "N");

  const phase = sheet.getRange(rowIndex, 10).getValue();
  const phaseData = getPhaseProgress(sheet, phase);
  updatePhaseSummary(sheet, phase, phaseData);
  const overallData = getOverallProgress(sheet);

  return {
    phaseProgress: {
      completed: phaseData.completedThusFar,
      goal: phaseData.totalGoal,
      left: phaseData.leftRemaining,
      percent: ((phaseData.completedThusFar / phaseData.totalGoal) * 100).toFixed(2)
    },
    overallProgress: {
      completed: overallData.totalCompleted,
      goal: overallData.totalGoal,
      percent: ((overallData.totalCompleted / overallData.totalGoal) * 100).toFixed(2)
    },
    date: date,
    streakCount: calculateStreak(sheet)
  };
}

function getPhaseProgress(sheet, phase) {
  const data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  let completedThusFar = 0;
  let totalGoal = 0;

  data.forEach(row => {
    if (row[9] == phase) {
      totalGoal += row[4];
      if (row[5] == "Y") completedThusFar += row[4];
    }
  });

  return { completedThusFar, totalGoal, leftRemaining: totalGoal - completedThusFar };
}

function getOverallProgress(sheet) {
  return {
    totalCompleted: sheet.getRange("G114").getValue(),
    totalGoal: sheet.getRange("H116").getValue()
  };
}

function updatePhaseSummary(sheet, phase, phaseData) {
  const data = sheet.getRange("A2:J" + sheet.getLastRow()).getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][9] === phase && data[i][7] !== "" && !isNaN(data[i][7])) {
      sheet.getRange(i + 2, 7).setValue(phaseData.completedThusFar);
      sheet.getRange(i + 2, 8).setValue(phaseData.totalGoal);
      sheet.getRange(i + 2, 9).setValue(phaseData.leftRemaining);
      break;
    }
  }
}

function calculateStreak(sheet) {
  const data = sheet.getRange("A2:F" + sheet.getLastRow()).getValues();
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][5] === "Y") {
      streak++;
    } else if (data[i][5] === "N" || data[i][5] === "") {
      break;
    }
  }
  return streak;
}

function getRecentPushupData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getRange("A2:F" + sheet.getLastRow()).getValues();

  let recent = [];

  for (let i = data.length - 1; i >= 0 && recent.length < 7; i--) {
    if (data[i][5] === "Y") {
      recent.unshift({
        date: Utilities.formatDate(new Date(data[i][0]), "America/Denver", "MM-dd"),
        total: data[i][4]
      });
    }
  }

  return recent;
}