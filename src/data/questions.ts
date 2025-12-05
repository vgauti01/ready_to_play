type Question = {
  id: string;
  question: string;
  options: { label: string; value: string; icon: string }[];
};

// --- 1. LES DONNÉES DU QCM ---
export const questions: Question[] = [
  {
    id: 'niveau',
    question: 'Quel est votre niveau de pratique actuel ?',
    options: [
      { label: "Débutant (Je m'y mets)", value: 'debutant', icon: '🌱' },
      { label: 'Intermédiaire (Régulier)', value: 'intermediaire', icon: '🏃' },
      { label: 'Expert (Intensif)', value: 'expert', icon: '🔥' },
    ],
  },
  {
    id: 'sport',
    question: 'Quel sport pratiquez-vous ?',
    options: [
      { label: 'Course à pied', value: 'running', icon: '👟' },
      { label: 'Cyclisme', value: 'cycling', icon: '🚴' },
      { label: 'Natation', value: 'swimming', icon: '🏊' },
      { label: 'Fitness / Musculation', value: 'fitness', icon: '🏋️' },
      { label: "Sports d'équipe", value: 'team_sports', icon: '⚽' },
      { label: 'Gymnastique / Yoga', value: 'gym_yoga', icon: '🤸' },
      { label: 'Autre', value: 'other', icon: '🏅' },
    ],
  },
  {
    id: 'objectif',
    question: 'Quel est votre objectif principal ?',
    options: [
      { label: 'Renforcement Musculaire', value: 'muscle', icon: '💪' },
      { label: 'Souplesse & Détente', value: 'yoga', icon: '🧘' },
      { label: 'Perte de poids / Cardio', value: 'cardio', icon: '❤️' },
    ],
  },
  {
    id: 'zone_sensible',
    question: 'Avez-vous une zone sensible ou douloureuse ?',
    options: [
      { label: 'Non, tout va bien', value: 'none', icon: '✅' },
      { label: 'Le Dos / Lombaires', value: 'dos', icon: '🦴' },
      { label: 'Les Genoux', value: 'genoux', icon: '🦵' },
    ],
  },
];
