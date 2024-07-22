# Landing Page Coeur des Ecrins

## Description

Cette application est une landing page développée en React pour la promotion d'appartements neufs à Monêtier-les-Bains. Le formulaire de contact valide les champs obligatoires et envoie un email avec les informations soumises.

## Installation

### Prérequis

- Node.js
- npm (ou yarn)
- Un serveur PHP pour traiter les données du formulaire

### Étapes

1. Clonez ce dépôt :
    ```sh
    git clone https://github.com/ArnaudM1983/Landing-Test.git
    ```

2. Accédez au répertoire du projet :
    ```sh
    cd Landing-Test
    ```

3. Installez les dépendances :
    ```sh
    npm install
    ```

## Utilisation

### En local

1. Démarrez l'application React :
    ```sh
    npm run dev
    ```

2. Assurez-vous que votre serveur PHP est configuré et accessible à `http://localhost:8888/landing-test/submit_form.php`. Vous pouvez utiliser un serveur comme XAMPP, WAMP ou MAMP.

3. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Validation et Envoi du Formulaire

- La validation des champs obligatoires est effectuée en JavaScript côté client.
- Après soumission, les données sont envoyées via une requête AJAX au script PHP `submit_form.php` qui envoie un email avec les informations du formulaire.
- Un message de confirmation ou d'erreur est affiché à l'utilisateur en fonction de la réponse du serveur.

## Structure du Projet

- `src/`: Contient le code source React.
  - `App.jsx`: Composant principal de l'application.
  - `index.jsx`: Point d'entrée de l'application React.
- `submit_form.php`: Script PHP pour traiter et envoyer les données du formulaire.

