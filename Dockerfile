# syntax=docker/dockerfile:1.4

### Étape 1 : build du frontend
FROM node:24-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app/frontend

# Copie uniquement ce qui est nécessaire pour l'installation des dépendances
COPY package*.json ./
COPY tsconfig.json ./

# Build des dépendances (utilisation de npm ci pour une installation propre, sans modifier le package-lock.json)
RUN npm ci

# Copier le reste des fichiers source
COPY / ./

# Build de l'application Next.js
RUN  npm run build

### Étape 2 : image finale minimale
FROM node:24-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app/frontend

# On copie les fichiers buildés depuis l'étape de build (uniquement ce qui est nécessaire à l'exécution)
COPY --from=builder /app/frontend/out ./out
COPY --from=builder /app/frontend/package*.json ./
COPY --from=builder /app/frontend/next.config.ts ./
COPY --from=builder /app/frontend/tsconfig.json ./
COPY --from=builder /app/frontend/public ./public

# Installer uniquement les dépendances nécessaires à l'exécution (pas les dépendances de dev)
RUN npm ci --omit=dev

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
