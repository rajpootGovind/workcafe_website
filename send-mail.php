<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  // Sanitize input
  $name     = trim($_POST['name'] ?? '');
  $email    = trim($_POST['email'] ?? '');
  $phone    = trim($_POST['phone'] ?? '');
  $identity = trim($_POST['identity'] ?? '');
  $message  = trim($_POST['message'] ?? '');

  if (!$name || !$email || !$phone || !$message) {
    exit("Invalid submission.");
  }

  $to = "govindrajpoot1200@gmail.com";
  $subject = "New Inquiry – JOBAAJ Work Café";

  $body = "
New contact form submission:

Name: $name
Email: $email
Phone: $phone
Identity: $identity

Message:
$message
  ";

  $headers  = "From: JOBAAJ Website <no-reply@jobaaj.com>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8";

  if (mail($to, $subject, $body, $headers)) {
    header("Location: thank-you.html");
    exit;
  } else {
    echo "Unable to send message. Please try again later.";
  }
}
