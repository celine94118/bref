"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Share2, TrendingUp, Users, Target, Zap, BarChart3, Globe, Eye } from "lucide-react"

interface MarketingCampaign {
  id: string
  type: "email" | "social" | "content" | "ads"
  title: string
  status: "active" | "paused" | "completed"
  reach: number
  engagement: number
  conversions: number
  revenue: number
}

export default function MarketingAutomation() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: "1",
      type: "email",
      title: "Séquence de Bienvenue Nouveaux Clients",
      status: "active",
      reach: 1247,
      engagement: 34.2,
      conversions: 89,
      revenue: 1780,
    },
    {
      id: "2",
      type: "social",
      title: "Posts Instagram Automatiques",
      status: "active",
      reach: 5680,
      engagement: 8.7,
      conversions: 23,
      revenue: 667,
    },
    {
      id: "3",
      type: "content",
      title: "Articles de Blog SEO",
      status: "active",
      reach: 3420,
      engagement: 12.4,
      conversions: 45,
      revenue: 1125,
    },
    {
      id: "4",
      type: "ads",
      title: "Publicités Facebook Ciblées",
      status: "active",
      reach: 12500,
      engagement: 3.2,
      conversions: 156,
      revenue: 4680,
    },
  ])

  const [todayStats, setTodayStats] = useState({
    emailsSent: 0,
    socialPosts: 0,
    blogViews: 0,
    adClicks: 0,
  })

  // Simuler l'activité marketing
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayStats((prev) => ({
        emailsSent: prev.emailsSent + Math.floor(Math.random() * 3),
        socialPosts: prev.socialPosts + (Math.random() > 0.8 ? 1 : 0),
        blogViews: prev.blogViews + Math.floor(Math.random() * 10),
        adClicks: prev.adClicks + Math.floor(Math.random() * 5),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0)
  const averageConversion = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0) / campaigns.length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail
      case "social":
        return Share2
      case "content":
        return BarChart3
      case "ads":
        return Target
      default:
        return Zap
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-blue-600"
      case "social":
        return "bg-purple-600"
      case "content":
        return "bg-green-600"
      case "ads":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-purple-400" />
              MARKETING 100% AUTOMATISÉ
            </CardTitle>
            <p className="text-purple-300 text-lg">
              Vos produits se promeuvent tout seuls pendant que vous dormez ! 🚀
            </p>
          </CardHeader>
        </Card>

        {/* Stats globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalRevenue}€</div>
              <div className="text-green-300 text-sm">Revenus Marketing</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalReach.toLocaleString()}</div>
              <div className="text-blue-300 text-sm">Portée Totale</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(averageConversion)}</div>
              <div className="text-purple-300 text-sm">Conversions Moy.</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-orange-300 text-sm">Automatisation</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Campagnes actives */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">🎯 Campagnes Marketing Actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => {
                  const IconComponent = getTypeIcon(campaign.type)
                  return (
                    <div key={campaign.id} className="bg-black/20 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${getTypeColor(campaign.type)} flex items-center justify-center`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold">{campaign.title}</h4>
                            <Badge className={campaign.status === "active" ? "bg-green-600" : "bg-gray-600"}>
                              {campaign.status === "active" ? "Actif" : "Pausé"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{campaign.revenue}€</div>
                          <div className="text-gray-400 text-sm">{campaign.conversions} conversions</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">{campaign.reach.toLocaleString()}</div>
                          <div className="text-gray-400">Portée</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-400 font-bold">{campaign.engagement}%</div>
                          <div className="text-gray-400">Engagement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-400 font-bold">
                            {((campaign.conversions / campaign.reach) * 100).toFixed(1)}%
                          </div>
                          <div className="text-gray-400">Conversion</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Activité d'aujourd'hui */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">📊 Activité Marketing Aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Emails Automatiques</span>
                    </div>
                    <Badge className="bg-blue-600">Actif</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">{todayStats.emailsSent}</div>
                  <div className="text-gray-400 text-sm">Emails envoyés automatiquement</div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Posts Sociaux</span>
                    </div>
                    <Badge className="bg-purple-600">Actif</Badge>
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">{todayStats.socialPosts}</div>
                  <div className="text-gray-400 text-sm">Posts publiés automatiquement</div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Trafic Organique</span>
                    </div>
                    <Badge className="bg-green-600">Actif</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">{todayStats.blogViews}</div>
                  <div className="text-gray-400 text-sm">Vues sur vos contenus</div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">Publicités</span>
                    </div>
                    <Badge className="bg-orange-600">Actif</Badge>
                  </div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">{todayStats.adClicks}</div>
                  <div className="text-gray-400 text-sm">Clics sur vos publicités</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stratégies automatisées */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">🤖 STRATÉGIES MARKETING AUTOMATISÉES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Marketing Automatisé
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>✅ Séquence de bienvenue (7 emails)</li>
                    <li>✅ Relance panier abandonné</li>
                    <li>✅ Upsells après achat</li>
                    <li>✅ Newsletter hebdomadaire</li>
                    <li>✅ Réactivation clients inactifs</li>
                  </ul>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Réseaux Sociaux Automatiques
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>✅ 3 posts Instagram/jour</li>
                    <li>✅ Stories automatiques</li>
                    <li>✅ Partage sur Facebook/LinkedIn</li>
                    <li>✅ Hashtags optimisés</li>
                    <li>✅ Réponses automatiques DM</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Contenu SEO Automatisé
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>✅ Articles de blog optimisés</li>
                    <li>✅ Mots-clés automatiques</li>
                    <li>✅ Backlinks naturels</li>
                    <li>✅ Optimisation technique</li>
                    <li>✅ Indexation Google</li>
                  </ul>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Publicités Intelligentes
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>✅ Ciblage automatique</li>
                    <li>✅ Optimisation budget</li>
                    <li>✅ A/B testing continu</li>
                    <li>✅ Retargeting intelligent</li>
                    <li>✅ ROI maximisé</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Marketing */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">📈 RETOUR SUR INVESTISSEMENT MARKETING</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">450%</div>
                <div className="text-gray-400">ROI Email Marketing</div>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">280%</div>
                <div className="text-gray-400">ROI Réseaux Sociaux</div>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">320%</div>
                <div className="text-gray-400">ROI Contenu SEO</div>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">180%</div>
                <div className="text-gray-400">ROI Publicités</div>
              </div>
            </div>
            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-bold text-lg">
                💰 Pour chaque 1€ investi en marketing, vous récupérez en moyenne 3,20€ !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
