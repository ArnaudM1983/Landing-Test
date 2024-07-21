import React, { useState } from "react";

function App() {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    codePostal: "",
    souhait: "",
    contact: false,
  });

  // État pour stocker les erreurs de validation
  const [errors, setErrors] = useState({});
  // État pour stocker les messages de confirmation ou d'erreur
  const [message, setMessage] = useState("");

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fonction pour valider les données du formulaire
  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom est requis";
    if (!formData.prenom) newErrors.prenom = "Prénom est requis";
    if (!formData.email) newErrors.email = "Email est requis";
    if (!formData.telephone) newErrors.telephone = "Téléphone est requis";
    if (!formData.codePostal) newErrors.codePostal = "Code Postal est requis";
    if (!formData.souhait) newErrors.souhait = "Choisissez une option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur n'est trouvée
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Valide les données avant l'envoi
    if (!validate()) return;

    try {
      // Envoie des données au serveur
      const response = await fetch("http://localhost:8888/landing-test/submit_form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        // Affiche un message de succès et réinitialise le formulaire
        alert("Votre demande a été envoyée avec succès !");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          codePostal: "",
          souhait: "",
          contact: false,
        });
        setErrors({});
      } else {
        // Affiche un message d'erreur
        setMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      // Affiche un message d'erreur en cas d'exception
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="landing-page">
      {/* En-tête du site */}
      <header>
        <div className="header-left">
          <img src="images/Logo Coeur des Çcrins.svg" alt="Logo Cœur des Écrins" />
        </div>
        <div className="header-center">
          <h1>
            NOUVEAU À MONÊTIER-LES-BAINS <br />
            <span className="subtitle">
              APPARTEMENTS NEUFS DU 2 AU 4 PIÈCES DUPLEX
            </span>
          </h1>
        </div>
        <div className="header-right">
          <img src="images/logo-sully.svg" alt="Logo Sully Immobilier" />
        </div>
      </header>

      {/* Contenu principal */}
      <div className="content">
        <div className="left-side">
          <div className="wrapper">
            <div className="image-container">
              <p>IDÉAL POUR INVESTIR OU HABITER AU PIED DES PISTES</p>
              <img src="images/2021-01-08-chalets-monetier-sans-logo.jpg" alt="" />
            </div>
            <div className="text">
              <div className="description">
                <h2>
                  UNE ADRESSE MONTAGNARDE MODERNE DANS UN VILLAGE AUTHENTIQUE
                  <span> AU COEUR DES HAUTES-ALPES</span>
                </h2>
                <ul>
                  <li>
                    Généreux balcons et terrasses offrant des <strong>vues exceptionnelles sur
                      le massif des Écrins</strong>
                  </li>
                  <li>
                    <strong>Commerces et services de proximité</strong> dans un rayon de 10 min* à pied
                  </li>
                  <li>
                    Espaces végétalisés communs et <strong>prestations de qualité pour un
                      confort au quotidien</strong>
                  </li>
                  <li>
                    Navette au pied de la résidence pour rejoindre la Vallée de
                    Briançon et <strong>Serre Chevalier</strong>
                  </li>
                  <li>
                    Résidence aux portes de la frontière italienne, moins de 30 km* et
                    <strong> gare SNCF de Briançon à 20 min* en voiture</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          {/* Formulaire de contact */}
          <div className="contact-form">
            <h2>CONTACTEZ-NOUS DÈS MAINTENANT !</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  placeholder="Nom*"
                  value={formData.nom}
                  onChange={handleChange}
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  required
                  placeholder="Prénom*"
                  value={formData.prenom}
                  onChange={handleChange}
                />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  required
                  placeholder="Téléphone*"
                  value={formData.telephone}
                  onChange={handleChange}
                />
                {errors.telephone && <span className="error">{errors.telephone}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="codePostal"
                  name="codePostal"
                  required
                  placeholder="Code Postal*"
                  value={formData.codePostal}
                  onChange={handleChange}
                />
                {errors.codePostal && <span className="error">{errors.codePostal}</span>}
              </div>
              <div className="form-group wish">
                <label>Vous souhaitez*</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="souhait"
                      value="habiter"
                      required
                      checked={formData.souhait === "habiter"}
                      onChange={handleChange}
                    />
                    Habiter
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="souhait"
                      value="investir"
                      required
                      checked={formData.souhait === "investir"}
                      onChange={handleChange}
                    />
                    Investir
                  </label>
                </div>
                {errors.souhait && <span className="error">{errors.souhait}</span>}
              </div>
              <div className="form-group">
                <p className="consent-text">Gardons le contact !</p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="contact"
                    checked={formData.contact}
                    onChange={handleChange}
                  />
                  J’autorise Sully Immobilier à traiter mes données personnelles dans
                  le cadre de ma demande d’information, et de la relation commerciale
                  qui pourrait en découler. J’ai cependant la possibilité de retirer à
                  tout moment mon consentement dans la base Sully Immobilier.
                </label>
              </div>
              <button type="submit">ENVOYER MA DEMANDE</button>
            </form>
            <img src="images/logo-sully.svg" alt="" />
            <p className="footer-text">
              *Source Google Maps - Mentions légales - Politique de Confidentialité -
              Conception : Adjectif
            </p>
          </div>
          {/* Message de confirmation ou d'erreur */}
          {message && <p className="confirmation-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
