// Leaderboard data
let leaderboard = [];

// Define points per task
const taskPoints = {
  "task1": 1,
  "task2": 2,
  "task3": 3,
};

// Function to add or update an entry
function addEntry() {
  const name = document.getElementById("name").value.trim();
  const task = document.getElementById("task").value;

  if (name && task !== "default") {
    const points = taskPoints[task];

    // Check if the name already exists in the leaderboard
    const existingEntry = leaderboard.find(entry => entry.name === name);

    if (existingEntry) {
      // If the entry exists, add the points to the existing entry
      existingEntry.points += points;
    } else {
      // If the entry doesn't exist, create a new one
      leaderboard.push({ name, points });
    }

    // Sort leaderboard by points in descending order
    leaderboard.sort((a, b) => b.points - a.points);

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("task").value = "default";

    // Update leaderboard
    updateLeaderboard();
  } else {
    alert("Please enter your name and select a task.");
  }
}

// Function to update leaderboard table
function updateLeaderboard() {
  const tbody = document.getElementById("leaderboard").getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";  // Clear existing entries

  let rank = 1; // Starting rank
  let previousPoints = null; // Track points of the last entry

  leaderboard.forEach((entry, index) => {
    // If current entry's points are different from the previous entry's, assign a new rank
    if (entry.points !== previousPoints) {
      rank = index + 1; // Rank is based on position in sorted list
    }

    const row = tbody.insertRow();
    row.insertCell(0).innerText = rank;
    row.insertCell(1).innerText = entry.name;
    row.insertCell(2).innerText = entry.points;

    previousPoints = entry.points; // Update previous points to current points
  });
}
