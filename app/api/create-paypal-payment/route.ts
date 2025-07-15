import { type NextRequest, NextResponse } from "next/server"
import { getPaypalConfig } from "@/lib/paypal-config"

export async function POST(request: NextRequest) {
  try {
    const { productId, productName, price } = await request.json()
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

    // 2. Créer le paiement PayPal
    const createPaymentResponse = await fetch(`${paypalConfig.baseUrl}/v1/payments/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: price.toFixed(2),
              currency: paypalConfig.currency,
            },
            description: `Achat de ${productName}`,
            item_list: {
              items: [
                {
                  name: productName,
                  sku: productId,
                  price: price.toFixed(2),
                  currency: paypalConfig.currency,
                  quantity: 1,
                },
              ],
            },
            payee: {
              email: paypalConfig.recipientEmail, // Votre email PayPal
            },
          },
        ],
        redirect_urls: {
          return_url: `${request.nextUrl.origin}/payment-success`, // Page de succès après paiement
          cancel_url: `${request.nextUrl.origin}/payment-cancel`, // Page d'annulation
        },
      }),
    })

    const createPaymentData = await createPaymentResponse.json()

    if (!createPaymentResponse.ok) {
      console.error("Erreur création paiement PayPal:", createPaymentData)
      return NextResponse.json(
        {
          success: false,
          error: createPaymentData.message || "Erreur lors de la création du paiement PayPal.",
        },
        { status: createPaymentResponse.status },
      )
    }

    const approvalUrl = createPaymentData.links.find((link: any) => link.rel === "approval_url")?.href

    if (!approvalUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "URL d'approbation PayPal introuvable.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      paymentId: createPaymentData.id,
      approvalUrl,
    })
  } catch (error) {
    console.error("Erreur serveur dans create-paypal-payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur interne.",
      },
      { status: 500 },
    )
  }
}
