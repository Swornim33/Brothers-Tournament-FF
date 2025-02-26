<?php
// Get form data from the POST request
$team_name = $_POST['team-name'];
$team_leader = $_POST['team-leader'];
$uid = $_POST['uid'];

// Website owner's email address
$to = "swornimsuwal3@gmail.com"; // Replace with the website owner's email address

// Subject of the email
$subject = "New Tournament Registration: $team_name";

// Email message body
$message = "
    <h1>New Tournament Registration</h1>
    <p><strong>Team Name:</strong> $team_name</p>
    <p><strong>Team Leader:</strong> $team_leader</p>
    <p><strong>UID:</strong> $uid</p>
";

// Set content type header for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Additional headers for sending the email
$headers .= "From: no-reply@yourwebsite.com" . "\r\n";  // Replace with your domain's email address

// Send the email
if(mail($to, $subject, $message, $headers)) {
    echo "Thank you for registering! We will contact you soon.";
} else {
    echo "There was an error submitting your registration.";
}
?>
