"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Rocket, Link2, Download, ExternalLink } from "lucide-react";

const REPO_URL = "https://github.com/your-repo-url";
const PAYPAL_EMAIL = "celinevalente.pro@gmail.com";

export default function DeploymentFinalGuide() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        🚀 Votre Business est Prêt à Décoller !
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Félicitations ! Toutes les pièces du puzzle sont en place. Il est temps de mettre votre business en ligne et de
        commencer à générer des revenus.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Étape 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Étape 1: Télécharger et Préparer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Le code complet de votre business automatisé est prêt. Vous pouvez le télécharger directement depuis cette
              interface.
            </p>
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le Code Complet
            </Button>
            <p className="text-sm text-muted-foreground">
              (Cliquez sur le bouton "Download Code" en haut à droite de cette fenêtre)
            </p>
            <p>
              Une fois téléchargé, décompressez le fichier. Vous obtiendrez un dossier avec tous les fichiers de votre
              projet Next.js.
            </p>
          </CardContent>
        </Card>

        {/* Étape 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Étape 2: Uploader sur GitHub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Vercel déploie les projets directement depuis GitHub. Vous devez donc uploader votre code sur un nouveau
              dépôt GitHub.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Créez un nouveau dépôt sur{" "}
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  GitHub
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
              <li>
                Suivez les instructions de GitHub pour uploader votre code dans ce nouveau dépôt.
              </li>
            </ol>
            <Button className="w-full">
              <Github className="w-4 h-4 mr-2" />
              Créer un Dépôt GitHub
            </Button>
          </CardContent>
        </Card>

        {/* Étape 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Étape 3: Déployer sur Vercel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Vercel est la plateforme idéale pour déployer votre application Next.js. C'est rapide et gratuit.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Allez sur{" "}
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  vercel.com/new
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </li>
              <li>Connectez-vous avec votre compte GitHub</li>
              <li>Importez votre nouveau dépôt GitHub</li>
              <li>
                <strong>Important :</strong> Ajoutez les variables d'environnement :
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li><code>PAYPAL_CLIENT_ID</code></li>
                  <li><code>PAYPAL_CLIENT_SECRET</code></li>
                  <li><code>PAYPAL_ENVIRONMENT</code> (mettez <code>production</code>)</li>
                  <li><code>RESEND_API_KEY</code></li>
                </ul>
              </li>
              <li>Cliquez sur "Deploy"</li>
            </ol>
            <Button className="w-full">
              <Rocket className="w-4 h-4 mr-2" />
              Déployer sur Vercel
            </Button>
          </CardContent>
        </Card>

        {/* Étape 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Étape 4: Partager et Gagner !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Une fois le déploiement terminé (cela prend quelques minutes), Vercel vous donnera une URL unique pour
              votre site.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Copiez l'URL de votre site Vercel</li>
              <li>Partagez cette URL partout</li>
              <li>
                Les paiements arriveront directement sur votre compte PayPal <code>{PAYPAL_EMAIL}</code>
              </li>
            </ol>
            <Button className="w-full">
              <Link2 className="w-4 h-4 mr-2" />
              Accéder à mon site (après déploiement)
            </Button>
            <p className="text-sm text-muted-foreground">
              N'oubliez pas de visiter <code>/setup-paypal</code> sur votre site déployé.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Félicitations !</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vous avez maintenant un business de produits numériques entièrement automatisé, prêt à générer des revenus
          passifs.
        </p>
      </div>
    </div>
  );
}
