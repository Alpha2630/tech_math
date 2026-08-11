export const metadata = {
  title: "Politique de confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert">
      <h1>Politique de confidentialité</h1>
      <p className="opacity-60 text-sm">Dernière mise à jour : [date]</p>

      <h2>1. Données collectées</h2>
      <p>Lorsque tu crées un compte sur TechMathGuide, nous collectons :</p>
      <ul>
        <li>Ton adresse email (via Supabase Auth)</li>
        <li>
          Ta progression pédagogique : leçons complétées, scores de quiz,
          dates de complétion
        </li>
      </ul>

      <h2>2. Utilisation des données</h2>
      <p>Ces données servent uniquement à :</p>
      <ul>
        <li>Te permettre de te connecter à ton compte</li>
        <li>Sauvegarder et afficher ta progression d'apprentissage</li>
        <li>Améliorer le contenu du site (statistiques agrégées et anonymes)</li>
      </ul>
      <p>Nous ne vendons ni ne partageons tes données avec des tiers à des fins commerciales.</p>

      <h2>3. Hébergement des données</h2>
      <p>
        Tes données sont hébergées par Supabase (infrastructure cloud). Voir
        leur{" "}
        <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
          politique de confidentialité
        </a>{" "}
        pour plus de détails.
      </p>

      <h2>4. Cookies</h2>
      <p>
        TechMathGuide utilise des cookies strictement nécessaires au
        fonctionnement de l'authentification (session utilisateur). Aucun
        cookie publicitaire ou de tracking tiers n'est utilisé.
      </p>

      <h2>5. Tes droits</h2>
      <p>
        Conformément au RGPD, tu peux à tout moment demander l'accès, la
        rectification ou la suppression de tes données en nous contactant à
        [ton-email@exemple.com].
      </p>

      <h2>6. Contact</h2>
      <p>
        Pour toute question relative à cette politique : [ton-email@exemple.com]
      </p>
    </div>
  );
}