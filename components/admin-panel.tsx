"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, ExternalLink, Copy } from "lucide-react"

interface AffiliateProgram {
  id: string
  name: string
  commission: number
  currentLink: string
  status: string
}

export default function AdminPanel() {
  const [programs, setPrograms] = useState<AffiliateProgram[]>([
    {
      id: "systeme-io",
      name: "Systeme.io",
      commission: 60,
      currentLink: "https://systeme.io/?sa=sa0013735735b2c4c29d1c5c5e8e8e8e8&ref=celine-valente-2024",
      status: "EXEMPLE",
    },
    {
      id: "shopify",
      name: "Shopify",
      commission: 58,
      currentLink: "https://www.shopify.com/affiliates?ref=celine-valente-2024",
      status: "EXEMPLE",
    },
    {
      id: "clickfunnels",
      name: "ClickFunnels",
      commission: 38.25,
      currentLink: "https://www.clickfunnels.com/affiliates?ref=celine-valente-2024",
      status: "EXEMPLE",
    },
    {
      id: "learnybox",
      name: "Learnybox",
      commission: 50,
      currentLink: "https://learnybox.com/affiliation/?ref=celine-valente-2024",
      status: "EXEMPLE",
    },
  ])

  const [editingProgram, setEditingProgram] = useState<string | null>(null)
  const [newLink, setNewLink] = useState("")

  const startEditing = (programId: string, currentLink: string) => {
    setEditingProgram(programId)
    setNewLink(currentLink)
  }

  const saveLink = (programId: string) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === programId ? { ...program, currentLink: newLink, status: "CONFIGURÉ" } : program,
      ),
    )
    setEditingProgram(null)
    setNewLink("")

    // Ici vous pourriez sauvegarder dans une base de données
    console.log(`Lien sauvegardé pour ${programId}: ${newLink}`)
  }

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link)
  }

  const testLink = (link: string) => {
    window.open(link, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Settings className="w-8 h-8 text-purple-400" />
              PANNEAU D'ADMINISTRATION
            </CardTitle>
            <p className="text-purple-300">Configurez vos liens d'affiliation en quelques clics</p>
          </CardHeader>
        </Card>

        {/* Instructions */}
        <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
          <CardContent className="p-6">
            <h3 className="text-yellow-300 font-bold text-xl mb-4">📋 ÉTAPES DE CONFIGURATION :</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">1. Créer vos comptes</h4>
                <p className="text-gray-300">Inscrivez-vous sur chaque plateforme d'affiliation</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">2. Récupérer vos liens</h4>
                <p className="text-gray-300">Copiez vos liens d'affiliation personnalisés</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">3. Les coller ici</h4>
                <p className="text-gray-300">Remplacez les liens d'exemple par les vôtres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration des liens */}
        <div className="space-y-4">
          {programs.map((program) => (
            <Card key={program.id} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-white">{program.name}</h3>
                    <Badge className={program.status === "CONFIGURÉ" ? "bg-green-600" : "bg-orange-600"}>
                      {program.status}
                    </Badge>
                    <span className="text-green-400 font-bold">{program.commission}€ commission</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Lien d'affiliation actuel :</Label>
                    {editingProgram === program.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={newLink}
                          onChange={(e) => setNewLink(e.target.value)}
                          placeholder="Collez votre nouveau lien d'affiliation ici..."
                          className="flex-1 bg-gray-800 border-gray-600 text-white"
                        />
                        <Button onClick={() => saveLink(program.id)} className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          Sauver
                        </Button>
                        <Button
                          onClick={() => setEditingProgram(null)}
                          variant="outline"
                          className="border-gray-600 text-white"
                        >
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="flex-1 bg-gray-800 p-3 rounded border text-gray-300 text-sm break-all">
                          {program.currentLink}
                        </div>
                        <Button
                          onClick={() => startEditing(program.id, program.currentLink)}
                          variant="outline"
                          className="border-white/20 text-white bg-transparent"
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={() => copyLink(program.currentLink)}
                          variant="outline"
                          className="border-white/20 text-white bg-transparent"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => testLink(program.currentLink)}
                          variant="outline"
                          className="border-white/20 text-white bg-transparent"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Liens d'inscription */}
                  <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-blue-300 text-sm mb-2">
                      <strong>Pas encore inscrit ?</strong> Créez votre compte d'affiliation :
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-400 text-blue-300 bg-transparent hover:bg-blue-600/20"
                      onClick={() => {
                        const signupUrls: Record<string, string> = {
                          "systeme-io": "https://systeme.io/affiliation",
                          shopify: "https://www.shopify.com/partners",
                          clickfunnels: "https://www.clickfunnels.com/affiliates",
                          learnybox: "https://learnybox.com/affiliation",
                        }
                        window.open(signupUrls[program.id], "_blank")
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      S'inscrire à {program.name}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status global */}
        <Card className="bg-green-600/20 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">📊 STATUT DE CONFIGURATION</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {programs.filter((p) => p.status === "CONFIGURÉ").length}
                </div>
                <div className="text-gray-400">Configurés</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {programs.filter((p) => p.status === "EXEMPLE").length}
                </div>
                <div className="text-gray-400">À configurer</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {programs.reduce((sum, p) => sum + p.commission, 0)}€
                </div>
                <div className="text-gray-400">Commission totale</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round((programs.filter((p) => p.status === "CONFIGURÉ").length / programs.length) * 100)}%
                </div>
                <div className="text-gray-400">Progression</div>
              </div>
            </div>

            {programs.every((p) => p.status === "CONFIGURÉ") && (
              <Badge className="bg-green-600 text-lg px-6 py-2">
                ✅ Configuration terminée ! Votre robot est prêt à générer des revenus !
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
