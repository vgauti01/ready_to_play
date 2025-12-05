// src/data/productsData.js

export type Product = {
  id: string;
  brand: string;
  title: string;
  price: string;
  image: string;
  searchQuery: string;
  tags: string[];
};

/* ==========================================================================
   📦 BASE DE DONNÉES PRODUITS DÉCATHLON (SIMULÉE)
   ========================================================================== */
const INVENTORY: Product[] = [
  // --- MATÉRIEL DE MUSCULATION (CORENGTH) ---
  {
    id: 'halteres_hex',
    brand: 'CORENGTH',
    title: 'Haltères Hexagonaux 5kg (La paire)',
    price: '30,00 €',
    image:
      'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'halteres hexagonaux',
    tags: ['muscle', 'biceps_curl', 'squat', 'front_raises', 'fitness'],
  },
  {
    id: 'kettlebell_8',
    brand: 'CORENGTH',
    title: 'Kettlebell Fonte 8kg',
    price: '25,00 €',
    image:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'kettlebell 8kg',
    tags: ['muscle', 'squat', 'cross_jumps', 'fitness'],
  },
  {
    id: 'gilet_leste',
    brand: 'CORENGTH',
    title: 'Gilet Lesté 5kg Ajustable',
    price: '40,00 €',
    image:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'gilet lesté musculation',
    tags: ['expert', 'push_up', 'burpee', 'pistol', 'pull_up'],
  },
  {
    id: 'push_up_bars',
    brand: 'CORENGTH',
    title: 'Poignées de Pompes Ergonomiques',
    price: '7,00 €',
    image:
      'https://images.unsplash.com/photo-1598971639058-211a74a96aea?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'poignées pompes push up',
    tags: ['push_up', 'burpee', 'muscle', 'poignets'],
  },
  {
    id: 'barre_traction',
    brand: 'CORENGTH',
    title: 'Barre de Traction Murale',
    price: '25,00 €',
    image:
      'https://images.unsplash.com/photo-1598971639058-211a74a96aea?auto=format&fit=crop&w=500&q=80', // Placeholder
    searchQuery: 'barre traction',
    tags: ['dos', 'muscle', 'biceps_curl'],
  },

  // --- FITNESS & CARDIO (DOMYOS / KALENJI) ---
  {
    id: 'tapis_confort',
    brand: 'DOMYOS',
    title: 'Tapis Fitness Confort 10mm',
    price: '18,00 €',
    image:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'tapis fitness 10mm',
    tags: [
      'abdos',
      'plank',
      'situps',
      'bicycle_crunch',
      'circle_crunch',
      'yoga',
      'pilates',
      'gym_yoga',
    ],
  },
  {
    id: 'corde_sauter',
    brand: 'DOMYOS',
    title: 'Corde à sauter Vitesse',
    price: '5,00 €',
    image:
      'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'corde a sauter',
    tags: ['cardio', 'jumping_jacks', 'boxe', 'speedbag', 'warmup'],
  },
  {
    id: 'step_fitness',
    brand: 'DOMYOS',
    title: 'Step de Fitness Essential',
    price: '29,00 €',
    image:
      'https://plus.unsplash.com/premium_photo-1664298132962-4217332d7515?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'step fitness',
    tags: ['cardio', 'fitness', 'cross_jumps'],
  },
  {
    id: 'shoes_fitness',
    brand: 'DOMYOS',
    title: 'Chaussures Fitness Cardio 500',
    price: '35,00 €',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'chaussures fitness homme',
    tags: ['cardio', 'fitness', 'burpee', 'running'],
  },

  // --- BOXE (OUTSHOCK) ---
  {
    id: 'gants_boxe',
    brand: 'OUTSHOCK',
    title: 'Gants de Boxe 500 Rouge',
    price: '20,00 €',
    image:
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'gants de boxe',
    tags: ['speedbag', 'boxe', 'cardio', 'epaules'],
  },
  {
    id: 'bandes_boxe',
    brand: 'OUTSHOCK',
    title: 'Bandes de maintien 2,5m',
    price: '4,00 €',
    image:
      'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'bandes boxe',
    tags: ['speedbag', 'boxe'],
  },

  // --- YOGA & PILATES (KIMJALY / NYAMBA) ---
  {
    id: 'brique_yoga',
    brand: 'KIMJALY',
    title: 'Brique de Yoga en Liège',
    price: '9,00 €',
    image:
      'https://images.unsplash.com/photo-1591258370814-01609b341790?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'brique yoga liege',
    tags: ['yoga', 'gym_yoga', 'souplesse'],
  },
  {
    id: 'swiss_ball',
    brand: 'NYAMBA',
    title: 'Swiss Ball (Taille M)',
    price: '15,00 €',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'swiss ball',
    tags: ['pilates', 'abdos', 'situps', 'gym_yoga'],
  },
  {
    id: 'elastique_bande',
    brand: 'NYAMBA',
    title: 'Bande Élastique 5kg',
    price: '6,00 €',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'elastique pilates',
    tags: ['gym_yoga', 'muscle', 'stretching'],
  },

  // --- NUTRITION & ACCESSOIRES (APTONIA) ---
  {
    id: 'shaker',
    brand: 'APTONIA',
    title: 'Shaker 700ml Noir',
    price: '5,00 €',
    image:
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'shaker proteine',
    tags: ['muscle', 'fitness', 'cardio', 'all'], // 'all' = recommandé pour tout le monde
  },
  {
    id: 'whey_native',
    brand: 'CORENGTH',
    title: 'Whey Protein Vanille',
    price: '25,00 €',
    image:
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'whey proteine',
    tags: ['muscle', 'expert'],
  },
  {
    id: 'gourde_metal',
    brand: 'QUECHUA',
    title: 'Gourde Métal 1L',
    price: '12,00 €',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'gourde metal 1l',
    tags: ['all', 'cardio', 'running'],
  },
  {
    id: 'rouleau_massage',
    brand: 'APTONIA',
    title: 'Rouleau de Massage (Foam Roller)',
    price: '18,00 €',
    image:
      'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&w=500&q=80',
    searchQuery: 'rouleau massage',
    tags: ['expert', 'running', 'muscle', 'recuperation'],
  },
];

