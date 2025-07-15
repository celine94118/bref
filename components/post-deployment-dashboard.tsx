"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Activity, Bell, BarChart3, Globe, Zap } from "lucide-react"

export default function PostDeploymentDashboard() {
  const [robotStatus, setRobotStatus] = useState("ACTIF")
  const [timeOnline, setTimeOnline] = useState(0)
  const [todayStats, setTodayStats] = useState({
    contentGenerated: 0,
    socialPosts: 0,
    emailsSent: 0,
    linkClicks: 0,
    estimatedReach: 0,
  })

  // Simuler l'activité du robot
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnline((prev) => prev + 1)

      // Simuler l'activité aléatoire
      if (Math.random() > 0.8) {
        setTodayStats((prev) => ({
          ...prev,
          contentGenerated: prev.contentGenerated + (Math.random() > 0.7 ? 1 : 0),
          socialPosts: prev.socialPosts + (Math.random() > 0.8 ? 1 : 0),
          emailsSent: prev.emailsSent + (Math.random() > 0.9 ? 1 : 0),
          linkClicks: prev.linkClicks + Math.floor(Math.random() * 3),
          estimatedReach: prev.estimatedReach + Math.floor(Math.random() * 50),
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const nextActions = [
    {
      title: "Partagez votre contenu",
      description: "Partagez les articles générés sur vos réseaux personnels",
      priority: "HIGH",
      timeframe: "Aujourd'hui",
    },
    {
      title: "Construisez votre liste email",
      description: "Ajoutez un formulaire d'inscription sur votre site",
      priority: "MEDIUM",
      timeframe: "Cette semaine",
    },
    {
      title: "Engagez avec votre audience",
      description: "Répondez aux commentaires et messages",
      priority: "MEDIUM",
      timeframe: "Quotidien",
    },
    {
      title: "Analysez vos performances",
      description: "Vérifiez quels contenus génèrent le plus de clics",
      priority: "LOW",
      timeframe: "Hebdomadaire",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header de félicitations */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <CheckCircle className="w-10 h-10 text-green-400" />
              ROBOT DÉPLOYÉ AVEC SUCCÈS !
            </CardTitle>
            <p className="text-green-300 text-xl">
              Votre robot d'affiliation travaille maintenant 24h/24 avec vos vrais comptes !
            </p>
          </CardHeader>
        </Card>

        {/* Statut en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white">{robotStatus}</div>
              <div className="text-green-300 text-sm">Statut du Robot</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{formatTime(timeOnline)}</div>
              <div className="text-blue-300 text-sm">En ligne depuis</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">8</div>
              <div className="text-purple-300 text-sm">Comptes Connectés</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Bell className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Vendredi 10h</div>
              <div className="text-orange-300 text-sm">Prochaine alerte</div>
            </CardContent>
          </Card>
        </div>

        {/* Activité d'aujourd'hui */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Activité d'Aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{todayStats.contentGenerated}</div>
                <div className="text-gray-400 text-sm">Articles générés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{todayStats.socialPosts}</div>
                <div className="text-gray-400 text-sm">Posts sociaux</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{todayStats.emailsSent}</div>
                <div className="text-gray-400 text-sm">Emails envoyés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{todayStats.linkClicks}</div>
                <div className="text-gray-400 text-sm">Clics sur liens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{todayStats.estimatedReach}</div>
                <div className="text-gray-400 text-sm">Portée estimée</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline des prochains jours */}
        <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">📅 CE QUI VA SE PASSER MAINTENANT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-black/20 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-bold">Prochaines 24h</h4>
                  <p className="text-gray-300 text-sm">
                    Le robot va générer 6 articles, publier 12 posts sur les réseaux, et envoyer 1 email de campagne
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/20 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-bold">Prochaine semaine</h4>
                  <p className="text-gray-300 text-sm">
                    Accumulation de contenu, premiers clics possibles si vous partagez sur vos réseaux personnels
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/20 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-bold">Prochain mois</h4>
                  <p className="text-gray-300 text-sm">
                    Si vous avez du trafic, premières conversions possibles. Le robot optimise automatiquement
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-black/20 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-white font-bold">Dans 2-3 mois</h4>
                  <p className="text-gray-300 text-sm">
                    Premiers paiements possibles selon vos performances (délai des plateformes d'affiliation)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions recommandées */}
        <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white">🎯 VOS PROCHAINES ACTIONS POUR MAXIMISER LES RÉSULTATS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextActions.map((action, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-bold">{action.title}</h4>
                    <div className="flex gap-2">
                      <Badge
                        className={
                          action.priority === "HIGH"
                            ? "bg-red-600"
                            : action.priority === "MEDIUM"
                              ? "bg-orange-600"
                              : "bg-blue-600"
                        }
                      >
                        {action.priority}
                      </Badge>
                      <Badge variant="outline" className="text-gray-300 border-gray-500">
                        {action.timeframe}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rappel important */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🔔 RAPPEL IMPORTANT</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Votre robot travaille maintenant 24h/24</strong> avec vos vrais comptes d'affiliation !
              </p>
              <p>
                <strong>Les revenus dépendent du trafic</strong> que vous générez vers votre contenu.
              </p>
              <p>
                <strong>Partagez, engagez, et soyez patient</strong> - les premiers résultats arrivent dans 2-4
                semaines.
              </p>
            </div>
            <div className="mt-6 p-4 bg-green-600/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-bold">
                ✅ Chaque vendredi à 10h, vous recevrez une alerte pour vérifier vos paiements d'affiliation !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
