/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        decathlon: {
          // LE NOUVEAU BLEU (Approximation du "Orbit Blue")
          primary: '#3643BA', 
          
          // Le vert pomme souvent utilisé pour le côté "Eco/Santé" dans la nouvelle DA
          accent: '#00D1A1', 
          
          // Noir non pur (très utilisé maintenant)
          dark: '#1C1C1C', 
          
          // Gris très clair pour les fonds
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        // On remplace la sans par défaut par Outfit
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      // Pour les images arrondies typiques de la nouvelle DA
      borderRadius: {
        'DEC': '1.5rem', // Arrondi spécifique aux cartes Decath
      }
    },
  },
  plugins: [],
}