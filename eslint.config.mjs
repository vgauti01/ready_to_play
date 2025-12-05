import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import unicorn from 'eslint-plugin-unicorn'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    // Fichiers et dossiers à ignorer globalement
    ignores: [
      'node_modules',
      'dist',
      '.next',
      'build',
      'coverage',
      'public',
      'out',
      '**/*.config.{js,ts,mjs,cjs}',  // tous les fichiers de config
    ],
  },
  // Configurations de base
  nextPlugin.configs['core-web-vitals'],
  ...tseslint.configs.recommendedTypeChecked,
  unicorn.configs.recommended,
  {
    plugins: {
      prettier, // pour le formatage
      react, // pour les règles React
      'jsx-a11y': jsxA11y, // pour l'accessibilité
      import: importPlugin, // pour la gestion des imports
    },
    languageOptions: {
      parserOptions: {
        projectService: true, // Activer le service de projet pour une meilleure analyse
        tsconfigRootDir: import.meta.dirname, // Répertoire racine pour tsconfig
      },
    },
    rules: {
      // ---- PRETTIER ----
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all', // Virgule finale
          semi: true, // Point-virgule
          tabWidth: 2, // Largeur de tabulation
          singleQuote: true, // Guillemets simples
          printWidth: 80, // Taille maximale de ligne
          endOfLine: 'auto', // Fin de ligne automatique
          arrowParens: 'always', // Parenthèses autour des arguments de fonction fléchée
        },
      ],

      // ---- REACT ----
      'react/react-in-jsx-scope': 'off', // React n'a pas besoin d'être importé dans les fichiers JSX
      'react/jsx-uses-react': 'off', // Désactiver la règle obsolète
      'react/jsx-uses-vars': 'warn', // Avertir si des variables JSX ne sont pas utilisées

      // ---- ACCESSIBILITY ----
      'jsx-a11y/alt-text': 'warn', // Texte alternatif pour les images
      'jsx-a11y/aria-props': 'warn', // Vérifie les propriétés ARIA
      'jsx-a11y/aria-proptypes': 'warn', // Vérifie les types de propriétés ARIA
      'jsx-a11y/aria-unsupported-elements': 'warn', // Éléments non pris en charge par ARIA
      'jsx-a11y/role-has-required-aria-props': 'warn', // Rôles avec propriétés ARIA requises
      'jsx-a11y/role-supports-aria-props': 'warn', // Rôles prenant en charge les propriétés ARIA

      // ---- TYPESCRIPT ----
      '@typescript-eslint/no-unused-vars': [ // Variables non utilisées
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // Ignorer les variables commençant par _
      ],
      '@typescript-eslint/no-floating-promises': 'warn', // Promesses non gérées
      '@typescript-eslint/no-unsafe-argument': 'warn', // Arguments de type any

      // ---- UNICORN ----
      'unicorn/prevent-abbreviations': 'off', // Autoriser les abréviations
      "unicorn/filename-case": 'off', // Désactiver la règle de casse des noms de fichiers

      // ---- IMPORTS ----
      'import/order': [ // Ordre des imports
        'error',
        {
          groups: [
            'builtin', // Modules Node.js intégrés
            'external', // Modules externes
            'internal', // Modules internes
            ['parent', 'sibling', 'index'], // Modules parents, frères et index
          ],
          'newlines-between': 'always', // Nouvelle ligne entre les groupes
        },
      ],
    },
  },
]
