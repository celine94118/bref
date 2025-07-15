"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Package, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface Sale {
  productId: string
  productName: string
  price: number
  paymentId: string
  paypalEmail: string
  date: string
  status: string
}

export default function SalesDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [recentSales, setRecentSales] = useState<Sale[]>([])

  useEffect(() => {
    // Simuler la récupération des données de ventes (en réalité, depuis une base de données)
    const storedSales = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("sale-")) {
        try {
          storedSales.push(JSON.parse(localStorage.getItem(key) || "{}"))
        } catch (e) {
          console.error("Erreur parsing sale:", e)
        }
      }
    }

    const validSales = storedSales.filter((s) => s.status === "completed" && s.price)
    const revenue = validSales.reduce((sum, sale) => sum + sale.price, 0)
    const salesCount = validSales.length

    setTotalRevenue(revenue)
    setTotalSales(salesCount)
    setRecentSales(validSales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5))
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">📊 Tableau de Bord des Ventes</h1>
      <p className="text-center text-lg text-gray-300 mb-12">Suivez vos performances et vos revenus en temps réel.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-green-600/20 border-green-500/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)}€</div>
            <p className="text-xs text-green-300">+20.1% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-600/20 border-blue-500/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <Package className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-blue-300">+180 depuis la dernière heure</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-600/20 border-purple-500/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-purple-300">+19% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-600/20 border-yellow-500/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7%</div>
            <p className="text-xs text-yellow-300">+0.5% depuis la semaine dernière</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/30 border-gray-700/50 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Ventes Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentSales.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Aucune vente récente pour le moment. Commencez à promouvoir vos produits !
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-gray-400">Produit</th>
                    <th className="py-2 px-4 text-gray-400">Prix</th>
                    <th className="py-2 px-4 text-gray-400">Date</th>
                    <th className="py-2 px-4 text-gray-400">ID Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.paymentId} className="border-b border-gray-700 last:border-b-0">
                      <td className="py-2 px-4">{sale.productName}</td>
                      <td className="py-2 px-4 text-green-400">{sale.price.toFixed(2)}€</td>
                      <td className="py-2 px-4">{new Date(sale.date).toLocaleString()}</td>
                      <td className="py-2 px-4 text-gray-500 text-sm">{sale.paymentId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
