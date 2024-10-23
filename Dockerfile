# Utiliser une image de base node
FROM node:16

# Installer les dépendances système nécessaires pour Electron
RUN apt-get update && apt-get install -y \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgbm1 \
    libgtk-3-0 \
    libxss1 \
    libxtst6 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json du backend (racine) et du frontend
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Installer les dépendances du backend (prod + dev)
RUN npm install

# Copier tout le reste du projet dans le conteneur
COPY . .

# Lister les fichiers pour s'assurer que le public/index.html est bien copié
RUN ls -al /app/frontend/public

# Se déplacer dans le dossier frontend et installer les dépendances du frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Revenir au répertoire de travail de l'application Electron
WORKDIR /app

# Exposer le port si nécessaire (par exemple, si tu veux servir une API ou autre)
EXPOSE 3000

# Commande de lancement de l'application Electron
CMD ["npm", "start"]
