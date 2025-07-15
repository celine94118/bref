"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CreditCard, Clock, DollarSign, CheckCircle, XCircle } from "lucide-react"

export default function PaymentProcessExplanation() {
  const paymentSteps = [
    {
      step: 1,
      title: "Quelqu'un achète via votre lien",
      description: "Une personne clique sur votre lien et achète le produit",
      automatic: false,
      yourAction: "Rien - le robot génère les liens",
      icon: DollarSign,
      color: "text-blue-400",
    },
    {
      step: 2,
      title: "La plateforme enregistre la vente",
      description: "Shopify/Systeme.io/etc. confirme la vente et votre commission",
      automatic: true,
      yourAction: "Rien - automatique",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      step: 3,
      title: "Période d'attente (30-60 jours)",
      description: "Délai pour s'assurer qu'il n'y a pas de remboursement",
      automatic: true,
      yourAction: "Attendre - rien à faire",
      icon: Clock,
      color: "text-orange-400",
    },
    {
      step: 4,
      title: "Vous configurez vos coordonnées bancaires",
      description: "Sur CHAQUE plateforme, vous devez ajouter votre RIB/IBAN",
      automatic: false,
      yourAction: "OBLIGATOIRE - Vous devez le faire",
      icon: CreditCard,
      color: "text-red-400",
    },
    {
      step: 5,
      title: "Atteindre le seuil minimum",
      description: "Exemple: 50€ minimum chez Systeme.io, 100€ chez ClickFunnels",
      automatic: false,
      yourAction: "Attendre d'avoir assez de ventes",
      icon: DollarSign,
      color: "text-purple-400",
    },
    {
      step: 6,
      title: "La plateforme vous paie",
      description: "Virement sur votre compte selon leur calendrier",
      automatic: true,
      yourAction: "Rien - vous recevez le virement",
      icon: CheckCircle,
      color: "text-green-400",
    },
  ]

  const platformsPaymentSetup = [
    {
      platform: "Systeme.io",
      setupRequired: "OUI - Ajouter votre IBAN dans les paramètres",
      minimumPayout: "50€",
      paymentMethod: "Virement SEPA",
      frequency: "Mensuel (le 15)",
    },
    {
      platform: "Shopify",
      setupRequired: "OUI - Configurer PayPal ou virement",
      minimumPayout: "25€",
      paymentMethod: "PayPal ou virement",
      frequency: "Bi-mensuel",
    },
    {
      platform: "ClickFunnels",
      setupRequired: "OUI - Ajouter vos coordonnées bancaires",
      minimumPayout: "100€",
      paymentMethod: "Virement international",
      frequency: "Mensuel (le 1er)",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Alerte principale */}
        <Card className="bg-red-600/20 backdrop-blur-sm border-red-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <AlertTriangle className="w-10 h-10 text-red-400" />
              NON ! RIEN N'EST AUTOMATIQUE POUR L'ARGENT
            </CardTitle>
            <p className="text-red-300 text-xl">Vous devez configurer vos paiements sur chaque plateforme</p>
          </CardHeader>
        </Card>

        {/* Processus étape par étape */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">🔍 PROCESSUS COMPLET DE PAIEMENT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentSteps.map((step) => {
                const IconComponent = step.icon
                return (
                  <div key={step.step} className="flex items-start gap-4 bg-black/20 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <IconComponent className={`w-6 h-6 ${step.color} mt-2`} />
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg">{step.title}</h4>
                      <p className="text-gray-300 mb-2">{step.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge className={step.automatic ? "bg-green-600" : "bg-red-600"}>
                          {step.automatic ? "Automatique" : "Action requise"}
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          <strong>Votre action :</strong> {step.yourAction}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Configuration requise par plateforme */}
        <Card className="bg-orange-600/20 backdrop-blur-sm border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white">⚙️ CONFIGURATION OBLIGATOIRE SUR CHAQUE PLATEFORME</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformsPaymentSetup.map((platform, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">{platform.platform}</h4>
                    <Badge className="bg-red-600">Configuration requise</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-orange-400 font-bold mb-2">🔧 À configurer :</h5>
                      <p className="text-gray-300 text-sm">{platform.setupRequired}</p>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-bold mb-2">💰 Conditions :</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Minimum : {platform.minimumPayout}</li>
                        <li>• Méthode : {platform.paymentMethod}</li>
                        <li>• Fréquence : {platform.frequency}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ce que vous devez faire */}
        <Card className="bg-yellow-600/20 backdrop-blur-sm border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white">📋 CE QUE VOUS DEVEZ FAIRE MAINTENANT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-600/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="text-red-300 font-bold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  URGENT - Configuration des paiements
                </h4>
                <p className="text-gray-300 mb-3">
                  Vous devez aller sur CHAQUE plateforme d'affiliation et configurer vos coordonnées bancaires :
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>
                    • <strong>Systeme.io :</strong> Paramètres → Affiliation → Coordonnées bancaires → Ajouter votre
                    IBAN
                  </li>
                  <li>
                    • <strong>Shopify :</strong> Partner Dashboard → Payment Settings → Ajouter PayPal ou RIB
                  </li>
                  <li>
                    • <strong>ClickFunnels :</strong> Affiliate Settings → Payment Info → Coordonnées bancaires
                  </li>
                  <li>
                    • <strong>Et ainsi de suite pour chaque plateforme...</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-blue-300 font-bold mb-2">ℹ️ Informations à fournir :</h4>
                <div className="bg-black/20 p-3 rounded text-gray-300 text-sm">
                  <p>
                    <strong>Nom :</strong> CELINE VALENTE
                  </p>
                  <p>
                    <strong>IBAN :</strong> FR20 3000 2005 2900 0002 1255 B79
                  </p>
                  <p>
                    <strong>Banque :</strong> LCL AGENCE 00529
                  </p>
                  <p>
                    <strong>Adresse :</strong> Votre adresse complète
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline réaliste */}
        <Card className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border-red-500/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">⏰ TIMELINE RÉALISTE</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-yellow-300 font-bold mb-2">Aujourd'hui</h4>
                <p className="text-gray-300 text-sm">Configurez vos coordonnées bancaires sur chaque plateforme</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-yellow-300 font-bold mb-2">Dans 1-3 mois</h4>
                <p className="text-gray-300 text-sm">Premières ventes possibles si vous avez du trafic</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-yellow-300 font-bold mb-2">Dans 2-4 mois</h4>
                <p className="text-gray-300 text-sm">Premiers virements sur votre LCL (si seuils atteints)</p>
              </div>
            </div>

            <div className="bg-red-600/20 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-bold text-lg">
                ⚠️ SANS CONFIGURATION DE VOS COORDONNÉES BANCAIRES = AUCUN PAIEMENT POSSIBLE
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
