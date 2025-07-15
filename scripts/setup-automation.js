// Script de configuration automatique
import { AutomationEngine } from "../lib/automation-engine"

async function setupAutomation() {
  console.log("🚀 Configuration du robot d'affiliation...")

  const engine = new AutomationEngine()

  // Démarrer le robot automatiquement
  await engine.start()

  console.log("✅ Robot d'affiliation configuré et démarré !")
  console.log("📊 Tableau de bord disponible sur votre URL Vercel")
  console.log("💰 Alertes de paiement programmées pour chaque vendredi 10h")
}

// Démarrer automatiquement quand l'app est déployée
if (typeof window === "undefined") {
  setupAutomation()
}
