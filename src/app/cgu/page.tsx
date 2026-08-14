export const metadata = {
  title: "Conditions Générales d'Utilisation",
};

export default function CGUPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert">
      <h1>Conditions Générales d'Utilisation</h1>
      <p className="opacity-60 text-sm">Dernière mise à jour : [date]</p>

      <h2>1. Objet</h2>
      <p>
        TechMathGuide est une plateforme éducative gratuite qui propose des
        leçons reliant mathématiques, informatique et anglais technique.
      </p>

      <h2>2. Accès au service</h2>
      <p>
        La lecture des leçons est accessible librement, sans compte. La
        création d'un compte est nécessaire pour sauvegarder ta progression
        et tes scores de quiz.
      </p>

      <h2>3. Compte utilisateur</h2>
      <p>
        Tu es responsable de la confidentialité de tes identifiants de
        connexion. Un compte est strictement personnel.
      </p>

      <h2>4. Contenu pédagogique</h2>
      <p>
        Le contenu est fourni à titre informatif et éducatif. Bien que nous
        nous efforcions d'assurer son exactitude, TechMathGuide ne garantit
        pas l'absence totale d'erreurs dans les leçons.
      </p>

      <h2>5. Comportement attendu</h2>
      <p>
        Tu t'engages à utiliser le service de bonne foi, sans tenter de
        perturber son fonctionnement (spam, tentatives d'intrusion, etc.).
      </p>

      <h2>6. Modification des CGU</h2>
      <p>
        Ces CGU peuvent être modifiées à tout moment. Les utilisateurs
        seront informés de tout changement substantiel.
      </p>

      <h2>7. Contact</h2>
      <p>[ton-email@exemple.com]</p>
    </div>
  );
}