<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permet à n'importe quelle origine d'accéder à la ressource
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Méthodes autorisées
header('Access-Control-Allow-Headers: Content-Type'); // En-têtes autorisés

$input = json_decode(file_get_contents('php://input'), true);

$nom = $input['nom'] ?? '';
$prenom = $input['prenom'] ?? '';
$email = $input['email'] ?? '';
$telephone = $input['telephone'] ?? '';
$codePostal = $input['codePostal'] ?? '';
$souhait = $input['souhait'] ?? '';
$contact = $input['contact'] ?? false;

$errors = [];

if (empty($nom)) $errors['nom'] = 'Nom est requis';
if (empty($prenom)) $errors['prenom'] = 'Prénom est requis';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email invalide';
if (empty($telephone)) $errors['telephone'] = 'Téléphone est requis';
if (empty($codePostal)) $errors['codePostal'] = 'Code Postal est requis';
if (empty($souhait)) $errors['souhait'] = 'Choisissez une option';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Send email
$to = 'recipient@example.com';
$subject = 'Nouvelle demande de contact';
$message = "Nom: $nom\nPrénom: $prenom\nEmail: $email\nTéléphone: $telephone\nCode Postal: $codePostal\nSouhait: $souhait\nContact: " . ($contact ? 'Oui' : 'Non');
$headers = 'From: webmaster@example.com' . "\r\n" .
           'Reply-To: webmaster@example.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo json_encode(['success' => true]);
?>
