import path from 'node:path';

import type { NextConfig } from 'next';

// Configuration Next.js
const nextConfig: NextConfig = {
  reactStrictMode: false, // Désactiver le mode strict de React
  experimental: {
    // Options expérimentales
    globalNotFound: true, // Activer la page 404 globale (src/app/global-not-found.tsx)
  },
  // Personnalisation de la configuration Webpack
  // On utilise webpack car le hot reload ne fonctionne pas avec Turbopack dans un conteneur Docker avec WSL
  webpack: (config, _) => {
    // Options de surveillance des fichiers pour le développement en conteneur, permet le hot-reload
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        // Options de surveillance des fichiers
        poll: 500, // Vérifier les modifications toutes les 500ms
        aggregateTimeout: 100, // Délai d'agrégation de 100ms
        ignored: ['**/node_modules'], // Ignorer les modifications dans node_modules
      };
    }

    // Alias pour les types Prisma
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma_types': path.resolve(import.meta.dirname, '../prisma_types'),
    };

    return config;
  },

  // Dossier de sortie du build
  distDir: 'out',
  // Transpiler les paquets locaux (c.à.d. convertir TS -> JS)
  transpilePackages: ['../prisma_types'],
  //typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  //   ignoreBuildErrors: true,
  //},
};

export default nextConfig;
