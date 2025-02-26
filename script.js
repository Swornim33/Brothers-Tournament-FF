// Function to load the registered teams from localStorage
function loadTeams() {
    let teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear the current list
    
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    
    teams.forEach(function(team, index) {
        let newTeam = document.createElement('li');
        newTeam.textContent = `UID: ${team.uid} - ${team.teamName} (Leader: ${team.teamLeader})`;

        teamList.appendChild(newTeam); // Add the team to the list
    });
}

// Function to save the teams to localStorage
function saveTeam(teamName, teamLeader, uid) {
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.push({ teamName, teamLeader, uid });
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Handle form submission on registration page
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let teamName = document.getElementById('team-name').value;
    let teamLeader = document.getElementById('team-leader').value;
    let uid = document.getElementById('uid').value;
    
    if (teamName && teamLeader && uid) {
        saveTeam(teamName, teamLeader, uid);  // Save the new team with UID
        alert('Registration successful!');  // Show success message
        window.location.href = 'result.html';  // Redirect to result page
    } else {
        alert('Please fill all fields before submitting.');
    }
});

// Load teams when the page is loaded
window.onload = function() {
    if (document.getElementById('team-list')) {
        loadTeams(); // Load teams on result page
    }
};
