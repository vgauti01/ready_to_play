[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

# 🏋️‍♂️ Decathlon 3D Coach

> Une application de coaching sportif immersive, personnalisée et connectée, propulsée par la visualisation 3D interactive.

## 📋 À propos

Ce projet est une **Progressive Web App (PWA)** conçue pour offrir des programmes d'entraînement sur mesure. Elle se distingue par l'utilisation de modèles 3D interactifs pour visualiser les mouvements et par un algorithme de recommandation prenant en compte les blessures et le matériel disponible.

## ✨ Fonctionnalités Clés

  * **🧠 Algorithme de Recommandation :** Analyse le profil utilisateur (Niveau, Objectif, Sport pratiqué) et filtre strictement les exercices contre-indiqués (Gestion des douleurs/blessures).
  * **🧊 Visualisation 3D Hybride :**
      * *Liste :* Vignettes optimisées (générées via un outil interne).
      * *Détail & Player :* Scènes 3D interactives (Zoom, Rotation) via **React Three Fiber**.
      * *Performance :* Utilisation d'un fichier GLB unique avec animations partagées pour un chargement instantané.
  * **🛒 Session Builder :** Système de "Panier" permettant à l'utilisateur de construire sa propre séance à la carte.
  * **⏱️ Player de Séance Immersif :** Mode entraînement guidé avec gestion des phases (Effort / Repos), chronomètre visuel, et indications sonores.
  * **🛍️ Smart Cross-Selling :** Recommandation contextuelle d'équipements (Domyos, Corength) basée sur l'exercice consulté (ex: *Push-up* → *Poignées de pompes*).

## 🛠 Stack Technique

  * **Langage :** JavaScript / React
  * **Framework :** [Next.js 16](https://nextjs.org/) (App Router)
  * **Style :** [Tailwind CSS](https://tailwindcss.com/)
  * **3D & WebGL :**
      * [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (R3F)
      * [@react-three/drei](https://github.com/pmndrs/drei) (Helpers)
      * [Three.js](https://threejs.org/)
  * **Animation UI :** [Framer Motion](https://www.framer.com/motion/)
  * **État Global :** React Context API (Session Management)
  * **Modèles 3D :** Mixamo (Animations) & Blender (Optimisation GLB)

## 📂 Structure du Projet

```bash
src/
├── app/                  # Next.js App Router
│   ├── layout.js         # Layout global + Providers (Session, Transition)
│   ├── page.js           # Page d'accueil (Liste résultats)
│   ├── exercice/         # Page Détail dynamique [id]
│   └── play/             # Le Player de séance (Timer + 3D)
├── components/           # Composants réutilisables (AvatarViewer, TransitionProvider)
├── context/              # SessionContext (État du panier)
├── data/                 # Données statiques (Exercices, Questions)
public/
├── logo.png              # Logo de Décathlon
├── models/               # Fichiers .glb optimisés
└── images/               # Thumbnails générés
```

## 🚀 Installation et Lancement

1.  **Cloner le dépôt :**
2.  **Installer les dépendances :**

    ```bash
    npm install
    ```

3.  ***Lancer le serveur de développement :***

    Sans Docker :
    ```bash
    npm run dev
    ```

    Avec Docker :
    ```bash
    docker build -t decathlon-coach-dev -f Dockerfile.dev .
    docker run -d -p 3000:3000 decathlon-coach-dev
    ```

3. **Construire pour la production :**

    Sans Docker :
    ```bash
    npm run build
    npm start
    ```

    Avec Docker :
    ```bash
    docker build -t decathlon-coach-prod .
    docker run -d -p 3000:3000 decathlon-coach-prod
    ```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.
  
## 🧠 L'Algorithme de Scoring

Le cœur de l'application repose sur une fonction de tri pondérée située dans `src/utils/recommendation.js` (ou directement dans la page).

  * **Filtre critique (Sécurité) :** Si `User.pain` correspond à `Exercise.painAvoid`, l'exercice est exclu ou pénalisé (-100 pts).
  * **Bonus "Rééducation" :** Si l'exercice est bénéfique pour la douleur (`painFriendly`), score +5.
  * **Matching :**
      * Correspondance Objectif (Muscle/Cardio) : +3 pts
      * Correspondance Sport (Running/Tennis...) : +2 pts
      * Correspondance Niveau : +1 pt

## 🎨 Design & Assets

  * **Identité Visuelle :** Inspirée de la charte Décathlon 2024.
      * Bleu : `#0082C3`
      * Jaune (Accent/Promo) : `#FFEA28`
      * Fond Technique : `#F4F5F7`
  * **Modèles 3D :** Personnages et animations issus de [Mixamo](https://www.mixamo.com), convertis et optimisés via Blender.

## 🔮 Roadmap / Améliorations futures

  * [ ] **Authentification :** Sauvegarder ses programmes via Firebase/Supabase.
  * [ ] **Mode Vocal (TTS) :** Lecture audio des descriptions pendant l'effort.
  * [ ] **Historique :** Suivi des séances réalisées et des calories brûlées.
  * [ ] **API Réelle :** Connexion à l'API Decathlon E-commerce pour les prix en temps réel.


**Développé avec ❤️ et peu de sommeil.**

## 📄 Licence

Ce projet est distribué sous la licence **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Cela signifie que vous êtes libre de :
* Utiliser ce logiciel à des fins commerciales.
* Modifier le code source.
* Distribuer des copies.
* Utiliser le logiciel via un réseau.

**À condition de :**
* Divulguer le code source si vous hébergez le logiciel pour des utilisateurs (clause spécifique AGPL).
* Conserver la même licence (AGPL-3.0) pour toute modification ou distribution.
* Indiquer clairement les modifications effectuées.

> **Note importante :** Ce projet est une démonstration technique. Les marques, logos et produits cités (Décathlon, Domyos, Corength, etc.) restent la propriété intellectuelle exclusive de leurs détenteurs respectifs. Ils ne sont pas couverts par cette licence open-source.