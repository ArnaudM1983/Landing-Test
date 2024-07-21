<?php
// Définit le type de contenu de la réponse comme JSON
header('Content-Type: application/json');
// Permet à n'importe quelle origine d'accéder à la ressource
header('Access-Control-Allow-Origin: *');
// Définit les méthodes HTTP autorisées pour cette ressource
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// Définit les en-têtes autorisés pour les requêtes CORS
header('Access-Control-Allow-Headers: Content-Type');

// Récupère les données JSON envoyées dans le corps de la requête
$input = json_decode(file_get_contents('php://input'), true);

// Assigne les données des champs du formulaire, avec des valeurs par défaut si non définies
$nom = $input['nom'] ?? '';
$prenom = $input['prenom'] ?? '';
$email = $input['email'] ?? '';
$telephone = $input['telephone'] ?? '';
$codePostal = $input['codePostal'] ?? '';
$souhait = $input['souhait'] ?? '';
$contact = $input['contact'] ?? false;

// Tableau pour stocker les erreurs de validation
$errors = [];

// Validation des champs du formulaire
if (empty($nom)) $errors['nom'] = 'Nom est requis';
if (empty($prenom)) $errors['prenom'] = 'Prénom est requis';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email invalide';
if (empty($telephone)) $errors['telephone'] = 'Téléphone est requis';
if (empty($codePostal)) $errors['codePostal'] = 'Code Postal est requis';
if (empty($souhait)) $errors['souhait'] = 'Choisissez une option';

// Si des erreurs sont trouvées, renvoie une réponse JSON avec les erreurs
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit; // Termine l'exécution du script
}

// Prépare les données pour l'envoi par email
$to = 'recipient@example.com'; // Adresse email du destinataire
$subject = 'Nouvelle demande de contact'; // Sujet de l'email
$message = "Nom: $nom\nPrénom: $prenom\nEmail: $email\nTéléphone: $telephone\nCode Postal: $codePostal\nSouhait: $souhait\nContact: " . ($contact ? 'Oui' : 'Non'); // Corps du message contenant les valeurs du formulaire
$headers = 'From: webmaster@example.com' . "\r\n" . // Adresse email de l'expéditeur
           'Reply-To: webmaster@example.com' . "\r\n" . // Adresse email pour les réponses
           'X-Mailer: PHP/' . phpversion(); // Information sur le mailer utilisé

// Envoie l'email
mail($to, $subject, $message, $headers);

// Renvoie une réponse JSON indiquant le succès de l'opération
echo json_encode(['success' => true]);
?>
