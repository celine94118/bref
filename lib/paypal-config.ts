// lib/paypal-config.ts (Ce fichier est utilisé côté serveur pour les API routes)

// Produits avec prix réels
export const PRODUCTS = [
  {
    id: "guide-argent-ligne",
    name: "Guide Complet : Gagner de l'Argent en Ligne",
    price: 29.0,
    description: "Méthodes éprouvées pour générer des revenus passifs",
    downloadUrl: "/downloads/guide-argent-ligne.pdf",
  },
  {
    id: "formation-affiliation",
    name: "Formation Marketing d'Affiliation",
    price: 47.0,
    description: "Stratégies avancées pour maximiser vos commissions",
    downloadUrl: "/downloads/formation-affiliation.pdf",
  },
  {
    id: "templates-reseaux-sociaux",
    name: "Pack 100 Templates Réseaux Sociaux",
    price: 19.0,
    description: "Templates prêts à utiliser pour Instagram, Facebook, TikTok",
    downloadUrl: "/downloads/templates-pack.zip",
  },
  {
    id: "strategie-trafic",
    name: "Stratégie Trafic Gratuit 2024",
    price: 37.0,
    description: "Comment générer 10k visiteurs/mois sans publicité",
    downloadUrl: "/downloads/strategie-trafic.pdf",
  },
  {
    id: "business-automatise",
    name: "Business 100% Automatisé",
    price: 67.0,
    description: "Système complet pour créer un business passif",
    downloadUrl: "/downloads/business-automatise.pdf",
  },
]

// Fonction pour obtenir la configuration PayPal (utilisée côté serveur)
export const getPaypalConfig = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox" // 'sandbox' ou 'production'

  if (!clientId || !clientSecret) {
    console.error(
      "PayPal API keys are not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables.",
    )
    // En production, vous voudriez peut-être lancer une erreur ou rediriger
  }

  const baseUrl = environment === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

  return {
    clientId,
    clientSecret,
    baseUrl,
    recipientEmail: "celinevalente.pro@gmail.com", // Votre email PayPal pour recevoir les paiements
    currency: "EUR",
  }
}
