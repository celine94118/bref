export class ContentGenerator {
  private affiliatePrograms = [
    {
      name: "Systeme.io",
      benefits: ["Tunnels de vente", "Email marketing", "Webinaires"],
      commission: "60€",
      description: "Plateforme tout-en-un pour entrepreneurs",
    },
    {
      name: "Shopify",
      benefits: ["E-commerce facile", "Templates pro", "Paiements sécurisés"],
      commission: "58€",
      description: "Leader mondial du e-commerce",
    },
    {
      name: "ClickFunnels",
      benefits: ["Tunnels optimisés", "Split testing", "Intégrations"],
      commission: "38.25€",
      description: "Créateur de tunnels de vente",
    },
  ]

  generateArticle(platform: string): string {
    const program = this.affiliatePrograms.find((p) => p.name === platform)
    if (!program) return ""

    return `
# Pourquoi ${program.name} est l'outil indispensable en 2024

${program.description} qui révolutionne la façon dont les entrepreneurs créent leur business en ligne.

## Les avantages clés :
${program.benefits.map((benefit) => `- ✅ ${benefit}`).join("\n")}

## Mon expérience personnelle
Après avoir testé ${program.name} pendant plusieurs mois, je peux confirmer que c'est un investissement qui se rentabilise rapidement.

## Offre spéciale
Profitez de mon lien partenaire pour bénéficier des meilleures conditions.

**Commission partenaire : ${program.commission} par vente**

[👉 Tester ${program.name} maintenant](LIEN_AFFILIATION)

---
*Article généré automatiquement par le système d'affiliation*
    `
  }

  generateSocialPost(platform: string): string {
    const program = this.affiliatePrograms.find((p) => p.name === platform)
    if (!program) return ""

    const posts = [
      `🚀 ${program.name} : ${program.description}
      
✅ ${program.benefits[0]}
✅ ${program.benefits[1]}
✅ Commission : ${program.commission}

Lien dans ma bio 👆

#affiliation #business #entrepreneur`,

      `💰 Nouvelle opportunité d'affiliation !

${program.name} offre ${program.commission} de commission par vente.

${program.description}

Qui veut se lancer ? 🔥

#affiliation #revenus #business`,

      `⚡ Test en cours : ${program.name}

Premiers résultats très prometteurs !
Commission : ${program.commission} par conversion

Je partage mon retour d'expérience bientôt 📊

#test #affiliation #business`,
    ]

    return posts[Math.floor(Math.random() * posts.length)]
  }

  generateEmail(platform: string): string {
    const program = this.affiliatePrograms.find((p) => p.name === platform)
    if (!program) return ""

    return `
Objet: 💰 Nouvelle opportunité : ${program.commission} par vente avec ${program.name}

Salut !

J'ai une excellente nouvelle à partager avec toi.

Je viens de découvrir ${program.name}, ${program.description.toLowerCase()}.

Ce qui m'a convaincu :
${program.benefits.map((benefit) => `• ${benefit}`).join("\n")}

Le plus intéressant ? Leur programme d'affiliation offre ${program.commission} de commission par vente !

Si tu cherches à diversifier tes revenus, c'est une opportunité à saisir.

[👉 Découvrir ${program.name}](LIEN_AFFILIATION)

À bientôt,
Céline

---
Pour te désabonner : [lien]
    `
  }
}
