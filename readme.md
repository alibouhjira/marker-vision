# Projet d'Identification de Marker avec OpenCV et JavaScript

## Description
Ce projet permet d'identifier des markers à l'aide d'une webcam en utilisant OpenCV et JavaScript. Une fois un marker reconnu, une image 3D spécifique est affichée en fonction de l'identifiant du marker détecté.

## Fonctionnalités
- Détection de markers en temps réel via la webcam
- Utilisation d'OpenCV pour le traitement d'image
- Identification du marker et récupération de son identifiant
- Affichage d'une image 3D correspondant à l'identifiant détecté

## Prérequis
- Node.js installé (optionnel pour un serveur local)
- OpenCV.js
- Une webcam fonctionnelle

## Installation
1. Cloner le dépôt :
   ```sh
   git clone https://github.com/votre-utilisateur/marker-detection.git
   cd marker-detection
   ```
2. Installer un serveur local si nécessaire (ex: avec `http-server` pour exécuter le projet en local) :
   ```sh
   npm install -g http-server
   ```
3. Lancer le serveur :
   ```sh
   http-server
   ```
4. Accéder au projet via `http://localhost:8080` dans un navigateur compatible.

## Utilisation
1. Ouvrir la page web du projet.
2. Autoriser l'accès à la webcam.
3. Placer un marker devant la webcam.
4. L'image 3D associée au marker s'affiche automatiquement.

## Technologies utilisées
- **JavaScript** pour la logique principale
- **OpenCV.js** pour la détection des markers
- **WebGL/Three.js** (optionnel) pour l'affichage 3D

## Améliorations futures
- Support pour plusieurs markers simultanément
- Amélioration de la reconnaissance des markers
- Ajout d'une interface utilisateur plus avancée

## Auteurs
- [Votre Nom](https://github.com/votre-utilisateur)

## Licence
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.


