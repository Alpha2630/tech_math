export const metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        TechMathGuide est édité par [Ton nom complet], à titre individuel.
        <br />
        Contact : [ton-email@exemple.com]
        <br />
        [Adresse — obligatoire si tu vends quoi que ce soit ou si tu es
        auto-entrepreneur ; sinon tu peux l'omettre en tant que particulier
        selon la réglementation de ton pays, vérifie ce point]
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par [nom de l'hébergeur, ex. Vercel Inc.]
        <br />
        [Adresse de l'hébergeur — généralement disponible dans leur page de
        mentions légales / conditions]
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu pédagogique (textes, exercices, illustrations)
        présent sur TechMathGuide est la propriété de son éditeur, sauf
        mention contraire. Toute reproduction sans autorisation est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de tes données personnelles est détaillé dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </div>
  );
}