export interface AffiliateProgram {
  id: string
  name: string
  category: string
  status: "ACTIF" | "INACTIF" | "PENDING"
  commission: number
  description: string
  totalEarnings: number
  clicks: number
  conversions: number
  conversionRate: number
  affiliateLink: string
  color: string
}

export interface AffiliateStats {
  totalEarnings: number
  totalClicks: number
  totalConversions: number
  averageConversionRate: number
  activePrograms: number
}
