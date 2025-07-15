"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bot,
  Calendar,
  TrendingUp,
  FileText,
  Share2,
  Mail,
  BarChart3,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react"

interface AutomationTask {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "scheduled"
  lastRun: string
  nextRun: string
  success: number
  icon: any
}

export default function AutomationDashboard() {
  const [automations, setAutomations] = useState<AutomationTask[]>([
    {
      id: "content-generator",
      name: "Générateur de Contenu",
      description: "Crée 3 articles par jour sur les outils d'affiliation",
      status: "active",
      lastRun: "Il y a 2h",
      nextRun: "Dans 4h",
      success: 98,
      icon: FileText,
    },
    {
      id: "social-poster",
      name: "Publication Réseaux Sociaux",
      description: "Poste automatiquement sur Facebook, Twitter, LinkedIn",
      status: "active",
      lastRun: "Il y a 30min",
      nextRun: "Dans 1h30",
      success: 95,
      icon: Share2,
    },
    {
      id: "email-campaigns",
      name: "Campagnes Email",
      description: "Envoie des emails promotionnels à votre liste",
      status: "active",
      lastRun: "Hier",
      nextRun: "Demain 9h",
      success: 87,
      icon: Mail,
    },
    {
      id: "link-optimizer",
      name: "Optimiseur de Liens",
      description: "Teste et optimise vos liens d'affiliation",
      status: "active",
      lastRun: "Il y a 1h",
      nextRun: "Dans 2h",
      success: 92,
      icon: TrendingUp,
    },
    {
      id: "performance-tracker",
      name: "Suivi Performance",
      description: "Analyse et rapporte vos gains automatiquement",
      status: "active",
      lastRun: "Il y a 15min",
      nextRun: "Dans 45min",
      success: 100,
      icon: BarChart3,
    },
  ])

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((auto) => (auto.id === id ? { ...auto, status: auto.status === "active" ? "paused" : "active" } : auto)),
    )
  }

  const totalActive = automations.filter((a) => a.status === "active").length
  const averageSuccess = automations.reduce((sum, a) => sum + a.success, 0) / automations.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Bot className="w-8 h-8 text-purple-400" />
              ROBOT D'AFFILIATION AUTOMATIQUE
            </CardTitle>
            <p className="text-purple-300">Le robot travaille pendant que vous dormez 🤖💰</p>
          </CardHeader>
        </Card>

        {/* Stats globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalActive}/5</div>
              <div className="text-green-300 text-sm">Robots Actifs</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{averageSuccess.toFixed(0)}%</div>
              <div className="text-blue-300 text-sm">Taux de Succès</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-purple-300 text-sm">Fonctionnement</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Bot className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">AUTO</div>
              <div className="text-yellow-300 text-sm">Mode Pilote</div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des automatisations */}
        <div className="space-y-4">
          {automations.map((automation) => {
            const IconComponent = automation.icon
            return (
              <Card key={automation.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          automation.status === "active" ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">{automation.name}</h3>
                        <p className="text-gray-300">{automation.description}</p>

                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-400">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Dernière exécution: {automation.lastRun}
                          </span>
                          <span className="text-gray-400">Prochaine: {automation.nextRun}</span>
                          <Badge className="bg-green-600">{automation.success}% succès</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={automation.status === "active" ? "bg-green-600" : "bg-gray-600"}>
                        {automation.status === "active" ? "ACTIF" : "PAUSE"}
                      </Badge>

                      <Switch
                        checked={automation.status === "active"}
                        onCheckedChange={() => toggleAutomation(automation.id)}
                      />

                      <Button size="sm" variant="outline" className="border-white/20 text-white bg-transparent">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Instructions */}
        <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">🎯 Votre rôle (5 min/jour) :</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <p>
              ✅ <strong>Créez vos comptes d'affiliation</strong> sur les plateformes
            </p>
            <p>
              ✅ <strong>Vérifiez les contenus générés</strong> (optionnel, le robot publie automatiquement)
            </p>
            <p>
              ✅ <strong>Collectez vos gains</strong> quand les commissions arrivent
            </p>
            <p>
              🤖 <strong>Le robot fait le reste :</strong> contenu, publication, optimisation, suivi
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
