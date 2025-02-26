// Firebase configuration (Replace with your credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to load the registered teams from Firestore in real time
function loadTeams() {
    let teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear current list

    db.collection("teams").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        teamList.innerHTML = ''; // Clear and refresh list
        snapshot.forEach((doc) => {
            let team = doc.data();
            let newTeam = document.createElement('li');
            newTeam.textContent = `UID: ${team.uid} - ${team.teamName} (Leader: ${team.teamLeader})`;

            // Create delete button (hidden initially)
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.style.display = 'none'; // Hide by default

            deleteButton.addEventListener('click', function () {
                deleteTeam(doc.id); // Delete by Firestore document ID
            });

            newTeam.appendChild(deleteButton);
            teamList.appendChild(newTeam);
        });
    });
}

// Function to delete a specific team from Firestore
function deleteTeam(teamId) {
    db.collection("teams").doc(teamId).delete()
        .then(() => {
            alert("Team deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting team: ", error);
        });
}

// Function to verify the admin and show delete buttons
function verifyAdmin(callback) {
    let password = prompt("Enter Admin Password:");

    // Replace with your actual admin password
    const adminPassword = "20650512";

    if (password === adminPassword) {
        callback(); // Execute callback to show delete buttons
    } else {
        alert("Access Denied! You are not authorized.");
    }
}

// Function to display delete buttons after admin verification
function showDeleteButtons() {
    let teamList = document.getElementById('team-list');
    let deleteButtons = teamList.querySelectorAll('button');

    deleteButtons.forEach(function (button) {
        button.style.display = 'inline-block'; // Show the delete buttons
    });
}

// Handle form submission (Save team to Firestore)
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let teamName = document.getElementById('team-name').value;
    let teamLeader = document.getElementById('team-leader').value;
    let uid = document.getElementById('uid').value;

    if (teamName && teamLeader && uid) {
        db.collection("teams").add({
            teamName: teamName,
            teamLeader: teamLeader,
            uid: uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Team Registered Successfully!");
            document.getElementById('registration-form').reset();
        })
        .catch((error) => {
            console.error("Error adding team: ", error);
        });
    }
});

// Add event listener for "Edit Teams" button (Admin verification required)
document.getElementById('edit-teams-btn').addEventListener('click', function () {
    verifyAdmin(showDeleteButtons); // Verify admin before showing delete buttons
});

// Add event listener for "Clear All Teams" button (Admin required)
document.getElementById('clear-list-btn').addEventListener('click', function () {
    verifyAdmin(clearAllTeams);
});

// Function to clear all teams from Firestore
function clearAllTeams() {
    if (confirm("Are you sure you want to clear all teams?")) {
        db.collection("teams").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            alert("All teams have been cleared.");
        });
    }
}

// Load teams when the page is loaded
window.onload = function () {
    loadTeams();
};
