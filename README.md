## Déploiement sur Microsoft Azure

1. Crée un compte Azure et connecte-toi au portail Azure.
2. Crée un service « Application Web » dans un groupe de ressources.
3. Dans la configuration de l’application web Azure, ajoute les variables d’environnement suivantes :
   - MONGO_URI : ta chaîne de connexion MongoDB Atlas
   - PORT : 5000
4. Prépare le build frontend :
   ```bash
   cd client
   npm run build
