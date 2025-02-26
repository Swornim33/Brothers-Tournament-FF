document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let teamName = document.getElementById('team-name').value;
    let teamLeader = document.getElementById('team-leader').value;
    
    if (teamName && teamLeader) {
        let teamList = document.getElementById('team-list');
        let newTeam = document.createElement('li');
        newTeam.textContent = teamName + " (Leader: " + teamLeader + ")";
        teamList.appendChild(newTeam);
        
        document.getElementById('team-name').value = '';
        document.getElementById('team-leader').value = '';
        alert("Team Registered Successfully!");
    }
});

     // Function to load the registered teams from localStorage
     function loadTeams() {
        let teamList = document.getElementById('team-list');
        teamList.innerHTML = ''; // Clear the current list
        
        let teams = JSON.parse(localStorage.getItem('teams')) || [];
        
        teams.forEach(function(team) {
            let newTeam = document.createElement('li');
            newTeam.textContent = `UID: ${team.uid} - ${team.teamName} (Leader: ${team.teamLeader})`;
            teamList.appendChild(newTeam);
        });
    }

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

    // Function to verify the owner and display the clear button
    function verifyOwner() {
        let password = prompt("Enter Owner Password:");

        // Replace with your actual owner password
        const ownerPassword = "20650512";

        if (password === ownerPassword) {
            document.getElementById('clear-list-btn').style.display = 'inline-block'; // Show the clear button
        } else {
            alert("Access Denied! You are not authorized.");
        }
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

    // Add event listener for "Edit Teams" button
    document.getElementById('edit-teams-btn').addEventListener('click', function() {
        verifyOwner(); // Verify owner to allow editing
    });

    // Add event listener for "Clear All Teams" button
    document.getElementById('clear-list-btn').addEventListener('click', function() {
        if (confirm("Are you sure you want to clear all teams?")) {
            clearTeamList(); // Clear all teams
            alert("All teams have been cleared.");
        }
    });

    // Load teams when the page is loaded
    window.onload = function() {
        loadTeams();
    };

