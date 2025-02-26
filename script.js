// Function to load the registered teams from localStorage
function loadTeams() {
    let teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear the current list
    
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    
    teams.forEach(function(team, index) {
        let newTeam = document.createElement('li');
        newTeam.textContent = `UID: ${team.uid} - ${team.teamName} (Leader: ${team.teamLeader})`;

        // Create the delete button, but it will only be shown if admin is verified
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.display = 'none'; // Hide the delete button initially

        deleteButton.addEventListener('click', function() {
            deleteTeam(index);  // Pass the index of the team to delete
        });

        newTeam.appendChild(deleteButton);
        teamList.appendChild(newTeam);
    });
}

// Function to delete a specific team from localStorage
function deleteTeam(index) {
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.splice(index, 1);  // Remove the team at the specified index
    localStorage.setItem('teams', JSON.stringify(teams));
    loadTeams();  // Reload the team list after deletion
}

// Function to verify the admin and show delete buttons
function verifyAdmin(callback) {
    let password = prompt("Enter Admin Password:");

    // Replace with your actual admin password
    const adminPassword = "20650512";

    if (password === adminPassword) {
        callback();  // Execute the callback function to show the delete buttons
    } else {
        alert("Access Denied! You are not authorized.");
    }
}

// Function to display the delete buttons after verifying the admin
function showDeleteButtons() {
    let teamList = document.getElementById('team-list');
    let deleteButtons = teamList.querySelectorAll('button');

    deleteButtons.forEach(function(button) {
        button.style.display = 'inline-block'; // Show the delete buttons
    });
}

// Add event listener for "Edit Teams" button
document.getElementById('edit-teams-btn').addEventListener('click', function() {
    verifyAdmin(showDeleteButtons); // Verify admin before showing delete buttons
});

// Add event listener for "Clear All Teams" button
document.getElementById('clear-list-btn').addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all teams?")) {
        clearTeamList(); // Clear all teams
        alert("All teams have been cleared.");
    }
});

// Function to save the teams to localStorage
function saveTeam(teamName, teamLeader, uid) {
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.push({ teamName, teamLeader, uid });
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Function to clear all teams from localStorage and update the list
function clearTeamList() {
    localStorage.removeItem('teams');
    loadTeams(); // Reload the list after clearing
}

// Handle form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let teamName = document.getElementById('team-name').value;
    let teamLeader = document.getElementById('team-leader').value;
    let uid = document.getElementById('uid').value;
    
    if (teamName && teamLeader && uid) {
        saveTeam(teamName, teamLeader, uid);  // Save the new team with UID
        loadTeams();  // Reload the list of teams
        
        document.getElementById('team-name').value = '';
        document.getElementById('team-leader').value = '';
        document.getElementById('uid').value = '';
        alert("Team Registered Successfully!");
    }
});

// Load teams when the page is loaded
window.onload = function() {
    loadTeams();
};
