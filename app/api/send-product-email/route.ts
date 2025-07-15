import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialisez Resend avec votre clé API
// Assurez-vous que RESEND_API_KEY est définie dans vos variables d'environnement Vercel
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { transaction, product, customerEmail } = await request.json()

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY non configurée. L'envoi d'emails est désactivé.")
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY non configurée. L'envoi d'emails est désactivé.",
        },
        { status: 500 },
      )
    }

    if (!customerEmail) {
      console.error("Email client manquant pour l'envoi du produit.")
      return NextResponse.json(
        {
          success: false,
          error: "Email client manquant.",
        },
        { status: 400 },
      )
    }

    // Envoyer l'email de confirmation et de livraison du produit
    const { data, error } = await resend.emails.send({
      from: "Votre Business <onboarding@resend.dev>", // REMPLACEZ PAR VOTRE DOMAINE VÉRIFIÉ SUR RESEND
      to: [customerEmail],
      subject: `Votre achat : ${product.name} - Téléchargement Instantané !`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
            .header { background-color: #f4f4f4; padding: 10px 0; text-align: center; border-bottom: 1px solid #ddd; }
            .content { padding: 20px 0; }
            .button { display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
            .footer { text-align: center; font-size: 0.8em; color: #666; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Merci pour votre achat !</h2>
            </div>
            <div class="content">
              <p>Bonjour ${transaction.payer.payer_info.first_name || "Cher client"},</p>
              <p>Nous vous remercions pour votre achat de <strong>"${product.name}"</strong> sur notre plateforme.</p>
              <p>Votre paiement de <strong>${product.price.toFixed(2)}€</strong> a été traité avec succès.</p>
              <p>Vous pouvez télécharger votre produit en cliquant sur le bouton ci-dessous :</p>
              <p style="text-align: center; margin-top: 20px;">
                <a href="${product.downloadUrl}" class="button">Télécharger votre produit</a>
              </p>
              <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
              <p><a href="${product.downloadUrl}">${product.downloadUrl}</a></p>
              <p>ID de transaction PayPal : ${transaction.id}</p>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <p>Cordialement,</p>
              <p>Céline Valente</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Votre Business. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Erreur serveur lors de l'envoi de l'email:", error)
    return NextResponse.json({ success: false, error: "Erreur serveur lors de l'envoi de l'email" }, { status: 500 })
  }
}
