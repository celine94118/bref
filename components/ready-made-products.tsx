"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, DollarSign } from "lucide-react"
import { PRODUCTS } from "@/lib/paypal-config" // Importez les produits depuis la config

export default function ReadyMadeProducts() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">🎁 Vos Produits Numériques Prêts à Vendre</h1>
      <p className="text-center text-lg text-gray-300 mb-12">
        Voici les 5 produits numériques que j'ai créés pour vous. Ils sont prêts à être vendus et livrés automatiquement
        après paiement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <Card key={product.id} className="bg-gray-800/30 border-gray-700/50 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-400">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-green-400">{product.price.toFixed(2)}€</span>
                <Button variant="outline" className="text-blue-300 border-blue-400 hover:bg-blue-900 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Voir le contenu
                </Button>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Vendre ce produit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Comment ça marche ?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Chaque produit est lié à un système de paiement PayPal. Une fois le paiement effectué, le produit est
          automatiquement envoyé par email à l'acheteur. Vous n'avez rien à faire !
        </p>
        <Button className="mt-6 bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
          Commencer à vendre maintenant !
        </Button>
      </div>
    </div>
  )
}
