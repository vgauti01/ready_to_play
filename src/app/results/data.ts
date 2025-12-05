// movementsData.js

type Movement = {
  id: string; // Identifiant unique
  title: string; // Titre du mouvement
  animationName: string; // Nom de l'animation associée
  image: string; // URL de l'image miniature
  category: string[]; // sports / objectifs
  level: string[]; // niveaux
  painAvoid: string[]; // zones douloureuses à éviter
  painFriendly: string[]; // zones douloureuses compatibles
  description: string; // description courte
  isWarning?: boolean; // Avertissement si nécessaire
};

export const movementsLibrary: Movement[] = [
  // --- JAMBES & FESSIERS ---
  {
    id: 'air_squat',
    title: 'Squat Classique',
    animationName: 'air_squat',
    image: '/images/thumbnails/air_squat.jpg',
    category: ['muscle', 'fitness', 'running'],
    level: ['debutant', 'intermediaire'],
    painAvoid: ['genoux'],
    painFriendly: [],
    description: 'Le mouvement roi pour renforcer cuisses et fessiers.',
  },
  {
    id: 'pistol',
    title: 'Pistol Squat',
    animationName: 'pistol',
    image: '/images/thumbnails/pistol.jpg',
    category: ['muscle', 'expert', 'fitness'],
    level: ['expert'],
    painAvoid: ['genoux', 'dos'],
    painFriendly: [],
    description: 'Squat sur une jambe. Demande force et équilibre extrêmes.',
  },

  // --- CARDIO ---
  {
    id: 'burpee',
    title: 'Burpees',
    animationName: 'burpee',
    image: '/images/thumbnails/burpee.jpg',
    category: ['cardio', 'fitness', 'expert'],
    level: ['intermediaire', 'expert'],
    painAvoid: ['dos', 'genoux'],
    painFriendly: [],
    description: 'Exercice complet et intense pour le cœur et tout le corps.',
  },
  {
    id: 'jumping_jacks',
    title: 'Jumping Jacks',
    animationName: 'jumping_jacks',
    image: '/images/thumbnails/jumping_jacks.jpg',
    category: ['cardio', 'fitness', 'debutant'],
    level: ['debutant'],
    painAvoid: ['genoux'], // Impacts
    painFriendly: [],
    description: "Idéal pour l'échauffement et faire monter le cardio.",
  },
  {
    id: 'cross_jumps',
    title: 'Sauts Croisés',
    animationName: 'cross_jumps',
    image: '/images/thumbnails/cross_jumps.jpg',
    category: ['cardio', 'gym_yoga'],
    level: ['intermediaire'],
    painAvoid: ['genoux'],
    painFriendly: [],
    description: 'Travaille la coordination et le cardio.',
  },
  {
    id: 'speedbag',
    title: 'Boxe / Speedbag',
    animationName: 'speedbag',
    image: '/images/thumbnails/speedbag.jpg',
    category: ['cardio', 'fitness'],
    level: ['debutant', 'intermediaire'],
    painAvoid: [],
    painFriendly: [],
    description: 'Excellent pour les épaules et le rythme cardiaque.',
  },

  // --- HAUT DU CORPS (BRAS / PECS) ---
  {
    id: 'push_up',
    title: 'Pompes Classiques',
    animationName: 'push_up',
    image: '/images/thumbnails/push_up.jpg',
    category: ['muscle', 'fitness', 'team_sports'],
    level: ['intermediaire'],
    painAvoid: ['dos'], // Attention cambrure
    painFriendly: [],
    description: 'Renforcement global du buste (pectoraux, triceps).',
  },
  {
    id: 'jump_push_up',
    title: 'Pompes Sautées',
    animationName: 'jump_push_up',
    image: '/images/thumbnails/jump_push_up.jpg',
    category: ['muscle', 'expert', 'fitness'],
    level: ['expert'],
    painAvoid: ['dos', 'poignets'],
    painFriendly: [],
    description: 'Explosivité pour les pectoraux. Réservé aux confirmés.',
  },
  {
    id: 'biceps_curl',
    title: 'Curl Biceps',
    animationName: 'biceps_curl',
    image: '/images/thumbnails/biceps_curl.jpg',
    category: ['muscle', 'fitness'],
    level: ['debutant'],
    painAvoid: [],
    painFriendly: [],
    description: 'Isolation des biceps avec haltères ou élastiques.',
  },
  {
    id: 'front_raises',
    title: 'Élévations Frontales',
    animationName: 'front_raises',
    image: '/images/thumbnails/front_raises.jpg',
    category: ['muscle', 'fitness'],
    level: ['debutant'],
    painAvoid: ['epaules'],
    painFriendly: [],
    description: "Renforcement de l'avant de l'épaule.",
  },

  // --- ABDOS & GAINAGE ---
  {
    id: 'plank',
    title: 'La Planche',
    animationName: 'plank',
    image: '/images/thumbnails/plank.jpg',
    category: ['muscle', 'fitness', 'dos', 'swimming'],
    level: ['debutant', 'intermediaire'],
    painAvoid: [],
    painFriendly: ['dos'],
    description: 'Le gainage statique indispensable pour le dos.',
  },
  {
    id: 'situps',
    title: 'Sit-ups',
    animationName: 'situps',
    image: '/images/thumbnails/situps.jpg',
    category: ['muscle', 'fitness'],
    level: ['debutant'],
    painAvoid: ['dos'], // Attention lombaires
    painFriendly: [],
    description: 'Relevés de buste classiques pour les abdominaux.',
  },
  {
    id: 'bicycle_crunch',
    title: 'Crunch Bicyclette',
    animationName: 'bicycle_crunch',
    image: '/images/thumbnails/bicycle_crunch.jpg',
    category: ['muscle', 'fitness'],
    level: ['intermediaire'],
    painAvoid: ['dos'],
    painFriendly: [],
    description: 'Cible les obliques et le grand droit.',
  },
  {
    id: 'circle_crunch',
    title: 'Crunch Circulaire',
    animationName: 'circle_crunch',
    image: '/images/thumbnails/circle_crunch.jpg',
    category: ['muscle', 'gym_yoga'],
    level: ['intermediaire'],
    painAvoid: ['dos'],
    painFriendly: [],
    description: 'Travail de la sangle abdominale en rotation.',
  },
];
