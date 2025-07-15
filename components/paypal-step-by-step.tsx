"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Loader2, ExternalLink, CreditCard } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function PayPalStepByStepGuide() {
  const [step, setStep] = useState(1)
  const [clientId, setClientId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [resendApiKey, setResendApiKey] = useState("")
  const [testPaymentStatus, setTestPaymentStatus] = useState<"idle" | "loading" | "success" | "failed">("idle")
  const [testPaymentMessage, setTestPaymentMessage] = useState("")

  const handleTestPayment = async () => {
    setTestPaymentStatus("loading")
    setTestPaymentMessage("")
    try {
      // Simuler un paiement pour le produit "Guide Complet : Gagner de l'Argent en Ligne"
      const productToTest = {
        id: "guide-argent-ligne",
        name: "Guide Complet : Gagner de l'Argent en Ligne",
        price: 1.0, // Utiliser un petit montant pour le test
      }

      const createPaymentResponse = await fetch("/api/create-paypal-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToTest),
      })

      const createPaymentData = await createPaymentResponse.json()

      if (!createPaymentResponse.ok || !createPaymentData.approvalUrl) {
        setTestPaymentStatus("failed")
        setTestPaymentMessage(createPaymentData.error || "Erreur lors de la création du paiement de test.")
        return
      }

      // Rediriger vers PayPal pour l'approbation (en mode sandbox)
      window.open(createPaymentData.approvalUrl, "_blank")

      // Pour un test réel, vous devriez attendre la redirection de PayPal vers /payment-success
      // Pour ce guide, nous allons simuler le succès après un court délai
      setTimeout(() => {
        setTestPaymentStatus("success")
        setTestPaymentMessage("Paiement de test initié ! Veuillez vérifier votre compte PayPal Sandbox.")
      }, 3000)
    } catch (error) {
      console.error("Erreur test paiement:", error)
      setTestPaymentStatus("failed")
      setTestPaymentMessage("Une erreur inattendue est survenue lors du test de paiement.")
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">🚀 Configuration PayPal & Emails (4 Étapes)</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { num: 1, title: "Créer App PayPal", status: step > 1 ? "done" : "current" },
          { num: 2, title: "Récupérer Clés API", status: step > 2 ? "done" : step === 2 ? "current" : "pending" },
          { num: 3, title: "Configurer Vercel", status: step > 3 ? "done" : step === 3 ? "current" : "pending" },
          { num: 4, title: "Tester Paiement", status: step > 4 ? "done" : step === 4 ? "current" : "pending" },
        ].map((s) => (
          <Card
            key={s.num}
            className={`p-4 text-center ${
              s.status === "done"
                ? "bg-green-600/20 border-green-500/30"
                : s.status === "current"
                  ? "bg-blue-600/20 border-blue-500/30"
                  : "bg-gray-800/20 border-gray-700/30"
            }`}
          >
            <div className="text-xl font-bold text-white">Étape {s.num}</div>
            <div className="text-lg text-gray-300">{s.title}</div>
            {s.status === "done" && <CheckCircle className="w-6 h-6 text-green-400 mx-auto mt-2" />}
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto bg-gray-800/30 border-gray-700/50 p-8">
        <CardHeader>
          <CardTitle className="text-3xl text-white">
            {step === 1 && "Étape 1: Créer une application PayPal Developer"}
            {step === 2 && "Étape 2: Récupérer vos clés API PayPal & Clé Resend"}
            {step === 3 && "Étape 3: Configurer les variables d'environnement sur Vercel"}
            {step === 4 && "Étape 4: Tester votre système de paiement"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-200">
          {step === 1 && (
            <>
              <p>
                Pour que votre site puisse communiquer avec PayPal et recevoir des paiements, vous devez créer une
                application dans votre compte développeur PayPal.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Allez sur le{" "}
                  <a
                    href="https://developer.paypal.com/dashboard/applications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Dashboard Développeur PayPal
                    <ExternalLink className="inline-block w-4 h-4 ml-1" />
                  </a>
                  .
                </li>
                <li>Connectez-vous avec votre compte PayPal (celui de `celinevalente.pro@gmail.com`).</li>
                <li>Assurez-vous d'être sur l'onglet "My Apps & Credentials".</li>
                <li>Cliquez sur le bouton "Create App" (Créer une application).</li>
                <li>Donnez un nom à votre application (ex: "Mon Business Digital").</li>
                <li>
                  Sélectionnez le compte "Sandbox" (pour les tests) ou "Live" (pour les paiements réels). Pour le
                  moment, choisissez "Live" si vous êtes prêt à recevoir de vrais paiements.
                </li>
                <li>Cliquez sur "Create App".</li>
              </ol>
              <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700">
                J'ai créé mon application PayPal
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <p>
                Maintenant que votre application est créée, vous devez récupérer les clés API nécessaires pour la
                connecter à votre site. Vous aurez aussi besoin d'une clé pour l'envoi d'emails.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Sur la page de votre application PayPal, vous verrez un "Client ID" et un "Secret". Copiez-les et
                  collez-les ci-dessous.
                </li>
                <li>
                  Pour l'envoi d'emails automatiques, créez un compte gratuit sur{" "}
                  <a
                    href="https://resend.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Resend
                    <ExternalLink className="inline-block w-4 h-4 ml-1" />
                  </a>
                  . Une fois inscrit, créez une nouvelle clé API et collez-la ci-dessous.
                </li>
              </ol>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientId" className="text-white">
                    PayPal Client ID
                  </Label>
                  <Input
                    id="clientId"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Votre Client ID PayPal"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="clientSecret" className="text-white">
                    PayPal Client Secret
                  </Label>
                  <Input
                    id="clientSecret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    placeholder="Votre Client Secret PayPal"
                    type="password"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Separator className="my-4 bg-gray-600" />
                <div>
                  <Label htmlFor="resendApiKey" className="text-white">
                    Resend API Key
                  </Label>
                  <Input
                    id="resendApiKey"
                    value={resendApiKey}
                    onChange={(e) => setResendApiKey(e.target.value)}
                    placeholder="Votre clé API Resend (ex: re_123abc...)"
                    type="password"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep(3)}
                disabled={!clientId || !clientSecret || !resendApiKey}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                J'ai mes clés, passer à l'étape suivante
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <p>
                Maintenant, nous allons ajouter ces clés en toute sécurité à votre projet sur Vercel. Ces clés sont des
                informations sensibles et ne doivent jamais être directement dans le code.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Allez sur votre{" "}
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Dashboard Vercel
                    <ExternalLink className="inline-block w-4 h-4 ml-1" />
                  </a>
                  .
                </li>
                <li>Sélectionnez votre projet (ex: "digital-products-business").</li>
                <li>Cliquez sur l'onglet "Settings" (Paramètres).</li>
                <li>Cliquez sur "Environment Variables" (Variables d'environnement).</li>
                <li>
                  Ajoutez les variables suivantes (copiez-collez les valeurs que vous avez récupérées à l'étape 2) :
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      <code className="bg-gray-700 p-1 rounded">PAYPAL_CLIENT_ID</code> :{" "}
                      <span className="font-mono text-green-400">{clientId || "Non renseigné"}</span>
                    </li>
                    <li>
                      <code className="bg-gray-700 p-1 rounded">PAYPAL_CLIENT_SECRET</code> :{" "}
                      <span className="font-mono text-green-400">{clientSecret ? "********" : "Non renseigné"}</span>
                    </li>
                    <li>
                      <code className="bg-gray-700 p-1 rounded">PAYPAL_ENVIRONMENT</code> :{" "}
                      <span className="font-mono text-green-400">production</span> (pour les paiements réels)
                    </li>
                    <li>
                      <code className="bg-gray-700 p-1 rounded">RESEND_API_KEY</code> :{" "}
                      <span className="font-mono text-green-400">{resendApiKey ? "********" : "Non renseigné"}</span>
                    </li>
                  </ul>
                </li>
                <li>
                  **TRÈS IMPORTANT :** Après avoir ajouté ou modifié ces variables, Vercel vous demandera de
                  **redéployer votre projet**. Faites-le pour que les changements prennent effet !
                </li>
              </ol>
              <Button onClick={() => setStep(4)} className="w-full bg-blue-600 hover:bg-blue-700">
                J'ai configuré Vercel et redéployé
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <p>
                Félicitations ! Toutes les configurations sont en place. Il est temps de faire un test pour s'assurer
                que tout fonctionne parfaitement.
              </p>
              <p>
                Nous allons simuler un petit paiement de 1€ pour le "Guide Complet : Gagner de l'Argent en Ligne" en
                utilisant votre configuration PayPal.
              </p>
              <Button
                onClick={handleTestPayment}
                disabled={testPaymentStatus === "loading"}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {testPaymentStatus === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Test en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Lancer le test de paiement (1€)
                  </>
                )}
              </Button>
              {testPaymentStatus === "success" && (
                <div className="mt-4 p-3 bg-green-600/20 border border-green-500/30 rounded flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300">{testPaymentMessage}</p>
                </div>
              )}
              {testPaymentStatus === "failed" && (
                <div className="mt-4 p-3 bg-red-600/20 border border-red-500/30 rounded flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-300">{testPaymentMessage}</p>
                </div>
              )}
              <p className="mt-6 text-center text-lg font-semibold text-white">
                Si le test est réussi, votre business est prêt à générer des revenus réels ! 🎉
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
