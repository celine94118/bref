"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, TrendingUp, MousePointer, Target, Euro, BarChart3, Calendar } from "lucide-react"
import { affiliatePrograms } from "../data/affiliate-programs"
import type { AffiliateStats } from "../types/affiliate"

export default function AffiliateDashboard() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  // Calculer les statistiques globales
  const stats: AffiliateStats = {
    totalEarnings: affiliatePrograms.reduce((sum, program) => sum + program.totalEarnings, 0),
    totalClicks: affiliatePrograms.reduce((sum, program) => sum + program.clicks, 0),
    totalConversions: affiliatePrograms.reduce((sum, program) => sum + program.conversions, 0),
    averageConversionRate:
      affiliatePrograms.reduce((sum, program) => sum + program.conversionRate, 0) / affiliatePrograms.length,
    activePrograms: affiliatePrograms.filter((program) => program.status === "ACTIF").length,
  }

  const copyToClipboard = async (link: string, programName: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedLink(programName)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (err) {
      console.error("Erreur lors de la copie:", err)
    }
  }

  const openLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Euro className="w-8 h-8 text-green-400" />
              Vos Programmes d'Affiliation
            </CardTitle>
            <p className="text-blue-300">Liens personnalisés pour Céline - Commissions directes LCL</p>
          </CardHeader>
        </Card>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <Euro className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalEarnings.toLocaleString()}€</div>
              <div className="text-green-300 text-sm">Total Gains</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <MousePointer className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalClicks.toLocaleString()}</div>
              <div className="text-blue-300 text-sm">Total Clics</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalConversions}</div>
              <div className="text-purple-300 text-sm">Conversions</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.averageConversionRate.toFixed(1)}%</div>
              <div className="text-orange-300 text-sm">Taux Moyen</div>
            </CardContent>
          </Card>

          <Card className="bg-teal-600/20 backdrop-blur-sm border-teal-500/30">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.activePrograms}</div>
              <div className="text-teal-300 text-sm">Programmes Actifs</div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des programmes d'affiliation */}
        <div className="grid gap-6">
          {affiliatePrograms.map((program) => (
            <Card
              key={program.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Info principale */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${program.color}`}></div>
                      <h3 className="text-xl font-bold text-white">{program.name}</h3>
                      <Badge className="bg-green-600 text-white">{program.status}</Badge>
                      <Badge variant="outline" className="text-gray-300 border-gray-500">
                        {program.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-3">{program.description}</p>

                    {/* Statistiques */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">{program.commission}€</div>
                        <div className="text-xs text-gray-400">commission</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{program.totalEarnings.toLocaleString()}€</div>
                        <div className="text-xs text-gray-400">Gains</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{program.clicks}</div>
                        <div className="text-xs text-gray-400">Clics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-400">{program.conversionRate}%</div>
                        <div className="text-xs text-gray-400">Conv.</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-80">
                    <div className="bg-black/20 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Votre lien personnalisé :</p>
                      <div className="bg-gray-800 p-2 rounded text-xs text-gray-300 mb-3 break-all">
                        {program.affiliateLink}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-white/20 text-white bg-transparent hover:bg-white/10"
                          onClick={() => copyToClipboard(program.affiliateLink, program.name)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          {copiedLink === program.name ? "Copié !" : "Copier"}
                        </Button>
                        <Button
                          size="sm"
                          className={`flex-1 ${program.color} hover:opacity-80`}
                          onClick={() => openLink(program.affiliateLink)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Tester
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Comment utiliser vos liens d'affiliation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <p>
              • <strong>Copiez vos liens personnalisés</strong> et partagez-les sur vos réseaux sociaux, blog, ou par
              email
            </p>
            <p>
              • <strong>Testez les plateformes</strong> pour mieux les recommander à votre audience
            </p>
            <p>
              • <strong>Suivez vos statistiques</strong> pour optimiser vos campagnes les plus performantes
            </p>
            <p>
              • <strong>Les commissions sont versées</strong> selon les conditions de chaque programme (généralement
              30-60 jours)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
