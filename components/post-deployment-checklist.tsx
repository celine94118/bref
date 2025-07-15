"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, AlertTriangle, Rocket } from "lucide-react"

export default function PostDeploymentChecklist() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const tasks = [
    {
      id: "create-accounts",
      title: "1. Créer vos comptes d'affiliation",
      description: "Inscrivez-vous sur chaque plateforme pour obtenir vos vrais liens",
      priority: "HIGH",
      platforms: [
        { name: "Systeme.io", url: "https://systeme.io/affiliation", commission: "60€" },
        { name: "Shopify", url: "https://www.shopify.com/partners", commission: "58€" },
        { name: "ClickFunnels", url: "https://www.clickfunnels.com/affiliates", commission: "38€" },
        { name: "Learnybox", url: "https://learnybox.com/affiliation", commission: "50€" },
      ],
    },
    {
      id: "replace-links",
      title: "2. Remplacer les liens d'exemple",
      description: "Mettez vos vrais liens d'affiliation dans le code",
      priority: "HIGH",
      action: "Modifier le fichier data/affiliate-programs.ts",
    },
    {
      id: "social-accounts",
      title: "3. Connecter vos réseaux sociaux",
      description: "Préparez vos comptes pour la publication automatique",
      priority: "MEDIUM",
      platforms: ["Facebook", "Twitter", "LinkedIn", "Instagram"],
    },
    {
      id: "email-list",
      title: "4. Configurer votre liste email",
      description: "Commencez à collecter des emails pour vos campagnes",
      priority: "MEDIUM",
      tools: ["Mailchimp", "SendGrid", "ConvertKit"],
    },
    {
      id: "content-review",
      title: "5. Réviser le contenu généré",
      description: "Vérifiez et personnalisez le contenu automatique",
      priority: "LOW",
      frequency: "Quotidien (5 min)",
    },
  ]

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Rocket className="w-8 h-8 text-green-400" />
              ROBOT DÉPLOYÉ ! PROCHAINES ÉTAPES
            </CardTitle>
            <p className="text-green-300">Configurez votre robot pour maximiser vos revenus</p>
          </CardHeader>
        </Card>

        {/* Progress */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium">Progression de la configuration</span>
              <span className="text-gray-300">
                {completedTasks.length}/{tasks.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id)
            return (
              <Card
                key={task.id}
                className={`backdrop-blur-sm transition-all ${
                  isCompleted ? "bg-green-600/20 border-green-500/30" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Button
                      onClick={() => toggleTask(task.id)}
                      variant="outline"
                      size="sm"
                      className={`mt-1 ${
                        isCompleted
                          ? "bg-green-600 border-green-500 text-white"
                          : "border-white/20 text-white bg-transparent"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border rounded" />}
                    </Button>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{task.title}</h3>
                        <Badge
                          className={
                            task.priority === "HIGH"
                              ? "bg-red-600"
                              : task.priority === "MEDIUM"
                                ? "bg-orange-600"
                                : "bg-blue-600"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <p className="text-gray-300 mb-4">{task.description}</p>

                      {/* Plateformes d'affiliation */}
                      {task.platforms && (
                        <div className="space-y-2">
                          {task.platforms.map((platform, index) => (
                            <div key={index} className="bg-black/20 p-3 rounded-lg flex justify-between items-center">
                              <div>
                                <span className="text-white font-medium">{platform.name}</span>
                                {platform.commission && (
                                  <span className="text-green-400 ml-2">({platform.commission} commission)</span>
                                )}
                              </div>
                              {platform.url && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white bg-transparent"
                                  onClick={() => window.open(platform.url, "_blank")}
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  S'inscrire
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action spécifique */}
                      {task.action && (
                        <div className="bg-yellow-600/20 p-3 rounded-lg border border-yellow-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 font-medium">Action requise :</span>
                          </div>
                          <p className="text-gray-300 text-sm">{task.action}</p>
                        </div>
                      )}

                      {/* Outils suggérés */}
                      {task.tools && (
                        <div className="flex gap-2 mt-3">
                          <span className="text-gray-400 text-sm">Outils suggérés :</span>
                          {task.tools.map((tool, index) => (
                            <Badge key={index} variant="outline" className="text-gray-300 border-gray-500">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Fréquence */}
                      {task.frequency && (
                        <div className="mt-3">
                          <span className="text-blue-400 text-sm">📅 {task.frequency}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Conseils de succès */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">💡 CONSEILS POUR MAXIMISER VOS REVENUS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <p>
              🎯 <strong>Semaine 1 :</strong> Créez tous vos comptes d'affiliation et remplacez les liens d'exemple
            </p>
            <p>
              📱 <strong>Semaine 2 :</strong> Partagez le contenu généré sur vos réseaux sociaux personnels
            </p>
            <p>
              📧 <strong>Semaine 3 :</strong> Commencez à construire votre liste email avec du contenu de valeur
            </p>
            <p>
              📊 <strong>Semaine 4 :</strong> Analysez vos premières statistiques et optimisez ce qui fonctionne
            </p>
            <p>
              💰 <strong>Mois 2-3 :</strong> Les premiers revenus devraient commencer à arriver !
            </p>
          </CardContent>
        </Card>

        {/* Alerte paiements */}
        <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🔔 RAPPEL AUTOMATIQUE CONFIGURÉ</h3>
            <p className="text-green-300 mb-4">
              Votre robot vous alertera automatiquement chaque <strong>vendredi à 10h</strong> pour vérifier vos
              paiements d'affiliation sur votre LCL.
            </p>
            <Badge className="bg-green-600 text-lg px-4 py-2">✅ Système de notification actif</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
