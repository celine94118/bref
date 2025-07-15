"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, FileText, Code, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface BusinessModel {
  id: string
  name: string
  description: string
  initialWork: string
  automationLevel: number
  potentialRevenue: string
  timeToProfit: string
  difficulty: "Facile" | "Moyen" | "Difficile"
  investment: string
  pros: string[]
  cons: string[]
  icon: any
  color: string
}

export default function AutomatedBusinessSelector() {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)

  const businessModels: BusinessModel[] = [
    {
      id: "digital-products",
      name: "Produits Numériques Automatisés",
      description: "Créez une fois, vendez à l'infini : ebooks, cours, templates",
      initialWork: "2-4 semaines de création",
      automationLevel: 95,
      potentialRevenue: "500-5000€/mois",
      timeToProfit: "1-3 mois",
      difficulty: "Facile",
      investment: "0-100€",
      pros: ["Aucun stock à gérer", "Marges de 95-100%", "Ventes 24h/24", "Scalable à l'infini"],
      cons: ["Création initiale nécessaire", "Marketing pour générer du trafic", "Concurrence forte"],
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      id: "dropshipping-auto",
      name: "Dropshipping Automatisé",
      description: "Boutique e-commerce sans stock avec automatisation complète",
      initialWork: "1-2 semaines de setup",
      automationLevel: 85,
      potentialRevenue: "1000-10000€/mois",
      timeToProfit: "2-6 mois",
      difficulty: "Moyen",
      investment: "200-500€",
      pros: ["Pas de stock", "Automatisation des commandes", "Potentiel de revenus élevé", "Business scalable"],
      cons: ["Marges plus faibles", "Dépendance aux fournisseurs", "Service client nécessaire"],
      icon: ShoppingCart,
      color: "bg-green-600",
    },
    {
      id: "saas-simple",
      name: "SaaS Simple Automatisé",
      description: "Outil en ligne simple qui résout un problème spécifique",
      initialWork: "4-8 semaines de développement",
      automationLevel: 90,
      potentialRevenue: "2000-20000€/mois",
      timeToProfit: "3-12 mois",
      difficulty: "Difficile",
      investment: "0-1000€",
      pros: ["Revenus récurrents", "Très scalable", "Marges excellentes", "Vente possible"],
      cons: ["Développement technique", "Acquisition clients difficile", "Maintenance nécessaire"],
      icon: Code,
      color: "bg-purple-600",
    },
    {
      id: "content-premium",
      name: "Contenu Premium Automatisé",
      description: "Newsletter payante, communauté privée, contenu exclusif",
      initialWork: "2-3 semaines de setup",
      automationLevel: 80,
      potentialRevenue: "300-3000€/mois",
      timeToProfit: "2-4 mois",
      difficulty: "Facile",
      investment: "50-200€",
      pros: ["Revenus récurrents", "Relation client forte", "Contenu réutilisable", "Communauté engagée"],
      cons: ["Création de contenu régulière", "Construction d'audience", "Fidélisation nécessaire"],
      icon: Users,
      color: "bg-orange-600",
    },
  ]

  const selectedModel = businessModels.find((b) => b.id === selectedBusiness)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <TrendingUp className="w-10 h-10 text-green-400" />
              BUSINESS HAUTEMENT AUTOMATISABLES
            </CardTitle>
            <p className="text-purple-300 text-lg">
              Choisissez votre modèle de business automatisé (travail initial requis)
            </p>
          </CardHeader>
        </Card>

        {/* Avertissement réaliste */}
        <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-yellow-300 font-bold text-xl mb-2">⚠️ RÉALITÉ IMPORTANTE</h3>
                <div className="space-y-2 text-gray-300">
                  <p>
                    • <strong>Aucun business n'est 100% automatisé</strong> sans travail initial
                  </p>
                  <p>
                    • <strong>Tous nécessitent du setup, du marketing, et de la maintenance</strong>
                  </p>
                  <p>
                    • <strong>Les revenus ne sont jamais garantis</strong> - ils dépendent de vos efforts
                  </p>
                  <p>
                    • <strong>Plus c'est automatisé, plus la concurrence est forte</strong>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sélecteur de business */}
        <div className="grid md:grid-cols-2 gap-6">
          {businessModels.map((business) => {
            const IconComponent = business.icon
            const isSelected = selectedBusiness === business.id

            return (
              <Card
                key={business.id}
                className={`backdrop-blur-sm transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600/20 border-blue-500/30 ring-2 ring-blue-400/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setSelectedBusiness(business.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${business.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{business.name}</h3>
                      <p className="text-gray-300 text-sm mb-3">{business.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          className={
                            business.difficulty === "Facile"
                              ? "bg-green-600"
                              : business.difficulty === "Moyen"
                                ? "bg-orange-600"
                                : "bg-red-600"
                          }
                        >
                          {business.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300 border-gray-500">
                          {business.automationLevel}% auto
                        </Badge>
                        <Badge className="bg-purple-600">{business.potentialRevenue}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Travail initial:</span>
                          <p className="text-white">{business.initialWork}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Profit dans:</span>
                          <p className="text-white">{business.timeToProfit}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${isSelected ? business.color + " hover:opacity-80" : "bg-gray-600 hover:bg-gray-700"}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedBusiness(business.id)
                    }}
                  >
                    {isSelected ? "Sélectionné" : "Choisir ce modèle"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Détails du business sélectionné */}
        {selectedModel && (
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <selectedModel.icon className="w-8 h-8 text-blue-400" />
                {selectedModel.name} - Plan Détaillé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Avantages
                    </h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      {selectedModel.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Inconvénients
                    </h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      {selectedModel.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-400">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-bold mb-3">📊 Métriques Clés</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Niveau d'automatisation:</span>
                        <span className="text-white font-bold">{selectedModel.automationLevel}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenus potentiels:</span>
                        <span className="text-green-400 font-bold">{selectedModel.potentialRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investissement initial:</span>
                        <span className="text-orange-400 font-bold">{selectedModel.investment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temps jusqu'au profit:</span>
                        <span className="text-purple-400 font-bold">{selectedModel.timeToProfit}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${selectedModel.color} hover:opacity-80 text-lg py-3`}
                    onClick={() => {
                      // Ici on pourrait rediriger vers la création du business choisi
                      console.log(`Création du business: ${selectedModel.name}`)
                    }}
                  >
                    🚀 Créer ce Business Maintenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparaison rapide */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">📊 Comparaison Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-gray-400 p-2">Business</th>
                    <th className="text-left text-gray-400 p-2">Difficulté</th>
                    <th className="text-left text-gray-400 p-2">Automation</th>
                    <th className="text-left text-gray-400 p-2">Revenus</th>
                    <th className="text-left text-gray-400 p-2">Temps</th>
                  </tr>
                </thead>
                <tbody>
                  {businessModels.map((business) => (
                    <tr key={business.id} className="border-b border-gray-700">
                      <td className="text-white p-2 font-medium">{business.name}</td>
                      <td className="p-2">
                        <Badge
                          className={
                            business.difficulty === "Facile"
                              ? "bg-green-600"
                              : business.difficulty === "Moyen"
                                ? "bg-orange-600"
                                : "bg-red-600"
                          }
                        >
                          {business.difficulty}
                        </Badge>
                      </td>
                      <td className="text-blue-400 p-2">{business.automationLevel}%</td>
                      <td className="text-green-400 p-2">{business.potentialRevenue}</td>
                      <td className="text-purple-400 p-2">{business.timeToProfit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommandation */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">💡 MA RECOMMANDATION</h3>
            <p className="text-gray-300 mb-4">
              Pour un débutant cherchant la simplicité et l'automatisation, je recommande de commencer par les{" "}
              <strong>Produits Numériques</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-green-400 font-bold mb-2">✅ Pourquoi ?</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Investissement minimal</li>
                  <li>• 95% automatisable</li>
                  <li>• Marges excellentes</li>
                  <li>• Pas de stock</li>
                </ul>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2">🎯 Exemples</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Guide PDF (19€)</li>
                  <li>• Templates Canva (29€)</li>
                  <li>• Mini-cours vidéo (49€)</li>
                  <li>• Checklist premium (9€)</li>
                </ul>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2">📈 Potentiel</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 10 ventes/mois = 290€</li>
                  <li>• 50 ventes/mois = 1450€</li>
                  <li>• 100 ventes/mois = 2900€</li>
                  <li>• Scalable à l'infini</li>
                </ul>
              </div>
            </div>
            <p className="text-yellow-300 font-bold">
              Voulez-vous que je vous crée un système complet de vente de produits numériques automatisé ?
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
