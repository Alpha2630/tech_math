export type Domain = {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  lessons: {
    slug: string;
    title: string;
    description: string;
    level: "débutant" | "intermédiaire" | "avancé";
    duration: string;
  }[];
};

export const domains: Domain[] = [
  {
    slug: "cybersecurity",
    name: "Cybersécurité",
    nameEn: "Cybersecurity",
    description:
      "Cryptographie, hachage, algorithmes de sécurité et maths derrière la protection des systèmes.",
    icon: "shield",
    color: "from-cyan-500 to-blue-600",
    lessons: [
      {
        slug: "crypto-basics",
        title: "Les maths de la cryptographie moderne",
        description:
          "Modulo, exponentiation modulaire et RSA expliqués simplement.",
        level: "débutant",
        duration: "25 min",
      },
      {
        slug: "hash-functions",
        title: "Fonctions de hachage et intégrité",
        description: "SHA, collisions et pourquoi les maths comptent.",
        level: "intermédiaire",
        duration: "20 min",
      },
    ],
  },
  {
    slug: "ai-ml",
    name: "Intelligence Artificielle / ML",
    nameEn: "AI / Machine Learning",
    description:
      "Algèbre linéaire, probabilités, gradients et comment les maths font apprendre les machines.",
    icon: "brain",
    color: "from-purple-500 to-cyan-500",
    lessons: [
      {
        slug: "linear-algebra-ml",
        title: "Algèbre linéaire pour le Machine Learning",
        description:
          "Vecteurs, matrices et pourquoi c'est le cœur du deep learning.",
        level: "débutant",
        duration: "30 min",
      },
      {
        slug: "gradient-descent",
        title: "Descente de gradient expliquée",
        description: "Dérivées, fonctions de coût et optimisation en pratique.",
        level: "intermédiaire",
        duration: "25 min",
      },
    ],
  },
  {
    slug: "data-science",
    name: "Data Science",
    nameEn: "Data Science",
    description:
      "Statistiques, probabilités, distributions et analyse de données avec code.",
    icon: "bar-chart",
    color: "from-emerald-500 to-cyan-500",
    lessons: [
      {
        slug: "stats-fundamentals",
        title: "Statistiques fondamentales pour la data",
        description: "Moyenne, variance, distributions et intuition.",
        level: "débutant",
        duration: "22 min",
      },
      {
        slug: "bayes-theorem",
        title: "Théorème de Bayes en pratique",
        description: "Probabilités conditionnelles et applications réelles.",
        level: "intermédiaire",
        duration: "20 min",
      },
    ],
  },
  {
    slug: "robotics",
    name: "Robotique & Automatisation",
    nameEn: "Robotics",
    description:
      "Géométrie, transformations, cinématique et contrôle pour les robots.",
    icon: "bot",
    color: "from-orange-500 to-cyan-500",
    lessons: [
      {
        slug: "transforms-3d",
        title: "Transformations 3D et matrices de rotation",
        description: "Comment un robot sait où il est dans l'espace.",
        level: "intermédiaire",
        duration: "28 min",
      },
      {
        slug: "vectors-dot-cross",
        title: "Produit scalaire et produit vectoriel",
        description:
          "Calculer des angles, des projections et détecter des collisions.",
        level: "intermédiaire",
        duration: "22 min",
      },
    ],
  },
  {
    slug: "web-dev",
    name: "Développement Web",
    nameEn: "Web Development",
    description:
      "Algorithmes, complexité, maths discrètes et performance frontend/backend.",
    icon: "globe",
    color: "from-blue-500 to-cyan-400",
    lessons: [
      {
        slug: "big-o-complexity",
        title: "Complexité algorithmique (Big O)",
        description:
          "Pourquoi certains codes sont lents et comment le mesurer.",
        level: "débutant",
        duration: "20 min",
      },
      {
        slug: "graph-theory-web",
        title: "Théorie des graphes dans le web",
        description: "Réseaux, routing et recommandations.",
        level: "intermédiaire",
        duration: "25 min",
      },
    ],
  },
  {
    slug: "mobile",
    name: "Développement Mobile",
    nameEn: "Mobile Development",
    description:
      "Géométrie, physics engines, optimisation et maths pour apps performantes.",
    icon: "smartphone",
    color: "from-pink-500 to-cyan-500",
    lessons: [
      {
        slug: "physics-mobile",
        title: "Physique et maths dans les jeux mobiles",
        description: "Vecteurs, collision et animations fluides.",
        level: "intermédiaire",
        duration: "25 min",
      },
      {
        slug: "trigonometry-touch",
        title: "Trigonométrie pour les interactions tactiles",
        description:
          "Swipe, rotation, drag — calculer des angles pour des gestes fluides.",
        level: "intermédiaire",
        duration: "22 min",
      },
    ],
  },
  {
    slug: "devops",
    name: "DevOps & Cloud",
    nameEn: "DevOps / Cloud",
    description:
      "Probabilités, files d'attente, scaling et maths derrière l'infrastructure.",
    icon: "cloud",
    color: "from-sky-500 to-indigo-500",
    lessons: [
      {
        slug: "queueing-theory",
        title: "Théorie des files d'attente",
        description:
          "Pourquoi ton serveur plante sous charge et comment le prévoir.",
        level: "intermédiaire",
        duration: "22 min",
      },
      {
        slug: "availability-sla",
        title: "Disponibilité et calcul des SLA",
        description:
          'Comprendre les "9" du uptime et pourquoi 99.9% n\'est pas 99.99%.',
        level: "intermédiaire",
        duration: "18 min",
      },
    ],
  },
];

export function getDomain(slug: string) {
  return domains.find((d) => d.slug === slug);
}

export function getLesson(domainSlug: string, lessonSlug: string) {
  const domain = getDomain(domainSlug);
  if (!domain) return null;
  return domain.lessons.find((l) => l.slug === lessonSlug) || null;
}