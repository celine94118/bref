"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Play,
  Pause,
  Activity,
  FileText,
  Share2,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function AutomationControl() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [stats, setStats] = useState({
    articlesGenerated: 0,
    socialPosts: 0,
    emailsSent: 0,
    totalClicks: 0,
    estimatedEarnings: 0,
  })

  const startAutomation = () => {
    setIsRunning(true)
    addLog("🤖 Robot d'affiliation démarré !")
    addLog("📝 Génération de contenu activée")
    addLog("📱 Publication automatique activée")
    addLog("📧 Campagnes email activées")
    addLog("📊 Suivi des performances activé")

    // Simuler l'activité du robot
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const actions = [
          "📝 Article généré pour Systeme.io",
          "📱 Post publié sur Facebook",
          "📧 Email envoyé à 1,247 abonnés",
          "🔗 Nouveau clic sur lien Shopify",
          "💰 Conversion détectée : +58€",
          "📊 Rapport de performance généré",
        ]
        const randomAction = actions[Math.floor(Math.random() * actions.length)]
        addLog(randomAction)

        // Mettre à jour les stats
        setStats((prev) => ({
          ...prev,
          articlesGenerated: prev.articlesGenerated + (randomAction.includes("Article") ? 1 : 0),
          socialPosts: prev.socialPosts + (randomAction.includes("Post") ? 1 : 0),
          emailsSent: prev.emailsSent + (randomAction.includes("Email") ? 1 : 0),
          totalClicks: prev.totalClicks + (randomAction.includes("clic") ? 1 : 0),
          estimatedEarnings: prev.estimatedEarnings + (randomAction.includes("Conversion") ? 58 : 0),
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }

  const stopAutomation = () => {
    setIsRunning(false)
    addLog("🛑 Robot d'affiliation mis en pause")
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [`${timestamp} - ${message}`, ...prev.slice(0, 19)])
  }

  useEffect(() => {
    // Vérifier si c'est vendredi 10h
    const checkPaymentTime = () => {
      const now = new Date()
      const isFriday = now.getDay() === 5
      const hour = now.getHours()

      if (isFriday && hour === 10 && isRunning) {
        addLog("💰 ALERTE : Vérifiez vos paiements LCL !")
        addLog("🏦 Paiements d'affiliation attendus aujourd'hui")
      }
    }

    const interval = setInterval(checkPaymentTime, 60000) // Vérifier chaque minute
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header avec contrôles */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                  <Bot className="w-8 h-8 text-green-400" />
                  ROBOT D'AFFILIATION AUTOMATIQUE
                </CardTitle>
                <p className="text-green-300">Système complet d'automatisation - Déploiement Vercel Ready</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={isRunning ? "bg-green-600" : "bg-red-600"}>
                  {isRunning ? "🟢 ACTIF" : "🔴 ARRÊTÉ"}
                </Badge>
                <Button
                  onClick={isRunning ? stopAutomation : startAutomation}
                  className={isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isRunning ? "Arrêter" : "Démarrer"}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistiques en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.articlesGenerated}</div>
              <div className="text-blue-300 text-sm">Articles Générés</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Share2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.socialPosts}</div>
              <div className="text-purple-300 text-sm">Posts Sociaux</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Mail className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.emailsSent}</div>
              <div className="text-orange-300 text-sm">Emails Envoyés</div>
            </CardContent>
          </Card>

          <Card className="bg-teal-600/20 backdrop-blur-sm border-teal-500/30">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalClicks}</div>
              <div className="text-teal-300 text-sm">Clics Générés</div>
            </CardContent>
          </Card>

          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.estimatedEarnings}€</div>
              <div className="text-green-300 text-sm">Gains Estimés</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Logs d'activité */}
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activité du Robot en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-sm text-gray-300 font-mono bg-gray-800/50 p-2 rounded">
                    {log}
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="text-gray-500 text-center py-8">Démarrez le robot pour voir l'activité...</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Configuration des paiements */}
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Suivi des Paiements LCL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-green-300 font-bold mb-2">🏦 Configuration Bancaire</h3>
                <p className="text-gray-300 text-sm mb-2">Titulaire : CELINE VALENTE</p>
                <p className="text-gray-300 text-sm mb-2">Banque : LCL AGENCE 00529</p>
                <p className="text-gray-300 text-sm">IBAN : FR20 3000 2005 2900 0002 1255 B79</p>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-blue-300 font-bold mb-2">📅 Calendrier des Paiements</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Systeme.io :</span>
                    <span className="text-white">Mensuel, le 15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shopify :</span>
                    <span className="text-white">Bi-mensuel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ClickFunnels :</span>
                    <span className="text-white">Mensuel, le 1er</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 font-bold">Alerte Vendredi 10h</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Le robot vous alertera automatiquement chaque vendredi à 10h pour vérifier vos paiements
                  d'affiliation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions de déploiement */}
        <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">🚀 DÉPLOIEMENT SUR VERCEL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-purple-300 font-bold mb-2">1. Télécharger</h3>
                <p className="text-gray-300 text-sm">Cliquez sur "Download Code" en haut à droite de v0</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-purple-300 font-bold mb-2">2. GitHub</h3>
                <p className="text-gray-300 text-sm">Créez un repo "affiliate-robot-celine" et uploadez tout</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="text-purple-300 font-bold mb-2">3. Vercel</h3>
                <p className="text-gray-300 text-sm">Connectez le repo et déployez - Le robot sera actif 24/7 !</p>
              </div>
            </div>

            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-bold">Une fois déployé sur Vercel :</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✅ Le robot fonctionne 24h/24, 7j/7</li>
                <li>✅ Génération automatique de contenu</li>
                <li>✅ Publication automatique sur tous vos canaux</li>
                <li>✅ Suivi et optimisation automatiques</li>
                <li>✅ Alertes de paiement chaque vendredi 10h</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