/* ==========================================================================
   🧠 ALGORITHME DE RECOMMANDATION
   ========================================================================== */

/**
 * Retourne les meilleurs produits pour un exercice donné.
 * @param {Object} move - L'objet exercice complet (id, category, level, etc.)
 * @param {Number} limit - Nombre max de produits à retourner (défaut 4)
 */
export const getRecommendedProducts = (
  move: { id: string; category: string[]; level: string[] },
  limit = 4,
) => {
  if (!move) return [];

  // 1. Calculer un score pour chaque produit
  const scoredProducts = INVENTORY.map((product) => {
    let score = 0;

    // CRITÈRE A: Match exact avec l'ID du mouvement (Ex: 'push_up' taggé sur les poignées)
    // C'est le lien le plus fort.
    if (product.tags.includes(move.id)) {
      score += 100;
    }

    // CRITÈRE B: Match de catégorie (Ex: produit 'muscle' pour exercice 'muscle')
    const commonCategories = product.tags.filter((tag) =>
      move.category.includes(tag),
    );
    score += commonCategories.length * 10;

    // CRITÈRE C: Les indispensables (tag 'all')
    if (product.tags.includes('all')) {
      score += 5;
    }

    return { ...product, score };
  });

  // 2. Filtrer ceux qui ont un score > 0 et trier par score décroissant
  const filtered = scoredProducts
    .filter((p) => p.score > 0)
    .toSorted((a, b) => b.score - a.score);

  // 3. Retourner la sélection coupée à la limite
  return filtered.slice(0, limit);
};
