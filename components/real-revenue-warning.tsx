import { AlertTriangle, DollarSign, Code, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RealRevenueWarning() {
  const requiredFeatures = [
    {
      icon: Database,
      title: "Base de données",
      description: "Stockage des utilisateurs, transactions, commissions",
      status: "missing",
    },
    {
      icon: DollarSign,
      title: "Système de paiement",
      description: "Stripe, PayPal, virements bancaires automatiques",
      status: "missing",
    },
    {
      icon: Code,
      title: "API d'affiliation",
      description: "Intégration avec Amazon, ClickBank, etc.",
      status: "missing",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-red-800">ATTENTION : Aucun revenu réel généré</AlertTitle>
        <AlertDescription className="text-red-700">
          Le code déployé est uniquement une interface utilisateur. Les chiffres de revenus affichés sont fictifs et
          aucun système de paiement n'est implémenté.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            État actuel de votre déploiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span>Interface utilisateur</span>
              <Badge className="bg-green-600">✅ Fonctionnel</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span>Génération de revenus</span>
              <Badge variant="destructive">❌ Inexistant</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span>Système de paiement</span>
              <Badge variant="destructive">❌ Inexistant</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span>Base de données</span>
              <Badge variant="destructive">❌ Inexistant</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pour créer un vrai système générateur de revenus :</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requiredFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <IconComponent className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    À développer
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>Conseil :</strong> Si vous souhaitez créer un vrai système d'affiliation, commencez par apprendre les
          bases du développement web, des API, et des systèmes de paiement. Ou engagez un développeur expérimenté pour
          créer une solution complète.
        </AlertDescription>
      </Alert>
    </div>
  )
}
