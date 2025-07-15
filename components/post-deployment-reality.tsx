import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Settings, DollarSign } from "lucide-react"

export default function PostDeploymentReality() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">La Réalité Post-Déploiement sur Vercel</h1>
      <p className="text-center text-lg text-gray-300 mb-12">
        Comprenez ce qui est automatique et ce qui nécessite votre intervention pour des revenus réels.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-green-600/20 border-green-500/30 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Ce qui est AUTOMATIQUE après déploiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>Votre site web est en ligne et accessible 24/7.</li>
              <li>Les pages de vente de vos produits sont fonctionnelles.</li>
              <li>Le design et l'interface utilisateur sont prêts.</li>
              <li>Le système de livraison des produits par email est en place (une fois configuré).</li>
              <li>Le marketing automatisé (si configuré) peut commencer à fonctionner.</li>
              <li>Les mises à jour de code sont automatiques via Vercel/GitHub.</li>
            </ul>
            <p className="text-sm text-green-300">C'est la base solide de votre business passif !</p>
          </CardContent>
        </Card>

        <Card className="bg-red-600/20 border-red-500/30 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              Ce qui N'EST PAS AUTOMATIQUE (et est CRUCIAL)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-bold">Réception des paiements réels :</span> Sans la configuration des clés API
                PayPal dans Vercel, les paiements resteront des simulations.
              </li>
              <li>
                <span className="font-bold">Envoi d'emails réels :</span> Sans une clé API Resend configurée, les emails
                de livraison de produits ne seront pas envoyés.
              </li>
              <li>
                <span className="font-bold">Trafic et ventes :</span> Le site ne générera pas de trafic ou de ventes par
                magie. Vous devrez promouvoir vos produits.
              </li>
              <li>
                <span className="font-bold">Optimisation :</span> Pour maximiser les revenus, vous devrez analyser les
                données et optimiser vos pages/offres.
              </li>
            </ul>
            <p className="text-sm text-red-300">
              Ces étapes nécessitent votre intervention initiale pour transformer le potentiel en revenus réels.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-gray-800/30 border-gray-700/50 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Votre Mission Post-Déploiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Votre objectif principal après le déploiement est de finaliser la configuration des paiements et des
              emails, puis de vous concentrer sur la promotion.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <span className="font-bold">Configurez PayPal & Resend :</span> Suivez le guide détaillé sur la page
                `/setup-paypal` de votre site déployé pour ajouter vos clés API. C'est l'étape la plus critique pour
                recevoir de l'argent.
              </li>
              <li>
                <span className="font-bold">Promouvez vos produits :</span> Partagez le lien de votre site sur les
                réseaux sociaux, créez du contenu, utilisez des stratégies de trafic.
              </li>
              <li>
                <span className="font-bold">Analysez et optimisez :</span> Utilisez le tableau de bord des ventes
                (`/sales-dashboard`) pour voir ce qui fonctionne et ajuster votre stratégie.
              </li>
            </ol>
            <p className="text-sm text-yellow-300">
              Une fois ces étapes initiales franchies, le système sera véritablement automatisé pour la vente et la
              livraison.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          <DollarSign className="inline-block w-8 h-8 mr-2 text-green-400" />
          Le Chemin vers les Revenus Réels
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Le "robot" est une machine puissante, mais il a besoin de carburant (vos clés API) et d'une direction (votre
          promotion) pour vous apporter des revenus. Une fois ces éléments en place, il travaillera pour vous 24h/24,
          7j/7 !
        </p>
      </div>
    </div>
  )
}
