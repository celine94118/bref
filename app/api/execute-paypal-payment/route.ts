import { type NextRequest, NextResponse } from "next/server"
import { getPaypalConfig, PRODUCTS } from "@/lib/paypal-config"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, payerId } = await request.json()
    const paypalConfig = getPaypalConfig()

    if (!paypalConfig.clientId || !paypalConfig.clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "PayPal API keys are not configured on the server.",
        },
        { status: 500 },
      )
    }

    // 1. Obtenir un jeton d'accès PayPal
    const auth = Buffer.from(`${paypalConfig.clientId}:${paypalConfig.clientSecret}`).toString("base64")
    const tokenResponse = await fetch(`${paypalConfig.baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok) {
      console.error("Erreur obtention token PayPal:", tokenData)
      return NextResponse.json(
        {
          success: false,
          error: tokenData.error_description || "Impossible d'obtenir le jeton d'accès PayPal.",
        },
        { status: tokenResponse.status },
      )
    }
    const accessToken = tokenData.access_token

    // 2. Exécuter le paiement PayPal
    const executePaymentResponse = await fetch(`${paypalConfig.baseUrl}/v1/payments/payment/${paymentId}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ payer_id: payerId }),
    })

    const executePaymentData = await executePaymentResponse.json()

    if (!executePaymentResponse.ok) {
      console.error("Erreur exécution paiement PayPal:", executePaymentData)
      return NextResponse.json(
        {
          success: false,
          error: executePaymentData.message || "Erreur lors de l'exécution du paiement PayPal.",
        },
        { status: executePaymentResponse.status },
      )
    }

    // Paiement réussi !
    const transaction = executePaymentData.transactions[0]
    const purchasedProduct = PRODUCTS.find((p) => p.id === transaction.item_list.items[0].sku)

    if (!purchasedProduct) {
      console.error("Produit acheté introuvable dans la configuration:", transaction.item_list.items[0].sku)
      return NextResponse.json(
        {
          success: false,
          error: "Produit acheté introuvable.",
        },
        { status: 500 },
      )
    }

    // 3. Envoyer l'email de livraison du produit
    const sendEmailResponse = await fetch(`${request.nextUrl.origin}/api/send-product-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction: executePaymentData,
        product: purchasedProduct,
        customerEmail: executePaymentData.payer.payer_info.email, // Email du client PayPal
      }),
    })

    const emailResult = await sendEmailResponse.json()
    if (!sendEmailResponse.ok || !emailResult.success) {
      console.error("Erreur envoi email produit:", emailResult.error)
      // Le paiement a réussi, mais l'email a échoué. Gérer cette situation (ex: log, alerte admin).
      // On renvoie quand même succès pour le paiement, mais avec un avertissement.
      return NextResponse.json({
        success: true,
        message: "Paiement réussi, mais erreur lors de l'envoi de l'email de produit.",
        transaction: executePaymentData,
        emailError: emailResult.error,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Paiement et livraison du produit réussis !",
      transaction: executePaymentData,
    })
  } catch (error) {
    console.error("Erreur serveur dans execute-paypal-payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur interne.",
      },
      { status: 500 },
    )
  }
}
