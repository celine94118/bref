"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, CreditCard, CheckCircle, Loader2, XCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  description: string
  downloadUrl: string
}

interface PayPalButtonProps {
  product: Product
}

export default function PayPalPaymentButton({ product }: PayPalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failed" | null>(null)
  const [message, setMessage] = useState("")

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus(null)
    setMessage("")

    try {
      // 1. Créer le paiement PayPal via notre API route
      const createPaymentResponse = await fetch("/api/create-paypal-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
        }),
      })

      const createPaymentData = await createPaymentResponse.json()

      if (!createPaymentResponse.ok || !createPaymentData.approvalUrl) {
        setPaymentStatus("failed")
        setMessage(createPaymentData.error || "Erreur lors de la création du paiement PayPal.")
        setIsProcessing(false)
        return
      }

      // 2. Rediriger l'utilisateur vers PayPal pour approbation
      window.location.href = createPaymentData.approvalUrl
    } catch (error) {
      console.error("Erreur lors du processus de paiement:", error)
      setPaymentStatus("failed")
      setMessage("Une erreur inattendue est survenue. Veuillez réessayer.")
      setIsProcessing(false)
    }
  }

  const downloadProduct = () => {
    window.open(product.downloadUrl, "_blank")
  }

  // Ce composant est conçu pour être utilisé sur une page de produit.
  // La logique de redirection après paiement est gérée par les API routes et la page de succès/échec.
  // Pour un test simple, vous pouvez simuler le succès ici si vous n'avez pas encore configuré les webhooks.

  if (paymentStatus === "success") {
    return (
      <Card className="bg-green-600/20 border-green-500/30">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Paiement Réussi ! 🎉</h3>
          <p className="text-green-300 mb-4">Votre paiement de {product.price}€ a été traité avec succès.</p>
          <Button onClick={downloadProduct} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Télécharger {product.name}
          </Button>
          <p className="text-gray-400 text-sm mt-4">
            Un email de confirmation a été envoyé avec le lien de téléchargement.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <Card className="bg-red-600/20 border-red-500/30">
        <CardContent className="p-6 text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Paiement Échoué 😔</h3>
          <p className="text-red-300 mb-4">
            {message || "Une erreur est survenue lors du traitement de votre paiement."}
          </p>
          <Button onClick={handlePayment} className="bg-red-600 hover:bg-red-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Réessayer le paiement
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge className="bg-green-600 text-lg px-4 py-2">{product.price.toFixed(2)}€</Badge>
            <Badge variant="outline" className="text-blue-300 border-blue-400">
              Téléchargement Instantané
            </Badge>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Redirection vers PayPal...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Payer {product.price.toFixed(2)}€ avec PayPal
            </>
          )}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            💳 Paiement sécurisé par PayPal
            <br />💰 Argent reçu sur : celinevalente.pro@gmail.com
            <br />📧 Produit envoyé instantanément par email
          </p>
        </div>

        <div className="mt-4 bg-yellow-600/20 p-3 rounded border border-yellow-500/30">
          <p className="text-yellow-300 text-sm text-center">
            ⚡ <strong>Livraison instantanée :</strong> Recevez votre produit par email dans les 2 minutes après
            paiement
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
