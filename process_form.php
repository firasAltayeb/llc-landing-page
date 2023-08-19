<?php
$errors = [];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);
    
    // Validate inputs
    if (empty($name)) {
        $errors["name"] = "Name is required.";
    }
    if (empty($email)) {
        $errors["email"] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Invalid email format.";
    }
    if (empty($message)) {
        $errors["message"] = "Message is required.";
    }
    
    if (empty($errors)) {
        $to = "admin@ailearnn.com"; 
        $subject = "Contact Form Submission";
        $emailContent = "Name: $name\nEmail: $email\nMessage: $message";
        $headers = "From: $email";
        
        if (mail($to, $subject, $emailContent, $headers)) {
            echo "Thank you! Your message has been sent.";
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    } else {
        header("HTTP/1.1 422 Unprocessable Entity");
        echo json_encode(["errors" => $errors]);
    }
}
?>
